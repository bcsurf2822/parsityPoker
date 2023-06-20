import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Login from "./Login";
import Footer from "./Footer";

const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const userInfo = useSelector(state => state.auth.user);

  const pokerImageURL = "https://via.placeholder.com/150"; // replace with your image URL

  return (
    <Container className="App">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card className="mb-4 shadow-sm">
            <Card.Img variant="top" src={pokerImageURL} />
            <Card.Body>
              <Card.Title>Welcome To Poker</Card.Title>
              <Card.Text>
                A Poker Platform
              </Card.Text>
              {!isAuthenticated && <Login /> }
              {isAuthenticated && <Card.Text>Welcome back, {userInfo.username}!</Card.Text>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default Home;
