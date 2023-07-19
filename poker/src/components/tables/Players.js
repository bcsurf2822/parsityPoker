import { Button, Card} from "react-bootstrap";
import { useSelector } from "react-redux";
import cardToFilename from "../../actions/cardImages"; // Import this function

const Player = ({ id, name, avatar, chips, bet, isDealer }) => {
  const players = useSelector((state) => state.deck.players);
  const player = players.find((p) => p.id === id); // Find the player based on the id

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>{name} {isDealer ? "(Dealer)" : ""}</Card.Title>
        <div>
          <Button variant="success">Sit Here</Button>
        </div>
        <Card.Text>
          Chips: {chips}
        </Card.Text>
        <Card.Text>
          Current Bet: {bet}
        </Card.Text>
        {player && player.cards.map((card, cardIndex) => (
          <img
            key={cardIndex}
            src={`/deck/${cardToFilename(card.rank, card.suit)}`}
            alt={`${card.rank} of ${card.suit}`}
          />
        ))}
      </Card.Body>
    </Card>
  );
};

export default Player
