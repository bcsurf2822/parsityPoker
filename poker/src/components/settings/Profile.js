import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';import { useSelector, useDispatch  } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

import {updateUsername} from '../../rtk/slices/profileSlice';


import { TfiMoney } from 'react-icons/tfi';
import { FcMoneyTransfer } from 'react-icons/fc';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const [newUsername, setNewUsername] = useState(''); 
  const formatDate = new Date(user.lastLogin).toLocaleString();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toDeposit = function () {
    navigate("/deposit");
  };

  const toWithdraw = function () {
    navigate("/withdrawl");
  };

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    dispatch(updateUsername({ token: token, username: newUsername }));
  };

  const fontStyle = {
    fontFamily: 'Overpass, sans-serif'
  } 

  return (
    <Container
    className="d-flex justify-content-center align-items-center"
    style={{ minHeight: '100vh', ...fontStyle }}
  >
      <Card className="p-4">
        <Row className="align-items-center mb-4">
          <Col className="text-center">
            <div className="d-flex flex-column align-items-center">
              <img src={user.avatar} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
              <h4 className="mt-2">{user.username}</h4>
              <Form onSubmit={handleUsernameChange}>
                <Form.Group>
                  <Form.Control type="text" placeholder="New username" value={newUsername} onChange={e => setNewUsername(e.target.value)} required />
                </Form.Group>
                <Button type="submit">Change Username</Button>
              </Form>
              <label className="btn btn-secondary btn-sm">
                Change Avatar
                <input type="file" style={{ display: 'none' }}  />
              </label>
            </div>
          </Col>
          <Col>
            <Card.Text className="border-bottom pb-3">
              <strong>Email:</strong> {user.email}
            </Card.Text>
            <Card.Text className="border-bottom pb-3">
              <strong>Account Balance:</strong> <TfiMoney /> {user.accountBalance}
              <Button onClick={toDeposit} variant="outline-primary" size="sm" className="ml-2">
                Deposit <FcMoneyTransfer />
              </Button>
            </Card.Text>
            <Card.Text className="border-bottom pb-3">
              <strong>Bank Balance:</strong> <TfiMoney /> {user.bankBalance}
              <Button onClick={toWithdraw} variant="outline-primary" size="sm" className="ml-2">
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
