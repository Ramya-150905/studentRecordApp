# Student Record Management App

A simple MERN stack web application for managing student records with full CRUD operations.

## Features

- ✅ Add a new student with studentName, grade, and subject
- ✅ View all students in a table layout
- ✅ Update student details
- ✅ Delete a student from the database

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **HTTP Client:** Axios

## Project Structure

```
StudentRecordDetails/
├── backend/
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentForm.js
│   │   │   ├── StudentForm.css
│   │   │   ├── StudentList.js
│   │   │   └── StudentList.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed locally or MongoDB Atlas account)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/studentrecords
   PORT=5000
   ```

   **Note:** If you're using MongoDB Atlas, replace the MONGODB_URI with your Atlas connection string.

4. Start the backend server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The application will automatically open in your browser at `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:5000/api/students`

- **POST** `/api/students` - Add a new student
  ```json
  {
    "studentName": "John Doe",
    "grade": "A",
    "subject": "Mathematics"
  }
  ```

- **GET** `/api/students` - Get all students

- **PUT** `/api/students/:id` - Update a student
  ```json
  {
    "studentName": "Jane Doe",
    "grade": "B",
    "subject": "Science"
  }
  ```

- **DELETE** `/api/students/:id` - Delete a student

## Student Schema

```javascript
{
  studentName: String (required),
  grade: String (required),
  subject: String (required),
  createdAt: Date (auto-generated)
}
```

## Usage

1. **Add a Student:**
   - Fill in the form with student name, grade, and subject
   - Click "Add Student" button

2. **View Students:**
   - All students are displayed in a table below the form

3. **Update a Student:**
   - Click the "Update" button next to the student you want to edit
   - Modify the details in the form
   - Click "Update Student" to save changes or "Cancel" to discard

4. **Delete a Student:**
   - Click the "Delete" button next to the student
   - Confirm the deletion in the popup dialog

## Troubleshooting

- **MongoDB Connection Error:** Ensure MongoDB is running locally or your Atlas connection string is correct
- **Port Already in Use:** Change the PORT in the `.env` file if port 5000 is already in use
- **CORS Errors:** Make sure the backend server is running on port 5000

## Notes

- No authentication is implemented (as per requirements)
- The application focuses on core CRUD functionality
- Make sure both backend and frontend servers are running simultaneously




