// src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Register.css'; // your event theme

const API_BASE_URL = 'http://localhost:4000'; // your event JSON server

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      // Check if user already exists
      const existingUsers = await axios.get(`${API_BASE_URL}/users?email=${encodeURIComponent(form.email)}`);
      
      if (existingUsers.data.length > 0) {
        setError('Email already registered.');
        return;
      }

      // Create new user
      const newUser = await axios.post(`${API_BASE_URL}/users`, {
        email: form.email,
        password: form.password
      });

      localStorage.setItem('eventUser', JSON.stringify({ id: newUser.data.id, email: form.email }));
      navigate('/events');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
  <div className="auth-page">  {/* ← CHANGED */}
    <div className="auth-card">  {/* ← CHANGED */}
      <h2 className="auth-title">Create Account</h2>  {/* ← CHANGED */}
      <p className="auth-subtitle">Join to manage academic events</p>  {/* ← CHANGED */}

      {error && <div className="auth-error">{error}</div>}  {/* ← CHANGED */}

      <form className="auth-form" onSubmit={handleSubmit}>  {/* ← CHANGED */}
        <div className="auth-field">  {/* ← CHANGED */}
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="student@college.edu"
            required
          />
        </div>

        <div className="auth-field">  {/* ← CHANGED */}
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            required
            minLength="6"
          />
        </div>

        <button type="submit" className="auth-submit">Create Account</button>  {/* ← CHANGED */}
      </form>

      <p className="auth-footer-text">  {/* ← CHANGED */}
        Already have account?{' '}
        <span className="auth-link" onClick={() => navigate('/login')}>  {/* ← CHANGED */}
          Login here
        </span>
      </p>
    </div>
  </div>
);

};

export default Register;
