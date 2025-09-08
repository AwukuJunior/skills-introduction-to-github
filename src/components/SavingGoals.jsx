import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTrashAlt, FaTimesCircle } from 'react-icons/fa';
import useStore from '../store/useStore';
import './SavingGoals.css';

const SavingGoals = () => {
  const { goals, getGoals, addGoal, updateGoal, deleteGoal } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getGoals();
  }, [getGoals]);

  const openModal = () => {
    setIsModalOpen(true);
    setNewGoal('');
    setTargetAmount('');
    setTargetDate('');
    setError('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddGoal = async () => {
    if (newGoal.trim() === '') {
      setError('Please enter a goal description.');
      return;
    }

    setError('');
    await addGoal({
      goal_name: newGoal,
      target_amount: targetAmount ? parseFloat(targetAmount) : null,
      target_date: targetDate || null,
    });
    closeModal();
  };

  const handleDeleteGoal = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await deleteGoal(id);
    }
  };

  const handleCompleteGoal = async (id, currentGoal) => {
    const newStatus = currentGoal.status === 'Completed' ? 'In Progress' : 'Completed';
    await updateGoal(id, { ...currentGoal, status: newStatus });
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'Not set';
    return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="savings-goals-container">
      <div className="savings-goals-header">
        <h2>Saving Goals</h2>
        <button className="add-new-goal-button" onClick={openModal}>
          Add New Goal
        </button>
      </div>

      <div className="savings-goals-table-container">
        <table className="savings-goals-table">
          <thead>
            <tr>
              <th>Goal</th>
              <th>Target Amount</th>
              <th>Target Date</th>
              <th>Status</th>
              <th>Completed</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goalItem) => (
              <tr key={goalItem.id}>
                <td>{goalItem.goal_name}</td>
                <td>{formatCurrency(goalItem.target_amount)}</td>
                <td>{formatDate(goalItem.target_date)}</td>
                <td>{goalItem.status}</td>
                <td className="completed-cell">
                  <button
                    className="complete-button"
                    onClick={() => handleCompleteGoal(goalItem.id, goalItem)}
                    title={goalItem.status === 'Completed' ? "Mark as In Progress" : "Mark as Completed"}
                  >
                    {goalItem.status === 'Completed' ? (
                      <FaCheckCircle className="completed-icon" size={20} />
                    ) : (
                      <FaTimesCircle className="incomplete-icon" size={20} />
                    )}
                  </button>
                </td>
                <td className="delete-cell">
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteGoal(goalItem.id)}
                    title="Delete Goal"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {goals.length === 0 && (
              <tr>
                <td colSpan="6" className="no-goals">
                  No saving goals added yet. Click "Add New Goal" to create your first goal.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Goal</h3>
              <button className="modal-close-button" onClick={closeModal}>
                Cancel
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="goal">Goal Description *</label>
                <input
                  type="text"
                  id="goal"
                  placeholder="Enter your goal (e.g., Save for vacation)"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="targetAmount">Target Amount (GHS)</label>
                <input
                  type="number"
                  id="targetAmount"
                  placeholder="Enter target amount (optional)"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="targetDate">Target Date</label>
                <input
                  type="date"
                  id="targetDate"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </div>

              {error && <p className="error-message">{error}</p>}
            </div>
            <div className="modal-footer">
              <button className="add-button" onClick={handleAddGoal}>
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingGoals;
