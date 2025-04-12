import express from "express";
import {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
} from "../controller/report_controller.js";

const router = express.Router();

// Create report
router.post("/", createReport);

// Get all reports
router.get("/", getAllReports);

// Get single report by ID
router.get("/:id", getReportById);

// Update report
router.put("/:id", updateReport);

// Delete report
router.delete("/:id", deleteReport);

export default router;
