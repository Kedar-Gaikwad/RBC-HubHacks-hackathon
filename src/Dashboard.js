// src/components/Dashboard.js
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [housingData, setHousingData] = useState([
    { name: 'Halifax', availableUnits: 120, neededUnits: 80 },
    { name: 'Dartmouth', availableUnits: 200, neededUnits: 150 },
    { name: 'Bridgewater', availableUnits: 90, neededUnits: 110 },
  ]);

  const [policyUpdates, setPolicyUpdates] = useState([
    { id: 1, title: 'New Housing Grant Announced', date: '2024-10-10' },
    { id: 2, title: 'Affordable Housing Policy Update', date: '2024-09-25' },
    { id: 3, title: 'Shelter Funding Increase', date: '2024-09-15' },
  ]);

  const COLORS = ['#6c63ff', '#63a4ff', '#ff6b6b'];

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Housing and Shelter Overview</h2>
      
      {/* Affordable Housing Data */}
      <div className="section">
        <h3>Affordable Housing Data</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={housingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="availableUnits" fill="#6c63ff" radius={[10, 10, 0, 0]} />
            <Bar dataKey="neededUnits" fill="#ff6b6b" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Shelter Projects Overview */}
      <div className="section">
        <h3>Shelter Projects Overview</h3>
        <div className="project-cards">
          <div className="project-card">
            <h4>Shelter Project A</h4>
            <p>Location: Region A</p>
            <p>Status: Expected by Jan 2025</p>
            <p>Capacity: 150 beds</p>
          </div>
          <div className="project-card">
            <h4>Shelter Project B</h4>
            <p>Location: Region B</p>
            <p>Status: Planning Phase</p>
            <p>Capacity: 200 beds</p>
          </div>
          <div className="project-card">
            <h4>Shelter Project C</h4>
            <p>Location: Region C</p>
            <p>Status: Completed</p>
            <p>Capacity: 100 beds</p>
          </div>
        </div>
      </div>

      {/* Public Policy Announcements */}
      <div className="section">
        <h3>Public Policy Announcements</h3>
        <ul className="policy-updates">
          {policyUpdates.map(update => (
            <li key={update.id}>
              <strong>{update.title}</strong>
              <p>Date: {update.date}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Insights Section */}
      <div className="section">
        <h3>Insights & Recommendations</h3>
        <div className="insights">
          <p>Consider increasing shelter capacity in Region C due to a high demand of 110 needed units.</p>
          <p>New grant opportunities are available for affordable housing projects in Region B.</p>
        </div>
      </div>

      {/* Download Report Button */}
      <button className="download-report-button">
        Download Report
      </button>
    </div>
  );
};

export default Dashboard;
