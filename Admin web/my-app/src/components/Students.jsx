import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentPopupForm from "./StudentPopupForm";
import "../css/Cards.css";

const API_URL = "http://localhost:5000/api/students";
const BUSLINES_API = "http://localhost:5000/api/buslines"; // Fetch bus lines

const Students = () => {
  const [students, setStudents] = useState([]);
  const [busLines, setBusLines] = useState([]); // Store bus lines
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch students
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  // ✅ Fetch bus lines from backend
  useEffect(() => {
    axios.get(BUSLINES_API)
      .then(response => setBusLines(response.data))
      .catch(error => console.error("Error fetching bus lines:", error));
  }, []);

  // ✅ Add or Update Student
  const handleSubmit = (student) => {
    if (editingStudent) {
      axios.put(`${API_URL}/${editingStudent.id}`, student)
        .then(response => {
          setStudents(students.map(s => s.id === student.id ? response.data : s));
          setEditingStudent(null);
        })
        .catch(error => console.error("Error updating student:", error));
    } else {
      axios.post(API_URL, student)
        .then(response => setStudents([...students, response.data]))
        .catch(error => console.error("Error adding student:", error));
    }
    setPopupOpen(false);
  };

  // ✅ Edit Student
  const handleEdit = (student) => {
    setEditingStudent(student);
    setPopupOpen(true);
  };

  // ✅ Delete Student
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setStudents(students.filter(student => student.id !== id)))
      .catch(error => console.error("Error deleting student:", error));
  };

  // ✅ Search students by ID
  const filteredStudents = students.filter(student =>
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-box">
      {/* Header Section */}
      <div className="header-grid">
        <h2>Students</h2>
        <button className="add-btn" onClick={() => setPopupOpen(true)}>Add Student</button>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Student ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Student Cards */}
      <div className="cards-grid">
        {filteredStudents.map((student) => (
          <div key={student.id} className="card">
            <strong>{student.name}</strong>
            <p>ID: {student.id}</p>
            <p>Email: {student.email}</p>
            <p>Bus Line: {student.busLine}</p>
            <p>Bus Station: {student.busStation}</p>
            <button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Popup Form */}
      {isPopupOpen && (
        <StudentPopupForm
          title={editingStudent ? "Edit Student" : "Add Student"}
          initialData={editingStudent}
          onClose={() => {
            setPopupOpen(false);
            setEditingStudent(null);
          }}
          onSubmit={handleSubmit}
          busLines={busLines} // Pass fetched bus lines
        />
      )}
    </div>
  );
};

export default Students;
