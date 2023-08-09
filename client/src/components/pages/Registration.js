import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { register } from "../../rtk/slices/registrationSlice";

import { Card, Form, Button, Modal } from "react-bootstrap";

const Registration = ({ show, onHide }) => {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const registrationState = useSelector((state) => state.register);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;
    try {
      await dispatch(register({ email, password, username }));
    } catch (err) {}
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Thanks for Signing Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {registrationState.isRegistered ? (
          <div>Registration Success!</div>
        ) : (
          <Card>
            <Card.Body>
              <Card.Text>
                Please enter a valid email and password that will be used to
                login. Your username will be displayed in the game.
              </Card.Text>

              <Form onSubmit={handleRegistration}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" ref={emailRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    ref={usernameRef}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    ref={passwordRef}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Registration;
