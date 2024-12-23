const express = require('express');
const session = require('express-session');
const cors = require('cors'); // Enable CORS
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Load environment variables from .env file
dotenv.config();


// Connect to the database
connectDB();

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend to communicate with backend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware for parsing JSON request bodies
app.use(express.json());

// Use session middleware (if needed for managing user sessions)
app.use(session({
  secret: 'your-session-secret', // Secret to sign the session ID cookie
  resave: false, // Don't resave session if unmodified
  saveUninitialized: true, // Save session even if not modified
  cookie: { secure: false }, // Set to true if using HTTPS (for production)
}));

// Routes
app.use('/api/auth', authRoutes); // Auth routes (signup, login, google OAuth)
app.use('/api/courses', courseRoutes); // Courses routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
