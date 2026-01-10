const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// POST /api/students - Add a new student
router.post('/', async (req, res) => {
  try {
    const { 
      studentName, 
      grade, 
      subject,
      email,
      phoneNumber,
      address,
      dateOfBirth,
      rollNumber,
      parentName,
      parentContact,
      className,
      section,
      attendance,
      marks,
      status
    } = req.body;

    if (!studentName || !grade || !subject) {
      return res.status(400).json({ error: 'All required fields (studentName, grade, subject) are required' });
    }

    const student = new Student({
      studentName,
      grade,
      subject,
      email,
      phoneNumber,
      address,
      dateOfBirth,
      rollNumber,
      parentName,
      parentContact,
      className,
      section,
      attendance,
      marks,
      status
    });

    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/students - Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/students/:id - Update a student
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      studentName, 
      grade, 
      subject,
      email,
      phoneNumber,
      address,
      dateOfBirth,
      rollNumber,
      parentName,
      parentContact,
      className,
      section,
      attendance,
      marks,
      status
    } = req.body;

    if (!studentName || !grade || !subject) {
      return res.status(400).json({ error: 'All required fields (studentName, grade, subject) are required' });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { 
        studentName, 
        grade, 
        subject,
        email,
        phoneNumber,
        address,
        dateOfBirth,
        rollNumber,
        parentName,
        parentContact,
        className,
        section,
        attendance,
        marks,
        status
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/students/:id - Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully', student: deletedStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



