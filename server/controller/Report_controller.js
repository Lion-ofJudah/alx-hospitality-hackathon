import Report from "../model/report_model.js";

// CREATE
export const createReport = async (req, res) => {
  try {
    const report = await Report.create({ ...req.body });
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ ALL
export const getAllReports = async (req, res) => {
  const reports = await Report.find().populate("admin", "username email");
  res.json(reports);
};

// READ ONE
export const getReportById = async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) return res.status(404).json({ message: "Report not found" });
  res.json(report);
};

// UPDATE
export const updateReport = async (req, res) => {
  const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!report) return res.status(404).json({ message: "Report not found" });
  res.json(report);
};

// DELETE
export const deleteReport = async (req, res) => {
  const report = await Report.findByIdAndDelete(req.params.id);
  if (!report) return res.status(404).json({ message: "Report not found" });
  res.json({ message: "Report deleted" });
};
