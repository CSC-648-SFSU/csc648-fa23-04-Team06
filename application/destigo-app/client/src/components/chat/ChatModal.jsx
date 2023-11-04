import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import classes from "./ChatModal.module.css";
import { useSelector } from "react-redux";

//const BASE_URL = "https://destigo-backend.onrender.com"; 
const BASE_URL = "http://localhost:8800"; 

const ChatModal = () => {
  const { user, token } = useSelector((state) => state.auth);
  const userObjectId = user ? user._id : null;
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messageValue, setMessageValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [convoOutput, setConvoOutput] = useState("");

  useEffect(() => {
    setShowModal(true);
  }, []);

  useEffect(() => {
    if (selectedFriend) {
      fetch(`/api/messages?to=${selectedFriend.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.messages) {
            setMessages(data.messages);
          } else {
            setMessages([]);
          }
        })
        .catch((error) => {
          console.error("There has been a problem with your fetch operation:", error);
        });
    }
  }, [selectedFriend]);

  const handleSendMessage = () => {
    if (selectedFriend && messageValue) {
      const url = BASE_URL + '/api/messages';
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`},
        body: JSON.stringify({ userId: userObjectId, recipient: selectedFriend.name, text: messageValue }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages(...messages, data.messages);
          setMessageValue("");
        });
    } else {
      alert("Please select a friend to chat with.");
    }
  };

  const handleShowConvo = () => {
      const url = BASE_URL + '/api/messages/showConvo';
      fetch(url, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}`},
      })
        .then((response) => response.json())
        .then((data) => {
          //only works for one message breaks when there is two.
          const dataString = JSON.stringify(data).substring(1, JSON.stringify(data).length-1);
          const dataObj = JSON.parse(dataString);
          document.getElementById('convoOutput').innerHTML = dataObj.text;
        });  
  };
  // const handleSendMessage = () => {
  //   if (selectedFriend && messageValue) {
  //     const newMessage = { id: messages.length + 1, from: "You", to: selectedFriend.name, text: messageValue };
  //     setMessages([...messages, newMessage]);
  //     setMessageValue("");
  //   } else {
  //     alert("Please select a friend to chat with.");
  //   }
  // };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setSearchValue("");
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className={classes.chat}>

      {showModal && (
        <Modal
          show={true}
          onHide={() => {
            setShowModal(false);
            setSelectedFriend(null);
            setMessages([]);
          }}
          className={classes["chat-modal"]}
        >
          <Modal.Header closeButton>
            <Modal.Title className={classes["chat-modal-title"]}>
              {selectedFriend ? `Chat with ${selectedFriend.name}` : "Chat"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={classes["chat-modal-body"]}>
            <div className={classes["chat-modal-content"]}>
              <div className={classes["chat-modal-friends"]}>
                <div className={classes["chat-modal-search"]}>
                  <input
                    type="text"
                    placeholder="Search for a friend"
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                  <div className={classes["chat-modal-search-results"]}>
                    {filteredFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className={classes["chat-modal-search-result"]}
                        onClick={() => handleFriendSelect(friend)}
                      >
                        {friend.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={classes["chat-modal-friends-list"]}>
                  {friends.map((friend) => (
                    <div
                      key={friend.id}
                      className={`${classes["chat-modal-friend"]} ${
                        selectedFriend === friend ? classes["active"] : ""
                      }`}
                      onClick={() => setSelectedFriend(friend)}
                    >
                      {friend.name}
                    </div>
                  ))}
                </div>
              </div>
              {selectedFriend && (
                <div className={classes["chat-modal-chat"]}>
                  <div className={classes["chat-modal-messages"]}>
                    {messages && messages.map((message) => (
                      <div
                      key={message.id}
                      className={classes["chat-modal-message"]}
                    >
                      <div className={classes["chat-modal-message-sender"]}>
                        {message.from === "You" ? "You" : selectedFriend.name}
                      </div>
                      <div className={classes["chat-modal-message-text"]}>
                        {message.text}
                        </div>
                      </div>
                    ))}
                  </div> 
                  <div className={classes["chat-modal-input"]}>
                    <input
                      type="text"
                      placeholder="Type a message"
                      value={messageValue}
                      onChange={(e) => setMessageValue(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleSendMessage}>
                      Send
                    </Button>
                    <Button variant="primary" onClick={handleShowConvo}>
                      Show Conversation
                    </Button>
                    <p> {convoOutput} </p>
                  </div>
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                setSelectedFriend(null);
                setMessages([]);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ChatModal;