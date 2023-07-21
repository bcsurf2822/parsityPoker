import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Button, Container, Form } from "react-bootstrap";

import { fetchGames, viewTable } from "../../rtk/slices/serverSlice";

const Tables = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gameType, setGameType] = useState("all");

  const { games } = useSelector((state) => state.server);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const handleView = (id) => {
    console.log(`Viewing game with ID: ${id}`);
    dispatch(viewTable(id));
    navigate(`/Room/${id}`);
  };

  const handleGameTypeChange = (event) => {
    setGameType(event.target.value);
  };

  const filteredGames = games.filter((game) => {
    return gameType === "all" || game.game === gameType;
  });

  return (
    <Container style={{ maxHeight: "80vh", overflowY: "scroll" }}>
      <h1>Available Tables</h1>
      <Form.Control
        as="select"
        value={gameType}
        onChange={handleGameTypeChange}
      >
        <option value="all">All</option>
        <option value="Hold Em">Hold Em</option>
        <option value="Omaha Hi">Omaha Hi</option>
        <option value="Omaha Hi Lo">Omaha Hi Lo</option>
      </Form.Control>
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
          {filteredGames.map((game) => (
            <tr key={game._id}>
              <td>{game.name}</td>
              <td>{game.gameType}</td>
              <td>{game.blinds}</td>
              <td>{game.playersInGame.length}</td>
              <td>
                <Button onClick={() => handleView(game._id)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Tables;
