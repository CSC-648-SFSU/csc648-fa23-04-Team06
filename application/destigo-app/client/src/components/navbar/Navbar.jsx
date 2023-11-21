import React from "react";
import classes from "./navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import womanImg from "../../assets/usericon.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { BASE_URL } from '../../utils/fetchApi';
import ChatModal from "../chat/ChatModal";
import FriendsList from '../friends/FriendsList';
import io from 'socket.io-client';



const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showFriendsList, setShowFriendsList] = useState(false);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const isAuthenticated = useSelector((state) => state.auth.user !== null);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const newSocket = io(BASE_URL); // Connect to the socket.io server
    setSocket(newSocket);

    if (user) {
      newSocket.emit('login', user._id); // Emit the 'login' event with the user's ID
    }

    return () => {
      newSocket.close(); // Close the connection when the component unmounts
    };
  }, [user]);

  const handleImageClick = () => {
    if (isAuthenticated) {
      setShowModal((prev) => !prev);
    } else {
      // Redirect to the login page if the user is not logged in
      window.location.href = "/login";
    }
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  const handleFriendsListClose = () => {
    setShowFriendsList(false);
  };
  
  {showFriendsList && (
    <FriendsList onClose={handleFriendsListClose} />
  )}

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to="/">DestiGo.</Link>
        </div>
        <div className={classes.center}>
          <li className={classes.listItem}>
            <Link to="/" className={location.pathname === '/' ? classes.active : ''}>Home</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/about" className={location.pathname === '/about' ? classes.active : ''}>About</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/flights" className={location.pathname === '/flights' ? classes.active : ''}>Flights</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/hotels" className={location.pathname === '/hotels' ? classes.active : ''}>Hotels</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/events" className={location.pathname === '/events' ? classes.active : ''}>Events</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/blog" className={location.pathname === '/blog' ? classes.active : ''}>Community</Link>
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
              <span onClick={() => setShowFriendsList(true)}>Friends</span>
              <Link onClick={() => {
                setShowChatModal(true);
                setShowModal(false);
              }}>Messages</Link>
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
          <div åclassName={classes["parent-container"]}>
            {showChatModal && (
              <ChatModal socket={socket} messages={messages} setMessages={setMessages} onClose={() => setShowChatModal(false)} />
            )}
            {showFriendsList && (
              <FriendsList friends={friends} setFriends={setFriends} onClose={() => setShowFriendsList(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
