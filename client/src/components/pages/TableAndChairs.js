import React from 'react';
import RectangleContent from './RectangleContent';
import SquareContent from './SquareContent';

const TableAndChairs = () => {
  return (
    <div className="layout">
      <div className="square-row top">
        <div className="responsive-square">
        <button type="button" class="btn btn-outline-secondary">Secondary</button>
        </div>
        <div className="responsive-square">Square 2</div>
      </div>
      <div className="rectangle-row">
        <div className="responsive-square">Square 5</div> 
        <div className="responsive-rectangle">
          <RectangleContent /> 
        </div>        <div className="responsive-square">Square 6</div> 
      </div>
      <div className="square-row bottom">
        <div className="responsive-square">Square 3</div>
        <div className="responsive-square">Square 4</div>
      </div>
    </div>
  );
};

export default TableAndChairs;
