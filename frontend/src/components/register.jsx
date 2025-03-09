import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Move styles to a separate file

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!username || !password) {
      setError("⚠ Username and password are required!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5001/signup", {
        username,
        password,
      });

      alert("✅ Signup successful! Please sign in.");
      navigate("/signin"); // Redirect to Signin page
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="switch-text">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
