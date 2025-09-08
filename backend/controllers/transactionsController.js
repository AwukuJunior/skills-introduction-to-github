// @desc    Get all transactions for a user
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    // In a real app, you would fetch this from the database
    // const transactions = await Transaction.findByUserId(req.user.id);
    const mockTransactions = [
      { id: 1, user_id: req.user.id, type: 'expense', amount: 50.00, category: 'Food', description: 'Lunch', date: '2023-10-27' },
      { id: 2, user_id: req.user.id, type: 'income', amount: 2000.00, category: 'Salary', description: 'Monthly pay', date: '2023-10-25' },
    ];
    res.status(200).json(mockTransactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a new transaction
// @route   POST /api/transactions
// @access  Private
const addTransaction = async (req, res) => {
  const { type, amount, category, description, date } = req.body;

  if (!type || !amount || !category || !date) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newTransaction = {
      id: Date.now(),
      user_id: req.user.id,
      type,
      amount,
      category,
      description,
      date,
    };
    // In a real app: const createdTransaction = await Transaction.create(newTransaction);
    console.log('Mock transaction created:', newTransaction);
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { type, amount, category, description, date } = req.body;

  try {
    // In a real app, you'd find the transaction and verify it belongs to the user
    console.log(`Mock update for transaction ${id} for user ${req.user.id} with data:`, req.body);
    res.status(200).json({ id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    // In a real app, you'd find the transaction and verify it belongs to the user before deleting
    console.log(`Mock delete for transaction ${id} for user ${req.user.id}`);
    res.status(200).json({ message: 'Transaction removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
