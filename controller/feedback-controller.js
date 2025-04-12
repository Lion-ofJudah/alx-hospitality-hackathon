import Feedback from '../model/feedback_model.js';

// Create feedback for the logged-in user
export const createFeedback = async (req, res) => {
  try {
    const { services, message, rating } = req.body;
    console.log(req.body)
    
    // Ensure the user is authenticated (this is done by the protect middleware)
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Validate input
    if (!services || services.length === 0 || !message) {
      return res.status(400).json({ message: 'Services and message are required' });
    }



    // Create feedback object and automatically associate with the logged-in user
    const feedback = new Feedback({
      services,
      message,
      user: req.user._id,  // Use the authenticated user
      rating,
    });

    console.log(feedback)

    // Save to the database
    await feedback.save();

    res.status(201).json({
      _id: feedback._id,
      services: feedback.services,
      message: feedback.message,
      user: feedback.user,
      rating: feedback.rating,
      createdAt: feedback.createdAt,
    });

  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Get all feedbacks for the logged-in user
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user: req.user._id }).populate('user', 'username email');
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single feedback by ID
export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('user', 'username email');
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update feedback
export const updateFeedback = async (req, res) => {
  try {
    const { services, message, rating } = req.body;
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Ensure that only the feedback creator (user) can update it
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this feedback' });
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

// Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Ensure that only the feedback creator (user) can delete it
    if (feedback.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this feedback' });
    }

    await feedback.remove();
    res.json({ message: 'Feedback deleted' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
