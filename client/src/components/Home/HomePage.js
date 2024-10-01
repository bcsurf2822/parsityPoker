import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../rtk/actions/auth";
import Registration from "../pages/Registration";
import "./HomePage.css"
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";


function HomePage() {

  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state) => state.auth.user);
  console.log("USERINFO", user)

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


  return (
<Container>
  <Row className="homepage">
    <Col className = "title">
    <h1>Poker Clone</h1>
    <h1>Texas Hold 'Em</h1>
    </Col>

    
    {isAuthenticated && (
       <Alert variant="success">
       <Alert.Heading>Welcome Back {user.username}</Alert.Heading>
       <p>
Click on tables to join a game of texas hold'em!
       </p>
       <hr />
       <p className="mb-0">
Last Login:  {user.lastLogin}
       </p>
     </Alert>
    )}

    {!isAuthenticated && (
        <Col className="login">
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label id="bold-font">Email address</Form.Label>
              <Form.Control type="email" ref={emailRef} placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label id="bold-font">Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              Submit
            </Button>
            <p className="mt-3">
              Don't have an account?
              <Button variant="link" onClick={openModal}>
                Create Account Here
              </Button>
            </p>
            <Registration show={showModal} onHide={closeModal} />
          </Form>
        </Col>
      )}
    </Row>
  </Container>
);
}

export default HomePage;