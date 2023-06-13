import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withdraw } from '../../rtk/slices/bankingSlice';
import { Form, Button } from 'react-bootstrap';


const Withdrawl = () => {
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if(amount !== '') {
      dispatch(withdraw({ userId: user.id, amount: Number(amount) }));
    }
    setAmount('');
  };

  return (
    <div className="withdraw-page">
      <h2>Withdraw Funds</h2>
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
    </div>
  );
};
 
export default Withdrawl;