import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import useStore from "../store/useStore";
import "./Homepage.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Homepage() {
  const { user, logout } = useStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      <main className="content">
        <div className="sidebar-container">
          {/* Sidebar Overlay for Mobile */}
          <div
            className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
            onClick={closeSidebar}
          />

          {/* Sidebar Component */}
          <div className={`sidebar-component ${sidebarOpen ? 'open' : ''}`}>
            <Sidebar open={sidebarOpen} onClose={closeSidebar} />
          </div>

          {/* Content Area */}
          <div className="content-area">
            <div className="header-component">
              <Header
                user={user}
                onLogout={logout}
                onToggleSidebar={toggleSidebar}
              />
            </div>
            <div className="maincontent">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Homepage;
