const express = require('express');
const messageController = express.Router();
const Message = require('../models/Message');
const verifyToken = require('../middlewares/verifyToken');

messageController.post('/', verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    console.log('req.user:', req.user);
    console.log('req.body.text:', req.body.text);
    const newMessage = await Message.create({ ...req.body, userId: req.user.id});

    // Return a success message without a token
    return res.status(201).json({ message: "Message Sent!" });
  } catch (error) {
    console.log(error); // Add this line
    return res.status(500).json({ error: error.message });
  }
});

messageController.get('/', async (req, res) => {
  try {
    const friendId = req.query.friendId;
    const messages = await Message.find({ $or: [{ userId: friendId }, { recipient: friendId }] });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

messageController.get('/showConvo', async (req, res) => {
  try {
    const messages = await Message.find({})
    return res.status(200).json(messages)
  } catch (error) {
      return res.status(500).json(error)
  }
});

module.exports = messageController;