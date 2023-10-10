import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="left-links">
        <a href="/">Home</a>
        <a href="/">Flights</a>
        <a href="/">Hotels</a>
        <a href="/">Events</a>
        <a href="/">Blog</a>
      </div>
      <div className="right-link">
        <a href="/">Log In</a>
      </div>
    </nav>
  );
}

export default Navbar;
