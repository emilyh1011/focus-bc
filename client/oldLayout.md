import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, User, Clock, Settings } from 'lucide-react';

const Layout = () => {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="logo">
          <Clock size={24} style={{ color: 'var(--color-primary)' }} />
          <span>Focus</span>
        </div>

        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/rooms"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Users size={20} />
            <span>Study Rooms</span>
          </NavLink>

          <NavLink
            to="/solo"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <User size={20} />
            <span>Solo Mode</span>
          </NavLink>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <NavLink
            to="/settings"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
