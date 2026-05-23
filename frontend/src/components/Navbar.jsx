import React from 'react';
import { Search, Plus, Bell, Calendar, ChevronRight } from 'lucide-react';

const Navbar = ({ onAddTaskClick, searchQuery, setSearchQuery, activeTab }) => {
  // Format tab label for header breadcrumb
  const getTabLabel = () => {
    switch (activeTab) {
      case 'dashboard': return 'Product Board';
      case 'tasks': return 'Sprint Backlog';
      case 'team': return 'Team Members';
      case 'settings': return 'System Settings';
      default: return 'Workspace';
    }
  };

  return (
    <header className="h-16 bg-[#0b0f19]/80 backdrop-blur-md border-b border-[#1e293b] flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Breadcrumb / Section Header */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
          Workspace
        </span>
        <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
        <span className="text-slate-200 font-semibold uppercase tracking-wider text-xs">
          {getTabLabel()}
        </span>
      </div>

      {/* Center/Right controls */}
      <div className="flex items-center gap-4">
        {/* Search input (active for Dashboard and Tasks views) */}
        {(activeTab === 'dashboard' || activeTab === 'tasks') && (
          <div className="relative w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-slate-500" />
            </span>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e293b]/50 border border-slate-700/60 rounded-xl py-1.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
            />
          </div>
        )}

        {/* Calendar / Date display */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/40 border border-slate-800 rounded-xl text-[11px] font-semibold text-slate-400">
          <Calendar className="h-3.5 w-3.5 text-indigo-400" />
          <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* Notifications */}
        <button className="p-2 text-slate-400 hover:text-slate-100 bg-[#1e293b]/30 hover:bg-[#1e293b]/60 border border-slate-800 rounded-xl transition-all relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-[#0b0f19]"></span>
        </button>

        {/* Create Task Button */}
        <button
          onClick={onAddTaskClick}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/30 transition-all duration-200 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Create Task
        </button>
      </div>
    </header>
  );
};

export default Navbar;
