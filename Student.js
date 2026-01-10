const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  dateOfBirth: {
    type: Date,
    required: false
  },
  rollNumber: {
    type: String,
    required: false
  },
  parentName: {
    type: String,
    required: false
  },
  parentContact: {
    type: String,
    required: false
  },
  className: {
    type: String,
    required: false
  },
  section: {
    type: String,
    required: false
  },
  attendance: {
    type: Number,
    required: false,
    default: 0
  },
  marks: {
    type: Number,
    required: false
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Graduated'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', studentSchema);



