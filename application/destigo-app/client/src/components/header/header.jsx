import React from "react";
import "./header.css";

const Header = ({ header, subHeader }) => {
  return (
    <div className="header">
      <h1 className="header-text">{header}</h1>
      {subHeader && <h3 className="subheader-text">{subHeader}</h3>}
    </div>
  );
};

export default Header;
