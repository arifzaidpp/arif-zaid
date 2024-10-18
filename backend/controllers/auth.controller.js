import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Session from "../models/session.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Signup Controller (with admin option)
export const signup = async (req, res) => {
  try {
    const { admissionNumber, username, password, confirmPassword, gender, isAdmin } = req.body;

    // Validate required fields
    if (!admissionNumber || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "Please fill all the required fields" });
    }

    // Check if username or admissionNumber already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username is already taken' });

    const existingAdmissionNumber = await User.findOne({ admissionNumber });
    if (existingAdmissionNumber) return res.status(400).json({ message: 'Admission number is already taken' });

    // Check password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user (with admin flag if provided)
    const newUser = new User({
      admissionNumber,
      username,
      password: hashedPassword,
      gender,
      isAdmin: isAdmin || false, // Admin flag
    });

    await newUser.save();

    return res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    console.error("Error in signup controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Login Controller (Handles both User and Admin)
export const login = async (req, res) => {
  try {
    const { admissionNumber, password, lab } = req.body;

    // Validate required fields
    if (!admissionNumber || !password) {
      return res.status(400).json({ error: "Please fill all the required fields" });
    }

    // Check if the user exists
    const user = await User.findOne({ admissionNumber });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check password validity
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token and set it in cookies
    generateTokenAndSetCookie(user._id, res);

    // Start a session when the user logs in
    const session = new Session({
      userId: user._id,
      startTime: Date.now(), // Current time as session start
      lab: lab, // Optional field for lab (you can customize for admin)
    });

    await session.save();

    // Return response with user details and session ID
    return res.status(200).json({
      message: user.isAdmin ? "Admin login successful" : "Login successful",
      userId: user._id,
      username: user.username,
      isAdmin: user.isAdmin,  // Inform if the user is an admin
      sessionId: session._id,  // Return session ID for logout
    });
  } catch (error) {
    console.error("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Logout Controller (Handles both User and Admin)
export const logout = async (req, res) => {
  const { sessionId } = req.body;

  try {
    // Validate that sessionId is provided
    if (!sessionId) {
      return res.status(400).json({ error: "Session ID is required for logout" });
    }

    // Find the active session by sessionId
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    // Stop the session by adding the endTime and calculating the compensation
    session.endTime = Date.now();
    const duration = (session.endTime - session.startTime) / 60000; // Duration in minutes
    session.compensation = duration * 0.1; // 0.1 rupees per minute
    await session.save();

    // Clear the JWT token from cookies
    res.cookie("jwt", "", { httpOnly: true, maxAge: 0 });

    return res.status(200).json({
      message: session.userId.isAdmin ? 'Admin logout successful and session ended' : 'Logout successful and session ended',
      session,
    });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
