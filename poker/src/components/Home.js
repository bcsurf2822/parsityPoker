import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import Footer from "./Footer";

const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const userState = useSelector(state => state.auth.username);

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
              {!isAuthenticated && <Login /> }
              {isAuthenticated && <h2>Welcome Back {userState}!</h2>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default Home;
