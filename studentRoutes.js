const express = require('express');
const router = express.Router();
const {
  addStudent,
  getAllStudents,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

// POST /api/students - Add new student
router.post('/', addStudent);

// GET /api/students - Get all students
router.get('/', getAllStudents);

// PUT /api/students/:id - Update student
router.put('/:id', updateStudent);

// DELETE /api/students/:id - Delete student
router.delete('/:id', deleteStudent);

module.exports = router;