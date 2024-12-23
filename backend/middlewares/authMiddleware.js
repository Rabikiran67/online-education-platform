const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the 'Authorization' header

  if (!token) {
    return res.status(403).json({ message: 'No token provided. Access forbidden.' }); // Forbidden if no token
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token. Access forbidden.' }); // Forbidden if token is invalid
    }

    req.user = user; // Attach user data to the request
    next(); // Proceed to the next middleware
  });
};

module.exports = authenticateJWT;
