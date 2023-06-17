import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withdraw } from '../../rtk/slices/bankingSlice';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Withdrawl = () => {
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (amount !== '') {
      dispatch(withdraw({ userId: user.id, amount: Number(amount) }));
    }
    setAmount('');
    navigate("/profile")
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="p-4">
        <h2 className="mb-4">Withdraw Funds</h2>
        <Form onSubmit={handleWithdraw}>
          <Form.Group>
            <Form.Label>Amount to withdraw:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Withdraw
          </Button>
        </Form>
        <div className="mt-4">
          <h6>Additional Information:</h6>
          <p>Enter the amount you wish to withdraw from your account.</p>
        </div>
      </Card>
    </div>
  );
};

export default Withdrawl;
