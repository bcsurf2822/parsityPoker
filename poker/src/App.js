import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import About from "./components/pages/About";
import RegistrationPage from "./components/pages/Registration";
import Promotions from "./components/pages/Promotions";
import MyNav from "./components/Navbar";
import Tables from "./components/pages/Tables";

const Background = () => (
  <div className="background"></div>
);


function App() {
  return (
    <div className="App">
      <Background />
      <Router>
      <MyNav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/registration" element={<RegistrationPage/>}/>
          <Route path="/promotions" element={<Promotions/>}/>
          <Route path="/tables" element={<Tables/>}/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;

//Set Up withBrowser Router
// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           {/* <Route path="/login" element={<Login />} /> */}
//         </Routes>
//       </Router>
//     </div>
//   );
// }
