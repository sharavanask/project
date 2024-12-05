const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Database connection setup
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sharak@2004',
    database: 'employee_db'
}).promise();

// Function to insert data into MySQL
async function insertData(name, empid, email, ph, dept, djoin, role) {
    try {
        await db.query(
            "INSERT INTO employees (name, employee_id, email, phone, department, date_of_joining, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, empid, email, ph, dept, djoin, role]
        );
    } catch (err) {
        throw err;
    }
}

// Route to handle POST request for employee data
app.post('/employee', async (req, res) => {
    const { name, empid, email, ph, dept, djoin, role } = req.body;

    // Input validation
    if (!name || !empid || !email || !ph || !dept || !djoin || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Insert employee data into the database
        await insertData(name, empid, email, ph, dept, djoin, role);
        res.status(200).json({ message: 'Employee added successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error adding employee' });
    }
});

// Start server
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
