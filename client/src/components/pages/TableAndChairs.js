import React from 'react';
import RectangleContent from './RectangleContent';
import SquareContent from './SquareContent';

const TableAndChairs = () => {
  return (
    <div className="layout">
      <div className="square-row top">
        <div className="responsive-square">
        <button type="button" class="btn btn-outline-secondary">Sit Here 1</button>
        </div>
        <div className="responsive-square">        <button type="button" class="btn btn-outline-secondary">Sit Here 2</button></div>
      </div>
      <div className="rectangle-row">
        <div className="responsive-square">        <button type="button" class="btn btn-outline-secondary">Sit Here 6</button></div> 
        <div className="responsive-rectangle">
          <RectangleContent /> 
        </div>        <div className="responsive-square">        <button type="button" class="btn btn-outline-secondary">Sit Here 3</button></div> 
      </div>
      <div className="square-row bottom">
        <div className="responsive-square">        <button type="button" class="btn btn-outline-secondary">Sit Here 5</button></div>
        <div className="responsive-square">        <button type="button" class="btn btn-outline-secondary">Sit Here 6</button></div>
      </div>
    </div>
  );
};

export default TableAndChairs;
