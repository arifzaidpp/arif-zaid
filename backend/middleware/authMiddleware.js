import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Middleware to verify JWT token
export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    const token = req.cookies.jwt || req.header('Authorization')?.replace('Bearer ', '');

    // If no token is found
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach the user to the request
    req.user = user;
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error("Error in auth middleware", error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
