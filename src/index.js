import React, { useEffect, useState } from 'react'
import Web3Modal from 'web3modal';
import WalletConnect from "@walletconnect/web3-provider";
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider'
import styles from './styles.module.css'



export default function Paypli(props) {

  const [disable, setDisable] = useState(false)
  const [btnLabel, setbtnLabel] = useState()
  const [provider, setprovider] = useState({})



  useEffect(() => {
    setbtnLabel(`Pay ${props.amount} ${props.paymethod}`)
  }, [])


  //Check Web3 Exist
  detectEthereumProvider().then(res => {
    if (!res) {
      setDisable(true)
    }
  })

  const errorMsg = {
    chainId: "Chain ID is required",
    receiverAddress: "Receiver Address is required",
    amount: "Amount is required"
  }


  var errorResponse = {}

  const web3Modal = new Web3Modal({
    cacheProvider: true,
    disableInjectedProvider: false,
    providerOptions: {
      walletconnect: {
        package: WalletConnect, // required
        options: {
          infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
          rpc: {
            50: "https://xdcpayrpc.blocksscan.io/",
            51: "https://rpc.apothem.network",
            53: "https://testnet-rpc.coinex.net"
          },
        }
      },
    }
  });

  const onConnect = async () => {

    if (!props.chainId || props.chainId === "") {
      errorResponse.chainId = errorMsg["chainId"]
    }
    if (!props.receiverAddress || props.receiverAddress === "") {
      errorResponse.receiverAddress = errorMsg["receiverAddress"]
    }
    if (!props.amount || props.amount === "") {
      errorResponse.amount = errorMsg["amount"]
    }
    if (!props.paymethod || props.paymethod === "") {
      errorResponse.paymethod = errorMsg["paymethod"]
    }

    try {
      //THROW ONERROR IF EXISTS
      if (Object.keys(errorResponse).length > 0) {
        props.onError(errorResponse);
        return;
      }

      const instance = await web3Modal.connect();
      const providerConnect = new ethers.providers.Web3Provider(instance);
      setprovider(providerConnect)
      const { chainId } = await providerConnect.getNetwork();

      if (props.chainId != chainId) {
        errorResponse.chainId = "Network Mismatched"
        props.onError(errorResponse);
        return;
      }
      //CHECK LOGIN OR NOT
      const accounts = await providerConnect.listAccounts();
      if (accounts.length === 0) {
        errorResponse.msg = "Xdc Pay Not LoggedIn"
        props.onError(errorResponse);
        return;
      }

      //SEND XDC
      const signer = providerConnect.getSigner();
      const address = await signer.getAddress();

      setbtnLabel("Processing...")

      //CALL TRANSACTION
      if (props.paymethod === "TCET" || props.paymethod === "CET") {
        const params = [{
          from: address,
          to: props.receiverAddress,
          value: ethers.utils.parseUnits(props.amount, 'ether').toHexString()
        }];
        var transactionHash = await providerConnect.send('eth_sendTransaction', params)

      } else {
        props.onError({ paymethod: "Pay Method Not Available" });
        return null;
      }


      //CHECK TRANSACTION STATUS
      const [txhash, status] = await getTxnStatus(transactionHash, providerConnect);
      if (!status) {
        props.onFailure({ hash: transactionHash, success: false, msg: "Error Occured on Blockchain" })
        return
      }
      props.onSuccess({ hash: transactionHash, success: true })
      setbtnLabel(`Pay ${props.amount} ${props.paymethod}`)

    } catch (err) {
      console.log("err", err)
      props.onError(err);
      setbtnLabel(`Pay ${props.amount} ${props.paymethod}`)

    }
  }

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const getTxnStatus = async (txHash, provider) => {
    let transactionReceipt = null
    while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
      transactionReceipt = await provider.getTransactionReceipt(txHash);
      await sleep(3000)
    }
    if (transactionReceipt.status) {
      return [txHash, true];
    } else {
      return [txHash, false];
    }
  }

  return (
    <button
      onClick={onConnect}
      disabled={disable}
      className={`${styles.apple_pay_button} ${styles.apple_pay_button_black} ${disable && styles.btn_disabled}`}
    >
      {btnLabel}
    </button>
  )
}

