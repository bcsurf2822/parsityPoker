import React from 'react';

const ChildComponent = () => {
  return (
    <div className="layout">
      <div className="square-row top">
        <div className="responsive-square">Square 1</div>
        <div className="responsive-square">Square 2</div>
      </div>
      <div className="rectangle-row"> {/* Container for the middle row */}
        <div className="responsive-square">Square 5</div> {/* Square to the left */}
        <div className="responsive-rectangle">Rectangle</div>
        <div className="responsive-square">Square 6</div> {/* Square to the right */}
      </div>
      <div className="square-row bottom">
        <div className="responsive-square">Square 3</div>
        <div className="responsive-square">Square 4</div>
      </div>
    </div>
  );
};

export default ChildComponent;
