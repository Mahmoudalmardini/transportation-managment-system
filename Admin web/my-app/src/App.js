// src/components/App.jsx
import React, { useState } from "react";
import Welcome from "./components/Welcome";
import AdminLogin from "./components/AdminLogin";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Students from "./components/Students";
import BusDrivers from "./components/BusDrivers";
import BusLines from "./components/BusLines";
import Statistics from "./components/Statistics";
// New

import "./css/App.css";


const App = () => {
  // Control the initial page flow: "welcome", "login", "signin", "dashboard"
  const [currentPage, setCurrentPage] = useState("welcome");
  // Data arrays (persist across view changes)
  const [busLines, setBusLines] = useState([]);
  const [students, setStudents] = useState([]);
  const [busDrivers, setBusDrivers] = useState([]);
  // Dashboard view state: "students", "busDrivers", "busLines", "statistics"
  const [view, setView] = useState("students");

  // Logout handler: return to welcome page
  const handleLogout = () => {
    setCurrentPage("welcome");
  };

  // Render initial pages based on currentPage
  if (currentPage === "welcome") {
    return (
      <Welcome
        onLogin={() => setCurrentPage("login")}
        onSignIn={() => setCurrentPage("signin")}
      />
    );
  }
  if (currentPage === "login") {
    return <AdminLogin onLogin={() => setCurrentPage("dashboard")} />;
  }
  if (currentPage === "signin") {
    return <SignIn onSignIn={() => setCurrentPage("dashboard")} />;
  }

  // Render dashboard view based on "view" state
  let dashboardView;
  switch (view) {
    case "students":
      dashboardView = (
        <Students
          students={students}
          setStudents={setStudents}
          busLines={busLines}
        />
      );
      break;
    case "busDrivers":
      dashboardView = (
        <BusDrivers
          busDrivers={busDrivers}
          setBusDrivers={setBusDrivers}
          busLines={busLines}
        />
      );
      break;
    case "busLines":
      dashboardView = <BusLines busLines={busLines} setBusLines={setBusLines} />;
      break;
    case "statistics":
      dashboardView = (
        <Statistics
          busLines={busLines}
          students={students}
          busDrivers={busDrivers}
        />
      );
      break;
    default:
      dashboardView = <div>Select a view from the sidebar</div>;
  }

  return (
    <div className="app-container">
      <Header />
      <div className="dashboard">
        <Sidebar view={view} setView={setView} onLogout={handleLogout} />
        <div className="content">{dashboardView}</div>
      </div>
      <Footer />
    </div>
  );
};

export default App;