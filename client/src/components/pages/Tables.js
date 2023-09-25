import React, {   useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { requestGames } from "../../rtk/slices/allGamesSlice";


const Tables = () => {
  console.log("Tables component rendered")
  const dispatch = useDispatch();
  const games = useSelector((state) => state.allGames.data);
  console.log("Games in tables", games)

  useEffect(() => {
    dispatch(requestGames());
}, [dispatch]);



  return (
    <Container style={{ maxHeight: "80vh", overflowY: "scroll" }}>
      <h1>Available Tables</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Game</th>
            <th>Blinds</th>
            <th>Players</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game._id}>
              <td>{game.name}</td>
              <td>{game.gameType}</td>
              <td>${game.blinds}</td>
              <td>{game.seats.filter((seat) => seat.player !== null).length}  / {game.seats.length} </td>
              <td><Link to={`/room/${game._id}`}>View</Link></td>       
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Tables;