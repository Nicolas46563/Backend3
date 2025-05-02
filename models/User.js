import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  role: { type: String, default: 'user' },
  pets: Array,
  documents: [{ name: String, reference: String }],
  last_connection: Date
});

const User = mongoose.model('User', userSchema);
export default User;
