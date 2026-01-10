import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const API_URL = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch all students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Error fetching students');
    }
  };

  // Add new student
  const addStudent = async (studentData) => {
    try {
      const response = await axios.post(API_URL, studentData);
      setStudents([...students, response.data]);
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student');
    }
  };

  // Update student
  const updateStudent = async (id, studentData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, studentData);
      setStudents(students.map(student => 
        student._id === id ? response.data : student
      ));
      setEditingStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Error updating student');
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setStudents(students.filter(student => student._id !== id));
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Error deleting student');
      }
    }
  };

  // Handle edit
  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="App">
      <h1>Student Record Management</h1>
      
      <StudentForm 
        onAdd={addStudent}
        editingStudent={editingStudent}
        onUpdate={updateStudent}
        onCancel={handleCancelEdit}
      />
      
      <StudentList 
        students={students}
        onEdit={handleEdit}
        onDelete={deleteStudent}
      />
    </div>
  );
}

export default App;




