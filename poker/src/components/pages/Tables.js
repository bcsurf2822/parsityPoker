import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GamePage from "./Game";

const Tables = () => {

  const navigate = useNavigate();

  const toGame = function() {
    navigate("/")
  }
  return (  
    <div>This Is the tables page
      <GamePage />
    </div>
  );
}
 
export default Tables;