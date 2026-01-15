import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import eventService from "../services/eventServices";
import "../index.css"; // use the details/page CSS, not index.css

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await eventService.getEventById(id);
        setEvent(res.data);
      } catch (err) {
        alert("Failed to load event details.");
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id, navigate]);

  if (loading || !event) {
    return <div className="event-details-page">Loading event...</div>;
  }

  return (
    <div className="event-details-page">
      <div className="event-details-card">
        <div className="details-header">
          <div>
            <p className="details-type">{event.type || "Event"}</p>
            <h2 className="details-title">{event.title}</h2>
            <p className="details-meta">
              {event.date} · {event.time} · {event.venue}
            </p>
            <p className="details-meta-small">
              {event.department && `${event.department} · `}
              {event.organizer}
            </p>
          </div>
          <div className="details-status-badge">
            {event.status || "Scheduled"}
          </div>
        </div>

        <div className="details-body">
          <div className="details-section">
            <h3>Overview</h3>
            <p>{event.description || "No description provided."}</p>
          </div>

          <div className="details-two-cols">
            <div className="details-section">
              <h3>Speaker</h3>
              <p>{event.speaker || "TBA"}</p>
            </div>
            <div className="details-section">
              <h3>Mode & Capacity</h3>
              <p>
                Mode: {event.mode || "Offline"}
                <br />
                Seats: {event.capacity || "Not specified"}
              </p>
            </div>
          </div>

          {event.registrationLink && (
            <div className="details-section">
              <h3>Registration</h3>
              <a
                href={event.registrationLink}
                className="details-link"
                target="_blank"
                rel="noreferrer"
              >
                Open registration page
              </a>
            </div>
          )}
        </div>

        <div className="details-footer">
          <button
            className="btn-secondary"
            onClick={() => navigate("/events")}
          >
            Back to Events
          </button>
          <button
            className="btn-primary"
            onClick={() => navigate(`/edit/${id}`)}  
          >
            Edit Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
