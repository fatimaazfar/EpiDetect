import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard-links">
        <Link to="/profile" className="dashboard-link">Profile</Link>
        <Link to="/records" className="dashboard-link">Records</Link>
        <Link to="/predict" className="dashboard-link">Predict</Link>
      </div>
    </div>
  );
};

export default Dashboard;
