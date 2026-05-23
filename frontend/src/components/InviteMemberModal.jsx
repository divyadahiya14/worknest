import React, { useState, useEffect } from 'react';
import { X, UserPlus, AlertCircle, Send } from 'lucide-react';

const InviteMemberModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Frontend Developer');
  const [error, setError] = useState('');

  // Handle keyboard listener for escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Reset inputs on open
      setName('');
      setEmail('');
      setRole('Frontend Developer');
      setError('');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim()) {
      setError('Please fill in all inputs fields.');
      return;
    }

    // Email format validation check
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email format.');
      return;
    }

    const memberData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role
    };

    onSubmit(memberData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark blur backdrop overlay */}
      <div
        className="fixed inset-0 bg-[#070a13]/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="bg-[#1e293b] border border-slate-800 rounded-3xl w-full max-w-md shadow-2xl z-10 overflow-hidden transform transition-all duration-300 scale-100 flex flex-col">
        
        {/* Header Section */}
        <div className="bg-slate-900/40 px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600/10 p-1.5 rounded-lg text-indigo-400">
              <UserPlus className="h-4 w-4" />
            </span>
            <h3 className="font-bold text-slate-100 text-sm tracking-wide">
              Invite Team Member
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
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Full Name input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Full Name <span className="text-indigo-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) setError('');
              }}
              className="w-full bg-[#0f172a] border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 rounded-xl py-2.5 px-4 text-xs text-slate-200 placeholder-slate-650 transition-all"
              required
            />
          </div>

          {/* Email input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Email Address <span className="text-indigo-400">*</span>
            </label>
            <input
              type="email"
              placeholder="j.doe@worknest.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.trim()) setError('');
              }}
              className="w-full bg-[#0f172a] border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 rounded-xl py-2.5 px-4 text-xs text-slate-200 placeholder-slate-650 transition-all"
              required
            />
          </div>

          {/* Role select input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Workspace Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#0f172a] border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:outline-none rounded-xl py-2.5 px-3 text-xs text-slate-200 transition-all appearance-none cursor-pointer"
            >
              <option value="Frontend Developer" className="bg-[#1e293b] text-slate-200">Frontend Developer</option>
              <option value="Backend Developer" className="bg-[#1e293b] text-slate-200">Backend Developer</option>
              <option value="UI/UX Designer" className="bg-[#1e293b] text-slate-200">UI/UX Designer</option>
              <option value="Product Manager" className="bg-[#1e293b] text-slate-200">Product Manager</option>
              <option value="QA Engineer" className="bg-[#1e293b] text-slate-200">QA Engineer</option>
            </select>
          </div>

          {/* Action buttons */}
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
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-750 text-xs font-semibold text-white shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
            >
              Send Invite
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMemberModal;
