import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";

import Home from "./components/Home";
import About from "./components/pages/About";
import RegistrationPage from "./components/pages/Registration";
import Promotions from "./components/pages/Promotions";
import MyNav from "./components/Navbar";
import Tables from "./components/pages/Tables";
import Profile from "./components/settings/Profile";
import Hands from "./components/settings/Hands";
import Advanced from "./components/settings/Advanced";
import History from "./components/settings/History";
import Cards from "./components/tables/Cards";
import Room from "./components/tables/Room";
import Withdrawl from "./components/settings/Withdrawl";
import Deposit from "./components/settings/Deposit";

import ProtectedRoute from "./components/Protected";

import { initializeAuth } from "./rtk/slices/authenticationSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  
  return (
    <div className="App">
      <Router>
        <MyNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/tables" element={<Tables />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />{" "}
          <Route
            path="/handhistory"
            element={<ProtectedRoute element={<Hands />} />}
          />
          <Route
            path="/accounthistory"
            element={<ProtectedRoute element={<History />} />}
          />
          <Route
            path="/advancedsettings"
            element={<ProtectedRoute element={<Advanced />} />}
          />
          <Route
            path="/deposit"
            element={<ProtectedRoute element={<Deposit />} />}
          />
          <Route
            path="/withdrawl"
            element={<ProtectedRoute element={<Withdrawl />} />}
          />
          <Route path="/cards" element={Cards} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
