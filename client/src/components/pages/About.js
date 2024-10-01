const About = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 text-center solid-brdr">
      <div className="row justify-content-space-between align-items-start">
        <div className="col-auto tb-seats side-seats">Seat1</div> 
        <div className="col-auto tb-seats side-seats">Seat2</div> 
      </div>
      <div className="row justify-content-around align-items-center mid-row">
        <div className="col-auto tb-seats side-seats">Seat6</div>
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
        <div className="col-auto tb-seats side-seats">Seat3</div> 
      </div>
      <div className="row justify-content-around align-items-start">
        <div className="col-auto tb-seats side-seats">Seat5</div> 
        <div className="col-auto tb-seats side-seats">Seat4</div> 
      </div>
    </div>
  );
};

export default About;

