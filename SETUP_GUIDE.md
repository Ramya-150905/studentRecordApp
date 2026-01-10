# MongoDB & Postman Setup Guide

## Part 1: Running MongoDB

### Option A: Local MongoDB Installation

1. **Install MongoDB Community Server** (if not installed):
   - Download from: https://www.mongodb.com/try/download/community
   - Install MongoDB on your Windows machine
   - MongoDB typically installs as a Windows Service

2. **Start MongoDB Service:**
   - Open **Services** (Windows Key + R, type `services.msc`)
   - Find "MongoDB" service
   - Right-click and select "Start"
   - OR use Command Prompt as Administrator:
     ```powershell
     net start MongoDB
     ```

3. **Verify MongoDB is Running:**
   - Open Command Prompt or PowerShell
   - Type: `mongod --version`
   - You should see MongoDB version information

4. **Access MongoDB Shell (to view data):**
   ```powershell
   mongo
   ```
   Or if using newer version:
   ```powershell
   mongosh
   ```

### Option B: MongoDB Atlas (Cloud - Recommended for Testing)

1. **Create Free Account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a Cluster:**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select your preferred region
   - Create cluster

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/studentrecords?retryWrites=true&w=majority`

4. **Update .env file:**
   - Open `backend/.env`
   - Replace MONGODB_URI with your Atlas connection string

---

## Part 2: Running Backend Server

1. **Navigate to backend folder:**
   ```powershell
   cd backend
   ```

2. **Install dependencies (if not done):**
   ```powershell
   npm install
   ```

3. **Start the server:**
   ```powershell
   npm start
   ```

4. **You should see:**
   ```
   Connected to MongoDB
   Server is running on port 5000
   ```

---

## Part 3: Viewing MongoDB Data

### Method 1: Using MongoDB Compass (GUI - Recommended)

1. **Download MongoDB Compass:**
   - https://www.mongodb.com/try/download/compass
   - Install it

2. **Connect to MongoDB:**
   - **Local:** `mongodb://localhost:27017`
   - **Atlas:** Use your Atlas connection string
   - Click "Connect"

3. **View Data:**
   - Navigate to `studentrecords` database
   - Click on `students` collection
   - See all your student records in a nice table view

### Method 2: Using MongoDB Shell (Command Line)

1. **Open MongoDB Shell:**
   ```powershell
   mongosh
   ```
   Or older version:
   ```powershell
   mongo
   ```

2. **Use Database:**
   ```javascript
   use studentrecords
   ```

3. **View All Students:**
   ```javascript
   db.students.find().pretty()
   ```

4. **Count Students:**
   ```javascript
   db.students.count()
   ```

5. **Find Specific Student:**
   ```javascript
   db.students.findOne({ studentName: "John Doe" })
   ```

6. **Exit:**
   ```javascript
   exit
   ```

---

## Part 4: Testing API with Postman

### Step 1: Install Postman

- Download from: https://www.postman.com/downloads/
- Install and create a free account (optional but recommended)

### Step 2: Create a New Collection

1. Open Postman
2. Click "New" → "Collection"
3. Name it: "Student Record API"
4. Click "Create"

### Step 3: Test API Endpoints

#### 1. Test Server is Running (GET)
- **Method:** GET
- **URL:** `http://localhost:5000/`
- **Click:** "Send"
- **Expected Response:**
  ```json
  {
    "message": "Student Record Management API"
  }
  ```

#### 2. Get All Students (GET)
- **Method:** GET
- **URL:** `http://localhost:5000/api/students`
- **Click:** "Send"
- **Expected Response:** Array of students (empty initially)

#### 3. Add a New Student (POST)
- **Method:** POST
- **URL:** `http://localhost:5000/api/students`
- **Headers:** 
  - Key: `Content-Type`
  - Value: `application/json`
- **Body:** 
  - Select "raw" and "JSON"
  - Paste this:
  ```json
  {
    "studentName": "John Doe",
    "grade": "A",
    "subject": "Mathematics",
    "email": "john.doe@example.com",
    "phoneNumber": "123-456-7890",
    "address": "123 Main St, City, State",
    "dateOfBirth": "2005-05-15",
    "rollNumber": "ST001",
    "parentName": "Jane Doe",
    "parentContact": "098-765-4321",
    "className": "10th Grade",
    "section": "A",
    "attendance": 85,
    "marks": 92,
    "status": "Active"
  }
  ```
- **Click:** "Send"
- **Expected Response:** Created student object with _id

#### 4. Add More Students
- Repeat POST request with different data
- Try these examples:

**Student 2:**
```json
{
  "studentName": "Sarah Smith",
  "grade": "B",
  "subject": "Science",
  "email": "sarah.smith@example.com",
  "phoneNumber": "234-567-8901",
  "address": "456 Oak Ave",
  "dateOfBirth": "2005-08-20",
  "rollNumber": "ST002",
  "parentName": "Robert Smith",
  "parentContact": "234-567-8901",
  "className": "10th Grade",
  "section": "B",
  "attendance": 90,
  "marks": 88,
  "status": "Active"
}
```

**Student 3:**
```json
{
  "studentName": "Mike Johnson",
  "grade": "A+",
  "subject": "English",
  "email": "mike.j@example.com",
  "phoneNumber": "345-678-9012",
  "rollNumber": "ST003",
  "className": "11th Grade",
  "section": "A",
  "attendance": 95,
  "marks": 96,
  "status": "Active"
}
```

#### 5. Get All Students Again (GET)
- **Method:** GET
- **URL:** `http://localhost:5000/api/students`
- **Click:** "Send"
- **Expected Response:** Array with all students you created

#### 6. Update a Student (PUT)
- **Method:** PUT
- **URL:** `http://localhost:5000/api/students/{_id}`
  - Replace `{_id}` with actual student ID from previous response
  - Example: `http://localhost:5000/api/students/65a1b2c3d4e5f6g7h8i9j0k1`
- **Headers:** 
  - Key: `Content-Type`
  - Value: `application/json`
- **Body:** 
  ```json
  {
    "studentName": "John Doe Updated",
    "grade": "A+",
    "subject": "Mathematics",
    "email": "john.doe.updated@example.com",
    "phoneNumber": "123-456-7890",
    "attendance": 90,
    "marks": 95,
    "status": "Active"
  }
  ```
- **Click:** "Send"
- **Expected Response:** Updated student object

#### 7. Delete a Student (DELETE)
- **Method:** DELETE
- **URL:** `http://localhost:5000/api/students/{_id}`
  - Replace `{_id}` with actual student ID
- **Click:** "Send"
- **Expected Response:** 
  ```json
  {
    "message": "Student deleted successfully",
    "student": { ... }
  }
  ```

### Step 4: Save Requests to Collection

1. After testing each endpoint, click "Save" button
2. Select your collection: "Student Record API"
3. Give it a descriptive name (e.g., "Get All Students", "Add New Student")
4. Click "Save"

---

## Quick Testing Checklist

✅ Backend server running on port 5000
✅ MongoDB connected (check backend terminal)
✅ Test GET `/` - Should return API message
✅ Test GET `/api/students` - Should return empty array or students
✅ Test POST `/api/students` - Add a student
✅ Test GET `/api/students` - Verify student was added
✅ Test PUT `/api/students/:id` - Update a student
✅ Test DELETE `/api/students/:id` - Delete a student
✅ View data in MongoDB Compass or shell

---

## Troubleshooting

### MongoDB Connection Error
- **Problem:** "MongoDB connection error"
- **Solution:** 
  - Make sure MongoDB service is running
  - Check `.env` file has correct connection string
  - Verify MongoDB is accessible on port 27017

### Port 5000 Already in Use
- **Problem:** "Port 5000 is already in use"
- **Solution:** 
  - Change PORT in `.env` file to another port (e.g., 5001)
  - Update Postman URLs to use new port

### Postman Connection Refused
- **Problem:** "Could not get any response"
- **Solution:**
  - Make sure backend server is running
  - Check URL is correct: `http://localhost:5000`
  - Verify no firewall blocking the connection

### Cannot See Data in MongoDB
- **Problem:** Data not showing in MongoDB
- **Solution:**
  - Make sure you're looking in correct database: `studentrecords`
  - Check collection name: `students` (plural)
  - Refresh MongoDB Compass or reconnect

---

## Next Steps

1. ✅ Run MongoDB (local or Atlas)
2. ✅ Start backend server
3. ✅ Test all endpoints in Postman
4. ✅ View data in MongoDB Compass
5. ✅ Start frontend and test full application

