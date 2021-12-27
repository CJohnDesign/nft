import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import FormWL from "./FormWL";

function ModalWL(props) {
  // console.log(props)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Join Whitelist to Mint
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormWL
          db={props.db}
          wallet={props.wallet}
          setWallet={props.setWallet}
          twitter={props.twitter}
          setTwitter={props.setTwitter}
          email={props.email}
          setEmail={props.setEmail}
          onHide={props.onHide}
        />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default ModalWL;
