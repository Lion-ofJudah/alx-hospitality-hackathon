import User from "../model/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    console.log(user._id);

    // Send response with the user info and token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate the JWT token after successful login
    const token = generateToken(user._id); // This generates a new token
    // Set token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // Send response with the user info and token
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: token, // Send the token in the response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the user's profile (Protected Route)
export const getProfile = async (req, res) => {
  try {
    // Assume we extract the user from the JWT token
    const user = await User.findById(req.user.id); // req.user.id should come from JWT middleware
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user profile
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the user's profile (Protected Route)
export const updateProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    // Assume we extract the user from the JWT token
    const user = await User.findById(req.user.id); // req.user.id should come from JWT middleware
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile
    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete the user's account (Protected Route)
export const deleteAccount = async (req, res) => {
  try {
    // Assume we extract the user from the JWT token
    const user = await User.findById(req.user.id); // req.user.id should come from JWT middleware
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user's account
    await user.remove();

    res.json({ message: "User account deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
