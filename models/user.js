import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true }
});

export default mongoose.model('User', userSchema);
