const express = require('express');
const router = express.Router();
const {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/savingGoalsController');
const { protect } = require('../middleware/authMiddleware');

// All routes here are protected
router.use(protect);

router.route('/')
  .get(getGoals)
  .post(addGoal);

router.route('/:id')
  .put(updateGoal)
  .delete(deleteGoal);

module.exports = router;
