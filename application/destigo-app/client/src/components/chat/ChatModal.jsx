import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import classes from "./ChatModal.module.css";

const ChatModal = () => {
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([
    // { id: 1, name: "Alice" },
    // { id: 2, name: "Bob" },
    // { id: 3, name: "Charlie" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messageValue, setMessageValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setShowModal(true);
  }, []);

  useEffect(() => {
    if (selectedFriend) {
      fetch(`/api/messages?to=${selectedFriend.id}`)
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.messages);
          //setMessages(messages.filter((message) => message.to === selectedFriend.name));
        });
     }
  }, [selectedFriend]);

  const handleSendMessage = () => {
    if (selectedFriend && messageValue) {
      fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: "You", to: selectedFriend.name, text: messageValue }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.messages);
          setMessageValue("");
        });
    } else {
      alert("Please select a friend to chat with.");
    }
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
                    {messages.map((message) => (
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