import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { request } from "../../utils/fetchApi";
import "./FriendsList.css";
import {
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiFillCheckCircle,
} from "react-icons/ai";

const FriendsList = ({ onClose }) => {
  const { user, token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    request("/api/users", "GET", {
      Authorization: `Bearer ${token}`,
    })
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));

    request("/api/friends", "GET", {
      Authorization: `Bearer ${token}`,
    })
      .then((data) => setFriends(data))
      .catch((error) => console.error(error));
  }, [token, refreshKey]);

  const handleAddFriend = (user) => {
    const body = { userObjectId: user._id };
    request(
      "/api/friends/add",
      "POST",
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body
    )
      .then((data) => {
        if (data.message) {
          console.log(data.message);
        } else {
          console.log("Friend added successfully");
          setRefreshKey(refreshKey + 1);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleUnfriend = (friend) => {
    const body = { friendId: friend._id };
    request(
      "/api/friends/remove",
      "DELETE",
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body
    )
      .then((data) => {
        if (data.message) {
          console.log(data.message);
        } else {
          console.log("Friend removed successfully");
          setFriends((prevFriends) =>
            prevFriends.filter((f) => f._id !== friend._id)
          );
        }
      })
      .catch((error) => console.error(error));
  };
  
  

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="container">
      <button onClick={handleClose} className="close-button">
        <AiFillCloseCircle />
      </button>
      <h2 className="title">Friends</h2>
      {friends.map((friend) => (
        <div key={friend._id} className="friends-item">
          <span className="friends-list">{friend.username}</span>
          <button
            onClick={() => handleUnfriend(friend)}
            className="unfriend-button"
          >
            {" "}
            <AiFillMinusCircle />
          </button>
        </div>
      ))}

      <h2 className="title-add-friends">Add Friends</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="search-input"
      />

      {search.length > 0 &&
        users
          .filter((user) =>
            user.username
              .trim()
              .toLowerCase()
              .includes(search.trim().toLowerCase())
          )
          .slice(0, 3)
          .map((user) => (
            <div key={user._id} className="add-friends-list">
              <span className="add-friends-list">{user.username}</span>
              <button
                onClick={() => handleAddFriend(user)}
                className={`add-friend-button ${
                  !friends.some((friend) => friend._id === user._id)
                    ? "add-friend-button-plus"
                    : ""
                }`}
              >
                {!friends.some((friend) => friend._id === user._id) ? (
                  <div className="add-button">
                    <AiFillPlusCircle />
                  </div>
                ) : (
                  <div className="friend-indication">
                    <AiFillCheckCircle />
                  </div>
                )}
              </button>
            </div>
          ))}
    </div>
  );
};

export default FriendsList;
