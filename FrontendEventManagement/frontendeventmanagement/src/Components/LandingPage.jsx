import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const user = useSelector((state) => state.user);

  const history = useNavigate();
  const clickHandler = () => {
    if (user != null) {
      history("/home");
    } else {
      history("/header");
    }
  };
  return (
    <div className="landing-page">
      <div className="container">
        <h1 className="title">Event Management</h1>
        <p className="subtitle">Plan and organize your events seamlessly</p>
        <button className="cta-button" onClick={clickHandler}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
