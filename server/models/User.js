const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  contact: { type: String },
  healthIssues: { type: [String] },
  role: { type: String, default: 'user' },
  records: [
    {
      imagePath: { type: String },
      prediction: { type: String },
      date: { type: Date, default: Date.now }
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', UserSchema);
