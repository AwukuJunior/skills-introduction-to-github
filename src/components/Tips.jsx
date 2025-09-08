import React from 'react';
import './Tips.css';

const Tips = () => {
  const tipsData = {
    dailyTip: {
      title: "Smart Saving Strategy",
      content: "Automate your savings by setting up a direct transfer of 20% of your income to a savings account as soon as you get paid.",
      author: "Financial Expert"
    },
    otherTips: [
      { title: "Budgeting Basics", content: "Track every expense for a month to understand your spending patterns.", category: "Budgeting" },
      { title: "Debt Reduction", content: "Focus on paying off high-interest debts first.", category: "Debt" },
      { title: "Investment Start", content: "Even small, regular investments can grow thanks to compound interest.", category: "Investing" },
      { title: "Emergency Fund", content: "Aim to save 3-6 months' worth of expenses.", category: "Savings" },
      { title: "Smart Shopping", content: "Make & stick to a shopping list to avoid impulse buys.", category: "Spending" },
    ]
  };

  return (
    <div className="tips-container">
      <h1 className="tips-header">Financial Tips</h1>

      <div className="daily-tip-section">
        <h3>Tip of the Day</h3>
        <div className="daily-tip-card">
          <h4>{tipsData.dailyTip.title}</h4>
          <p>{tipsData.dailyTip.content}</p>
          <div className="tip-author">— {tipsData.dailyTip.author}</div>
        </div>
      </div>

      <div className="other-tips-section">
        <h3>More Financial Advice</h3>
        <div className="tips-grid">
          {tipsData.otherTips.map((tip, index) => (
            <div key={index} className="tip-card">
              <div className="tip-category">{tip.category}</div>
              <h4>{tip.title}</h4>
              <p>{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tips;
