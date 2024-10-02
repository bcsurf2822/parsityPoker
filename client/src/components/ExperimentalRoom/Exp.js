import React from "react";
import "./Exp.css";
import { Button } from "react-bootstrap";
import { getCardColor } from "../../actions/getCardColor";
import BetBox from "../tables/BetBox";

export default function ExperimentalRoom() {
  return (
    <div className="container">
      <div className="top-row">
        <Button id="sit-btn">Sit Here</Button>
        <Button id="sit-btn">Sit Here</Button>
      </div>
      <div className="mid-row">
        <Button id="sit-btn">Sit Here</Button>
        <div className="table">

            {Array.from({ length: 5 }).map((_, index) => (
              <div className="blue-card" key={index}>
                <img
                  src={getCardColor()}
                  alt={`Card ${index + 1}`}
                  className="card-image"
                />
              </div>
            ))}
    
        </div>
        <Button id="sit-btn">Sit Here</Button>
      </div>
      <div className="bot-row">
        <div className="bot-btns">
            <Button id="sit-btn">Sit Here</Button>
        <Button id="sit-btn">Sit Here</Button>
        </div>
      

        {/* <div className="bet-box">
            <Button />
      </div> */}
      </div>
    </div>
  );
}
