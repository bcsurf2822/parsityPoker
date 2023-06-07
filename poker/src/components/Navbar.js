import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const toHome = function () {
    navigate("/");
  };

  const toPromo = function () {
    navigate("/Promotions");
  };

  const toAbout = function () {
    navigate("/About");
  };

  const toRegistration = function () {
    navigate("/Registration");
  };

  const toTables = function () {
    navigate("/Tables");
  };

  return (
    <nav className="navbar sticky-top bg-body-tertiary">
      <div className="container-fluid">
        <ul className="nav nav-underline">
          <li className="nav-item">
            <h6>**LOGO**</h6>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"

            >
              Settings
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Advanced Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Hand History
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Account History
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Log Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <button onClick={toHome}>Home</button>
        <button onClick={toAbout}>About</button>
        <button onClick={toPromo}>Promotions</button>
        <button onClick={toTables}>Tables</button>
        <button onClick={toRegistration}>Register</button>
        <a className="navbar-brand">**Player Name and Avatar**</a>
      </div>
    </nav>
  );
};

export default Navbar;
