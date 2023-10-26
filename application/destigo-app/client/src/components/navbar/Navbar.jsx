import React from "react";
import classes from "./navbar.module.css";
import { Link } from "react-router-dom";
import womanImg from "../../assets/usericon.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.user !== null);
  const dispatch = useDispatch();

  const handleImageClick = () => {
    if (isAuthenticated) {
      setShowModal((prev) => !prev);
    } else {
      // Redirect to the login page if the user is not logged in
      window.location.href = "/login";
    }
  };

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
            onClick={handleImageClick}
            src={womanImg}
            className={classes.img}
          />
          {isAuthenticated && showModal && (
            <div className={classes.modal}>
              <Link to="/messages">Messages</Link>
              <Link to="/create">Create Post</Link>
              <span
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Log Out
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
