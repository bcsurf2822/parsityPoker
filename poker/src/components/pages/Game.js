import React from "react";

class GamePage extends React.Component {
  handleJoinGame = (gameId) => {
    // Serialize the gameId or any other data you need
    const serializedData = `gameId=${gameId}`;

    // Open a new window with this data in the URL
    const gameWindow = window.open(`/game.html?${serializedData}`, '_blank');
    
    // Check if the new window was successfully opened
    if (gameWindow === null) {
      alert('Please disable your pop-up blocker and click the "Join Game" button again.');
    } else {
      gameWindow.focus();
    }
  };

  render() {
    return (
      <div>
        <button onClick={() => this.handleJoinGame('123')}>Join Game</button>
      </div>
    );
  }
}

export default GamePage