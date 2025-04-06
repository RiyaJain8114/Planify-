const Resource = require('../models/Resource');
const Booking = require('../models/Booking');

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a booking request
exports.createBooking = async (req, res) => {
  try {
    const { resourceId, resourceName, societyId, purpose, expectedAttendees, startDateTime, endDateTime } = req.body;

    const newBooking = new Booking({
      resourceId,
      resourceName,
      societyId,
      purpose,
      expectedAttendees,
      startDateTime,
      endDateTime,
    });

    await newBooking.save();

    // Optional: update resource status
    await Resource.findByIdAndUpdate(resourceId, { status: 'Booked' });

    res.status(201).json({ message: 'Booking submitted', booking: newBooking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all booking requests (for authority panel)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('resourceId').populate('societyId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve booking
exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true });
    res.json({ message: 'Booking approved', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject booking
exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true });
    res.json({ message: 'Booking rejected', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
