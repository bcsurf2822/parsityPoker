const About = () => {
  return (
    <div
      className="roomNew container text-center d-flex flex-column justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="row">
        <div className="emptyLTop col bordered-col">Empy Left Top</div>
        <div className="seatTop col bordered-col">Seat 1</div>
        <div className="seatTop col bordered-col">Seat 2</div>
        <div className="emptyRTop col bordered-col">Empty R Top</div>
      </div>
      <div className="table-row row ml-3">
        <div className="seatMidL col-2 bordered-col">Seat 6</div>
        <div className="tableMid col-6 bordered-col">Table</div>
        <div className="seatMidR col-2 bordered-col">Seat 3</div>
      </div>
      <div className="row">
        <div className="emptyLBot col bordered-col">Empty L Bottom</div>
        <div className="seatBot col bordered-col">Seat 4</div>
        <div className="seatBot col bordered-col">Seat 5</div>
        <div className="emptyRBot col bordered-col">Empty R Bottom</div>
      </div>
    </div>
  );
};

export default About;
