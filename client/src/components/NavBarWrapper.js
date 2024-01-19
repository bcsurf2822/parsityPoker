import React from "react";
import { useLocation } from "react-router-dom";
import MyNav from "./Navbar";
import { useSelector } from "react-redux";

const NavbarWrapper = () => {

  const location = useLocation();
  const isPokerRoom = location.pathname.startsWith('/room/');

  return <>{!isPokerRoom && <MyNav />}</>;
};

export default NavbarWrapper;
