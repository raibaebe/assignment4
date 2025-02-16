const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const authenticate = require('../middleware/authenticate');

router.get('/tasks/new', authenticate, (req, res) => {
    res.render('createTask');
});

router.post('/tasks', authenticate, async (req, res) => {
    const { title, description, status } = req.body;
    const newTask = new Task({
        title,
        description,
        status,
        userId: req.user.userId
    });

    try {
        await newTask.save();
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/tasks', authenticate, async (req, res) => {
    const { status } = req.query;
    const filter = { userId: req.user.userId };
    if (status) filter.status = status;

    try {
        const tasks = await Task.find(filter);
        res.render('home', { tasks, status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/tasks/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        res.render('editTask', { task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/tasks/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/tasks/delete/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        await Task.findByIdAndDelete(id);
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
