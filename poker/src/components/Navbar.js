import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { logout } from "../rtk/slices/authenticationSlice";

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
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar.Brand href="#">**LOGO**</Navbar.Brand>
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
              <NavDropdown.Item href="#" onClick={toProfile}>
                Deposit
              </NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={toProfile}>
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
      <Navbar.Text>
      Signed in as: 
      <a 
        onClick={toProfile} 
        href="#" 
        style={{fontWeight: 'bold', fontSize: '18px', cursor: 'pointer'}}>
          {userInfo?.username}
      </a>
    </Navbar.Text>
      )}
    </Navbar>
  );
};
export default MyNav;
