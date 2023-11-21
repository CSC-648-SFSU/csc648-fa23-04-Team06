import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import classes from "./ChatModal.module.css";
import { useSelector } from "react-redux";
import { request } from '../../utils/fetchApi';
import Chat from './Chat';
import {
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiFillCheckCircle,
} from "react-icons/ai";

import {FiMessageSquare} from "react-icons/fi";

const ChatModal = ({ onClose, socket }) => {
  const { user, token } = useSelector((state) => state.auth);
  const userObjectId = user ? user._id : null;
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messageValue, setMessageValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [convoOutput, setConvoOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on('new message', (data) => {
        setMessages((messages) => [...messages, data]);
      });
  
      return () => {
        socket.off('new message'); // Remove the event listener
      };
    }
  }, [socket]);

  useEffect(() => {
    request('/api/friends', 'GET', {
      'Authorization': `Bearer ${token}`
    })
    .then(data => setFriends(data))
    .catch(error => console.error(error));
  }, [token]);

  useEffect(() => {
    if (selectedFriend) {
      console.log('Selected friend changed:', selectedFriend);
      setLoading(true);
      fetchMessages(selectedFriend)
        .then((messages) => {
          setMessages(messages);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      console.log('No friend selected. Resetting messages.');
      setMessages([]);
    }
  }, [selectedFriend, token]);

  const fetchMessages = (friend) => {
    return request(`/api/messages`, 'GET', {
      'Authorization': `Bearer ${token}`
    })
    .then(data => {
      if (data && Array.isArray(data)) {
        data.forEach((item, index) => {
        });
        // Filter the messages to include only those that involve the selected friend
        const filteredData = data.filter(message => message.recipient === friend._id || message.userId === friend._id);
        return filteredData;
      } else if (data && data.messages) {
        // Filter the messages to include only those that involve the selected friend
        const filteredMessages = data.messages.filter(message => message.recipient === friend._id || message.userId === friend._id);
        return filteredMessages;
      } else {
        console.log('No messages in fetched data. Returning empty array.');
        return [];
      }
    })
    .catch(error => {
      console.error('Error fetching messages:', error);
      return [];
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (selectedFriend && selectedFriend._id) {
      const newMessage = { userId: userObjectId, recipient: selectedFriend._id, text: messageValue };
      
      request(`/api/messages`, 'POST', { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }, newMessage)
      .then((data) => {
        // Emit a WebSocket event with the new message
        if (socket) {
          socket.emit('new message', data);
        }
        // Update the UI with the new message
        setMessages((messages) => [...messages, data]);
        setMessageValue("");
      })
      .catch(error => console.error('error:', error));
    } else {
      console.log('No friend selected. Cannot send message.');
    }
  };

  const handleShowConvo = () => {
    request('/api/messages/showConvo', 'GET', {
      'Authorization': `Bearer ${token}`
    })
    .then(data => {
      const text = data.map(message => message.text).join(' ');
      setConvoOutput(text);
    })
    .catch(error => console.error(error));
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFriendSelect = (friend) => {
    if (friend && friend._id) {
      setSelectedFriend(friend);
    } else {
      console.error('Friend ID is undefined');
    }
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name ? friend.name.toLowerCase().includes(searchValue.toLowerCase()) : false
  );

  const handleBack = () => {
    setSelectedFriend(null);
  };

  const handleClose = () => {
    onClose();
  }

  return (
    <div className={classes["chat-container"]}>
      <AiFillCloseCircle onClick={handleClose} className={classes["close-button"]}/>
     
      <h2 className={classes["title"]}><FiMessageSquare/>Chat with Friends</h2>

      {friends.map(friend => (
        <div key={friend._id} className={classes["friends-item"]} onClick={() => handleFriendSelect(friend)}>
          <span className={classes["friends-list-item-text"]}>{friend.username}</span>
        </div>
      ))}
    
      {selectedFriend && (
        <div className={classes["modal-container"]}>
          <div className={classes["modal-container"]}>
            <Modal
              show={true}
              onHide={() => {
                setSelectedFriend(null);
              }}
            >
              <Modal.Body>
                <Chat 
                  selectedFriend={selectedFriend}
                  messages={messages} 
                  userObjectId={userObjectId} 
                  messageValue={messageValue} 
                  setMessageValue={setMessageValue} 
                  handleSendMessage={handleSendMessage}
                  handleBack={handleBack}
                  handleShowConvo={handleShowConvo}
                />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatModal;