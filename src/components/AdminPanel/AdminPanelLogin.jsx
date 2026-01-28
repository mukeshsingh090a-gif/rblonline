import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminPanelLogin.css';
import { FaSpinner } from "react-icons/fa"; // spinner icon


export default function AdminPanelLogin({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // loading state


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // start spinner
    try {
      const response = await fetch('https://rblonline.onrender.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // ✅ Persist login
      localStorage.setItem("adminLoggedIn", "true");

      onLogin();          // update parent state
      navigate('/admin'); // go to admin panel

    } catch (err) {
      setError('Server not reachable');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <h2 className="admin-login-title">Admin Login</h2>
        <p className="admin-login-subtitle">RBL Online Dashboard</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="error-msg">{error}</div>}

          <div className="input-group">
            <label>User ID</label>
            <input
              type="text"
              placeholder="Enter admin user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <FaSpinner className="rotating" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
