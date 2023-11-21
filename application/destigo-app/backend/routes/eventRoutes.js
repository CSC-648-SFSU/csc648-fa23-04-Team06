const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Get all events
router.get('/events', eventController.getAllEvents);

// Post a new event
router.post('/events', eventController.postEvent);

module.exports = router;
