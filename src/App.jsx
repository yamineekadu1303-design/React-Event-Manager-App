// App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import EventList from "./components/EventList";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import EventDetails from "./components/EventDetails";
import Login from "./components/Login";
import Register from "./components/Register";

const PrivateRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  // load user from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("eventUser");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("eventUser");
      }
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    const userData = {
      id: loggedInUser.id,
      email: loggedInUser.email,
    };
    setUser(userData);
    localStorage.setItem("eventUser", JSON.stringify(userData));
    navigate("/"); // ALWAYS go Home after login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("eventUser");
    navigate("/login");
  };

  return (
    <div className="app-wrapper">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <Link className="navbar-brand fw-bold" to={isLoggedIn ? "/" : "/login"}>
            🎓 Academic Events
          </Link>

          <div className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/events">Events</Link>
                <Link className="nav-link" to="/add">Add Event</Link>
                <button
                  className="btn btn-sm btn-outline-light ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="main-shell">
        <Routes>
          {/* Public routes */}
          <Route path="/register" element={<Register />} />

          {/* Login route: if already logged in, push to Home */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/events"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <EventList />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <AddEvent />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <EditEvent />
              </PrivateRoute>
            }
          />
          <Route
            path="/view/:id"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <EventDetails />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
          />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="bg-dark text-light py-3 mt-5">
        <div className="container text-center">
          <p className="mb-0">Academic Events © 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
