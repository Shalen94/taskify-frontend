import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import heroImg from "../assets/bg1.jpg"; // make sure to add an image in /src/assets/

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title">
            Manage Your Day, <span>Effortlessly</span> 🚀
          </h1>
          <p className="hero-subtitle">
            Taskify helps you plan, prioritize, and accomplish tasks — one step at a time.
          </p>
          <button className="get-started-btn" onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Taskify dashboard preview" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Taskify?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>⏰ Smart Reminders</h3>
            <p>Stay ahead of your schedule with timely task reminders and notifications.</p>
          </div>

          <div className="feature-card">
            <h3>📊 Track Progress</h3>
            <p>Monitor your productivity through insightful charts and progress visuals.</p>
          </div>
        {/* 
          <div className="feature-card">
            <h3>🌙 Custom Themes</h3>
            <p>Switch between light and dark modes for a more comfortable experience.</p>
          </div>
      */}
        </div>
      </section>

    </div>
  );
};

export default Home;
