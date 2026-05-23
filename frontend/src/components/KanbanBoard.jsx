import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Plus, ListTodo, Activity, CheckCircle2, FolderOpen } from 'lucide-react';

// Pulses skeleton loader template card
const SkeletonCard = () => (
  <div className="bg-[#1e293b]/40 border border-slate-800/60 rounded-2xl p-4 animate-pulse space-y-3 select-none">
    <div className="flex justify-between items-center">
      <div className="w-16 h-3.5 bg-slate-700/60 rounded-full"></div>
      <div className="w-5 h-5 bg-slate-700/60 rounded-md"></div>
    </div>
    <div className="w-2/3 h-4 bg-slate-700/50 rounded-md mt-2"></div>
    <div className="space-y-1.5 pt-1">
      <div className="w-full h-2.5 bg-slate-700/40 rounded-md"></div>
      <div className="w-5/6 h-2.5 bg-slate-700/40 rounded-md"></div>
    </div>
    <div className="border-t border-slate-800/40 my-2 pt-2.5 flex justify-between items-center">
      <div className="w-1/3 h-2.5 bg-slate-700/40 rounded-md"></div>
      <div className="w-8 h-2.5 bg-slate-700/40 rounded-md"></div>
    </div>
  </div>
);

const KanbanBoard = ({ tasks = [], onAddTaskClick, onTaskMove, onDeleteTask, isLoading = false }) => {
  // Columns structure
  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'indigo',
      borderColor: 'border-indigo-500/20',
      headerBg: 'bg-indigo-500/10 text-indigo-400',
      icon: ListTodo
    },
    {
      id: 'progress',
      title: 'In Progress',
      color: 'cyan',
      borderColor: 'border-cyan-500/20',
      headerBg: 'bg-cyan-500/10 text-cyan-400',
      icon: Activity
    },
    {
      id: 'done',
      title: 'Done',
      color: 'emerald',
      borderColor: 'border-emerald-500/20',
      headerBg: 'bg-emerald-500/10 text-emerald-400',
      icon: CheckCircle2
    }
  ];

  // State to track which column is currently being dragged over
  const [draggedOverColumn, setDraggedOverColumn] = useState(null);

  // Prevent default drag over behavior to allow dropping
  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    if (draggedOverColumn !== columnId) {
      setDraggedOverColumn(columnId);
    }
  };

  // Remove styling when leaving target column
  const handleDragLeave = (e) => {
    setDraggedOverColumn(null);
  };

  // Handle final drop event
  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    setDraggedOverColumn(null);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId && onTaskMove) {
      onTaskMove(taskId, targetStatus);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full items-start">
      {columns.map((col) => {
        const columnTasks = tasks.filter(t => t.status === col.id);
        const ColumnIcon = col.icon;
        const isHovered = draggedOverColumn === col.id;

        return (
          <div
            key={col.id}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.id)}
            className={`kanban-column flex flex-col bg-[#111827]/30 border rounded-2xl p-4 min-h-[500px] max-h-[700px] overflow-hidden ${
              isHovered
                ? 'border-indigo-500/40 bg-indigo-950/5'
                : 'border-slate-800/80'
            }`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/50">
              <div className="flex items-center gap-2">
                <span className={`p-1.5 rounded-lg ${col.headerBg}`}>
                  <ColumnIcon className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-bold text-slate-200 tracking-wide">
                  {col.title}
                </h3>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-semibold">
                  {isLoading ? '...' : columnTasks.length}
                </span>
              </div>

              {/* Add task quick button (for To Do column) */}
              {col.id === 'todo' && (
                <button
                  onClick={onAddTaskClick}
                  className="p-1 rounded-lg hover:bg-indigo-600/10 border border-transparent hover:border-indigo-500/20 text-slate-500 hover:text-indigo-400 transition-all duration-200"
                  title="Add task to column"
                >
                  <Plus className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Task Card List Container */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 py-1">
              {isLoading ? (
                /* Pulse loaders during initial API fetch */
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : columnTasks.length > 0 ? (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={onDeleteTask}
                  />
                ))
              ) : (
                /* Premium Empty Column state layout */
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800/40 hover:border-slate-700/40 rounded-2xl py-14 px-4 text-center select-none transition-all duration-300 group/empty hover:bg-slate-900/10">
                  <div className="p-3 bg-[#1e293b]/40 border border-slate-800/50 rounded-2xl text-slate-600 group-hover/empty:text-indigo-400 group-hover/empty:scale-110 group-hover/empty:border-indigo-500/25 transition-all duration-300 mb-3 shadow-inner">
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  <h4 className="text-slate-400 font-semibold text-xs mb-1 tracking-wide">
                    No Tasks Found
                  </h4>
                  <p className="text-[10px] text-slate-500 max-w-[170px] mx-auto leading-normal">
                    {col.id === 'todo'
                      ? 'Click the plus or navbar button to create your first task!'
                      : 'Drag a card here to update task sprint progress.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;

