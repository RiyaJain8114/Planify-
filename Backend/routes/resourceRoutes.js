const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// Resource routes
router.get('/', resourceController.getAllResources);

// Booking routes
router.post('/book', resourceController.createBooking);
router.get('/bookings', resourceController.getAllBookings);
router.patch('/bookings/:id/approve', resourceController.approveBooking);
router.patch('/bookings/:id/reject', resourceController.rejectBooking);

module.exports = router;
