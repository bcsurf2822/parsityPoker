import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startNewGame, drawCard, getDeck } from "../../rtk/slices/gameSlice";

const Promotions = () => {
  const dispatch = useDispatch();
  const deckId = useSelector(state => state.deck.deckId);
  const deck = useSelector(state => state.deck.deck);
  const card = useSelector(state => state.deck.card);

  useEffect(() => {
    if (deckId) {
      dispatch(getDeck({ deckId }));
    }
  }, [dispatch, deckId]);

  const handleNewGame = () => {
    dispatch(startNewGame());
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
        {card && (
          <p>
            Drawn Card: {card.rank} of {card.suit}
          </p>
        )}
      </div>
      <div>
        {deck && deck.map((card, index) => (
          <p key={index}>
            Card {index + 1}: {card.rank} of {card.suit}
          </p>
        ))}
      </div>
    </div>
  );
};
 
export default Promotions;