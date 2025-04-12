<<<<<<< HEAD
import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteAccount,
} from "../controller/user_controller.js";
import feedbackRoutes from "./feedback_route.js";
import reportRoutes from "./report_route.js";
import { protect } from "../middleware/auth.js";
=======
import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile, deleteAccount } from '../controller/user_controller.js';
import feedbackRoutes from './feedback_route.js';  // Import feedback routes
import reportRoutes from './Report_route.js';      // Import report routes
import { protect } from '../middleware/auth.js'; // Middleware for JWT validation
>>>>>>> 588341392f993ac58c7009788db4d9ea7ddba9d4

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.delete("/profile", protect, deleteAccount);

router.use("/feedbacks", protect, feedbackRoutes);
router.use("/reports", protect, reportRoutes);

export default router;
