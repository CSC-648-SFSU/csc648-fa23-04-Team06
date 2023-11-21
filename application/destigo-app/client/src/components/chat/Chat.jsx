import React, { useRef, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import classes from './ChatModal.module.css';
import { FiArrowLeftCircle } from 'react-icons/fi';

const Chat = ({ selectedFriend, messages, userObjectId, messageValue, setMessageValue, handleSendMessage, handleBack, handleShowConvo }) => {
  const lastMessageRef = useRef(null);

  // Scroll to the last message when messages change
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Scroll to the last message when the number of messages changes
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  return (
    <div className={classes['chat-container']}>
      <Modal.Header className={classes['friends-list-header']}>
        <Modal.Title className={classes['title']}>
          <FiArrowLeftCircle className={classes['back-button']} onClick={handleBack} />
          {selectedFriend.username}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes['chat-body']}>
        {messages.map((message, index) => {
          const isReceivedMessage = message.userId !== userObjectId;
          return (
            <div
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={isReceivedMessage ? classes['chat-message-received'] : classes['chat-message-sent']}
            >
              <div>{message.text}</div>
            </div>
          );
        })}
      </Modal.Body>
      <div className={classes['chat-form']}>
      <form onSubmit={handleSendMessage}>
        <input
          className={classes['chat-input']}
          type="text"
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
      </div>
    </div>
  );
};

export default Chat;
