const express = require('express');
const messageController = express.Router();
const Message = require('../models/Message');
const verifyToken = require('../middlewares/verifyToken');
const { default: mongoose } = require('mongoose');

messageController.post('/', async (req, res) => {
  try {
    const message = await Message.findOne({message: req.body.text});
    const recipient = await Message.findOne({recipient: req.body.recipient});

    const uid = new mongoose.Types.ObjectId();

    const newMessage = await Message.create({ ...req.body, userId: uid});

    // Return a success message without a token
    return res.status(201).json({ message: "Message Sent!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// messageController.get('/select-friend', verifyToken, async (req, res) => {
//   try {

//   } catch (error) {

//   }
// })

// messageController.post('/send-message', verifyToken, async (req, res) => {
//   try {
//     const { recipient, text } = req.body;
//     const message = await Message.create({
//       sender: req.user.id,
//       recipient,
//       text,
//     });
//     return res.status(201).json({ confirmation: "Message Sent!" });
//     //return res.status(201).json({ message });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

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