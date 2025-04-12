import Feedback from "../model/feedback_model.js";
import { sentimentAnalysis } from "../util/sentiment_analysis.js";

export const createFeedback = async (req, res) => {
  try {
    const { service, message, rating } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!service || !message) {
      return res
        .status(400)
        .json({ message: "Service and message are required" });
    }
    const sentiment = await sentimentAnalysis(req, res);
    const positive =
      sentiment[0]["label"] === "POSITIVE"
        ? sentiment[0]["score"]
        : sentiment[1]["score"];
    const negative =
      sentiment[0]["label"] === "NEGATIVE"
        ? sentiment[0]["score"]
        : sentiment[1]["score"];

    const feedback = new Feedback({
      service,
      message,
      user: req.user._id,
      rating,
      positive,
      negative,
    });

    await feedback.save();

    res.status(201).json({
      _id: feedback._id,
      service: feedback.service,
      message: feedback.message,
      user: feedback.user,
      positive: feedback.positive,
      negative: feedback.negative,
      rating: feedback.rating,
      createdAt: feedback.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user: req.user._id }).populate(
      "user",
      "username email"
    );
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const { services, message, rating } = req.body;
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    if (feedback.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this feedback" });
    }

    feedback.services = services || feedback.services;
    feedback.message = message || feedback.message;
    feedback.rating = rating || feedback.rating;

    await feedback.save();
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    if (feedback.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this feedback" });
    }

    await feedback.remove();
    res.json({ message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
