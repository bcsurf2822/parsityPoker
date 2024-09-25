const About = () => {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 text-center solid-brdr">
      <div className="row justify-content-around align-items-start">
        <div className="col-auto tb-seats side-seats">Seat1</div> {/* Left seat */}
        <div className="col-auto tb-seats side-seats">Seat2</div> {/* Right seat */}
      </div>
      <div className="row justify-content-around align-items-center mid-row">
        <div className="col-auto tb-seats side-seats">Seat6</div> {/* Left seat */}
        <div className="col-auto bs-table">
          <div className="card-row">
            <div className="card-space"></div>
            <div className="card-space"></div>
            <div className="card-space"></div>
            <div className="card-space"></div>
            <div className="card-space"></div>
          </div>
          <div className="pot-amount">$0.00</div>
        </div>
        <div className="col-auto tb-seats side-seats">Seat3</div> {/* Right seat */}
      </div>
      <div className="row justify-content-around align-items-start">
        <div className="col-auto tb-seats side-seats">Seat5</div> {/* Left seat */}
        <div className="col-auto tb-seats side-seats">Seat4</div> {/* Right seat */}
      </div>
    </div>
  );
};

export default About;

