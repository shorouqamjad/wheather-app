// Require Express and other necessary modules
const express = require('express');
const cors = require('cors');

// Start up an instance of app
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors()); // Enable CORS

// Initialize the main project folder
app.use(express.static('website'));

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});

// GET route
app.get('/all', (req, res) => {
  res.json(projectData); // Send the projectData object as JSON
});

// POST route
app.post('/add', (req, res) => {
  // Add new entry to the projectData object
  projectData = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  };
  res.json(projectData); // Send the updated projectData object back as JSON
});
