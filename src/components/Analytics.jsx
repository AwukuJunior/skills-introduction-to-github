import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import './Analytics.css';

const Analytics = () => {
  const { dashboardData, getDashboardData } = useStore();
  const [timeRange, setTimeRange] = useState('week');
  const [activeCategory, setActiveCategory] = useState('Food');

  useEffect(() => {
    // Fetch data if it's not already in the store
    if (!dashboardData) {
      getDashboardData();
    }
  }, [dashboardData, getDashboardData]);

  // Keep categories mocked as the backend doesn't provide this yet.
  const analyticsCategories = [
    { name: 'Food', amount: 1250, percentage: 35, trend: 'up' },
    { name: 'Transport', amount: 800, percentage: 22, trend: 'down' },
    { name: 'Utilities', amount: 600, percentage: 17, trend: 'up' },
    { name: 'Entertainment', amount: 450, percentage: 13, trend: 'up' },
    { name: 'Shopping', amount: 350, percentage: 10, trend: 'down' },
  ];

  const formatCurrency = (amount) => new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(amount);

  if (!dashboardData) {
    return <div>Loading analytics...</div>;
  }

  const { spendingGraph } = dashboardData;

  const getGraphData = () => spendingGraph[timeRange] || [];
  const getGraphLabels = () => {
    if (timeRange === 'day') return Array.from({length:24},(_,i)=>`${i}:00`);
    if (timeRange === 'week') return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return Array.from({length:12},(_,i)=>`Month ${i+1}`); // Assuming monthly data for a year
  };
  const getMaxValue = () => Math.max(...getGraphData(), 1); // Add 1 to prevent division by zero

  return (
    <div className="analytics-container">
      <h1 className="analytics-header">Spending Analytics</h1>

      <div className="time-range-selector">
        <button className={timeRange==='day' ? 'active' : ''} onClick={()=>setTimeRange('day')}>Day</button>
        <button className={timeRange==='week' ? 'active' : ''} onClick={()=>setTimeRange('week')}>Week</button>
        <button className={timeRange==='month' ? 'active' : ''} onClick={()=>setTimeRange('month')}>Month</button>
      </div>

      <div className="analytics-graph">
        <div className="graph">
          {getGraphData().map((value,index)=>(
            <div key={index} className="graph-bar-container">
              <div className="graph-bar" style={{ height: `${(value / getMaxValue()) * 100}%` }}></div>
              <span className="graph-label">{getGraphLabels()[index]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="categories-section">
        <h3>Top Categories</h3>
        <div className="categories-list">
          {analyticsCategories.map(category=>(
            <div key={category.name} className={`category-item ${activeCategory===category.name ? 'active' : ''}`} onClick={()=>setActiveCategory(category.name)}>
              <div className="category-header">
                <span className="category-name">{category.name}</span>
                <span className="category-percentage">{category.percentage}%</span>
              </div>
              <div className="category-amount">{formatCurrency(category.amount)}</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${category.percentage}%` }}></div>
              </div>
              <div className="category-trend">
                Trend:
                <span className={category.trend==='up' ? 'up' : 'down'}>
                  {category.trend==='up' ? ' ↑ Increasing' : ' ↓ Decreasing'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
