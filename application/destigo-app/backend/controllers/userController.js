const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await User.find().select('username _id');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('username _id');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;