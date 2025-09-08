import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import './Settings.css';

const Settings = () => {
  const { settings, getSettings, updateSettings, user } = useStore();
  const [activeTab, setActiveTab] = useState('account');

  useEffect(() => {
    // Fetch settings if they haven't been loaded or are incomplete
    if (!settings || !settings.budgetCategories) {
      getSettings();
    }
  }, [getSettings, settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBudgetCategoryChange = (category, value) => {
    const newBudgetCategories = {
      ...(settings.budgetCategories || {}),
      [category]: parseInt(value) || 0,
    };
    updateSettings({ ...settings, budgetCategories: newBudgetCategories });
  };

  const handleThemeChange = (theme) => {
    updateSettings({ ...settings, theme });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(settings);
    alert('Settings saved successfully!');
  };

  const totalPercentage = settings.budgetCategories ? Object.values(settings.budgetCategories).reduce((sum, value) => sum + value, 0) : 0;

  if (!settings || !settings.budgetCategories) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className={`settings-container ${settings.theme === 'dark' ? 'dark-theme' : ''}`}>
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and application settings</p>
      </div>
      <div className="settings-layout">
        <div className="settings-sidebar">
          <button className={`sidebar-btn ${activeTab === 'account' ? 'active' : ''}`} onClick={() => setActiveTab('account')}><span className="btn-icon">👤</span> Account</button>
          <button className={`sidebar-btn ${activeTab === 'preferences' ? 'active' : ''}`} onClick={() => setActiveTab('preferences')}><span className="btn-icon">⚙</span> Preferences</button>
          <button className={`sidebar-btn ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}><span className="btn-icon">🔔</span> Notifications</button>
          <button className={`sidebar-btn ${activeTab === 'budget' ? 'active' : ''}`} onClick={() => setActiveTab('budget')}><span className="btn-icon">💰</span> Budget</button>
          <button className={`sidebar-btn ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}><span className="btn-icon">🔒</span> Security</button>
          <button className={`sidebar-btn ${activeTab === 'data' ? 'active' : ''}`} onClick={() => setActiveTab('data')}><span className="btn-icon">📊</span> Data</button>
        </div>
        <div className="settings-content">
          <form onSubmit={handleSubmit}>
            {activeTab === 'account' && (
              <div className="settings-section">
                <h2 className="section-title"><span className="section-icon">👤</span>Account Settings</h2>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" value={user?.username || ''} className="form-control" disabled />
                   <div className="form-help">Username cannot be changed</div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={user?.email || ''} className="form-control" disabled />
                </div>
                 <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" value={user?.name || ''} className="form-control" disabled />
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="settings-section">
                <h2 className="section-title"><span className="section-icon">⚙</span>App Preferences</h2>
                <div className="form-group">
                  <label>Theme</label>
                  <div className="theme-options">
                    <button type="button" className={`theme-option ${settings.theme === 'light' ? 'active' : ''}`} onClick={() => handleThemeChange('light')}><span className="theme-icon">☀</span>Light</button>
                    <button type="button" className={`theme-option ${settings.theme === 'dark' ? 'active' : ''}`} onClick={() => handleThemeChange('dark')}><span className="theme-icon">🌙</span>Dark</button>
                  </div>
                </div>
              </div>
            )}

            {/* In a real app, the other tabs would be fully implemented here */}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
