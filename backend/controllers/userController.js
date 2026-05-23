const mongoose = require('mongoose');
const User = require('../models/User');

// Seed In-Memory User Fallback
const inMemoryUsers = [
  {
    _id: 'user-mock-1',
    email: 'intern@worknest.com',
    password: 'password123'
  }
];

// Check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const emailNormalized = email.toLowerCase().trim();

    if (isMongoConnected()) {
      // Check if user already exists in MongoDB
      const userExists = await User.findOne({ email: emailNormalized });
      if (userExists) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Create new user (plain-text for absolute MERN local simplicity as agreed)
      const user = await User.create({
        email: emailNormalized,
        password
      });

      return res.status(201).json({
        _id: user._id,
        email: user.email,
        message: 'Registration successful!'
      });
    } else {
      // Check memory store
      const userExists = inMemoryUsers.some(u => u.email === emailNormalized);
      if (userExists) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const mockUser = {
        _id: 'user-mock-' + Math.random().toString(36).substr(2, 9),
        email: emailNormalized,
        password
      };
      inMemoryUsers.push(mockUser);

      return res.status(201).json({
        _id: mockUser._id,
        email: mockUser.email,
        message: 'Registration successful (In-Memory failover mode)!'
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// @desc    Authenticate user & get details
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in all credentials fields' });
    }

    const emailNormalized = email.toLowerCase().trim();

    if (isMongoConnected()) {
      // Query MongoDB
      const user = await User.findOne({ email: emailNormalized });
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      return res.status(200).json({
        _id: user._id,
        email: user.email,
        message: 'Authentication successful'
      });
    } else {
      // Query memory array
      const user = inMemoryUsers.find(u => u.email === emailNormalized);

      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      return res.status(200).json({
        _id: user._id,
        email: user.email,
        message: 'Authentication successful (In-Memory mode)'
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser
};
