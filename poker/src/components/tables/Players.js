import { Card, Dropdown, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Player = ({ name, avatar, chips, bet, isDealer }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>{name} {isDealer ? "(Dealer)" : ""}</Card.Title>
        <Card.Text>
          Chips: {chips}
        </Card.Text>
        <Card.Text>
          Current Bet: {bet}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Player