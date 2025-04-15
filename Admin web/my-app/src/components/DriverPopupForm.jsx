import React, { useState, useEffect } from "react";
import "../css/PopupForm.css";

const DriverPopupForm = ({ title, initialData, onClose, onSubmit, busLines }) => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    busRoute: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.capacity && formData.busRoute) {
      onSubmit(formData);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Driver Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
          <select
            name="busRoute"
            value={formData.busRoute}
            onChange={handleChange}
            required
          >
            <option value="">Select Bus Route</option>
            {busLines.map((line, index) => (
              <option key={index} value={line.name}>
                {line.name} {/* Only show bus line name */}
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

export default DriverPopupForm;
