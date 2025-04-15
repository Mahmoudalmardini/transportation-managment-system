import React, { useState, useEffect } from "react";
import "../css/PopupForm.css";

const StudentPopupForm = ({
  title,
  initialData,
  onClose,
  onSubmit,
  busLines,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    busLine: "",
    busStation: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "busLine") {
      setFormData((prev) => ({
        ...prev,
        busLine: value,
        busStation: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.id &&
      formData.name &&
      formData.email &&
      formData.busLine &&
      formData.busStation
    ) {
      onSubmit(formData);
    }
  };

  // ✅ Get stations from selected bus line
  const selectedLine = busLines.find((line) => line.name === formData.busLine);
  const stations = selectedLine ? selectedLine.stations : [];

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {/* ✅ Bus Line Dropdown */}
          <select
            name="busLine"
            value={formData.busLine}
            onChange={handleChange}
            required
          >
            <option value="">Select Bus Line</option>
            {busLines.map((line, index) => (
              <option key={index} value={line.name}>
                {line.name}
              </option>
            ))}
          </select>
          {/* ✅ Bus Station Dropdown (dependent on bus line selection) */}
          <select
            name="busStation"
            value={formData.busStation}
            onChange={handleChange}
            required
            disabled={!formData.busLine}
          >
            <option value="">Select Bus Station</option>
            {stations.map((station, index) => (
              <option key={index} value={station}>
                {station}
              </option>
            ))}
          </select>
          <div className="form-actions">
            <button type="submit">{initialData ? "Update" : "Add"}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentPopupForm;
