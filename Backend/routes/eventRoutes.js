const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create new event (Society Head)
router.post('/', eventController.createEvent);

// Get all events created by the logged-in society
router.get('/mine/:societyId', eventController.getMyEvents);

// Get all events (College Authority)
router.get('/all', eventController.getAllEvents);

// Approve/Reject event
router.put('/status/:eventId', eventController.updateEventStatus);

module.exports = router;
