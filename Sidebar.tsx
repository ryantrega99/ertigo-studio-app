import React from 'react';
import { LayoutDashboard, Image as ImageIcon, Radio, Calendar, Settings, LogOut, Wifi, UploadCloud, Server, X, Film, Sparkles, Repeat } from 'lucide-react';
import { ViewState, NavItem } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, onClose }) => {
  const mainNavItems: NavItem[] = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: ViewState.STREAMING, label: 'Streaming', icon: <Wifi size={20} /> },
    { id: ViewState.LOOPING, label: 'Looping Monitor', icon: <Repeat size={20} /> },
    { id: ViewState.VIDEO_GALLERY, label: 'Video Assets', icon: <Film size={20} /> },
    { id: ViewState.MAGIC_EDITOR, label: 'AI Studio', icon: <Sparkles size={20} /> },
    { id: ViewState.SCHEDULE, label: 'Schedule', icon: <Calendar size={20} /> },
  ];

  const systemNavItems: NavItem[] = [
    { id: ViewState.SYSTEM, label: 'System Config', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed left-0 top-0 h-screen bg-[#0f1115] border-r border-gray-800 z-50 flex flex-col w-64 transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20">
              <Radio size={24} className="text-cyan-400" />
            </div>
            <h1 className="text-xl font-bold tracking-widest text-white font-sans">ERTIGOAPP</h1>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-6 mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main Menu</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all duration-200 group relative ${
                currentView === item.id
                  ? 'text-cyan-400 bg-cyan-500/5'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
              }`}
            >
              {currentView === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
              )}
              <span className={currentView === item.id ? 'text-cyan-400' : 'group-hover:text-cyan-400 transition-colors'}>
                {item.icon}
              </span>
              <span className="font-medium tracking-wide text-sm">{item.label}</span>
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-gray-800/50">
             <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Administration</p>
             {systemNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all duration-200 group relative ${
                    currentView === item.id
                      ? 'text-cyan-400 bg-cyan-500/5'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                  }`}
                >
                  {currentView === item.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                  )}
                  <span className={currentView === item.id ? 'text-cyan-400' : 'group-hover:text-cyan-400 transition-colors'}>
                    {item.icon}
                  </span>
                  <span className="font-medium tracking-wide text-sm">{item.label}</span>
                </button>
             ))}
          </div>
        </nav>

        <div className="p-6 mt-auto border-t border-gray-800/50">
          <div className="bg-[#161920] rounded-2xl p-4 border border-gray-800 flex items-center gap-3 hover:border-gray-700 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-cyan-900/20 transition-all">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-sm font-medium truncate group-hover:text-cyan-400 transition-colors">Admin User</h4>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-xs text-gray-400">Online</p>
              </div>
            </div>
            <LogOut size={16} className="text-gray-600 group-hover:text-red-400 transition-colors" />
          </div>
        </div>
      </div>
    </>
  );
};