import React, { useState, useEffect } from "react";
import axios from "axios";
import DriverPopupForm from "./DriverPopupForm";
import "../css/Cards.css";

const API_URL = "http://localhost:5000/api/drivers";
const BUSLINE_API = "http://localhost:5000/api/buslines";

const BusDrivers = () => {
  const [busDrivers, setBusDrivers] = useState([]);
  const [busLines, setBusLines] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(API_URL);
      setBusDrivers(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
    axios
      .get(BUSLINE_API)
      .then((response) => setBusLines(response.data))
      .catch((error) => console.error("Error fetching bus lines:", error));
  }, []);

  const handleSubmitDriver = async (driver) => {
    try {
      await axios.post(API_URL, driver);
      await fetchDrivers();
      setPopupOpen(false);
      setEditingDriver(null);
    } catch (error) {
      console.error("Error adding driver:", error);
    }
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setPopupOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBusDrivers(busDrivers.filter((driver) => driver._id !== id));
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const filteredDrivers = busDrivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-box">
      {/* Header Section */}
      <div className="header-grid">
        <h2>Bus Drivers</h2>
        <button className="add-btn" onClick={() => setPopupOpen(true)}>
          Add Driver
        </button>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Driver Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Driver Cards */}
      <div className="cards-grid">
        {filteredDrivers.map((driver) => (
          <div key={driver._id} className="card">
            <strong>{driver.name}</strong>
            <p>Capacity: {driver.capacity}</p>
            <p>Bus Route: {driver.busRoute}</p>
            <button className="edit-btn" onClick={() => handleEdit(driver)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(driver._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Popup Form */}
      {isPopupOpen && (
        <DriverPopupForm
          title={editingDriver ? "Edit Driver" : "Add Driver"}
          initialData={editingDriver}
          onClose={() => {
            setPopupOpen(false);
            setEditingDriver(null);
          }}
          onSubmit={handleSubmitDriver}
          busLines={busLines}
        />
      )}
    </div>
  );
};

export default BusDrivers;
