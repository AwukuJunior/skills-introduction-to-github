// This controller would handle complex queries to generate aggregated data for the dashboard.
// Since we cannot run a real DB, we will return mocked but structured data.

// @desc    Get aggregated data for the dashboard
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
  try {
    // In a real application, you would perform several DB queries here:
    // 1. Calculate total income for the user (e.g., SUM(amount) WHERE type = 'income')
    // 2. Calculate total expenses
    // 3. Calculate balance
    // 4. Get recent transactions
    // 5. Aggregate spending by day/week/month for the graph

    const mockData = {
      income: 3500.00,
      expenses: 175.79,
      balance: 3324.21,
      spendingGraph: {
        week: [50, 80, 45, 120, 75, 90, 60],
        month: [350, 400, 320, 380, 420, 390, 370, 410, 380, 350, 400, 320],
        day: Array.from({length: 24}, (_, i) => Math.floor(Math.random() * 100) + 10),
      },
      recentTransactions: [
        { id: 1, type: 'expense', description: 'Groceries', category: 'Food', amount: -125.50, date: '2023-10-26' },
        { id: 2, type: 'income', description: 'Salary', category: 'Income', amount: 2500.00, date: '2023-10-25' },
        { id: 3, type: 'expense', description: 'Electric Bill', category: 'Utilities', amount: -75.30, date: '2023-10-24' },
      ]
    };

    console.log(`Returning mock dashboard data for user ${req.user.id}`);
    res.status(200).json(mockData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getDashboardData,
};
