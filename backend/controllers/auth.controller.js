import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Signup Controller (with admin option)
export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, isAdmin } = req.body;

    // Validate required fields
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "Please fill all the required fields" });
    }

    // Check if username or admissionNumber already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username is already taken' });

    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: 'email is already taken' });

    // Check password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user (with admin flag if provided)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
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
export const signin = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Validate required fields
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: "Please fill all the required fields" });
    }

    // Determine if the input is an email or username
    const isEmail = usernameOrEmail.includes('@gmail.com');
    
    // Find the user either by email or username
    const user = isEmail
      ? await User.findOne({ email: usernameOrEmail })
      : await User.findOne({ username: usernameOrEmail });
    
    // Check if the user exists
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check password validity
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token and set it in cookies
    generateTokenAndSetCookie(user._id, res);

    // Return response with user details
    return res.status(200).json({
      message: user.isAdmin ? "Admin login successful" : "Login successful",
      userId: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,  // Inform if the user is an admin
    });
  } catch (error) {
    console.error("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



// Logout Controller (Handles both User and Admin)
export const signout = async (req, res) => {
  const { userId } = req.body;

  try {
    // Validate that userId is provided
    if (!userId) {
      return res.status(400).json({ error: "User ID is required for logout" });
    }

    // Find the active user by userId
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Clear the JWT token from cookies
    res.cookie("jwt", "", { httpOnly: true, maxAge: 0 });

    return res.status(200).json({
      message: user.isAdmin ? 'Admin logout successful' : 'Logout successful',
    });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
