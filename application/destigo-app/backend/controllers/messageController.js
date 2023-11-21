module.exports = function(io) {
  const express = require('express');
  const messageController = express.Router();
  const Message = require('../models/Message');
  const verifyToken = require('../middlewares/verifyToken');
  const mongoose = require('mongoose');

  let users = {};

  io.on('connection', (socket) => {
    // When a user connects, store their socket ID
    socket.on('login', (userId) => {
      users[userId] = socket.id;
    });
  
    // When a user disconnects, remove their socket ID
    socket.on('disconnect', () => {
      const userId = Object.keys(users).find(key => users[key] === socket.id);
      if (userId) {
        delete users[userId];
      }
    });
  });

messageController.post('/', verifyToken, async (req, res) => {
  try {
    const uid = req.user.id;
    const newMessage = await Message.create({ ...req.body, userId: uid });

    // Emit the 'new message' event to the recipient
    const recipientSocketId = users[newMessage.recipient];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('new message', newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    return res.status(500).json({ error: error.message });
  }
});

  messageController.get('/', verifyToken, async (req, res) => {
    try {
      const uid = mongoose.Types.ObjectId(req.user.id);
      const friendId = mongoose.Types.ObjectId(req.query.friendId);
      const messages = await Message.find({
        $or: [
            { userId: req.user.id },
            { recipient: req.user.id }
        ]
      });
  
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ error: error.message });
    }
  });

  messageController.get('/showConvo', verifyToken, async (req, res) => {
    try {
      const messages = await Message.find({});
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json(error);
    }
  });

  return messageController;
}