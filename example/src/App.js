import React from 'react'

import CSCPAY from 'csc-pay'
import 'csc-pay/dist/index.css'
import { Report } from 'notiflix/build/notiflix-report-aio';




const App = () => {

  const onSuccess = (data) => {
    Report.success(
      'Payment Success',
      'Your Payment done successfully',
      'Okay',
      () => {
        window.location = `https://testnet.coinex.net/tx/${data.hash}`
        window.location.reload()
      },
    );
  }
  const onERROR = (data) => {
    console.log("data err", data)
    Report.failure(
      'Payment Error',
      'Your Payment  is failed',
      'Try Again',
      () => {
        window.location.reload()
      },
    );
  }
  return <div className="CartContainer">
    <div className="Header">
      <h3 className="Heading">Shopping Cart</h3>
      <h5 className="Action">Remove all</h5>
    </div>

    <div className="Cart-Items">
      <div className="image-box">
        <img src="images/apple.png" style={{ height: 120 }} />
      </div>
      <div className="about">
        <h1 className="title">Apple Juice</h1>
        <h3 className="subtitle">250ml</h3>
        <img src="images/veg.png" style={{ height: 30 }} />
      </div>
      <div className="counter">
        <div className="btn">+</div>
        <div className="count">2</div>
        <div className="btn">-</div>
      </div>
      <div className="prices">
        <div className="amount">$2.99</div>
        <div className="save"><u>Save for later</u></div>
        <div className="remove"><u>Remove</u></div>
      </div>
    </div>

    <div className="Cart-Items pad">
      <div className="image-box">
        <img src="images/grapes.png" style={{ height: 120 }} />
      </div>
      <div className="about">
        <h1 className="title">Grapes Juice</h1>
        <h3 className="subtitle">250ml</h3>
        <img src="images/veg.png" style={{ height: 30 }} />
      </div>
      <div className="counter">
        <div className="btn">+</div>
        <div className="count">1</div>
        <div className="btn">-</div>
      </div>
      <div className="prices">
        <div className="amount">$3.19</div>
        <div className="save"><u>Save for later</u></div>
        <div className="remove"><u>Remove</u></div>
      </div>
    </div>
    <hr />
    <div className="checkout">
      <div className="total">
        <div>
          <div className="Subtotal">Sub-Total</div>
          <div className="items">2 items</div>
        </div>
        <div className="total-amount">$6.18 = 10 TCET</div>


      </div>
      <div align="center" style={{ marginTop: 20 }}>
        <CSCPAY
          chainId={53}
          paymethod={"TCET"}
          receiverAddress={"0x78469dB2308D3E6bb9bF42440b8c9E9390080E78"}
          amount={"10"}
          onSuccess={(data) => onSuccess(data)}
          onFailure={(data) => onERROR(data)}
          onError={(data) => onERROR(data)}
        />
      </div>
    </div>
  </div>

}

export default App
