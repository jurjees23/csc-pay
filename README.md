
# CSC Crypto Payment Gateway

A package to accept CET token as Payment in your website or web application

 

## Installation

Install my-project with npm

```bash
  npm install --save csc-pay
```
    
## Usage/Examples

```javascript
import CSCPAY from 'csc-pay'
import 'csc-pay/dist/index.css'

function App() {
  return <CSCPAY
    chainId={53}
    paymethod={"TCET"}
    receiverAddress={"0xe79518Db2d9F605d3432cd48B44bc808c94694C6"}
    amount={"10"}
    onSuccess={(data) => console.log("onSuccess", data)}
    onFailure={(data) => console.log("onFailure", data)}
    onError={(data) => console.log("onError", data)}
  />
}
```


## Required Parameter

| Parameter | Type     | Description                | Values                      |
| :-------- | :------- | :------------------------- |:----------------------------
| `chainId` | `string` | **Specify network**.                     |  53(TESTNET)  or 52 (Mainnet)
| `paymethod` | `string` | **Specify payment method**.                   |  TCET  (or) CET
| `receiverAddress` | `string` | **Valid Wallet Address**. |   Wallet Address
| `amount` | `string` | **Amount to received**.                      |  eg:10
| `onSuccess` | `function` |                |  Capture Success Response
| `onFailure` | `function` |                    |  Capture Failure Response
| `onError` | `function` |                    |  Capture Error Response





## Run Locally

Clone the project

```bash
  git clone https://github.com/jurjees23/csc-pay
```

Go to the project directory

```bash
  cd example
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## License

MIT © [Jurjees23](https://github.com/Jurjees23/)