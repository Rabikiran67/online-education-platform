const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const axios = require('axios');

const JWT_SECRET = "78d40baacdbb3a710c6263eb97f4e48a90e604e36cd1f26f44614fbd3f67edf0af42f0e09afedf6eb99a9da02c56f214e1aa5b87d9109b2f9a69d4f5f233bccb"; // Replace this with your actual JWT secret
const router = express.Router();

// Initialize Google OAuth2 client with your credentials
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Your Google client ID
const client = new OAuth2Client(CLIENT_ID);

// Step 1: Google OAuth - Redirect user to Google consent screen
router.get('/google', (req, res) => {
  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:5000/api/auth/google/callback&response_type=code&scope=email profile`;
  res.redirect(redirectUrl);
});

// Google OAuth callback route
// Google OAuth callback route
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('No code provided');
  }

  try {
    // Exchange the authorization code for access token and id_token
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'http://localhost:5000/api/auth/google/callback',
      grant_type: 'authorization_code',
    });

    const { id_token, access_token } = tokenResponse.data;

    // Verify the Google ID token (not access_token)
    const ticket = await client.verifyIdToken({
      idToken: id_token,  // Use the id_token here
      audience: process.env.GOOGLE_CLIENT_ID, // Your Google client ID
    });

    const payload = ticket.getPayload();  // Get user information
    const { sub, name, email } = payload; // Extract user information

    // Check if user exists in the database
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      // User is signing up with Google
      user = new User({
        googleId: sub,
        name,
        email,
      });
      await user.save(); // Save new user if not exists
    }

    // Generate JWT token for user
    const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Set JWT token in cookie for future requests (Optional)
    res.cookie('authToken', jwtToken, { httpOnly: true });

    // Redirect to the courses page after successful login
    return res.redirect('http://localhost:3000/courses'); // Redirect to the courses page

  } catch (error) {
    console.error('Error during Google login:', error);
    return res.status(500).send('Google login failed: ' + error.message);
  }
});


// Signup route (Password is required here)
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token for the new user
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Login route (Email and password based login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate JWT token for the user
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Logout route - clear the JWT from the client
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
