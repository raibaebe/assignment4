const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
  const { title, description, userId } = req.body;

  const newTask = new Task({
    title,
    description,
    status: 'pending',
    userId
  });

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasksByUser = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
