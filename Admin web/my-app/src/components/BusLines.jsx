import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/BusLines.css";

const BusLines = () => {
  const [busLines, setBusLines] = useState([]);
  const [newLine, setNewLine] = useState("");
  const [stationInput, setStationInput] = useState("");
  const [activeLineIndex, setActiveLineIndex] = useState(null);

  // Fetch all bus lines from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/buslines")
      .then((response) => setBusLines(response.data))
      .catch((error) => console.error("Error fetching bus lines:", error));
  }, []);

  // Add a new bus line
  const addBusLine = () => {
    if (newLine.trim()) {
      axios.post("http://localhost:5000/api/buslines", { name: newLine.trim() })
        .then((response) => {
          setBusLines([...busLines, response.data]);
          setNewLine("");
        })
        .catch((error) => console.error("Error adding bus line:", error));
    }
  };

  // Delete a bus line
  const deleteBusLine = (id) => {
    axios.delete(`http://localhost:5000/api/buslines/${id}`)
      .then(() => {
        setBusLines(busLines.filter((line) => line._id !== id));
      })
      .catch((error) => console.error("Error deleting bus line:", error));
  };

  // Add a station to a bus line
  const addStation = (id) => {
    if (stationInput.trim()) {
      axios.put(`http://localhost:5000/api/buslines/${id}/stations`, { station: stationInput.trim() })
        .then((response) => {
          setBusLines(busLines.map((line) => (line._id === id ? response.data : line)));
          setStationInput("");
          setActiveLineIndex(null);
        })
        .catch((error) => console.error("Error adding station:", error));
    }
  };

  return (
    <div className="content-box">
      <h2>Bus Lines</h2>
      <div className="busline-form">
        <input
          type="text"
          placeholder="Enter bus line name"
          value={newLine}
          onChange={(e) => setNewLine(e.target.value)}
        />
        <button className="add-btn" onClick={addBusLine}>
          Add Bus Line
        </button>
      </div>
      <ul className="buslines-list">
        {busLines.map((line, index) => (
          <li key={line._id} className="busline-item">
            <div className="busline-header">
              <strong>{line.name}</strong>
              <button onClick={() => deleteBusLine(line._id)}>Delete Line</button>
            </div>
            <div className="stations-list">
              {line.stations.length > 0 ? (
                <ul>
                  {line.stations.map((station, i) => (
                    <li key={i}>{station}</li>
                  ))}
                </ul>
              ) : (
                <p>No stations added.</p>
              )}
            </div>
            {activeLineIndex === index ? (
              <div className="station-form">
                <input
                  type="text"
                  placeholder="Enter station name"
                  value={stationInput}
                  onChange={(e) => setStationInput(e.target.value)}
                />
                <button className="add-btn" onClick={() => addStation(line._id)}>
                  Add Station
                </button>
                <button onClick={() => setActiveLineIndex(null)}>Cancel</button>
              </div>
            ) : (
              <button className="add-btn" onClick={() => setActiveLineIndex(index)}>
                Add Station
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusLines;
