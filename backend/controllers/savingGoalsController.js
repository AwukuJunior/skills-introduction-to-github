// Mock data store
let mockGoals = [
  { id: 1, user_id: 1, goal_name: 'Save for Vacation', target_amount: 5000, current_amount: 1500, target_date: '2024-12-31', status: 'In Progress' },
  { id: 2, user_id: 1, goal_name: 'New Laptop', target_amount: 2500, current_amount: 2500, target_date: '2024-06-30', status: 'Completed' },
];

// @desc    Get all saving goals for a user
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
  try {
    const userGoals = mockGoals.filter(g => g.user_id === req.user.id);
    console.log(`Returning ${userGoals.length} mock goals for user ${req.user.id}`);
    res.status(200).json(userGoals);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a new saving goal
// @route   POST /api/goals
// @access  Private
const addGoal = async (req, res) => {
  const { goal_name, target_amount, target_date } = req.body;

  if (!goal_name) {
    return res.status(400).json({ message: 'Goal name is required' });
  }

  try {
    const newGoal = {
      id: Date.now(),
      user_id: req.user.id,
      goal_name,
      target_amount: target_amount || null,
      current_amount: 0,
      target_date: target_date || null,
      status: 'In Progress',
    };
    mockGoals.push(newGoal);
    console.log('Mock goal added:', newGoal);
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a saving goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Mock update for goal ${id}`);
    // In a real app, you would update the goal in the DB
    const goalIndex = mockGoals.findIndex(g => g.id == id && g.user_id === req.user.id);
    if (goalIndex > -1) {
      mockGoals[goalIndex] = { ...mockGoals[goalIndex], ...req.body };
      res.status(200).json(mockGoals[goalIndex]);
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a saving goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Mock delete for goal ${id}`);
    const initialLength = mockGoals.length;
    mockGoals = mockGoals.filter(g => !(g.id == id && g.user_id === req.user.id));

    if (mockGoals.length < initialLength) {
      res.status(200).json({ message: 'Goal removed' });
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
};
