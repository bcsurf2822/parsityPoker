import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { register } from "../../rtk/slices/registrationSlice";

import { Card, Form, Button } from "react-bootstrap";

const RegisterationPage = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const registrationState = useSelector((state) => state.register)

  const handleRegistration = (e) => {
    e.preventDefault();
    dispatch(register( {username, email, password}));
  };

  return (
    registrationState.isRegistered ? (
      <div>Registration Success!</div>
    ) : (
      <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title className="mb-4">Thanks for Signing Up</Card.Title>
          <Card.Text>
            This is a decentralized platform to create your account please enter
            a valid email and password that will be used to login, your username
            will be displayed in game
          </Card.Text>

          <Form onSubmit={handleRegistration}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
    )
  )
};

export default RegisterationPage;
