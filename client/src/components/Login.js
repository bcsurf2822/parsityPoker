import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../rtk/slices/authenticationSlice";
import Registration from "./pages/Registration";
import { Form, Button, Card, Container } from "react-bootstrap";

function Login() {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await dispatch(login({ email, password }));
    } catch (err) {}
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  if (isAuthenticated) {
    return <p>Welcome Back1</p>;
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              Login
            </Button>
            <p className="mt-3">
              Don't have an account?
              <Button variant="link" onClick={openModal}>
                Create Account Here
              </Button>
            </p>
            <Registration show={showModal} onHide={closeModal} />
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
