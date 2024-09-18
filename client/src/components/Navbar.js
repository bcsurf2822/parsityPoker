import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { logout } from "../rtk/actions/auth";

const MyNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const toLogout = function () {
    dispatch(logout(userInfo.id));
    navigate("/");
  };

  const navStyle = {
    fontFamily: "Lobster, cursive",
  };

  const customNavStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  };

  const navLinkStyle = {
    margin: '0 10px',
    position: 'relative',
  };

  const navLinkDividerStyle = {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    height: '24px',
    borderRight: '1px solid #ccc',
  };

  return (
    <Navbar style={navStyle} bg="light" expand="lg" sticky="top">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-center" style={customNavStyle}>
          <Nav.Link as={Link} to="/" style={navLinkStyle}>
            Home
            <span style={navLinkDividerStyle}></span>
          </Nav.Link>
          <Nav.Link as={Link} to="/About"  style={navLinkStyle}>About
          <span style={navLinkDividerStyle}></span>
          </Nav.Link>
          <Nav.Link as={Link} to="/Promotions"  style={navLinkStyle}>Promotions
          <span style={navLinkDividerStyle}></span>
          </Nav.Link>
          <Nav.Link as={Link} to="/Tables"  style={navLinkStyle}>Tables
          {isAuthenticated && <span style={navLinkDividerStyle}></span>}          </Nav.Link>
          {isAuthenticated && (
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/Profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item  as={Link} to="/Deposit">
                Deposit
              </NavDropdown.Item>
              <NavDropdown.Item  as={Link} to="/Withdrawl">
                Withdrawl
              </NavDropdown.Item>
              <NavDropdown.Item  as={Link} to="/advancedsettings">
                Advanced Settings
              </NavDropdown.Item>
              <NavDropdown.Item  as={Link} to="/handhistory">
                Hand History
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/accounthistory">
                Account History
              </NavDropdown.Item>
              <NavDropdown.Item onClick={toLogout}>Log Out</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
      {isAuthenticated && (
        <Navbar.Text style={{ marginRight: "20px" }}>
          <Badge pill bg="secondary">
            {userInfo.username}

          </Badge>
        </Navbar.Text>
      )}
    </Navbar>
  );
};
export default MyNav;
