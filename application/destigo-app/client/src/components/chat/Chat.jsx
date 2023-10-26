import React, { useState, useEffect } from "react";
import classes from "./Chat.module.css";
import ChatModal from "./ChatModal";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users));

    fetch("/api/messages")
      .then((response) => response.json())
      .then((data) => setMessages(data.messages));
  }, []);

  function sendMessage(user, message) {
    fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, message }),
    })
      .then((response) => response.json())
      .then((data) => setMessages(data.messages));
  }

  return (
    <div className={classes.chat}>
      <div className={classes.header}>
        <h2>Chat</h2>
        <button onClick={() => setShowModal(true)}>Open Chat</button>
      </div>
      <div className={classes.content}>
        <div className={classes.messages}>
          {messages.map((message) => (
            <div key={message.id} className={classes.message}>
              <div className={classes.messageUser}>{message.user}</div>
              <div className={classes.messageText}>{message.text}</div>
            </div>
          ))}
        </div>
        <div className={classes.input}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      {showModal && (
        <ChatModal
          onClose={() => setShowModal(false)}
          messages={messages}
          users={users}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
}

export default Chat;