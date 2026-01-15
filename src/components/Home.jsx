import React from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
  <div className="home-page">
    <div className="home-hero home-hero-center">
      <div className="hero-left hero-left-center">
        <p className="hero-badge">🎓 Academic Events Manager</p>

        <h1 className="hero-title">
          Organize all your <span className="accent">seminars</span>,{" "}
          <span className="accent">workshops</span>, and{" "}
          <span className="accent">hackathons</span> in one place.
        </h1>

        <p className="hero-subtitle">
          Track upcoming events, manage registrations, and keep your
          department&apos;s academic calendar clean and accessible.
        </p>

        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => navigate("/events")}
          >
            View All Events
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/add")}
          >
            + Add New Event
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-label">Upcoming</span>
            <span className="stat-value">12</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Workshops</span>
            <span className="stat-value">5</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Hackathons</span>
            <span className="stat-value">2</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default Home;
