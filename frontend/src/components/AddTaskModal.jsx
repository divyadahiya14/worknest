import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';

const AddTaskModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  // Handle keyboard listener for escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Reset form on open
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setError('');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status: 'todo', // Always start as todo on create
      dueDate
    };

    onSubmit(taskData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark blur backdrop */}
      <div
        className="fixed inset-0 bg-[#070a13]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="bg-[#1e293b] border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl z-10 overflow-hidden transform transition-all duration-300 scale-100 flex flex-col">
        {/* Header Banner */}
        <div className="bg-slate-900/40 px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600/10 p-1.5 rounded-lg text-indigo-400">
              <Sparkles className="h-4 w-4" />
            </span>
            <h3 className="font-bold text-slate-100 text-sm tracking-wide">
              Create New Task
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-200 hover:bg-slate-800 p-1.5 rounded-lg transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Title Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Task Title <span className="text-indigo-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Set up auth routes"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setError('');
              }}
              className="w-full bg-[#0f172a] border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 rounded-xl py-2.5 px-4 text-xs text-slate-200 placeholder-slate-600 transition-all"
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Description
            </label>
            <textarea
              placeholder="Provide a short description of the objective..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-[#0f172a] border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 rounded-xl py-2.5 px-4 text-xs text-slate-200 placeholder-slate-600 transition-all resize-none"
            />
          </div>

          {/* Double Columns Grid (Priority & Due date) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Priority Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:outline-none rounded-xl py-2.5 px-3 text-xs text-slate-200 transition-all appearance-none cursor-pointer"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>

            {/* Due date Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:outline-none rounded-xl py-2.5 px-4 text-xs text-slate-200 cursor-pointer transition-all"
              />
            </div>
          </div>

          {/* Footer Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/50 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700/60 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-750 text-xs font-semibold text-white shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/30 transition-all duration-200 active:scale-95"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
