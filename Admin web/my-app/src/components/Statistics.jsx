// src/components/Statistics.jsx
import React from "react";
import "../css/Cards.css"; // Reusing content-box and card styles

const Statistics = ({ busLines, students, busDrivers }) => {
  // Calculate total number of stations from all bus lines
  const totalStations = busLines.reduce(
    (sum, line) => sum + (line.stations ? line.stations.length : 0),
    0
  );

  // Temporary vote data for each day
  const voteData = {
    Saturday: { "7:00": 12, "9:00": 18, "1:00": 22, "4:00": 8 },
    Sunday: { "7:00": 10, "9:00": 15, "1:00": 20, "4:00": 5 },
    Monday: { "7:00": 14, "9:00": 16, "1:00": 19, "4:00": 7 },
    Tuesday: { "7:00": 11, "9:00": 17, "1:00": 21, "4:00": 9 }
  };

  // A helper function to render the trip cards for a given day
  const renderTripCards = (dayVotes) => (
    <div className="cards-grid">
      {Object.entries(dayVotes).map(([time, count]) => (
        <div key={time} className="card">
          <strong>{count}</strong>
          <p>{time} Trip Votes</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="content-box">
      <h2>Statistics</h2>
      <div className="cards-grid">
        <div className="card">
          <strong>{busLines.length}</strong>
          <p>Total Bus Lines</p>
        </div>
        <div className="card">
          <strong>{totalStations}</strong>
          <p>Total Stations</p>
        </div>
        <div className="card">
          <strong>{students.length}</strong>
          <p>Total Students</p>
        </div>
        <div className="card">
          <strong>{busDrivers.length}</strong>
          <p>Total Bus Drivers</p>
        </div>
      </div>

      <h3 style={{ marginTop: "30px", textAlign: "center" }}>Trip Votes by Day</h3>
      {Object.entries(voteData).map(([day, votes]) => (
        <div key={day} style={{ marginBottom: "30px" }}>
          <h4 style={{ textAlign: "center" }}>{day}</h4>
          {renderTripCards(votes)}
        </div>
      ))}
    </div>
  );
};

export default Statistics;