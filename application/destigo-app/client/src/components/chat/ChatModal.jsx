import React, { useState } from "react";
import classes from "./ChatModal.module.css";

const ChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [recipient, setRecipient] = useState("");

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSendMessage() {
    if (inputValue.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, sender: "user", recipient },
      ]);
      setInputValue("");
    }
  }

  return (
    <div className={classes.chatModal}>
      <div className={classes.chatModalHeader}>
        <h2>Chat with {recipient}</h2>
        <span className={classes.chatModalClose} onClick={onClose}>
          &times;
        </span>
      </div>
      <div className={classes.chatModalBody}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${classes.messageBubble} ${
              message.sender === "user" ? classes.userBubble : classes.botBubble
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className={classes.chatModalInput}>
        <input
          type="text"
          placeholder="Recipient"
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
        />
        <input
          type="text"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatModal;