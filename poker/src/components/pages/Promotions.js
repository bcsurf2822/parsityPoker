import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  startNewGame,
  drawCard,
  getDeck,
  dealCards,
  dealToPlayers,
  revealFlop,
  revealTurn,
  revealRiver,
  getWinner,
} from "../../rtk/slices/gameSlice";
import cardToFilename from "../../actions/cardImages";

const Promotions = () => {
  const dispatch = useDispatch();
  const deckId = useSelector((state) => state.deck.deckId);
  const deck = useSelector((state) => state.deck.deck);
  const players = useSelector((state) => state.deck.players);
  const dealtCardsIndexes = useSelector(
    (state) => state.deck.dealtCardsIndexes
  );
  const communityCards = useSelector((state) => state.deck.communityCards);
  const skippedCards = useSelector((state) => state.deck.skippedCards);
  const winner = useSelector((state) => state.deck.winner);

  useEffect(() => {
    if (deckId) {
      dispatch(getDeck({ deckId }));
    }
  }, [dispatch, deckId]);

  const handleNewGame = () => {
    dispatch(startNewGame()).then((response) => {
      if (!response.error) {
        dispatch(dealCards({ deckId: response.payload.deckId }));
      }
    });
  };

  const handleRevealFlop = () => {
    dispatch(revealFlop());
  };

  const handleRevealTurn = () => {
    dispatch(revealTurn());
  };

  const handleRevealRiver = () => {
    dispatch(revealRiver())
    .then(() => {
      dispatch(getWinner({ communityCards: communityCards, playerCards: players }));
      console.log('Dispatching getWinner with', { communityCards, playerCards });
    });
  };

  return (
    <div>
      <div>
        {winner && (
          <div>
            <h2>Winner:</h2>
            <p>Player {winner.winner}</p>
            <p>Hand: {winner.hand}</p>
          </div>
        )}
        <h3>Community Cards:</h3>
        <div>
          {communityCards.map((card, cardIndex) => (
            <img
              key={cardIndex}
              src={`/deck/${cardToFilename(card.rank, card.suit)}`}
              alt={`${card.rank} of ${card.suit}`}
            />
          ))}
        </div>
      </div>

      <div>
        <h2>Skipped Cards</h2>
        {skippedCards.map((card, index) => (
          <p key={index} style={{ color: "red" }}>
            Card {index + 1}: {card.rank} of {card.suit}
          </p>
        ))}
      </div>
      <button onClick={handleNewGame}>Start New Game</button>
      <button onClick={handleRevealFlop}>Reveal Flop</button>
      <button onClick={handleRevealTurn}>Reveal Turn</button>
      <button onClick={handleRevealRiver}>Reveal River</button>
      <button onClick={handleNewGame}>Start New Game</button>
      <div>
        {players.map((player, index) => (
          <div key={index}>
            <h3>Player {player.id}</h3>
            <div>
              {player.cards.map((card, cardIndex) => (
                <img
                  src={`/deck/${cardToFilename(card.rank, card.suit)}`}
                  alt={`${card.rank} of ${card.suit}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        {deck &&
          deck.map((card, index) => (
            <p
              key={index}
              style={{
                color: dealtCardsIndexes.includes(index) ? "red" : "black",
              }}
            >
              Card {index + 1}: {card.rank} of {card.suit}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Promotions;
