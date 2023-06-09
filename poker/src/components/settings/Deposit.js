import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deposit } from '../../rtk/slices/bankingSlice';
import { Form, Button } from 'react-bootstrap';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleDeposit = async (e) => {
    e.preventDefault();
    if(amount !== '') {
      dispatch(deposit({ userId: user._id, amount: Number(amount) }));
    }
    setAmount('');
  };

  return (
    <div className="deposit-page">
      <h2>Deposit Funds</h2>
      <Form onSubmit={handleDeposit}>
        <Form.Group>
          <Form.Label>Amount to deposit:</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Deposit
        </Button>
      </Form>
    </div>
  );
};
 
export default Deposit;