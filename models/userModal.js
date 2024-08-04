import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true },
  address: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'manager'], default: 'customer' }
});

const User = mongoose.model('User', UserSchema);

export default User;
