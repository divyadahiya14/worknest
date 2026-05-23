import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const taskService = {
  // Fetch all tasks
  fetchTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  // Create a new task
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update task status or properties
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  }
};

export const authService = {
  // Register a new user
  signup: async (email, password) => {
    const response = await api.post('/users/signup', { email, password });
    return response.data;
  },

  // Authenticate user credentials
  login: async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  }
};

export default api;
