import express from "express";
import {
  loginAdmin,
  registerAdmin,
  logoutAdmin,
  getFeedbackStats,
} from "../controller/admin_controller.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/get-feedback-stats", getFeedbackStats);

export default router;
