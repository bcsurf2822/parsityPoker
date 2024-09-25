import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestGames } from "../../rtk/slices/allGamesSlice";
import OpenRoomButton from "./OpenRoomButton";
import "bootstrap/dist/css/bootstrap.min.css";

const Tables = () => {
  console.log("Tables component rendered");
  const dispatch = useDispatch();
  const games = useSelector((state) => state.allGames.data);
  console.log("Games in tables", games);

  useEffect(() => {
    dispatch(requestGames());
  }, [dispatch]);

  return (
    <div style={{ maxHeight: "80vh", overflowY: "scroll" }}>
      <h1>Available Tables</h1>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>
              <strong>Name</strong>
            </th>
            <th>
              <strong>Game</strong>
            </th>
            <th>
              <strong>Blinds</strong>
            </th>
            <th>
              <strong>Players</strong>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game._id}>
              <td>{game.name}</td>
              <td>{game.gameType}</td>
              <td>${game.blinds}</td>
              <td>
                {game.seats.filter((seat) => seat.player !== null).length} /{" "}
                {game.seats.length}
              </td>
              <td>
                <OpenRoomButton gameId={game._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
