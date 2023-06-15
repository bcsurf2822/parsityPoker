import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const { accountBalance, bankBalance } = useSelector((state) => state.banking);

  return (
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={user.avatar} />
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Text>
          Email: {user.email}
        </Card.Text>
        <Card.Text>
          Account Balance: ${accountBalance}
        </Card.Text>
        <Card.Text>
          Bank Balance: ${bankBalance}
        </Card.Text>
        <Card.Text>
          Last Login: {user.lastLogin}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Profile;