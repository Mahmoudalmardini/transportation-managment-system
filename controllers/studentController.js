const Student = require("../models/Student");

// ✅ Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add new student
exports.addStudent = async (req, res) => {
  const { id, name, email, busLine, busStation } = req.body;
  try {
    const newStudent = new Student({ id, name, email, busLine, busStation });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update student details
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ id: req.params.id });
    if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
