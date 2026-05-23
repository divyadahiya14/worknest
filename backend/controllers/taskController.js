const mongoose = require('mongoose');
const Task = require('../models/Task');

// In-Memory Data Store Fallback
let inMemoryTasks = [
  {
    _id: 'mock-1',
    title: 'Design Dashboards',
    description: 'Sketch out modern high-fidelity dark mode views for Kanban columns and login views.',
    priority: 'high',
    status: 'done',
    dueDate: '2026-05-25',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'mock-2',
    title: 'Initialize MERN Project',
    description: 'Set up Vite + React and backend folders, configure scripts and tailwind structures.',
    priority: 'medium',
    status: 'progress',
    dueDate: '2026-05-27',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'mock-3',
    title: 'Integrate dnd features',
    description: 'Connect HTML5 drag events to Kanban columns and map status update APIs.',
    priority: 'medium',
    status: 'todo',
    dueDate: '2026-05-30',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'mock-4',
    title: 'Conduct Performance Reviews',
    description: 'Gather feedback on drag animations, card design alignment, and response times.',
    priority: 'low',
    status: 'todo',
    dueDate: '2026-06-05',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Helper to check if MongoDB is fully connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = async (req, res) => {
  try {
    if (isMongoConnected()) {
      const tasks = await Task.find({}).sort({ createdAt: -1 });
      return res.status(200).json(tasks);
    } else {
      // Return memory state
      return res.status(200).json(inMemoryTasks);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const taskData = {
      title,
      description: description || '',
      priority: priority || 'medium',
      status: status || 'todo',
      dueDate: dueDate || ''
    };

    if (isMongoConnected()) {
      const newTask = await Task.create(taskData);
      return res.status(201).json(newTask);
    } else {
      const mockTask = {
        _id: 'mock-' + Math.random().toString(36).substr(2, 9),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      inMemoryTasks.unshift(mockTask);
      return res.status(201).json(mockTask);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

// @desc    Update a task status or details
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, dueDate } = req.body;

    if (isMongoConnected()) {
      // Validate MongoDB object ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        // If updating a leftover mock task while DB is connected, route back to memory or return 404
        if (id.startsWith('mock-')) {
          const index = inMemoryTasks.findIndex(t => t._id === id);
          if (index !== -1) {
            inMemoryTasks[index] = { ...inMemoryTasks[index], ...req.body, updatedAt: new Date().toISOString() };
            return res.status(200).json(inMemoryTasks[index]);
          }
        }
        return res.status(400).json({ message: 'Invalid task ID format' });
      }

      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      return res.status(200).json(updatedTask);
    } else {
      const index = inMemoryTasks.findIndex(t => t._id === id);
      if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
      }

      inMemoryTasks[index] = {
        ...inMemoryTasks[index],
        ...req.body,
        updatedAt: new Date().toISOString()
      };

      return res.status(200).json(inMemoryTasks[index]);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        if (id.startsWith('mock-')) {
          inMemoryTasks = inMemoryTasks.filter(t => t._id !== id);
          return res.status(200).json({ message: 'Mock task deleted successfully', id });
        }
        return res.status(400).json({ message: 'Invalid task ID format' });
      }

      const deletedTask = await Task.findByIdAndDelete(id);

      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      return res.status(200).json({ message: 'Task deleted successfully', id });
    } else {
      const exists = inMemoryTasks.some(t => t._id === id);
      if (!exists) {
        return res.status(404).json({ message: 'Task not found' });
      }

      inMemoryTasks = inMemoryTasks.filter(t => t._id !== id);
      return res.status(200).json({ message: 'Task deleted successfully', id });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
