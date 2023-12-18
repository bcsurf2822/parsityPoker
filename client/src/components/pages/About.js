

const About = () => {
  return (
    <div
      className="room-new container text-center d-flex flex-column justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="seat-row row">
        <div className="empty-l-top col bordered-col">Empy Left Top</div>
        <div className="seat-top col-2 bordered-col">Seat 1</div>
        <div className="seat-top col-2 bordered-col">Seat 2</div>
        <div className="empty-r-top col bordered-col">Empty R Top</div>
      </div>
      <div className="table-row row ml-3">
        <div className="seat-mid-l col-2 bordered-col seat-height">Seat 6</div>
        <div className="table-mid col-6 bordered-col table-css" >Table</div>
        <div className="seat-mid-r col-2 bordered-col seat-height">Seat 3</div>
      </div>
      <div className="seat-row row">
        <div className="empty-l-bot col bordered-col">Empty L Bottom</div>
        <div className="seat-bot col-2 bordered-col">Seat 4</div>
        <div className="seat-bot col-2 bordered-col">Seat 5</div>
        <div className="empty-r-bot col bordered-col">Empty R Bottom</div>
      </div>
    </div>
  );
};

export default About;
