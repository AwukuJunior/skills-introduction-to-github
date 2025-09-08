import React, { useState, useEffect } from "react";
import useStore from "../store/useStore";
import "./Transactions.css";

const Transactions = () => {
  const { transactions, getTransactions, addTransaction, deleteTransaction } = useStore();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const handleAddNewTransaction = () => setIsAddingNew(true);

  const handleCancelAdd = () => {
    setIsAddingNew(false);
    setNewTransaction({
      type: "expense",
      amount: "",
      category: "",
      description: "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  const handleTransactionType = (type) => setNewTransaction(prev => ({...prev, type}));

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({...prev, [name]: value}));
  };

  const handleSaveTransaction = async () => {
    if (!newTransaction.amount || !newTransaction.category || !newTransaction.date) {
      return alert("Please enter amount, category, and date");
    }

    const transactionToAdd = {
      ...newTransaction,
      amount: parseFloat(newTransaction.amount)
    };

    const result = await addTransaction(transactionToAdd);
    if (result.success) {
      handleCancelAdd();
    } else {
      alert(result.error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      const result = await deleteTransaction(id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(amount);
  };

  return (
    <div className="transaction-container">
      <div className="transactions-list">
        <div className="transactions-header">
          <h2>Transactions</h2>
          <button className="add-new-button" onClick={handleAddNewTransaction}>
            + Add New Transaction
          </button>
        </div>

        {transactions.length > 0 ? (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{new Date(t.date).toLocaleDateString()}</td>
                  <td>{t.description}</td>
                  <td>{t.category}</td>
                  <td>{formatCurrency(t.amount)}</td>
                  <td className={t.type === "income" ? "type-income" : "type-expense"}>
                    {t.type}
                  </td>
                  <td className="actions-cell">
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteTransaction(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-transactions-message">
            <p>No transactions yet. Click "Add New Transaction" to get started.</p>
          </div>
        )}
      </div>

      {isAddingNew && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Transaction</h2>

            <div className="transaction-type-buttons">
              <button
                className={newTransaction.type === "expense" ? "active" : ""}
                onClick={() => handleTransactionType("expense")}
              >
                Expense
              </button>
              <button
                className={newTransaction.type === "income" ? "active" : ""}
                onClick={() => handleTransactionType("income")}
              >
                Income
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount (GHS) *</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={newTransaction.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={newTransaction.description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <input
                type="text"
                id="category"
                name="category"
                value={newTransaction.category}
                onChange={handleInputChange}
                placeholder="Enter category"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={newTransaction.date}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button className="save-button" onClick={handleSaveTransaction}>
                Save Transaction
              </button>
              <button className="cancel-button" onClick={handleCancelAdd}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
