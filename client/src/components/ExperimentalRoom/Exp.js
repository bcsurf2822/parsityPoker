import React from "react";
import "./Exp.css";
import { Button } from "react-bootstrap";


export default function ExperimentalRoom() {
  return (
    <div className="container">
      <div className="top-row">
        <Button id="sit-btn">Sit Here</Button>
        <Button id="sit-btn">Sit Here</Button>
      </div>
      <div className="mid-row">
        <Button id="sit-btn">Sit Her</Button>
        <div className="table">
          <div className="cards">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="blue-card" key={index}>
                <div className="card-image"></div>
              </div>
            ))}
          </div>

          <p className="pot">Pot: $100.00</p>
        </div>
        <Button id="sit-btn">Sit Here</Button>
      </div>


        <div className="bot-btns">
          <Button id="sit-btn">Sit Here</Button>
          <Button id="sit-btn">Sit Here</Button>


          {/* <Button variant="secondary" id="bet-btn">Bet $</Button>
          <Button  variant="secondary" id="bet-btn">Call $</Button>
          <Button  variant="secondary" id="bet-btn">Check</Button>
          <Button  variant="secondary" id="bet-btn">Fold</Button> */}

      </div>
    </div>
  );
}
