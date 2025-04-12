import express from "express";
import {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} from "../controller/feedback_controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createFeedback);

router.get("/", protect, getAllFeedback);

router.get("/:id", protect, getFeedbackById);

router.put("/:id", protect, updateFeedback);

router.delete("/:id", protect, deleteFeedback);

export default router;
