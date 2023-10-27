const express = require('express');
const messageController = express.Router();
const Message = require('../models/Message');
const verifyToken = require('../middlewares/verifyToken');

messageController.post('/send-message', verifyToken, async (req, res) => {
  try {
    const { recipient, text } = req.body;
    const message = await Message.create({
      sender: req.user.id,
      recipient,
      text,
    });
    return res.status(201).json({ message });
  } catch (error) {
    return res.status(500).json(error);
  }
});

messageController.get('/messages', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id },
        { recipient: req.user.id },
      ],
    }).sort({ createdAt: -1 });
    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = messageController;