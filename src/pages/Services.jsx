import React from "react";
import "./Pages.css"; // shared css

const Services = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Our Services</h1>
      <p className="page-subtitle">
        Taskify helps you organize your work and life effortlessly.
      </p>

      <div className="services-grid">
        <div className="service-card">
          <h3>📝 Task Management</h3>
          <p>Create, update, and track your daily to-dos in one place.</p>
        </div>

        <div className="service-card">
          <h3>⏰ Reminders</h3>
          <p>Never miss deadlines again — get notified before due dates.</p>
        </div>

        <div className="service-card">
          <h3>📊 Progress Tracking</h3>
          <p>View your productivity stats and stay motivated every day.</p>
        </div>

        {/*
        <div className="service-card">
          <h3>🌙 Dark Mode</h3>
          <p>Work comfortably day or night with our elegant dark theme.</p>
        </div>
         */}
      </div>
    </div>
  );
};

export default Services;
