import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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



function App() {
  return (
    <div className="App">
      <Router>
      <MyNav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/registration" element={<RegistrationPage/>}/>
          <Route path="/promotions" element={<Promotions/>}/>
          <Route path="/tables" element={<Tables/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/handhistory" element={<Hands/>}/>
          <Route path="/accounthistory" element={<History/>}/>
          <Route path="/advancedsettings" element={<Advanced/>}/>
          <Route path="/cards" element={Cards} />
          <Route path="/room" element={Room} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;

