import React from 'react';
import Navbar from './Navbar';
import Options from './Options';
import Footer from './Footer';

class Home extends React.Component {
  state = {
    score: 0,
    // add other state properties as needed
  };

  handleLogout = () => {
    // handle logout
  };

  handleJoinGame = () => {
    // handle join game
  };

  handleHostGame = () => {
    // handle host game
  };

  handleTutorial = () => {
    // handle tutorial
  };

  handleSettings = () => {
    // handle settings
  };

  render() {
    return (
      <div className="App">
        <Navbar score={this.state.score} logout={this.handleLogout} />
        <Options
          joinGame={this.handleJoinGame}
          hostGame={this.handleHostGame}
          tutorial={this.handleTutorial}
          settings={this.handleSettings}
        />
        <Footer />
      </div>
    );
  }
}

export default Home;