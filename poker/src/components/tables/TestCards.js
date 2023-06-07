const Card = ({ card }) => {
  return (
    <div className="card">
      <div className={`card-value card-${card.suit}`}>{card.value} of {card.suit}</div>
    </div>
  );
};

export default Card;