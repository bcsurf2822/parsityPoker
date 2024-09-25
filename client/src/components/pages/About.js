const About = () => {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 text-center solid-brdr">
      <div className="row justify-content-around align-items-start">
        <div className="col-auto tb-seats">Seat</div>
        <div className="col-auto tb-seats">Seat</div>
      </div>
      <div className="row justify-content-around align-items-center mid-row">
        <div className="col-auto tb-seats">Seat</div>
        <div className="col-auto bs-table">
          <div className="row card-row">
            <div className="col-auto card-space"></div>
            <div className="col-auto card-space"></div>
            <div className="col-auto card-space"></div>
            <div className="col-auto card-space"></div>
            <div className="col-auto card-space"></div>
          </div>
          <div className="row align-items-center justify-content-center pot-amount">$0.00</div>
        </div>
        <div className="col-auto tb-seats">Seat</div>
      </div>
      <div className="row justify-content-around align-items-start">
        <div className="col-auto tb-seats">Seat</div>
        <div className="col-auto tb-seats">Seat</div>
      </div>
    </div>
  );
};

export default About;
