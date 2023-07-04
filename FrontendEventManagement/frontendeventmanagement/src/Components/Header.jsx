import Login from "./Login";
import LoginForm from "./LoginForm";
import Navbar from "./NavBar";
import React from "react";

const Header = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Login />
    </React.Fragment>
  );
};
export default Header;
