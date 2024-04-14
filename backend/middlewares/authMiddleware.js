const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the 'Authorization' header

    if (!token) {
      return res.status(401).json({ error: 'Authorization token not provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
