import React from 'react';
import Login from './Login';
import Navbar from './Navbar';
import Options from './Options';
import Footer from './Footer';

const Background = () => (
  <div className="background"></div>
);

function TitleConatiner() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="p-3 border bg-light"><h1>Welcome To PKR Poker</h1>
          <p>A Cryptocurrency Poker Platform </p></div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="p-3 border bg-light"><Login /></div>
        </div>
      </div>
    </div>
  );
}

const Foreground = () => (
  <div className="foreground">
    <TitleConatiner />
  </div>
);


class Home extends React.Component {

  render() {
    return (
      <div className="App">
              <Options
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