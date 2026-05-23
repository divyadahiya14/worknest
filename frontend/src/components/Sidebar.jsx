import React from 'react';
import { LayoutDashboard, CheckSquare, Users, Settings, LogOut, KanbanSquare, Sparkles } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout, currentUser }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: KanbanSquare },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] border-r border-[#1e293b] flex flex-col h-screen text-slate-300 select-none transition-all duration-300 ease-in-out md:translate-x-0">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 gap-3 border-b border-[#1e293b]">
        <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-md shadow-indigo-600/20 flex items-center justify-center">
          <Sparkles className="h-5 w-5 animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-slate-100 text-lg tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Worknest
          </h1>
          <span className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase">
            Worknest OS
          </span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest px-3 mb-3">
          Workspace
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? 'bg-indigo-600/10 text-indigo-400 border-l-4 border-indigo-500 font-semibold'
                  : 'hover:bg-slate-800/50 hover:text-slate-100 text-slate-400'
              }`}
            >
              <Icon className={`h-5 w-5 mr-3 transition-transform duration-200 group-hover:scale-105 ${
                isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
              }`} />
              {item.label}
              
              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Status Card & Logout */}
      <div className="p-4 border-t border-[#1e293b] bg-slate-900/30">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold uppercase">
              {currentUser?.email ? currentUser.email[0] : 'U'}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0f172a]"></span>
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {currentUser?.email ? currentUser.email.split('@')[0] : 'Developer Intern'}
            </p>
            <p className="text-[10px] text-slate-500 truncate">
              {currentUser?.email || 'intern@worknest.com'}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-rose-950/20 hover:text-rose-400 text-slate-400 border border-slate-700/50 hover:border-rose-900/30 transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
