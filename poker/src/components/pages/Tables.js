import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, joinGame } from '../../rtk/slices/serverSlice';
import { useEffect } from 'react';
import { Table, Button, Container, Form } from 'react-bootstrap';

const Tables = () => {
  const dispatch = useDispatch();
  const [gameType, setGameType] = useState('all');
  
  const { games, loading, error, currentGame } = useSelector(state => state.server);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const handleJoin = async (id) => {
    await dispatch(joinGame(id));
  }

  const handleGameTypeChange = (event) => {
    setGameType(event.target.value);
  }

  const filteredGames = games.filter(game => {
    return gameType === 'all' || game.game === gameType;
  });

  useEffect(() => {
    if (currentGame) {
      window.open(`/game/${currentGame._id}`, '_blank');
    }
  }, [currentGame]);

  if (loading) return <div>Loading...</div>;


  if (error) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  }

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
