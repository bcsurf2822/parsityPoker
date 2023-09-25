import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TfiMoney } from "react-icons/tfi";
import { FcMoneyTransfer } from "react-icons/fc";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user from Profile", user);

  const [newUsername, setNewUsername] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const formatDate = new Date(user.lastLogin).toLocaleString();
  const formatBalance = (balance) => balance.toFixed(2);


  const navigate = useNavigate();

  useEffect(() => {}, [user.accountBalance]);

  const toDeposit = function () {
    navigate("/deposit");
  };

  const toWithdraw = function () {
    navigate("/withdrawl");
  };

  const fontStyle = {
    fontFamily: "Overpass, sans-serif",
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", ...fontStyle }}
    >
      <Card className="p-4">
        <Row className="align-items-center mb-4">
          <Col className="text-center">
            <div className="d-flex flex-column align-items-center">
              <img
                src={user.avatar}
                alt="Avatar"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
              <h4 className="mt-2">{user.username}</h4>
              {isEditingUsername ? (
                <Form className="mb-2">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="New username"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" className="btn-sm">
                    Change Username
                  </Button>
                </Form>
              ) : (
                <Button
                  onClick={() => setIsEditingUsername(true)}
                  className="btn-sm mb-2"
                >
                  Edit Username
                </Button>
              )}
              <label className="btn btn-secondary btn-sm">
                Change Avatar
                <input type="file" style={{ display: "none" }} />
              </label>
            </div>
          </Col>
          <Col>
            <Card.Text className="border-bottom pb-3">
              <strong>Email:</strong> {user.email}
            </Card.Text>
            <Card.Text className="border-bottom pb-3">
            <strong>Account Balance:</strong> <TfiMoney />{" "}{formatBalance(user.accountBalance)}

              <Button
                onClick={toDeposit}
                variant="outline-primary"
                size="sm"
                className="ml-2"
              >
                Deposit <FcMoneyTransfer />
              </Button>
            </Card.Text>
            <Card.Text className="border-bottom pb-3">
              <strong>Bank Balance:</strong> <TfiMoney />{formatBalance(user.bankBalance)}
              <Button
                onClick={toWithdraw}
                variant="outline-primary"
                size="sm"
                className="ml-2"
              >
                Withdraw <FcMoneyTransfer />
              </Button>
            </Card.Text>
            <Card.Text>
              <strong>Last Login:</strong> {formatDate}
            </Card.Text>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Profile;
