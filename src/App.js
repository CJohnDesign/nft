import React, { useState, useEffect } from "react";
import logo from "./img/MiamiTech-Yearbook-Cover.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import ModalWL from "./ModalWL.js";
// import { InputGroup, Row, Form, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import "firebase/analytics";
import "firebase/firestore";
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import { useEagerConnect, useInactiveListener } from './hooks'
import { injected } from './connectors'
const contract = require("./artifacts/contracts/FreshmanYear.sol/FreshmanYear.json")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW59-zNxIvefp99ptPiiSHtJkZqnV3X6s",
  authDomain: "freshman-year.firebaseapp.com",
  projectId: "fyb",
  storageBucket: "freshman-year.appspot.com",
  messagingSenderId: "277534010170",
  appId: "1:277534010170:web:a662bfef4eff05c576fe03",
  measurementId: "G-HCHWC65K40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

const CONTRACT_ADDRESS = "0xABEA6c7239c14F58d374935CdEb733f01C205819"

function App() {
  const [modalShow, setModalShow] = React.useState(false);
  const [wallet, setWallet] = useState("123");
  const [twitter, setTwitter] = useState("");
  const [email, setEmail] = useState("");

	const context = useWeb3React()
	const { connector, library, chainId, account, activate, deactivate, active, error } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

	useEffect(() => {
    setActivatingConnector(injected)
    activate(injected)
	}, [])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  console.log(context)

  if (library) {

    
  if (connector) {
    const signer = library.getSigner(account)

    // console.log(contract)
    const contract_instance = new Contract(CONTRACT_ADDRESS, contract.abi, signer)
    console.log(contract_instance)
    const data = contract_instance.mintPublic(1)
    console.log(data)
    // console.log(library.eth.Contract)
  }


  }

  console.log("Name: " + wallet);
  console.log("Twitter: " + twitter);
  console.log("Email: " + email);
  return (
    <div className="App">
      <header className="App-header">
        <Row>
          <Col md="12" className="text-center">
            <img src={logo} className="coverImg" alt="logo" />
            <Card className="p-0" style={{ width: "18rem", margin: "0 auto" }}>
              <Card.Body className="d-grid gap-1">
                <Card.Title>Freshman Year NFT</Card.Title>
                <Button
                  variant="primary"
                  className="mt-1"
                  onClick={() => setModalShow(true)}
                >
                  Join Whitelist
                </Button>
                <ModalWL
                  db={db}
                  wallet={wallet}
                  setWallet={setWallet}
                  twitter={twitter}
                  setTwitter={setTwitter}
                  email={email}
                  setEmail={setEmail}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                {/* SetWL={SetWL(db)} */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
      </header>
      {/* <Row>
          <Col md="12" className="text-center">
            <Card style={{ background: "none", border: "none", boxShadow: "none" }}>
              <Card.Title>Freshman Year NFT</Card.Title>
            </Card>
          </Col>
        </Row> */}
    </div>
  );
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export default function() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  )
}
