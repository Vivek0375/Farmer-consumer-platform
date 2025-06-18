import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// Register (Farmer or Consumer)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashed,
      role,
      phone
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ msg: 'Invalid password' });

  res.json({
    user,
    token: Buffer.from(JSON.stringify({ id: user._id })).toString('base64'),
  });
});

export default router;
