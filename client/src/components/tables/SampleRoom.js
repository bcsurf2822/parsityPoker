import React from "react";

export default function SampleRoom() {
  return (
    <div className="sample-room container">
            <div className="row">
        <div className="col-12 square">DisplayWinner</div>

      </div>
      <div className="row">
        <div className="col-3 square">B</div>
        <div className="col-3 square">1</div>
        <div className="col-3 square">2</div>
        <div className="col-3 square">B</div>
      </div>
      <div className="row align-items-center">
        <div className="col-3 square">6</div>
        <div className="col-6 rectangle">Table</div>
        <div className="col-3 square">3</div>
      </div>
      <div className="row">
        <div className="col-3 square">B</div>

        <div className="col-3 square">5</div>
        <div className="col-3 square">4</div>
        <div className="col-3 square">B</div>
      </div>
      <div className="row">
        <div className="col-12 square">BetBox</div>

      </div>
    </div>
  );
}
