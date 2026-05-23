import React from 'react';
import { Layers, ListTodo, Activity, CheckCircle, ArrowUpRight } from 'lucide-react';

const DashboardCards = ({ tasks = [], onViewDetailed }) => {
  // Aggregate task statistics
  const totalCount = tasks.length;
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const progressCount = tasks.filter(t => t.status === 'progress').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;

  const cardConfig = [
    {
      title: 'Total Tasks',
      value: totalCount,
      icon: Layers,
      color: 'indigo',
      glow: 'shadow-indigo-500/10 border-indigo-500/20',
      iconBg: 'bg-indigo-500/10 text-indigo-400',
      percent: 100,
      description: 'Global workspace size'
    },
    {
      title: 'To Do / Pending',
      value: todoCount,
      icon: ListTodo,
      color: 'amber',
      glow: 'shadow-amber-500/10 border-amber-500/20',
      iconBg: 'bg-amber-500/10 text-amber-400',
      percent: totalCount ? Math.round((todoCount / totalCount) * 100) : 0,
      description: 'Awaiting development'
    },
    {
      title: 'In Progress',
      value: progressCount,
      icon: Activity,
      color: 'cyan',
      glow: 'shadow-cyan-500/10 border-cyan-500/20',
      iconBg: 'bg-cyan-500/10 text-cyan-400',
      percent: totalCount ? Math.round((progressCount / totalCount) * 100) : 0,
      description: 'Active sprint targets'
    },
    {
      title: 'Completed Tasks',
      value: doneCount,
      icon: CheckCircle,
      color: 'emerald',
      glow: 'shadow-emerald-500/10 border-emerald-500/20',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      percent: totalCount ? Math.round((doneCount / totalCount) * 100) : 0,
      description: 'Successfully deployed'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {cardConfig.map((card, idx) => {
        const CardIcon = card.icon;
        return (
          <div
            key={idx}
            className={`bg-[#1e293b]/40 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 hover:bg-[#1e293b]/60 shadow-lg ${card.glow} transition-all duration-300 group select-none`}
          >
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-xl ${card.iconBg} transition-all duration-200 group-hover:scale-110`}>
                <CardIcon className="h-4 w-4" />
              </div>
            </div>

            {/* Numeric Value */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-100 tracking-tight">
                {card.value}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider">
                {card.percent}% share
              </span>
            </div>

            {/* Progress Meter Bar */}
            <div className="mt-3.5 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                style={{ width: `${card.percent}%` }}
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  card.color === 'indigo' ? 'bg-indigo-500' :
                  card.color === 'amber' ? 'bg-amber-500' :
                  card.color === 'cyan' ? 'bg-cyan-500' : 'bg-emerald-500'
                }`}
              ></div>
            </div>

            {/* Bottom row descriptions */}
            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
              <span>{card.description}</span>
              <span
                onClick={onViewDetailed}
                className="flex items-center text-slate-400 font-medium hover:text-slate-300 cursor-pointer"
              >
                View detailed
                <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;
