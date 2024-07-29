const mongoose = require("mongoose")

const BaseUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    required: true
  }
}, { discriminatorKey: 'role', collection: 'users' });

const User = mongoose.model('User', BaseUserSchema);
module.exports = User;
