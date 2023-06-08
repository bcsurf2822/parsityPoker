import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startNewGame, drawCard, getDeck, dealCards } from "../../rtk/slices/gameSlice";

const Promotions = () => {
  const dispatch = useDispatch();
  const deckId = useSelector(state => state.deck.deckId);
  const deck = useSelector(state => state.deck.deck);
  const card = useSelector(state => state.deck.card);
  const players = useSelector(state => state.deck.players);
  const dealtCardsIndexes = useSelector(state => state.deck.dealtCardsIndexes);

  useEffect(() => {
    if (deckId) {
      dispatch(getDeck({ deckId }));
    }
  }, [dispatch, deckId]);

  const handleNewGame = () => {
    dispatch(startNewGame())
    .then(response => {
      if (!response.error) {
        dispatch(dealCards({ deckId: response.payload.deckId }));
      }
    });
  };

  const handleDrawCard = () => {
    if (deckId) {
      dispatch(drawCard({ deckId }));
    } else {
      console.log('Start a new game first.');
    }
  };

  return (
    <div>
      <button onClick={handleNewGame}>Start New Game</button>
      <button onClick={handleDrawCard}>Draw Card</button>
      <div>
        {players.map((player, index) => (
          <div key={index}>
            <h3>Player {player.id}</h3>
            <div>
              {player.cards.map((card, cardIndex) => (
                <p key={cardIndex}>
                  Card {cardIndex + 1}: {card.rank} of {card.suit}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        {card && (
          <p>
            Drawn Card: {card.rank} of {card.suit}
          </p>
        )}
      </div>
      <div>
        {deck && deck.map((card, index) => (
          <p key={index} style={{ color: dealtCardsIndexes.includes(index) ? 'red' : 'black' }}>
            Card {index + 1}: {card.rank} of {card.suit}
          </p>
        ))}
      </div>
    </div>
  );
};
 
export default Promotions;