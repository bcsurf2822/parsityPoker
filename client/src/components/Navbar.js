import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../rtk/actions/auth";
import { Badge } from "react-bootstrap";

const MyNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const toLogout = function () {
    dispatch(logout(userInfo.id));
    navigate("/");
  };

  return (
    <>
      <ul className="nav nav-underline">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/promotions">
            Promotions
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tables">
            Tables
          </Link>
        </li>
        {isAuthenticated && (
          <>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                Settings
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/Profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Deposit">
                    Deposit
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Withdrawl">
                    Withdrawl
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/advancedsettings">
                    Advanced Settings
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/handhistory">
                    Hand History
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/accounthistory">
                    Account History
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={toLogout}>
                    Log Out
                  </button>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Badge pill bg="secondary">
                {userInfo.username}
              </Badge>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default MyNav;
