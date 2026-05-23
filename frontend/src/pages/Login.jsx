import React, { useState } from 'react';
import { Sparkles, Mail, Lock, ShieldAlert, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all credentials fields.');
      return;
    }

    // Email pattern check
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email format.');
      return;
    }

    setLoading(true);
    
    // Simulate minor network delay for premium feel
    setTimeout(() => {
      setLoading(false);
      onLogin({ email });
    }, 850);
  };

  return (
    <div className="min-h-screen bg-[#070a13] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative colored glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none"></div>

      {/* Main Glass login container */}
      <div className="w-full max-w-md bg-[#0f172a]/55 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl z-10 select-none transform transition-all duration-300">
        
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-600/20 mb-3 flex items-center justify-center">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-100 tracking-wide">
            Welcome to TaskNest
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">
            Enter your credentials to enter the workspace
          </p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 mb-5">
            <ShieldAlert className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                placeholder="developer@worknest.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className="w-full bg-[#070a13]/70 border border-slate-800 hover:border-slate-700/80 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 rounded-xl py-3 pl-11 pr-4 text-xs text-slate-200 placeholder-slate-600 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <a href="#forgot" className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className="w-full bg-[#070a13]/70 border border-slate-800 hover:border-slate-700/80 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 rounded-xl py-3 pl-11 pr-4 text-xs text-slate-200 placeholder-slate-600 transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/30 transition-all duration-200 active:scale-98 mt-6"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Access Dashboard
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Hint */}
        <div className="mt-8 pt-6 border-t border-slate-800/40 text-center">
          <p className="text-[10px] text-slate-500 font-semibold tracking-wide">
            💡 DEMO CONTEXT: ANY EMAIL AND PASSWORD WORKS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
