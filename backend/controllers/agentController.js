const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper to generate JWT
const sendTokenResponse = (agent, statusCode, res) => {
  const token = jwt.sign(
    { id: agent._id, role: agent.role },
    process.env.JWT_SECRET || 'dawings_secret_key_123',
    { expiresIn: '30d' }
  );

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: agent._id,
      fullName: agent.fullName,
      username: agent.username,
      email: agent.email,
      phone: agent.phone,
      country: agent.country,
      specialization: agent.specialization,
      experience: agent.experience,
      portfolio: agent.portfolio,
      about: agent.about,
      role: agent.role,
      isApproved: agent.isApproved,
    }
  });
};

// @desc    Register new designer / agent
// @route   POST /api/v1/agents/register
// @access  Public
exports.registerDesigner = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
      phone,
      country,
      specialization,
      experience,
      portfolio,
      about
    } = req.body;

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields (Full name, username, email, password)'
      });
    }

    // Check if email or username already registered
    const existingEmail = await Agent.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        error: 'An account with this email address already exists'
      });
    }

    const existingUsername = await Agent.findOne({ username: username.toLowerCase() });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        error: 'This username is already taken. Please choose another.'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create Agent/Designer
    const agent = await Agent.create({
      fullName,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || '',
      country: country || '',
      specialization: specialization || [],
      experience: experience || '',
      portfolio: portfolio || '',
      about: about || '',
    });

    sendTokenResponse(agent, 201, res);
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error during registration'
    });
  }
};

// @desc    Login designer / agent
// @route   POST /api/v1/agents/login
// @access  Public
exports.loginDesigner = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email/username and password'
      });
    }

    // Find agent by email or username
    const agent = await Agent.findOne({
      $or: [
        { email: emailOrUsername.toLowerCase() },
        { username: emailOrUsername.toLowerCase() }
      ]
    }).select('+password');

    if (!agent) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    sendTokenResponse(agent, 200, res);
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error during login'
    });
  }
};

// @desc    Get logged in designer profile
// @route   GET /api/v1/agents/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const agent = await Agent.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: agent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error fetching profile'
    });
  }
};
