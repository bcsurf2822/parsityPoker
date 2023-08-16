import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchGames,
  leaveGame,
  playerLeft,
  dealCards,
  cardsDealt, 

  dealFlop,
  flopDealt,
  dealTurn,
  turnDealt,
  dealRiver,
  riverDealt,
  endGame,
  gameEnded,
  getWinner,
  winnerReceived
} from "../../rtk/slices/serverSlice";

import Chatbox from "./Chatbox";
import { socket } from "../../socket";
import { fetchNewDeck } from "../../rtk/slices/deckOfCardsSlice";
import Seat from "./Seats";

const Room = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const games = useSelector((state) => state.server.games);
  const currentGame = games.find((game) => game._id === id);
  console.log("Current Game:", currentGame);
  // console.log("CURRENT WINNER DATA----", currentGame.winnerData.winners[0].cards)



  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  useEffect(() => {
    socket.on("playerLeft", (updatedGame) => {
      dispatch(playerLeft(updatedGame));
    });

    return () => {
      socket.off("playerLeft");
    };
  }, [dispatch]);

  useEffect(() => {
    socket.on('cards_dealt', (updatedGame) => {
      dispatch(cardsDealt(updatedGame));
    });
  
    return () => {
      socket.off('cards_dealt');
    };
  }, [dispatch]);
  
  useEffect(() => {
    socket.on('cards_dealt', (updatedGame) => {
      dispatch(cardsDealt(updatedGame));
    });
  
    return () => {
      socket.off('cards_dealt');
    };
  }, [dispatch]);

  
  useEffect(() => {
    socket.on('flop', (updatedGame) => {
      dispatch(flopDealt(updatedGame));
    });
  
    return () => {
      socket.off('flop');
    };
  }, [dispatch]);

  
  useEffect(() => {
    socket.on('turn', (updatedGame) => {
      dispatch(turnDealt(updatedGame));
    });
  
    return () => {
      socket.off('turn');
    };
  }, [dispatch]);

  useEffect(() => {
    socket.on('river', (updatedGame) => {
      dispatch(riverDealt(updatedGame));
    });
  
    return () => {
      socket.off('river');
    };
  }, [dispatch]);

  useEffect(() => {
    socket.on('winner', (updatedGame) => {
      dispatch(winnerReceived(updatedGame));
    });
  
    return () => {
      socket.off('winner');
    };
  }, [dispatch]);

  useEffect(() => {
    socket.on('game_ended', (updatedGame) => {
      dispatch(gameEnded(updatedGame));
    });
  
    return () => {
      socket.off('game_ended');
    };
  }, [dispatch]);


  const seatArray = currentGame ? currentGame.seats : [];
  const occupiedSeats = currentGame
    ? currentGame.seats.filter((seat) => seat.player !== null).length
    : 0;

  console.log(`Number of occupied seats: ${occupiedSeats}`); 

  useEffect(() => {
    if (currentGame && currentGame.currentDeck.length === 0 && occupiedSeats > 1) {
      dispatch(fetchNewDeck(currentGame._id))
        .then(() => {
          socket.emit('new_deck', currentGame._id);
          dispatch(fetchGames());
        })
        .catch(error => {
          console.error("Failed to fetch new deck:", error);
        });
    }
  }, [dispatch, currentGame, occupiedSeats]);

  const leaveTable = () => {
    if (!user) {
      console.log("User is undefined");
      return;
    }

    dispatch(leaveGame({ gameId: id, userId: user.id }))
      .then(() => {
        const updatedGame = games.find((game) => game._id === id);
        if (!updatedGame) {
          navigate("/Tables");
        }
      })
      .catch((error) => console.log("Error leaving the game:", error));
  };

  const closeTable = () => {
    navigate("/Tables");
  };

  const handleEndGame = () => {
    dispatch(endGame(id))
  };

  const handleDealCards = () => {
    dispatch(dealCards(id));
  };

  const handleDealFlop = () => {
    dispatch(dealFlop(id));
  };

  const handleDealTurn = () => {
    dispatch(dealTurn(id));
  };

  const handleDealRiver = () => {
    dispatch(dealRiver(id));
  };

  const handleGetWinner = () => {
    dispatch(getWinner(id));
  };

  if (!currentGame) {
    return null;
  }

  return (
    <Container fluid className="h-100 bg">
      <Row className="mt-2">
        <Col className="d-flex justify-content-center">
          <Button variant="warning" onClick={leaveTable}>
            Leave Table
          </Button>
        </Col>
      </Row>
      <Row className="mt-2">
      <Row className="mt-2">
  <Col className="d-flex justify-content-center">
    <Button variant="success" onClick={handleDealCards}> 
      Deal Cards
    </Button>
    <Button variant="primary" onClick={handleDealFlop}>
      Deal Flop
    </Button>
    <Button variant="primary" onClick={handleDealTurn}>
      Deal Turn
    </Button>
    <Button variant="primary" onClick={handleDealRiver}>
      Deal River
    </Button>
    <Button variant="danger" onClick={handleEndGame}> 
      EndGame
    </Button>
    <Button variant="success" onClick={handleGetWinner}>
      Winner?
    </Button>
  </Col>
</Row>
</Row>
      <Row className="h-50">
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[0]} currentGame={currentGame} />
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[1]} currentGame={currentGame} />
        </Col>
        <Col></Col>
      </Row>
      <Row className="h-50">
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[2]} currentGame={currentGame} />
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center flex-column align-items-center">
    <div className="table">{currentGame.name}</div>
    {currentGame.communityCards && currentGame.communityCards.length > 0 && (
        <div className="community-cards">
            {currentGame.communityCards.map((card, index) => (
                <span key={index} className="card">{card}</span>
            ))}
        </div>
    )}
</Col>

        <Col>
        </Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[3]} currentGame={currentGame} />
        </Col>
      </Row>
      <Row className="h-50">
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[4]} currentGame={currentGame} />
        </Col>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <Seat seat={seatArray[5]} currentGame={currentGame} />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Chatbox gameId={id} currentGame={currentGame} />
        </Col>
      </Row>

    </Container>
  );
};

export default Room;