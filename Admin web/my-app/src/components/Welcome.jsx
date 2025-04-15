// src/components/Welcome.jsx
import React from "react";
import "../css/Login.css"; // Reuse similar styles for centered forms

const Welcome = ({ onLogin, onSignIn }) => {
  return (
    <div className="login-container">
      <div className="login-box content-box">
        <h2>Welcome</h2>
        <p>Please choose an option</p>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
          <button onClick={onLogin} className="add-btn" style={{ marginRight: "10px" }}>
            Login
          </button>
          <button onClick={onSignIn} className="add-btn">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;