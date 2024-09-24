const About = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 text-center solid-brdr">
      <div className="row align-items-start tb-seats ">
        <div className="col mx-5  tb-seats">One of three columns</div>
        <div className="col mx-5  tb-seats">One of three columns</div>
      </div>
      <div className="row align-items-center mid-row">
        <div className="col mx-5">One of three columns</div>
        <div className="col bs-table">One of three columns</div>
        <div className="col mx-5">One of three columns</div>
      </div>
      <div className="row align-items-star">
        <div className="col mx-5 tb-seats">One of three columns</div>
        <div className="col mx-5 tb-seats">One of three columns</div>
      </div>
    </div>
  );
};

export default About;
