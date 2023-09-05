
import { socket } from '../../socket';
import { useEffect, useState } from 'react';



function useSocketListeners() {
  const [gameState, setGameState] = useState(null);


  useEffect(() => {


    socket.on('playerJoin', (data) => {
      setGameState(prevState => ({ ...prevState, ...data }));
    });

    socket.on('playerLeft', (data) => {
      setGameState(prevState => ({ ...prevState, ...data }));
    });


    return () => socket.disconnect();
  }, []);

  const joinGame = (data) => {
    socket.emit('joinGame', data);
  };

  return { gameState, joinGame }; 
};

export default useSocketListeners;