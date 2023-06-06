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
    <nav class="navbar sticky-top bg-body-tertiary">
      <div class="container-fluid">
        <ul class="nav nav-underline">
          <li class="nav-item">
            <h6>**LOGO**</h6>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
            >
              Settings
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Advanced Settings
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Hand History
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Account History
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
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
        <a class="navbar-brand">**Player Name and Avatar**</a>
      </div>
    </nav>
  );
};

export default Navbar;
