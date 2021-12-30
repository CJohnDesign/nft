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
import Mint from "./Mint";
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

function App() {
  const [modalShow, setModalShow] = React.useState(false);
  const [wallet, setWallet] = useState("123");
  const [twitter, setTwitter] = useState("");
  const [email, setEmail] = useState("");

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
                <Card.Title>Mint</Card.Title>
                <Mint />
                {/* SetWL={SetWL(db)} */}
              </Card.Body>
              {/*<Card.Body className="d-grid gap-1">
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
                {/* SetWL={SetWL(db)} *}
              </Card.Body>*/}
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

export default App
