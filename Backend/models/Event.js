const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  venue: { type: String, required: true },
  maxParticipants: { type: Number, required: true },
  budget: { type: Number, required: true },
  requirements: [{ type: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  remarks: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
