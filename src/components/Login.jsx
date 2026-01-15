// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Register.css'; // uses auth-page/auth-card styles

const API_BASE_URL = 'http://localhost:4000';

const Login = ({ onLogin }) => {
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

    try {
      const res = await axios.get(
        `${API_BASE_URL}/users?email=${encodeURIComponent(form.email)}&password=${encodeURIComponent(form.password)}`
      );

      if (res.data && res.data.length === 1) {
        const user = res.data[0];
        localStorage.setItem('eventUser', JSON.stringify({ id: user.id, email: user.email }));
        if (onLogin) onLogin(user);
        navigate('/events');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Login to manage academic events</p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
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

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="password123"
              required
            />
          </div>

          <button type="submit" className="auth-submit">Login</button>
        </form>

        <p className="auth-footer-text">
          New here?{' '}
          <span
            className="auth-link"
            onClick={() => navigate('/register')}
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
