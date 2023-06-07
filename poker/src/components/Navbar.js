
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

const MyNav = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const toHome = function () { navigate("/"); };
  const toPromo = function () { navigate("/Promotions"); };
  const toAbout = function () { navigate("/About"); };
  const toTables = function () { navigate("/Tables"); };

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
          <NavDropdown title="Settings" id="basic-nav-dropdown">
            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#">Advanced Settings</NavDropdown.Item>
            <NavDropdown.Item href="#">Hand History</NavDropdown.Item>
            <NavDropdown.Item href="#">Account History</NavDropdown.Item>
            <NavDropdown.Item href="#">Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Text>
        Signed in as: <a href="#login">**Player Name and Avatar**</a>
      </Navbar.Text>
    </Navbar>
  );
};
export default MyNav;
