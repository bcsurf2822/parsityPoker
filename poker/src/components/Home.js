import React from "react";
import Login from "./Login";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="App">
      <div className="foground container">
        <div className="row">
          <div className="col">
            <div className="p-3 border bg-light">
              <h1>Welcome To PKR Poker</h1>
              <p>A Cryptocurrency Poker Platform </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="p-3 border bg-light">
              <Login />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default Home;
