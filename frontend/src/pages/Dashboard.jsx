import React, { useState } from 'react';
import DashboardCards from '../components/DashboardCards';
import KanbanBoard from '../components/KanbanBoard';
import TeamCard from '../components/TeamCard';
import { Users, Code2, Globe, Database, ToggleLeft, UserCheck, Shield, Sliders, UserPlus } from 'lucide-react';

const Dashboard = ({
  tasks = [],
  isLoading = false,
  activeTab,
  onAddTaskClick,
  onTaskMove,
  onDeleteTask,
  searchQuery,
  setActiveTab,
  teamMembers = [],
  onRemoveMember,
  onInviteClick
}) => {
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Filter tasks based on Search Input AND Priority filter dropdown
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  // Render different panels based on Sidebar activeTab selection
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Intro Header banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-indigo-950/20 to-slate-900/40 p-6 rounded-3xl border border-slate-800/80">
              <div>
                <h2 className="text-xl font-bold text-slate-100 tracking-wide">
                  Welcome to your Workspace Dashboard!
                </h2>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Monitor sprint progress, review team allocation metrics, and drag-and-drop tasks to shift states.
                </p>
              </div>
              
              {/* Optional Priority Filter */}
              <div className="flex items-center gap-2 bg-[#1e293b]/60 border border-slate-800 rounded-xl px-3 py-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority:</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#1e293b] text-slate-200">🌐 All Priorities</option>
                  <option value="high" className="bg-[#1e293b] text-slate-200">🔴 High</option>
                  <option value="medium" className="bg-[#1e293b] text-slate-200">🟡 Medium</option>
                  <option value="low" className="bg-[#1e293b] text-slate-200">🟢 Low</option>
                </select>
              </div>
            </div>

            {/* Statistics Row */}
            <DashboardCards tasks={tasks} onViewDetailed={() => setActiveTab('tasks')} />

            {/* Kanban section below stats on Dashboard tab */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                  Active Sprint Board
                </h3>
              </div>
              <KanbanBoard
                tasks={filteredTasks}
                isLoading={isLoading}
                onAddTaskClick={onAddTaskClick}
                onTaskMove={onTaskMove}
                onDeleteTask={onDeleteTask}
              />
            </div>
          </div>
        );

      case 'tasks':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900/30 p-4 border border-slate-800/70 rounded-2xl">
              <div>
                <h2 className="text-base font-bold text-slate-100">Sprint Backlog Board</h2>
                <p className="text-[11px] text-slate-400">Drag task cards between workflow boundaries to update database records.</p>
              </div>
              
              <div className="flex items-center gap-2 bg-[#1e293b]/60 border border-slate-800 rounded-xl px-3 py-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Filter:</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#1e293b] text-slate-200">🌐 All Priorities</option>
                  <option value="high" className="bg-[#1e293b] text-slate-200">🔴 High</option>
                  <option value="medium" className="bg-[#1e293b] text-slate-200">🟡 Medium</option>
                  <option value="low" className="bg-[#1e293b] text-slate-200">🟢 Low</option>
                </select>
              </div>
            </div>

            <KanbanBoard
              tasks={filteredTasks}
              isLoading={isLoading}
              onAddTaskClick={onAddTaskClick}
              onTaskMove={onTaskMove}
              onDeleteTask={onDeleteTask}
            />
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6 animate-fade-in">
            {/* Elegant Header Panel with Invite trigger */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1e293b]/30 p-5 rounded-2xl border border-slate-800">
              <div>
                <h2 className="text-base font-bold text-slate-200">Active Workspace Team</h2>
                <p className="text-xs text-slate-400 mt-1">Manage and collaborate with team members in this workspace.</p>
              </div>
              <button
                onClick={onInviteClick}
                className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 active:scale-95 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all duration-200"
              >
                <UserPlus className="h-4 w-4" />
                Invite Member
              </button>
            </div>
            
            {teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {teamMembers.map((member) => (
                  <TeamCard
                    key={member.email}
                    member={member}
                    onRemove={onRemoveMember}
                  />
                ))}
              </div>
            ) : (
              /* High-fidelity Empty Team Panel */
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800/40 rounded-3xl py-20 px-4 text-center select-none bg-slate-900/10">
                <div className="p-4 bg-[#1e293b]/55 border border-slate-850 rounded-2xl text-slate-500 mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="text-slate-350 font-bold text-sm tracking-wide">
                  No Team Members Found
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed mt-1">
                  Your workspace squad is empty. Click the "Invite Member" button to add your developers and designers!
                </p>
              </div>
            )}
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6 max-w-2xl">
            <div className="bg-[#1e293b]/30 p-5 rounded-2xl border border-slate-800">
              <h2 className="text-base font-bold text-slate-200">Workspace System Settings</h2>
              <p className="text-xs text-slate-400 mt-1">Configure database connections and preview platform environment parameters.</p>
            </div>
            
            <div className="bg-[#1e293b]/45 border border-slate-800/80 rounded-2xl p-6 space-y-6">
              {/* Profile Config section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sliders className="h-4 w-4 text-indigo-400" />
                  General Preferences
                </h3>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-850">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Appearance</p>
                    <p className="text-xs font-bold text-slate-200 mt-1 flex items-center gap-1.5">
                      <ToggleLeft className="h-4 w-4 text-indigo-400" />
                      Dark Theme Active
                    </p>
                  </div>
                  <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-850">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Worknest Edition</p>
                    <p className="text-xs font-bold text-slate-200 mt-1 flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-indigo-400" />
                      Community Free v1.0
                    </p>
                  </div>
                </div>
              </div>

              {/* Database credentials section */}
              <div className="space-y-3 pt-4 border-t border-slate-800/50">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Database className="h-4 w-4 text-indigo-400" />
                  Mongoose Database Connection
                </h3>
                <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-850 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Mongoose Dialect:</span>
                    <span className="font-semibold text-slate-200">MongoDB / Mongoose</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Default Target Server:</span>
                    <span className="font-semibold text-slate-200">localhost:27017</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Dual Failover Resiliency:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <UserCheck className="h-3.5 w-3.5" />
                      Active In-Memory Fallback
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      {renderContent()}
    </div>
  );
};

export default Dashboard;
