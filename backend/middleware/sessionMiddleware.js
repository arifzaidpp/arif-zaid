import Session from '../models/session.model.js';

// Middleware to verify session is active
export const sessionMiddleware = async (req, res, next) => {
  const { sessionId } = req.body;

  try {
    // Check if sessionId is provided
    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is required' });
    }

    // Find the session by ID
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check if the session has already ended
    if (session.endTime) {
      return res.status(400).json({ message: 'Session has already ended' });
    }

    // Attach the session to the request for further use
    req.session = session;
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error("Error in session middleware", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
