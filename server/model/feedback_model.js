import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: String,
      enum: ["food", "spa", "activity", "water", "gain", "room", "transport"],
      required: true,
    },
    positive: {
      type: Number,
      min: 0,
      max: 1,
    },
    negative: {
      type: Number,
      min: 0,
      max: 1,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
