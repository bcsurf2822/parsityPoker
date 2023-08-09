import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../rtk/slices/authenticationSlice";
import { TbPokerChip } from "react-icons/tb";

const MyNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const toHome = function () {
    navigate("/");
  };
  const toPromo = function () {
    navigate("/Promotions");
  };
  const toAbout = function () {
    navigate("/About");
  };
  const toTables = function () {
    navigate("/Tables");
  };
  const toProfile = function () {
    navigate("/Profile");
  };
  const toDeposit = function () {
    navigate("/Deposit");
  };
  const toWithdrawl = function () {
    navigate("/Withdrawl");
  };
  const toHands = function () {
    navigate("/handhistory");
  };
  const toAdvanced = function () {
    navigate("/advancedsettings");
  };
  const toAccountHistory = function () {
    navigate("/accounthistory");
  };
  const toLogout = function () {
    dispatch(logout(userInfo.id));
    navigate("/");
  };

  const navStyle = {
    fontFamily: "Lobster, cursive",
  };

  return (
    <Navbar style={navStyle} bg="light" expand="lg" sticky="top">
      <Navbar.Brand href="#">
        {" "}
        <TbPokerChip />{" "}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={toHome}>Home</Nav.Link>
          <Nav.Link onClick={toAbout}>About</Nav.Link>
          <Nav.Link onClick={toPromo}>Promotions</Nav.Link>
          <Nav.Link onClick={toTables}>Tables</Nav.Link>
          {isAuthenticated && (
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#" onClick={toProfile}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={toDeposit}>
                Deposit
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={toWithdrawl}>
                Withdrawl
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={toAdvanced}>
                Advanced Settings
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={toHands}>
                Hand History
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={toAccountHistory}>
                Account History
              </NavDropdown.Item>
              <NavDropdown.Item onClick={toLogout}>Log Out</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
      {isAuthenticated && (
        <Navbar.Text style={{ marginRight: "20px" }}>
          Signed in as:
          <a
            onClick={toProfile}
            href="#"
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
              color: "blue",
            }}
          >
            {userInfo?.username}
          </a>
        </Navbar.Text>
      )}
    </Navbar>
  );
};
export default MyNav;
