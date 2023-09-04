import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Button, Container } from "react-bootstrap";
import { useGetGamesQuery } from "../../rtk/slices/apiSlice";

// import { fetchGames} from "../../rtk/slices/serverSlice";

const Tables = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetGamesQuery();
  const games = data?.games || [];
  console.log("QUERY GAMES",games);

  // const { games } = useSelector((state) => state.server);

  // useEffect(() => {
  //   dispatch(fetchGames());
  // }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading games.</div>;
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