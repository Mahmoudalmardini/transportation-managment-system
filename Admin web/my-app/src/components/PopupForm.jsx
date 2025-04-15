import React, { useState, useEffect } from "react";
import "../css/PopupForm.css";

const PopupForm = ({ title, initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    busLine: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.id && formData.busLine) {
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
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
            name="busLine"
            placeholder="Bus Line"
            value={formData.busLine}
            onChange={handleChange}
            required
          />
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

export default PopupForm;
