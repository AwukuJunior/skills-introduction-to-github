import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import './Dashboard.css';

const Dashboard = () => {
  const { dashboardData, getDashboardData } = useStore();
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(amount);
  };

  if (!dashboardData) {
    return <div>Loading dashboard...</div>;
  }

  const { income, expenses, balance, spendingGraph, recentTransactions } = dashboardData;

  const getGraphData = () => {
    return spendingGraph[timeRange] || [];
  };

  const getGraphLabels = () => {
    if (timeRange === 'day') return Array.from({length: 24}, (_, i) => `${i}:00`);
    if (timeRange === 'week') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return Array.from({length: 12}, (_, i) => `Month ${i+1}`); // Assuming monthly data for a year
  };

  const recentPurchases = recentTransactions
    .filter(t => t.type === 'expense')
    .slice(0, 4)
    .map(t => ({ name: t.description, amount: Math.abs(t.amount) }));

  const dailyTip = "Try using the 50/30/20 rule: 50% needs, 30% wants, 20% savings";

  return (
    <div className="dashboard-container">
      <div className="summary-cards">
        <div className="summary-card income">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <h3>Income</h3>
            <h2>{formatCurrency(income)}</h2>
          </div>
        </div>

        <div className="summary-card expenses">
          <div className="card-icon">💸</div>
          <div className="card-content">
            <h3>Expenses</h3>
            <h2>{formatCurrency(expenses)}</h2>
          </div>
        </div>

        <div className="summary-card balance">
          <div className="card-icon">🏦</div>
          <div className="card-content">
            <h3>Balance</h3>
            <h2>{formatCurrency(balance)}</h2>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-left">
          <div className="graph-section">
            <h3>Spending Overview</h3>
            <div className="graph-container">
              <div className="graph-buttons">
                <button className={timeRange === 'day' ? 'active' : ''} onClick={() => setTimeRange('day')}>Day</button>
                <button className={timeRange === 'week' ? 'active' : ''} onClick={() => setTimeRange('week')}>Week</button>
                <button className={timeRange === 'month' ? 'active' : ''} onClick={() => setTimeRange('month')}>Month</button>
              </div>
              <div className="bar-graph">
                {getGraphData().map((value, index) => (
                  <div key={index} className="bar-container">
                    <div className="bar" style={{ height: `${Math.min(value / 150 * 100, 100)}%` }}></div>
                    <span className="bar-label">{getGraphLabels()[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="purchases-section">
            <h3>Recent Purchases</h3>
            <div className="purchase-circles">
              {recentPurchases.map((purchase, index) => (
                <div key={index} className="purchase-circle">
                  <div className="circle-amount">{formatCurrency(purchase.amount)}</div>
                  <div className="circle-label">{purchase.name}</div>
                </div>
              ))}
              {recentPurchases.length === 0 && <div className="no-purchases">No recent purchases</div>}
            </div>
          </div>
        </div>

        <div className="dashboard-right">
          <div className="tip-section">
            <h3>Today's Tip</h3>
            <div className="daily-tip"><p>{dailyTip}</p></div>
          </div>

          <div className="transactions-section">
            <h3>Recent Transactions</h3>
            <div className="transactions-list">
              {recentTransactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon">{transaction.type === 'income' ? '⬆' : '⬇'}</div>
                  <div className="transaction-details">
                    <div className="transaction-name">{transaction.description}</div>
                    <div className="transaction-category">{transaction.category}</div>
                  </div>
                  <div className={`transaction-amount ${transaction.type === 'income' ? 'positive' : 'negative'}`}>
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
              {recentTransactions.length === 0 && <div className="no-transactions">No recent transactions</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
