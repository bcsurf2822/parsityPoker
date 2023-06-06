import React from 'react';
import Navbar from './Navbar';
import Options from './Options';
import Footer from './Footer';

const Background = () => (
  <div className="background"></div>
);

const Foreground = () => (
  <div className="foreground">
    <h1>Welcome to PKR Poker</h1>
  </div>
);

class Home extends React.Component {

  render() {
    return (
      <div className="App">
              <Options
          joinGame={this.handleJoinGame}
          hostGame={this.handleHostGame}
          tutorial={this.handleTutorial}
          settings={this.handleSettings}
        />
          <div className="app">
    <Background />
    <Foreground />
  </div>
        <Navbar logout={this.handleLogout} />
        <Footer />
      </div>
    );
  }
}

export default Home;