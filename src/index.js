const express = require('express');
const app = express();
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes); // Ensure routes are registered

// Home route (for example, rendering a task list)
app.get('/', (req, res) => {
  res.render('home');  // Make sure the home.ejs file exists
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
