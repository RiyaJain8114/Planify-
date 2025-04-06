const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true,
  },
  resourceName: String,
  societyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Society',
    required: true,
  },
  purpose: String,
  expectedAttendees: Number,
  startDateTime: Date,
  endDateTime: Date,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
