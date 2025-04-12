import mongoose from 'mongoose';

// Define the feedback schema
const feedbackSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId for user reference
      ref: 'User', // Reference to the User model
      required: true // Make user field required
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
