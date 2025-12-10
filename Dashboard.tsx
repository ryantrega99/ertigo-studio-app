import React from 'react';
import { 
  Cpu, HardDrive, Database, Activity, 
  Youtube, Twitch, Facebook, Globe, Settings, MoreVertical, Signal
} from 'lucide-react';

interface DashboardProps {
  addNotification?: (type: 'success' | 'error' | 'info', message: string) => void;
}

const SystemCard = ({ title, value, subtext, percentage, icon: Icon, colorClass }: any) => (
  <div className="glass-card p-6 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:-translate-y-1">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:opacity-20 transition-opacity`}></div>
    
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 group-hover:text-white group-hover:border-white/20 transition-all shadow-lg">
        <Icon size={20} />
      </div>
      <span className="text-xs font-bold px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-400">{percentage}%</span>
    </div>
    
    <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white mb-4 tracking-tight font-sans">{value}</p>
    
    <div className="h-1.5 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
      <div 
        className={`h-full ${colorClass.replace('from-', 'bg-')} rounded-full shadow-[0_0_10px_currentColor] transition-all duration-1000 relative`}
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/50"></div>
      </div>
    </div>
  </div>
);

const ChannelCard = ({ number, platform }: { number: number, platform: string }) => (
  <div className="glass-card p-6 rounded-2xl flex flex-col gap-5 group hover:border-cyan-500/30 transition-all duration-300">
    <div className="flex justify-between items-center pb-4 border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="relative">
             <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse"></div>
        </div>
        <h3 className="text-white font-bold tracking-tight">Channel {number}</h3>
      </div>
      <button className="text-gray-500 hover:text-white transition-colors">
        <MoreVertical size={18} />
      </button>
    </div>

    <div className="space-y-5">
      <div>
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Target Platform</label>
        <div className="relative group/input">
          <select className="w-full bg-[#0B0E14]/50 border border-white/10 text-gray-200 rounded-xl py-3 px-4 appearance-none focus:outline-none focus:border-cyan-500/50 focus:bg-[#0B0E14]/80 transition-all text-sm font-medium shadow-inner">
            <option>YouTube Live</option>
            <option>Twitch</option>
            <option>Facebook Gaming</option>
            <option>Custom RTMP</option>
          </select>
          <div className="absolute right-4 top-3.5 pointer-events-none text-gray-500">
            <Settings size={14} />
          </div>
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Stream Key / URL</label>
        <div className="relative">
            <input 
            type="password" 
            value="rtmp://live-api.youtube.com/dash/..."
            readOnly
            className="w-full bg-[#0B0E14]/50 border border-white/10 text-gray-400 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm font-mono shadow-inner"
            />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0B0E14] to-transparent pointer-events-none"></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
           <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Video Source</label>
           <span className="text-[9px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]">ACTIVE</span>
        </div>
        <div className="h-10 bg-[#0B0E14]/50 border border-white/10 rounded-xl flex items-center px-4 shadow-inner">
            <span className="text-sm text-gray-300 font-medium">OBS Virtual Camera</span>
        </div>
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ addNotification }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-white/5 pb-8">
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-2">Dashboard</h2>
          <p className="text-gray-400 text-sm">System Overview & Performance Monitoring</p>
        </div>
        <div className="flex gap-3">
             <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                System Healthy
             </div>
            <button className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-white/10 transition-all active:scale-95">
            Refresh Data
            </button>
        </div>
      </div>

      {/* System Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SystemCard 
          title="CPU Load" 
          value="34%" 
          percentage={34} 
          icon={Cpu} 
          colorClass="from-blue-600 to-cyan-400"
        />
        <SystemCard 
          title="Storage" 
          value="1.2 TB" 
          percentage={78} 
          icon={HardDrive} 
          colorClass="from-purple-600 to-pink-400"
        />
        <SystemCard 
          title="RAM Usage" 
          value="12 GB" 
          percentage={45} 
          icon={Database} 
          colorClass="from-orange-500 to-yellow-400"
        />
        <SystemCard 
          title="Network I/O" 
          value="450 Mbps" 
          percentage={62} 
          icon={Activity} 
          colorClass="from-green-500 to-emerald-400"
        />
      </div>

      {/* Active Channels Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg shadow-lg shadow-cyan-900/20">
                    <Signal size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Active Channels</h3>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChannelCard number={1} platform="YouTube Live" />
            <ChannelCard number={2} platform="Twitch" />
            <ChannelCard number={3} platform="Facebook Gaming" />
        </div>
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="glass-card rounded-2xl p-8">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Encoder Status</h4>
            <div className="space-y-5">
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                    <span className="text-gray-400 font-medium">Bitrate</span>
                    <span className="text-white font-mono bg-white/5 px-2 py-1 rounded">6000 Kbps</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                    <span className="text-gray-400 font-medium">FPS</span>
                    <span className="text-white font-mono bg-white/5 px-2 py-1 rounded">60</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-medium">Dropped Frames</span>
                    <span className="text-green-400 font-mono bg-green-900/10 border border-green-500/20 px-2 py-1 rounded shadow-[0_0_10px_rgba(34,197,94,0.1)]">0 (0.0%)</span>
                </div>
            </div>
         </div>
         
         <div className="rounded-2xl relative overflow-hidden p-8 flex flex-col justify-center items-center text-center border border-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/10 backdrop-blur-sm z-0"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            
            <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 mx-auto shadow-xl shadow-cyan-900/30">
                    <Globe className="text-white" size={32} />
                </div>
                <h4 className="text-white font-bold text-xl mb-2">Multi-Stream Active</h4>
                <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                    Your content is being distributed to <span className="text-white font-bold">3 platforms</span> simultaneously with 
                    <span className="text-cyan-400 font-bold ml-1">0ms</span> added latency.
                </p>
                <button className="mt-6 px-6 py-2 rounded-full border border-cyan-500/30 text-cyan-400 text-sm font-bold hover:bg-cyan-500/10 transition-colors">
                    View Network Map
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};