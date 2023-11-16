const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postEvent = async (req, res) => {
  const { title, description, date, image } = req.body;

  // Ensure that the required fields are present in the request body
  if (!title || !description || !date) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const event = new Event({
    title,
    description,
    date,
    image,
    // Add other event properties as needed
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
