import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";
import Login from "./Login";
import Footer from "./Footer";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.auth.user);

  return (
    <Container className="App">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>
                Welcome To All World!
                <p>
                  <strong>Casino - Poker - Blackjack - TableGames </strong>
                </p>{" "}
              </Card.Title>
            </Card.Body>
          </Card>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Text>A Decentralized Casino</Card.Text>
            </Card.Body>
          </Card>
          <Card className="login-container mb-4 shadow-sm">
            <Card.Body>
              {!isAuthenticated && <Login />}
              {isAuthenticated && (
                <Card.Text>Welcome , {userInfo.username}!</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default Home;
