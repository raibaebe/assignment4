const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const Task = require('./models/taskModel');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();

app.use('/', taskRoutes);
app.use('/', authRoutes);

app.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render('home', { tasks, status: null });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
