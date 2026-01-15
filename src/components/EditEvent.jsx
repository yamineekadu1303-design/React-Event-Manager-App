import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import eventService from "../services/eventServices";
import "../Eventpages.css";

const EditEvent = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await eventService.getEventById(id);
        const data = res.data;
        setForm({
          title: data.title || "",
          type: data.type || "Seminar",
          date: data.date || "",
          time: data.time || "",
          venue: data.venue || "",
          department: data.department || "",
          organizer: data.organizer || "",
          description: data.description || "",
          speaker: data.speaker || "",
          mode: data.mode || "Offline",
          registrationLink: data.registrationLink || "",
          capacity: data.capacity ?? "",
          status: data.status || "Upcoming",
        });
      } catch (err) {
        alert("Failed to load event.");
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        ...form,
        capacity: form.capacity ? Number(form.capacity) : null,
      };
      await eventService.updateEvent(id, payload);
      navigate("/events");
    } catch (err) {
      alert("Failed to update event.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/events");
  };

  if (loading || !form) {
    return <div className="event-form-page">Loading event...</div>;
  }

  return (
    <div className="event-form-page">
      <div className="event-form-card">
        <h2 className="event-form-title">Edit Event</h2>
        <p className="event-form-subtitle">
          Update the details and save changes.
        </p>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-row two-cols">
            <div className="form-field">
              <label>Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
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
                required
              />
            </div>
            <div className="form-field">
              <label>Department</label>
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
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
              />
            </div>
            <div className="form-field">
              <label>Speaker / Resource Person</label>
              <input
                name="speaker"
                value={form.speaker}
                onChange={handleChange}
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
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
