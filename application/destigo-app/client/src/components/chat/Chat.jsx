import React, { useRef, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import classes from './ChatModal.module.css';
import axios from 'axios';

const Chat = ({ selectedFriend, messages, userObjectId, messageValue, setMessageValue, handleSendMessage, handleBack, handleShowConvo }) => {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={classes["chat-container"]}>
        <Modal.Header closeButton className={classes["friends-list-header"]}>
            <Modal.Title className={classes["title"]}>
            Chat with {selectedFriend.username}
            </Modal.Title>
        </Modal.Header>
        <Button variant="secondary" onClick={handleBack}>Back</Button>
        <Modal.Body className={classes["chat-body"]}>
        {messages.map((message, index) => {
            const isReceivedMessage = message.userId !== userObjectId;
            return (
                <div 
                key={index} 
                ref={index === messages.length - 1 ? lastMessageRef : null} 
                className={isReceivedMessage ? classes["chat-message-received"] : classes["chat-message-sent"]}
                >
                <div>{message.text}</div>
                </div>
            );
        })}
        </Modal.Body>
        <Modal.Footer className={classes["chat-footer"]}>
            <form onSubmit={handleSendMessage}>
            <input className="chat-input"
                type="text"
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                placeholder="Type a message..."
            />
            <button type="submit">Send</button>
            </form>
        </Modal.Footer>
    </div>
  );
}

export default Chat;