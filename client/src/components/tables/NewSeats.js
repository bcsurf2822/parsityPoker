import { useDispatch, useSelector } from "react-redux";
import Slider from "react-input-slider";

import {
  startJoinGame,
  startLeaveGame,
} from "../../rtk/slices/currentGameSlice";

import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import HandCards from "./SeatDetails/HandCards";
import UserNameAndChips from "./SeatDetails/UserNameAndChips";
import CardBack from "./SeatDetails/CardBack";

const NewSeats = ({ seatIndex, card1, card2 }) => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const seat = useSelector(
    (state) => state.currentGame.currentGame.seats[seatIndex]
  );
  const currentGame = useSelector((state) => state.currentGame.currentGame);

  const dispatch = useDispatch();

  const tableId = currentGame._id;
  const maxBuyIn = currentGame.max;
  const minBuyIn = currentGame.min;
  const cards = seat.player ? seat.player.handCards : [];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSeatChoice(false);
  };

  const [sliderValue, setSliderValue] = useState(minBuyIn);
  const [seatChoice, setSeatChoice] = useState(false);

  const handleClick = () => {
    setSeatChoice(true);
  };

  const handleConfirm = (gameId, userId, seatId, buyIn) => {
    console.log(
      "Dispatching startJoinGame with params:",
      gameId,
      userId,
      seatId,
      buyIn
    );
    dispatch(startJoinGame({ userId, gameId, seatId, buyIn }));
  };

  const isDealer = currentGame.dealerPosition === seat.id - 1;
  const isCurrentPlayer = currentGame.currentPlayerTurn === seat.id - 1;

  const handleLeaveGame = (userId, gameId) => {
    console.log("Dispatching startLeaveGame with params:", userId, gameId);
    dispatch(startLeaveGame({ userId, gameId }));
  };

  return (
    <div className="player-square">
      {seat && (
        <>
          {seat.player ? (
            <div className="player-info">
              <div className="s-player-cards">
                <CardBack card1={card1} card2={card2} />
              </div>
              <hr />
              <div className="player-info">
                <UserNameAndChips
                  user={seat.player.username}
                  chipCount={seat.player.chips}
                  seatNumber={seat.id}
                  isDealer={isDealer}
                  isCurrentPlayer={isCurrentPlayer}
                />
              </div>
            </div>
          ) : (
            <>
              {seatChoice ? (
                <Modal show={open} onHide={handleClose}>
                  <Modal.Body>
                    <h6>Select Buy-In Amount</h6>
                    <p className="mt-2">
                      Do you wish to buy in with {sliderValue} chips and sit
                      here?
                    </p>
                    <Button
                      className="buyIn"
                      onClick={() => {
                        handleConfirm(tableId, user.id, seat._id, sliderValue);
                        handleClose();
                      }}
                    >
                      Buy In for ${sliderValue}
                    </Button>
                  </Modal.Body>
                </Modal>
              ) : (
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    handleClick();
                    handleOpen();
                  }}
                >
                  Sit here
                </Button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default NewSeats;
