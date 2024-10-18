import Session from '../models/session.model.js';
import User from '../models/user.model.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { sessionMiddleware } from '../middleware/sessionMiddleware.js';

// Start session
export const startSession = async (req, res) => {
  try {
    // First, apply authMiddleware to ensure the user is authenticated
    await authMiddleware(req, res, async () => {
      const { userId } = req.user; // Use authenticated user's ID

      // Start a new session for the authenticated user
      const session = new Session({ userId, startTime: Date.now() });
      await session.save();

      return res.status(201).json({ message: 'Session started', session });
    });
  } catch (error) {
    console.error("Error starting session", error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Stop session
export const stopSession = async (req, res) => {
  try {
    // First, apply authMiddleware to ensure the user is authenticated
    await authMiddleware(req, res, async () => {
      // Then, apply sessionMiddleware to ensure the session is valid
      await sessionMiddleware(req, res, async () => {
        const { session } = req; // Get session from the middleware

        // Stop the session by adding endTime and calculating compensation
        session.endTime = Date.now();
        const duration = (session.endTime - session.startTime) / 60000; // minutes
        session.compensation = duration * 0.1; // 0.1 rupees per minute
        await session.save();

        return res.status(200).json({ message: 'Session stopped', session });
      });
    });
  } catch (error) {
    console.error("Error stopping session", error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get sessions for admin
export const getSessions = async (req, res) => {
  try {
    // First, apply authMiddleware to ensure the user is authenticated and has admin rights
    await authMiddleware(req, res, async () => {
      // Fetch all sessions and populate user data
      const sessions = await Session.find().populate('userId', 'username');
      return res.status(200).json(sessions);
    });
  } catch (error) {
    console.error("Error fetching sessions", error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};
