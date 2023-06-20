import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, joinGame } from '../../rtk/slices/serverSlice';
import { useEffect, useState } from 'react';
import { Table, Button, Container, Form } from 'react-bootstrap';

const Tables = () => {
  const dispatch = useDispatch();
  const [gameType, setGameType] = useState('all');  // <--- New state for game type
  
  // This will select the 'games' state from your Redux store
  const { games, loading, error } = useSelector(state => state.server);

  // This will fetch the games when the component mounts
  useEffect(() => {
    dispatch(fetchGames())
      .then((action) => {
        if (fetchGames.fulfilled.match(action)) {
          console.log('Fetched games:', action.payload);
        } else {
          console.log('Failed to fetch games:', action.error.message);
        }
      });
  }, [dispatch]);

  // This will be called when a player clicks on a "join" button
  const handleJoin = (id) => {
    dispatch(joinGame(id));
  }

  const handleGameTypeChange = (event) => {
    setGameType(event.target.value);  // Update the game type state when the select value changes
  }

  const filteredGames = games.filter(game => {
    return gameType === 'all' || game.game === gameType;  // Only include games that match the selected type
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
      <h1>Available Tables</h1>
      <Form.Control as="select" value={gameType} onChange={handleGameTypeChange}>
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
          {filteredGames.map(game => (
            <tr key={game._id}>
              <td>{game.name}</td>
              <td>{game.game}</td>
              <td>{game.blinds}</td>
              <td>{game.players}</td>
              <td><Button onClick={() => handleJoin(game._id)}>Join</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
 
export default Tables;
