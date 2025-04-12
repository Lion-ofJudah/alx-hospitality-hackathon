import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile, deleteAccount } from '../controller/user_controller.js';
import feedbackRoutes from './feedback_route.js';  // Import feedback routes
import reportRoutes from './Report_route.js';      // Import report routes
import { protect } from '../middleware/auth.js'; // Middleware for JWT validation

const router = express.Router();

// Register new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get the user's profile (Protected route)
router.get('/profile', protect, getProfile);

// Update the user's profile (Protected route)
router.put('/profile', protect, updateProfile);

// Delete the user's account (Protected route)
router.delete('/profile', protect, deleteAccount);

// Nest Feedback and Report routes under the User route
router.use('/feedbacks', protect, feedbackRoutes);  // Subroute for feedback (protected)
router.use('/reports', protect, reportRoutes);      // Subroute for reports (protected)

export default router;
