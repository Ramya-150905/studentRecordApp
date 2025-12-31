const Student = require('../models/Student');

// Add new student
const addStudent = async (req, res) => {
  try {
    const { studentName, grade, subject } = req.body;

    if (!studentName || !grade || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Please provide studentName, grade, and subject'
      });
    }

    const student = new Student({
      studentName,
      grade,
      subject
    });

    const savedStudent = await student.save();

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: savedStudent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding student',
      error: error.message
    });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentName, grade, subject } = req.body;

    const updateData = {};
    if (studentName) updateData.studentName = studentName;
    if (grade) updateData.grade = grade;
    if (subject) updateData.subject = subject;

    const student = await Student.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message
    });
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  updateStudent,
  deleteStudent
};
