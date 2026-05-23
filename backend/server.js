require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize express app
const app = express();

// Config port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors({
  origin: '*', // Allow local connections from frontend easily
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// API Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Worknest MERN SaaS API Server is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('\x1b[31m[Server Error]:\x1b[0m', err.message);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start listening
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`\x1b[35m[Worknest Server Active]: http://localhost:${PORT}\x1b[0m`);
  console.log(`======================================================\n`);
});
