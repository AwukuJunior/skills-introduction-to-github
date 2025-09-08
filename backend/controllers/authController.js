const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const User = require('../models/userModel'); // This will be created later

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // In a real scenario, we would check if the user exists in the DB
    // const userExists = await User.findByEmail(email);
    // if (userExists) {
    //   return res.status(400).json({ message: 'User already exists' });
    // }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create user (mocking DB interaction for now)
    const newUser = { id: Date.now(), name, email, username, password_hash };
    console.log('Mock user created:', newUser);

    // Create token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // 1. Find user by email (mocking DB interaction)
    // In a real app: const user = await User.findByEmail(email);
    // For now, we'll assume a user is found if the email is 'admin@example.com'
    const isMockUser = email === 'admin@example.com';
    if (!isMockUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const mockUser = {
      id: 1,
      name: 'Administrator',
      username: 'admin',
      email: 'admin@example.com',
      // In a real scenario, this hash would come from the database
      password_hash: await bcrypt.hash('pass', await bcrypt.genSalt(10))
    };

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, mockUser.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Create token
    const token = jwt.sign({ id: mockUser.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({
      token,
      user: {
        id: mockUser.id,
        name: mockUser.name,
        username: mockUser.username,
        email: mockUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  signup,
  login,
};
