import React from "react";
import { useLocation } from "react-router-dom";
import MyNav from "./Navbar";

const NavbarWrapper = () => {
  const location = useLocation();
  const isPokerRoom = location.pathname === "/poker-room";

  return <>{!isPokerRoom && <MyNav />}</>;
};

export default NavbarWrapper;
