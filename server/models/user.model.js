import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
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
    default: 'customer'
  }
});

const User = model('User', UserSchema);
export default User
