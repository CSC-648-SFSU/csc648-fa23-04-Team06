import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="left-links">
        <a href="/">Link 1</a>
        <a href="/">Link 2</a>
        <a href="/">Link 3</a>
        <a href="/">Link 4</a>
        <a href="/">Link 5</a>
      </div>
      <div className="right-link">
        <a href="/">Right Link</a>
      </div>
    </nav>
  );
}

export default Navbar;
