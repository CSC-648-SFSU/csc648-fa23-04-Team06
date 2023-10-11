import React from "react";
import classes from "./navbar.module.css";
import { Link } from "react-router-dom";
import womanImg from "../../assets/usericon.png";
import { useState } from "react";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to="/">DestiGo.</Link>
        </div>
        <div className={classes.center}>
          <li className={classes.listItem}>
            <a href="/">Home</a>
          </li>
          <li className={classes.listItem}>
            <a href="/about">About</a>
          </li>
          <li className={classes.listItem}>
            <a href="/flights">Flights</a>
          </li>
          <li className={classes.listItem}>
            <a href="/hotels">Hotels</a>
          </li>
          <li className={classes.listItem}>
            <a href="/events">Events</a>
          </li>
          <li className={classes.listItem}>
            <a href="/blog">Community</a>
          </li>
        </div>
        <div className={classes.right}>
          <img
            onClick={() => setShowModal((prev) => !prev)}
            src={womanImg}
            className={classes.img}
          />
          {showModal && (
            <div className={classes.modal}>
              <Link to="/create">Create</Link>
              <span>Log Out</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
