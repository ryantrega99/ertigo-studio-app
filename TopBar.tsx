import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Image as ImageIcon, Radio, Calendar, Settings, LogOut, 
  Wifi, Film, Sparkles, Repeat, Users, Zap, Menu, X, Clock, ChevronDown
} from 'lucide-react';
import { ViewState, NavItem } from '../types';

interface TopBarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentView, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems: NavItem[] = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: ViewState.DATA_CHANNEL, label: 'Data Channel', icon: <Users size={16} /> },
    { id: ViewState.STREAMING, label: 'Streaming', icon: <Wifi size={16} /> },
    { id: ViewState.LOOPING, label: 'Looping', icon: <Repeat size={16} /> },
    { id: ViewState.YT_AUTOMATION, label: 'YT Auto', icon: <Zap size={16} /> },
    { id: ViewState.VIDEO_GALLERY, label: 'Assets', icon: <Film size={16} /> },
    { id: ViewState.MAGIC_EDITOR, label: 'AI Studio', icon: <Sparkles size={16} /> },
    { id: ViewState.SCHEDULE, label: 'Schedule', icon: <Calendar size={16} /> },
    { id: ViewState.SYSTEM, label: 'System', icon: <Settings size={16} /> },
  ];

  // Format date and time for Indonesian locale
  const dateStr = new Intl.DateTimeFormat('id-ID', { weekday: 'short', day: '2-digit', month: 'short' }).format(currentTime);
  const timeStr = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTime);

  return (
    <div className="relative w-full h-16 rounded-2xl glass-panel z-50 px-6 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      {/* Logo Section */}
      <div className="flex items-center gap-3 shrink-0 mr-8 cursor-pointer group">
        <div className="relative">
             <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
             <div className="relative bg-gradient-to-tr from-cyan-900 to-blue-900 p-2 rounded-xl border border-white/10 shadow-inner">
                <Radio size={20} className="text-cyan-400" />
             </div>
        </div>
        <div>
          <h1 className="text-lg font-extrabold tracking-wider text-white font-sans">
            ERTIGO<span className="text-cyan-400">APP</span>
          </h1>
          <p className="text-[9px] text-gray-400 font-medium tracking-[0.2em] uppercase leading-none">Professional Suite</p>
        </div>
      </div>

      {/* Desktop Navigation - Pill Style */}
      <nav className="hidden xl:flex items-center gap-1 overflow-x-auto no-scrollbar mask-gradient flex-1 justify-center">
        <div className="flex bg-[#0B0E14]/40 p-1.5 rounded-full border border-white/5 backdrop-blur-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-xs font-semibold whitespace-nowrap relative ${
                currentView === item.id
                  ? 'text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {currentView === item.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full opacity-100 -z-10 shadow-[0_0_15px_rgba(6,182,212,0.4)]"></div>
              )}
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-5 shrink-0 ml-auto">
        {/* Real-time Clock */}
        <div className="hidden lg:flex flex-col items-end">
          <div className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">{dateStr}</div>
          <div className="text-base font-mono font-bold text-white leading-none tracking-tight flex items-center gap-1 shadow-black drop-shadow-md">
             {timeStr} <span className="text-[9px] text-cyan-400/80 font-sans px-1 py-0.5 rounded bg-cyan-950/30 border border-cyan-500/20">WIB</span>
          </div>
        </div>
        
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent hidden lg:block"></div>

        <div className="hidden md:flex items-center gap-3 pl-2">
          <div className="text-right hidden lg:block">
            <p className="text-xs font-bold text-white leading-none group-hover:text-cyan-400 transition-colors cursor-pointer">Admin User</p>
            <div className="flex items-center justify-end gap-1 mt-1">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
               <p className="text-[9px] text-gray-400 font-mono tracking-wider">ONLINE</p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg cursor-pointer hover:scale-105 transition-transform">
             <div className="w-full h-full rounded-full bg-[#0B0E14] flex items-center justify-center">
                <span className="text-xs font-bold text-white">AD</span>
             </div>
          </div>
        </div>

        <button 
          className="xl:hidden p-2 text-gray-300 hover:text-white bg-white/5 rounded-lg border border-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-panel rounded-2xl z-50 animate-fade-in-down shadow-2xl overflow-hidden border border-gray-800">
          <div className="p-4 grid grid-cols-2 gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200 border ${
                  currentView === item.id
                    ? 'bg-gradient-to-br from-cyan-900/40 to-blue-900/20 border-cyan-500/30 text-cyan-400 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]'
                    : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span className="text-xs font-bold uppercase tracking-wide">{item.label}</span>
              </button>
            ))}
            <div className="col-span-2 mt-2 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-red-400 py-3 hover:bg-red-900/10 rounded-xl transition-colors cursor-pointer">
               <LogOut size={16} /> <span className="text-sm font-bold">Logout Session</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};