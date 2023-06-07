const SeatsGrid = ({ playerHands }) => {
  return (
    <div className="seats-grid">
      {playerHands.map((hand, index) => (
        <div className="seat" key={index}>
          <h3>Player {index + 1}</h3>
          <div className="hand">
            {hand.map((card, cardIndex) => (
              <div key={cardIndex} className="card">
                {card.value} of {card.suit}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeatsGrid;