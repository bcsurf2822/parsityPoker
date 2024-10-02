import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from "./components/Home";
import About from "./components/pages/About";
import Promotions from "./components/pages/Promotions";
import NavbarWrapper from "./components/NavBarWrapper";
import Tables from "./components/pages/Tables";
import Profile from "./components/settings/Profile";
import Withdrawl from "./components/settings/Withdrawl";
import Deposit from "./components/settings/Deposit";
// import Room from "./components/tables/Room";
import NewRoom from "./components/tables/NewRoom";
import ExperimentalRoom from "./components/ExperimentalRoom/Exp";

import ProtectedRoute from "./components/Protected";

import { initializeAuth } from "./rtk/actions/auth";
import HomePage from "./components/Home/HomePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <div className="app">
      <Router>

          <NavbarWrapper />
    

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/tables" element={<Tables />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />{" "}
          <Route
            path="/deposit"
            element={<ProtectedRoute element={<Deposit />} />}
          />
          <Route
            path="/withdrawl"
            element={<ProtectedRoute element={<Withdrawl />} />}
          />
          {/* <Route path="/room/:id" element={<Room />} /> */}
          <Route path="/poker/:id" element={<NewRoom />} />
          <Route path="/exp/:id" element={<ExperimentalRoom />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
