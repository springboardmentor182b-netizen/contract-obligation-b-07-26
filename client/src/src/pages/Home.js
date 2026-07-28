import React from 'react';
import { useAnalytics } from '../components/context/AnalyticsContext';
import './Home.css';

const Home = () => {
  const { user } = useAnalytics();

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome, {user?.first_name}!</h1>
        <p className="user-info">Role: <strong>{user?.role}</strong></p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Active Contracts</h3>
          <p className="card-number">24</p>
          <p className="card-subtitle">Contracts currently active</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Obligations</h3>
          <p className="card-number">12</p>
          <p className="card-subtitle">Require attention</p>
        </div>

        <div className="dashboard-card">
          <h3>Due This Week</h3>
          <p className="card-number">5</p>
          <p className="card-subtitle">Upcoming deadlines</p>
        </div>

        <div className="dashboard-card">
          <h3>Compliance Rate</h3>
          <p className="card-number">94%</p>
          <p className="card-subtitle">Overall compliance</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">📄</span>
            <div className="activity-details">
              <p className="activity-title">New contract added</p>
              <p className="activity-time">2 hours ago</p>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">✅</span>
            <div className="activity-details">
              <p className="activity-title">Obligation completed</p>
              <p className="activity-time">5 hours ago</p>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">⚠️</span>
            <div className="activity-details">
              <p className="activity-title">Compliance review required</p>
              <p className="activity-time">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
