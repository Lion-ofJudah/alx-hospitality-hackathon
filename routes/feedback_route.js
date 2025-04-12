import express from 'express';
import { createFeedback, getAllFeedback, getFeedbackById, updateFeedback, deleteFeedback } from '../controller/feedback-controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create feedback (POST) - Only authenticated users
router.post('/', protect, createFeedback);

// Get all feedback for the logged-in user (GET) - Only authenticated users
router.get('/', protect, getAllFeedback);

// Get a single feedback by ID (GET) - Only authenticated users
router.get('/:id', protect, getFeedbackById);

// Update feedback (PUT) - Only authenticated users can update their own feedback
router.put('/:id', protect, updateFeedback);

// Delete feedback (DELETE) - Only authenticated users can delete their own feedback
router.delete('/:id', protect, deleteFeedback);

export default router;
