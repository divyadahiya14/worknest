import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddTaskModal from './components/AddTaskModal';
import { taskService } from './services/api';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const App = () => {
  // Global States
  const [currentUser, setCurrentUser] = useState(null);
  const [authView, setAuthView] = useState('login'); // 'login' | 'signup'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Check if session is persisted in local storage on load
  useEffect(() => {
    const savedUser = localStorage.getItem('worknest_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('worknest_user');
      }
    }
  }, []);

  // Fetch all tasks once logged in
  useEffect(() => {
    if (currentUser) {
      loadTasks();
    }
  }, [currentUser]);

  // Load tasks from Express backend
  const loadTasks = async () => {
    setIsLoadingTasks(true);
    try {
      const data = await taskService.fetchTasks();
      setTasks(data);
      setIsLoadingTasks(false);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      triggerToast('Could not fetch tasks. Operating in failover mock storage.', 'info');
      setIsLoadingTasks(false);
    }
  };

  // Global Keyboard Shortcuts (N -> open modal)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) return;

      const activeEl = document.activeElement;
      const isTyping = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT' ||
        activeEl.contentEditable === 'true'
      );
      if (isTyping) return;

      if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Toast triggers helper
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Login handler
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('worknest_user', JSON.stringify(userData));
    triggerToast('Welcome to your premium dashboard workspace!', 'success');
  };

  // Signup success callback
  const handleSignupSuccess = (data) => {
    setAuthView('login');
    triggerToast('Account registered successfully! Please log in.', 'success');
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('worknest_user');
    setAuthView('login');
    triggerToast('Logged out of workspace.', 'info');
  };

  // Add Task submit callback
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      setIsModalOpen(false);
      triggerToast(`Task "${taskData.title}" created successfully!`, 'success');
    } catch (error) {
      console.error('Error adding task:', error);
      triggerToast('Error saving task to backend database.', 'warning');
    }
  };

  // Drag and Drop optimistic task status update handler
  const handleTaskMove = async (taskId, newStatus) => {
    const targetTask = tasks.find(t => t._id === taskId);
    if (!targetTask) return;

    const oldStatus = targetTask.status;
    if (oldStatus === newStatus) return;

    // 1. Optimistic Update (instantly shift UI for high responsiveness)
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t._id === taskId ? { ...t, status: newStatus } : t
      )
    );

    // Provide immediate gentle toast feedback
    const statusLabels = { todo: 'To Do', progress: 'In Progress', done: 'Done' };
    triggerToast(`Moved task to "${statusLabels[newStatus]}"`, 'success');

    // 2. Perform background backend update
    try {
      await taskService.updateTask(taskId, { status: newStatus });
    } catch (error) {
      console.error('Error updating task status on backend:', error);
      triggerToast('Database sync failed. Reverting changes...', 'warning');
      
      // Rollback optimistic state if the backend rejected/failed
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t._id === taskId ? { ...t, status: oldStatus } : t
        )
      );
    }
  };

  // Delete Task callback with optimistic updates
  const handleDeleteTask = async (taskId) => {
    const targetTask = tasks.find(t => t._id === taskId);
    if (!targetTask) return;

    // Confirm deletion check
    const confirmDelete = window.confirm(`Are you sure you want to delete the task: "${targetTask.title}"?`);
    if (!confirmDelete) return;

    const backupTasks = [...tasks];

    // Optimistic Update
    setTasks(prevTasks => prevTasks.filter(t => t._id !== taskId));
    triggerToast('Task deleted successfully.', 'success');

    // Backend remove call
    try {
      await taskService.deleteTask(taskId);
    } catch (error) {
      console.error('Error deleting task on backend:', error);
      triggerToast('Could not sync delete event to server.', 'warning');
      setTasks(backupTasks); // rollback
    }
  };

  // If session is empty, render the Login/Signup screen flows
  if (!currentUser) {
    return authView === 'login' ? (
      <Login
        onLogin={handleLogin}
        onNavigateToSignup={() => setAuthView('signup')}
      />
    ) : (
      <Signup
        onSignupSuccess={handleSignupSuccess}
        onNavigateToLogin={() => setAuthView('login')}
      />
    );
  }

  return (
    <div className="flex h-screen w-screen bg-[#070a13] text-slate-100 overflow-hidden">
      
      {/* Sidebar navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        currentUser={currentUser}
      />

      {/* Main Right panel container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Navbar
          onAddTaskClick={() => setIsModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
        />

        {/* Dashboard Panels */}
        <Dashboard
          tasks={tasks}
          isLoading={isLoadingTasks}
          activeTab={activeTab}
          onAddTaskClick={() => setIsModalOpen(true)}
          onTaskMove={handleTaskMove}
          onDeleteTask={handleDeleteTask}
          searchQuery={searchQuery}
        />
      </div>

      {/* Add Task Modal overlay popup */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      />

      {/* Absolute Toast Notifications Drawer */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 p-4 rounded-2xl border shadow-xl bg-slate-900/90 backdrop-blur-md pointer-events-auto animate-slide-in select-none max-w-sm ${
              toast.type === 'success' ? 'border-emerald-500/20 text-emerald-400 shadow-emerald-950/20' :
              toast.type === 'warning' ? 'border-rose-500/20 text-rose-400 shadow-rose-950/20' :
              'border-indigo-500/20 text-indigo-400 shadow-indigo-950/20'
            }`}
          >
            {/* Action icons */}
            {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 shrink-0" />}
            {toast.type === 'warning' && <AlertCircle className="h-5 w-5 shrink-0" />}
            {toast.type === 'info' && <Info className="h-5 w-5 shrink-0" />}

            {/* Content text */}
            <span className="text-xs font-semibold tracking-wide text-slate-200">
              {toast.message}
            </span>

            {/* Clear dismiss */}
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-auto text-slate-500 hover:text-slate-200 p-0.5 rounded-lg transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
