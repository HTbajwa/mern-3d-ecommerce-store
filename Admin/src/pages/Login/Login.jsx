import React, { useState, useEffect } from "react";
import { gettoken, tokenstore } from "../../Localstorage/Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img23 from "../../assets/Ecomus.svg";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"; // Importing icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gettoken()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      email: email,
      password: password,
    };

    try {
      const url = "http://localhost:8000/api/user/login";
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.status === "successfull") {
        tokenstore(response.data);
        navigate("/dashboard");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error response:", error.response);
      setLoginError(error.response?.data?.message || "Something went wrong");
      setTimeout(() => {
        setLoginError(null);
      }, 8000);
      setLoading(false);
    }
  }

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "400px" }}>
        <form onSubmit={submitForm}>
          <div className="text-center mb-4">
            <img src={img23} className="w-50" alt="logo" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <FiMail /> {/* Using React Icon for email */}
              </span>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <FiLock /> {/* Using React Icon for password */}
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />} {/* Toggle icons */}
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <span className="text-primary" role="button">
              Forgot password?
            </span>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Loading..." : "Log In"}
          </button>
          {loginError && (
            <div className="alert alert-danger mt-3 text-center">
              {loginError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
