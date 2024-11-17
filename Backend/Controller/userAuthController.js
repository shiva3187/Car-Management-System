const User = require('../Model/user'); // Ensure the correct path
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Please fill all details" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, msg: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    const payload = { userId: newUser._id, role: "user" }; // Assuming role is "user" by default
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201)
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400000 // 1 day
      })
      .json({
        success: true,
        msg: 'User registered successfully',
        token, // Include the token in the response
        userInfo: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: "user"
        }
      });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please fill all details" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: 'Invalid credentials' });
    }

    const payload = { userId: user._id, role: user.role, name: user.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200)
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400000 // 1 day
      })
      .json({
        success: true,
        msg: 'Login successful',
        token, // Include the token in the response
        userInfo: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// User Logout
const logoutUser = (req, res) => {
  res.clearCookie("auth_token")
    .status(200)
    .json({ success: true, msg: 'Logout successful' });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
