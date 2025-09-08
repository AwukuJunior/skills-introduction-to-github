import React from "react";
import useStore from "../store/useStore";
import "./Header.css";

function Header({ onToggleSidebar }) {
  const { user, logout } = useStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  const handleLogout = () => {
    logout();
    // No need to navigate here, the protected route will handle it
  };

  return (
    <header className="header-container">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar}>
          ☰
        </button>
        <h1 className="header-title">SmartSave</h1>
      </div>
      <div className="header-right">
        <div className="user-info">
          <span>Welcome, {user?.name || 'User'}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
