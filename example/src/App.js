import React from 'react'

import CSCPAY from 'csc-pay'
import 'csc-pay/dist/index.css'

const App = () => {
  return <CSCPAY
    chainId={53}
    paymethod={"TCET"}
    receiverAddress={"0x78469dB2308D3E6bb9bF42440b8c9E9390080E78"}
    amount={"10"}
    onSuccess={(data) => console.log("onSuccess", data)}
    onFailure={(data) => console.log("onFailure", data)}
    onError={(data) => console.log("onError", data)}
  />
}

export default App
