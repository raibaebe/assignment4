const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// Render the task creation page
router.get('/tasks/new', (req, res) => {
    res.render('createTask');
});

// Create a new task (POST request)
router.post('/tasks', async (req, res) => {
    const { title, description, status } = req.body;
    const newTask = new Task({
        title,
        description,
        status,
        userId: 'dummyUserId' // Just for testing, replace later
    });

    try {
        await newTask.save();
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all tasks with optional status filter
router.get('/tasks', async (req, res) => {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    try {
        const tasks = await Task.find(filter);
        res.render('home', { tasks, status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Edit task page
router.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        res.render('editTask', { task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update task
router.post('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete task
router.get('/tasks/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Task.findByIdAndDelete(id);
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
