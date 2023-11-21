const Subscriber = require('../models/Subscriber');

const subscribeController = async (req, res) => {
  const { email } = req.body;

  try {
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.status(201).json({ message: 'Subscription successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = subscribeController;