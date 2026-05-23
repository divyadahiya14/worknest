import React from 'react';
import { Mail, Trash2, ShieldCheck, Cpu, Code2, Palette, Layers, CheckSquare } from 'lucide-react';

const TeamCard = ({ member, onRemove }) => {
  const { name, role, email } = member;

  // Custom colors and icons based on the team member's role
  const getRoleConfig = (userRole) => {
    const normRole = userRole?.toLowerCase() || '';
    if (normRole.includes('frontend')) {
      return {
        bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        avatarBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        glow: 'hover:border-purple-500/30 hover:shadow-purple-950/15',
        icon: Code2,
        label: 'Frontend Developer'
      };
    } else if (normRole.includes('backend')) {
      return {
        bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        avatarBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        glow: 'hover:border-cyan-500/30 hover:shadow-cyan-950/15',
        icon: Cpu,
        label: 'Backend Developer'
      };
    } else if (normRole.includes('design') || normRole.includes('ui') || normRole.includes('ux')) {
      return {
        bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        avatarBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        glow: 'hover:border-amber-500/30 hover:shadow-amber-950/15',
        icon: Palette,
        label: 'UI/UX Designer'
      };
    } else if (normRole.includes('product') || normRole.includes('manager')) {
      return {
        bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        avatarBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        glow: 'hover:border-emerald-500/30 hover:shadow-emerald-950/15',
        icon: Layers,
        label: 'Product Manager'
      };
    } else if (normRole.includes('qa') || normRole.includes('tester') || normRole.includes('engineer')) {
      return {
        bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        avatarBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        glow: 'hover:border-rose-500/30 hover:shadow-rose-950/15',
        icon: CheckSquare,
        label: 'QA Engineer'
      };
    }
    
    // Default fallback
    return {
      bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      avatarBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      glow: 'hover:border-indigo-500/30 hover:shadow-indigo-950/15',
      icon: ShieldCheck,
      label: role || 'Architect'
    };
  };

  const roleStyle = getRoleConfig(role);
  const RoleIcon = roleStyle.icon;

  // Extract initials for the avatar circle (e.g. "Sarah Connor" -> "SC")
  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className={`bg-[#1e293b]/45 border border-slate-800/80 rounded-2xl p-5 hover:bg-[#1e293b]/60 transition-all duration-300 text-center relative group select-none hover:scale-[1.02] hover:-translate-y-1 shadow-lg ${roleStyle.glow}`}>
      
      {/* Remove member trash action - displays smoothly on card hover */}
      <button
        onClick={() => onRemove(email, name)}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-rose-950/30 text-slate-500 hover:text-rose-400 border border-transparent hover:border-rose-900/30 transition-all duration-200 cursor-pointer"
        title={`Remove ${name} from team`}
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {/* Profile avatar circle layout */}
      <div className={`w-14 h-14 rounded-full mx-auto ${roleStyle.avatarBg} flex items-center justify-center font-bold text-base mb-3 border border-current/10 shadow-inner tracking-wider`}>
        {getInitials(name)}
      </div>

      {/* Full Name */}
      <h4 className="text-sm font-bold text-slate-200 tracking-wide line-clamp-1 mb-1">
        {name}
      </h4>

      {/* Role description text */}
      <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-3">
        {roleStyle.label}
      </p>

      {/* Dynamic role badge */}
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${roleStyle.bg}`}>
        <RoleIcon className="h-3 w-3" />
        {roleStyle.label.split(' ')[0]}
      </span>

      {/* Divider */}
      <div className="border-t border-slate-800/40 my-4"></div>

      {/* Email contact link */}
      <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer truncate">
        <Mail className="h-3.5 w-3.5 text-slate-500 shrink-0" />
        <span className="truncate">{email}</span>
      </div>
    </div>
  );
};

export default TeamCard;
