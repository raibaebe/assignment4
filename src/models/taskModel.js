// src/models/taskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'pending' }, // Status can be 'pending' or 'completed'
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User model
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
