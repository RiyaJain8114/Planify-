const Event = require('../models/Event');

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      startDateTime,
      endDateTime,
      venue,
      maxParticipants,
      budget,
      requirements,
      createdBy
    } = req.body;

    const newEvent = new Event({
      title,
      description,
      category,
      startDateTime,
      endDateTime,
      venue,
      maxParticipants,
      budget,
      requirements,
      createdBy
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Society's Events
exports.getMyEvents = async (req, res) => {
  try {
    const { societyId } = req.params;
    const events = await Event.find({ createdBy: societyId });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// College Authority: Get all events (pending/approved/rejected)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Event Status (approve/reject)
exports.updateEventStatus = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status, remarks } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const updated = await Event.findByIdAndUpdate(
      eventId,
      { status, remarks },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
