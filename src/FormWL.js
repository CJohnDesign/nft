import React, { useState } from "react";
import { InputGroup, Button, Form, Row, Col } from "react-bootstrap";
import SetWL from "./SetWL"

function FormWL(props) {
  const { setWallet, wallet, db, twitter, setTwitter, email, setEmail, onHide } = props;
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        event.preventDefault();
        setValidated(true);
        SetWL(db, wallet, twitter, email).then((result) => {
            if (validated) {
                alert("You've been added to the whitelist!")
                onHide()
            } else {
                event.stopPropagation();
                console.log(event)
            }
          }).catch((err) => {
            alert("Something went wrong. Refresh and try again. If the problem continues, copy and paste the following error into a Twitter DM to @305yb: " + err)
            onHide()
          });;
    }
    setValidated(true);
    
    
  };

  return (
    <Form {...props} noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Wallet Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="ETH Address or ENS Domain"
            onChange={(e) => setWallet(e.target.value)}
            feedbackType="invalid"
          />
          <Form.Control.Feedback type="invalid">
            We need an address to add to our whitelist
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3" as={Col} md="6" controlId="validationCustomUsername">
          <Form.Label>Twitter</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Handle"
              onChange={(e) => setTwitter(e.target.value)}
              aria-describedby="inputGroupPrepend"
            />
          </InputGroup>
          <Form.Text>Optional</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" as={Col} md="6" controlId="validationCustomUsername">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="inputGroupPrepend"
            />
          </InputGroup>
          <Form.Text>Optional</Form.Text>
        </Form.Group>
      </Row>

      <Row>
        <Col md={12}>
          <Button
            className="btn btn-primary col-12"
            type="submit"
          >
            Join Whitelist
          </Button>
          {/* <Button onClick={() => {this.state.wallet}}>Did</Button> */}
        </Col>
      </Row>
    </Form>
  );
}

export default FormWL;
