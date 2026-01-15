import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eventService from "../services/eventServices";
import "../Eventpages.css";

const AddEvent = () => {
  const [form, setForm] = useState({
    title: "",
    type: "Seminar",
    date: "",
    time: "",
    venue: "",
    department: "",
    organizer: "",
    description: "",
    speaker: "",
    mode: "Offline",
    registrationLink: "",
    capacity: "",
    status: "Upcoming",
  });

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        ...form,
        capacity: form.capacity ? Number(form.capacity) : null,
      };
      await eventService.addEvent(payload);
      navigate("/events");
    } catch (err) {
      alert("Failed to add event. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/events");
  };

  return (
    <div className="event-form-page">
      <div className="event-form-card">
        <h2 className="event-form-title">Add New Event</h2>
        <p className="event-form-subtitle">
          Fill in the details to create a new academic event.
        </p>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-row two-cols">
            <div className="form-field">
              <label>Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., AI & Machine Learning Seminar"
                required
              />
            </div>

            <div className="form-field">
              <label>Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option>Seminar</option>
                <option>Workshop</option>
                <option>Hackathon</option>
                <option>Guest Lecture</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="form-row two-cols">
            <div className="form-field">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row two-cols">
            <div className="form-field">
              <label>Venue</label>
              <input
                name="venue"
                value={form.venue}
                onChange={handleChange}
                placeholder="e.g., CSE Seminar Hall"
                required
              />
            </div>
            <div className="form-field">
              <label>Department</label>
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>

          <div className="form-row two-cols">
            <div className="form-field">
              <label>Organizer</label>
              <input
                name="organizer"
                value={form.organizer}
                onChange={handleChange}
                placeholder="e.g., Coding Club"
              />
            </div>
            <div className="form-field">
              <label>Speaker / Resource Person</label>
              <input
                name="speaker"
                value={form.speaker}
                onChange={handleChange}
                placeholder="e.g., Dr. Neha Sharma"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Short description about the event..."
              />
            </div>
          </div>

          <div className="form-row two-cols">
            <div className="form-field">
              <label>Mode</label>
              <select
                name="mode"
                value={form.mode}
                onChange={handleChange}
              >
                <option>Offline</option>
                <option>Online</option>
                <option>Hybrid</option>
              </select>
            </div>

            <div className="form-field">
              <label>Capacity</label>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="e.g., 100"
                min="1"
              />
            </div>
          </div>

          <div className="form-row two-cols">
            <div className="form-field">
              <label>Registration Link</label>
              <input
                name="registrationLink"
                value={form.registrationLink}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="form-field">
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>Upcoming</option>
                <option>Open for Registration</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
