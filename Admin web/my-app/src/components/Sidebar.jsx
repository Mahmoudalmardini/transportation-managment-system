// src/components/Sidebar.jsx
import React from "react";
import { FaUserGraduate, FaBus, FaRoute, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import "../css/Sidebar.css";

const Sidebar = ({ view, setView, onLogout }) => {
  return (
    <div className="sidebar">
      <button
        className={view === "students" ? "active" : ""}
        onClick={() => setView("students")}
      >
        <FaUserGraduate />
        <span>Students</span>
      </button>
      <button
        className={view === "busDrivers" ? "active" : ""}
        onClick={() => setView("busDrivers")}
      >
        <FaBus />
        <span>Bus Drivers</span>
      </button>
      <button
        className={view === "busLines" ? "active" : ""}
        onClick={() => setView("busLines")}
      >
        <FaRoute />
        <span>Bus Lines</span>
      </button>
      <button
        className={view === "statistics" ? "active" : ""}
        onClick={() => setView("statistics")}
      >
        <FaChartBar />
        <span>Statistics</span>
      </button>

      {/* Logout button container */}
      <div className="logout-btn">
        <button onClick={onLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;