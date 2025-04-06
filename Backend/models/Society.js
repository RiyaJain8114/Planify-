const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  memberCount: Number,
  email: String,
  phone: String,
  location: String,
  establishedYear: Number,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  societyHead: {
    name: String,
    email: String
  },
  facultyAdvisor: String,
  documents: {
    constitution: String,
    memberList: String,
    proposal: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Society', societySchema);
