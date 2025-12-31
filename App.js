import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const API_URL = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setStudents(response.data.data);
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching students');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle student added
  const handleStudentAdded = (newStudent) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  // Handle student updated
  const handleStudentUpdated = (updatedStudent) => {
    setStudents(prev =>
      prev.map(student =>
        student._id === updatedStudent._id ? updatedStudent : student
      )
    );
    setEditingStudent(null);
  };

  // Handle student deleted
  const handleStudentDeleted = (deletedId) => {
    setStudents(prev => prev.filter(student => student._id !== deletedId));
  };

  // Handle edit
  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  if (loading && students.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Student Record Management</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <StudentForm
        studentToEdit={editingStudent}
        onStudentAdded={handleStudentAdded}
        onStudentUpdated={handleStudentUpdated}
        onCancelEdit={handleCancelEdit}
      />
      
      <hr />
      
      <StudentList
        students={students}
        onEdit={handleEdit}
        onDelete={handleStudentDeleted}
        onRefresh={fetchStudents}
      />
    </div>
  );
}

export default App;