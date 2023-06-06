import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Home />
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
