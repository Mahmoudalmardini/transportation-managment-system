import React, { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Students from "./Students";
import BusDrivers from "./BusDrivers";
import BusLines from "./BusLines";
import axios from "axios";
import "../css/App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState("students");
  const [busLines, setBusLines] = useState([]);
  const [students, setStudents] = useState([]);
  const [busDrivers, setBusDrivers] = useState([]);

  // Check if admin is already logged in (token exists in local storage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderView = () => {
    switch (view) {
      case "students":
        return (
          <Students
            students={students}
            setStudents={setStudents}
            busLines={busLines}
          />
        );
      case "busDrivers":
        return (
          <BusDrivers
            busDrivers={busDrivers}
            setBusDrivers={setBusDrivers}
            busLines={busLines}
          />
        );
      case "busLines":
        return <BusLines busLines={busLines} setBusLines={setBusLines} />;
      default:
        return <div>Select a view from the sidebar</div>;
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="dashboard">
        <Sidebar view={view} setView={setView} onLogout={handleLogout} />
        <div className="content">{renderView()}</div>
      </div>
      <Footer />
    </div>
  );
};

export default App;