const About = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 text-center solid-brdr">
      <div className="row align-items-start tb-seats solid-brdr">
        <div className="col">One of three columns</div>
        <div className="col">One of three columns</div>
      </div>
      <div className="row align-items-center solid-brdr mid-row">
        <div className="col">One of three columns</div>
        <div className="col bs-table mx-2 solid-brdr">One of three columns</div>
        <div className="col">One of three columns</div>
      </div>
      <div className="row align-items-star solid-brdr">
        <div className="col">One of three columns</div>
        <div className="col">One of three columns</div>
      </div>
    </div>
  );
};

export default About;
