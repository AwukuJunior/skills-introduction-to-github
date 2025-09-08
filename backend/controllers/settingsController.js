// Mock data store for user settings
let mockSettings = {
  1: { // Corresponds to user_id 1
    currency: 'GHS',
    theme: 'light',
    language: 'en',
    // ... other settings from the frontend component
  }
};

// @desc    Get settings for a user
// @route   GET /api/settings
// @access  Private
const getSettings = async (req, res) => {
  try {
    const userSettings = mockSettings[req.user.id] || {};
    console.log(`Returning mock settings for user ${req.user.id}`);
    res.status(200).json(userSettings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update settings for a user
// @route   PUT /api/settings
// @access  Private
const updateSettings = async (req, res) => {
  try {
    mockSettings[req.user.id] = { ...mockSettings[req.user.id], ...req.body };
    console.log(`Updating mock settings for user ${req.user.id}`);
    res.status(200).json(mockSettings[req.user.id]);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
