import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['farmer', 'consumer'], required: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
   phone: String, 
});

export default mongoose.model('User', userSchema);
