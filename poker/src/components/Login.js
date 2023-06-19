import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../rtk/slices/authenticationSlice";
import { useNavigate } from "react-router-dom";

import { Form, Button, Card, Modal } from "react-bootstrap";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toRegistration = function () {
    navigate("/Registration");
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password }));
    } catch (err) {
      setShowModal(true);
    }
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  if (isAuthenticated) {
    return <p>Welcome Back1</p>;
  }
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={email} onChange={handleEmailChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} onChange={handlePasswordChange} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>Login</Button>
            <p className="mt-3">
              Don't have an account? 
              <Button variant="link" onClick={toRegistration}>Create Account Here</Button>
            </p>
          </Form>
        </Card.Body>
      </Card>
      {/* Rest of the code... */}
    </div>
  );
}

export default Login;