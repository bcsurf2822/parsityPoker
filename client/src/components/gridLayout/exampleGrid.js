import React from "react";
import GridLayout from "react-grid-layout";

class MyFirstGrid extends React.Component {
  render() {
    const layout = [
      { i: "a", x: 2, y: 2, w: 6, h: 7, static: true },
      { i: "b", x: 4, y: 9, w: 2, h: 2, static: true },
      { i: "c", x: 0, y: 6, w: 2, h: 2, static: true },
      { i: "d", x: 0, y: 3, w: 2, h: 2, static: true },
      { i: "e", x: 4, y: 0, w: 2, h: 2, static: true },
      { i: "f", x: 8, y: 3, w: 2, h: 2, static: true },
      { i: "g", x: 8, y: 6, w: 2, h: 2, static: true },
    ];

    const itemStyle = {
      border: '1px solid #333' 
    };
    return (
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="a" style={itemStyle}>Table</div>
        <div key="b" style={itemStyle}>Seat 1</div>
        <div key="c" style={itemStyle}>Seat 2</div>
        <div key="d" style={itemStyle}>Seat 3</div>
        <div key="e" style={itemStyle}>Seat 4</div>
        <div key="f" style={itemStyle}>Seat 5</div>
        <div key="g" style={itemStyle}>Seat 6</div>
      </GridLayout>
    );
  }
}

export default MyFirstGrid;

//grid data from example on sandbox
// Displayed as [x, y, w, h]:
// 0: [2, 2, 6, 7]
// 1: [4, 9, 2, 2]
// 2: [0, 6, 2, 2]
// 3: [0, 3, 2, 2]
// 4: [4, 0, 2, 2]
// 5: [8, 3, 2, 2]
// 6: [8, 6, 2, 2]
