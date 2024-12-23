const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  console.log(JWT_SECRET)
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authenticateJWT;
