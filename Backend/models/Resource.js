const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Room', 'Auditorium', 'Ground'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Booked', 'Maintenance'],
    default: 'Available',
  },
  location: String,
});

module.exports = mongoose.model('Resource', resourceSchema);
