import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Plus, ListTodo, Activity, CheckCircle2 } from 'lucide-react';

const KanbanBoard = ({ tasks = [], onAddTaskClick, onTaskMove, onDeleteTask }) => {
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
                  {columnTasks.length}
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
              {columnTasks.length > 0 ? (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={onDeleteTask}
                  />
                ))
              ) : (
                /* Empty Column Placeholder */
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800/50 rounded-2xl py-12 px-4 text-center select-none">
                  <div className="text-slate-600 font-medium text-xs mb-1">
                    No Tasks Here
                  </div>
                  <div className="text-[10px] text-slate-500 max-w-[150px] mx-auto leading-normal">
                    {col.id === 'todo'
                      ? 'Click the plus or navbar button to start.'
                      : 'Drag a card here to update status.'}
                  </div>
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
