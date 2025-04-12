import Admin from "../model/admin_model.js";
import Feedback from "../model/feedback_model.js";
import jwt from "jsonwebtoken";

import { feedbackStat } from "../util/feedback_stat.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await Admin.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const admin = await Admin.create({ username, email, password });

  const token = generateToken(admin._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(201).json({
    message: "Admin registered successfully",
    admin: {
      _id: admin._id,
      username: admin.username,
      email: admin.email,
    },
  });
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(admin._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({
    message: "Login successful",
    admin: {
      _id: admin._id,
      username: admin.username,
      email: admin.email,
    },
  });
};

export const logoutAdmin = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
};

export const getFeedbackStats = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    console.log(feedbacks);
    const result = feedbackStat(feedbacks);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};
