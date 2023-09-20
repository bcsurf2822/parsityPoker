import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';import { logout } from "../rtk/actions/auth";
import { TbPokerChip } from "react-icons/tb";

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

  return (
    <Navbar style={navStyle} bg="light" expand="lg" sticky="top">
      <Navbar.Brand href="#">
        {" "}
        <TbPokerChip />{" "}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>

          <Nav.Link as={Link} to="/About">About</Nav.Link>
          <Nav.Link as={Link} to="/Promotions">Promotions</Nav.Link>
          <Nav.Link as={Link} to="/Tables">Tables</Nav.Link>
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
   <Stack direction="row" spacing={1}>
      <Chip

        label={userInfo.username}
        icon={<BeachAccessIcon />} 
        variant="outlined"
      />
    </Stack>
        </Navbar.Text>
      )}
    </Navbar>
  );
};
export default MyNav;
