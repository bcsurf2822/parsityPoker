import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Container } from "react-bootstrap";

import { socket } from "../../socket";

const Tables = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    socket.emit("getGames");

    socket.on("gamesData", (data) => {
      setGames(data);
      setIsLoading(false);
    });

    socket.on("gamesError", (errorMsg) => {
      setError(errorMsg);
      setIsLoading(false);
    });

    return () => {
      socket.off("gamesData");
      socket.off("gamesError");
    };
  }, []);

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
              <td>
                <Button onClick={() => navigate(`/Room/${game._id}`)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Tables;