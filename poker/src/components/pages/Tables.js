import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, joinGame } from '../../rtk/slices/serverSlice';
import { useEffect } from 'react';

const Tables = () => {
  const dispatch = useDispatch();

  // This will select the 'games' state from your Redux store
  const { games, loading, error } = useSelector(state => state.server);

  // This will fetch the games when the component mounts
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  // This will be called when a player clicks on a "join" button
  const handleJoin = (id) => {
    dispatch(joinGame(id));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (  
    <div>
      <h1>Available Tables</h1>
      {games.map(game => (
        <div key={game._id}>
          <h2>{game.name}</h2>
          <p>Game: {game.game}</p>
          <p>Blinds: {game.blinds}</p>
          <p>Players: {game.players}</p>
          <button onClick={() => handleJoin(game._id)}>Join</button>
        </div>
      ))}
    </div>
  );
}
 
export default Tables;