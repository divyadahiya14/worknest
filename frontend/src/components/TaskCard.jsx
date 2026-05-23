import React from 'react';
import { Calendar, Trash2, ChevronRight, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onDelete, onDragStart }) => {
  const { _id, title, description, priority, dueDate } = task;

  // Priority color tags and labels mapping
  const getPriorityConfig = (priorityLevel) => {
    switch (priorityLevel?.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          dot: 'bg-rose-500 shadow-rose-500/50',
          label: 'High Priority'
        };
      case 'medium':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          dot: 'bg-amber-500 shadow-amber-500/50',
          label: 'Medium Priority'
        };
      case 'low':
        default:
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          dot: 'bg-emerald-500 shadow-emerald-500/50',
          label: 'Low Priority'
        };
    }
  };

  const priorityStyle = getPriorityConfig(priority);

  // Triggered when dragging begins
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', _id);
    e.dataTransfer.effectAllowed = 'move';
    if (onDragStart) {
      onDragStart(_id);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="task-card bg-[#1e293b]/70 hover:bg-[#1e293b] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 cursor-grab active:cursor-grabbing select-none relative group"
    >
      {/* Upper badge row */}
      <div className="flex items-center justify-between mb-3">
        <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${priorityStyle.bg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${priorityStyle.dot}`}></span>
          {priorityStyle.label}
        </span>
        
        {/* Delete icon - smooth transition showing on card hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(_id);
          }}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-rose-950/30 text-slate-500 hover:text-rose-400 border border-transparent hover:border-rose-900/30 transition-all duration-200"
          title="Delete task"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Title */}
      <h4 className="text-sm font-semibold text-slate-200 tracking-wide line-clamp-1 mb-1.5 group-hover:text-indigo-400 transition-colors">
        {title}
      </h4>

      {/* Description */}
      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
        {description || 'No description provided.'}
      </p>

      {/* Divider */}
      <div className="border-t border-slate-800/50 my-3"></div>

      {/* Footer Info (Due date) */}
      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5 text-slate-500" />
          <span>
            {dueDate ? new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date'}
          </span>
        </span>

        {/* Small pointer decoration */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 text-indigo-400 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
          <span className="font-semibold">Drag</span>
          <ChevronRight className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
