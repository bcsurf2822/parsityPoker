import React from "react";
import "./Exp.css";
import { Button } from "react-bootstrap";

export default function ExperimentalRoom() {
  return (
    <div className="container">
      <div className="top-row">
        <Button id="sit-btn">Sit Here</Button>
        <Button  id="sit-btn">Sit Here</Button>
      </div>
      <div className="mid-row">
      <Button  id="sit-btn">Sit Here</Button>
      <div className="table">
        <p>$</p>
      </div>
        <Button  id="sit-btn">Sit Here</Button>
      </div>
      <div className="bot-row">
        <Button  id="sit-btn">Sit Here</Button>
        <Button  id="sit-btn">Sit Here</Button>
      </div>
    </div>
  );
}
