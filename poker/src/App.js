import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import About from "./components/pages/About";
import Register from "./components/pages/Registration";
import Promotions from "./components/pages/Promotions";
import Navbar from "./components/Navbar";

const Background = () => (
  <div className="background"></div>
);


function App() {
  return (
    <div className="App">
      <Background />
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/promotions" element={<Promotions/>}/>

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
