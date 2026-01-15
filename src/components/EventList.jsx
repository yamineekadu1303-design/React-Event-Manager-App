import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import eventService from "../services/eventServices";
import "../EventList.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await eventService.getAllEvents();
      setEvents(res.data || []);
      setError("");
    } catch (err) {
      setError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await eventService.deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      alert("Failed to delete event.");
    }
  };

  // UPDATED: match App.jsx routes /view/:id and /edit/:id
  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return <div className="event-list-page">Loading events...</div>;
  }

  if (error) {
    return (
      <div className="event-list-page">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="event-list-page">
      <div className="event-list-inner">
        <div className="event-list-header">
          <div>
            <h2 className="event-list-title">All Academic Events</h2>
            <p className="event-list-subtitle">
              Browse seminars, workshops, and hackathons scheduled in your
              department.
            </p>
          </div>
          <button className="btn-primary" onClick={() => navigate("/add")}>
            + Add New Event
          </button>
        </div>

        {events.length === 0 ? (
          <p className="empty-text">No events yet. Start by adding one!</p>
        ) : (
          <div className="event-card-grid">
            {events.map((ev) => (
              <div key={ev.id} className="event-card">
                <div className="event-card-top">
                  <div className="event-type-pill">{ev.type || "Event"}</div>
                  <div className="event-status-pill">
                    {ev.status || "Scheduled"}
                  </div>
                </div>

                <h3 className="event-title">{ev.title}</h3>

                <p className="event-meta">
                  {ev.date} · {ev.time} · {ev.venue}
                </p>

                <p className="event-meta-small">
                  {ev.department} · {ev.organizer}
                </p>

                <p className="event-desc">
                  {ev.description && ev.description.length > 120
                    ? ev.description.slice(0, 120) + "..."
                    : ev.description || "No description provided."}
                </p>

                <div className="event-tags-row">
                  {ev.mode && <span className="tag">{ev.mode}</span>}
                  {ev.capacity && (
                    <span className="tag">Seats: {ev.capacity}</span>
                  )}
                </div>

                <div className="event-card-actions">
                  <button
                    className="btn-primary-outline"
                    onClick={() => handleView(ev.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => handleEdit(ev.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(ev.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
