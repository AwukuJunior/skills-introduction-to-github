import React, { useState } from "react";
import useStore from "../store/useStore";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = useStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/homepage/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo-container">
          <h1>SmartSave</h1>
          <p>Your Personal Finance Manager</p>
        </div>
        <div className="login-page-text">
          <h2>Take Control of Your Finances</h2>
          <p>Track expenses, set savings goals, and achieve financial freedom</p>
        </div>
      </div>
      <div className="right-section">
        <div className="login-form">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to continue to your account</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="create-account">
            Don't have an account?{" "}
            <Link to="/sign-up">Sign up.</Link>
          </div>

          <div className="demo-credentials">
            <p>Demo credentials:</p>
            <p>Email: <strong>admin@example.com</strong></p>
            <p>Password: <strong>pass</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
