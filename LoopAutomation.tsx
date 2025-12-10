import React, { useState } from 'react';
import { Repeat, Play, StopCircle, Settings, Clock, Activity, AlertCircle, Plus, MoreVertical, Youtube, MonitorPlay } from 'lucide-react';

const ACTIVE_LOOPS = [
  { id: 1, name: 'Gaming Marathon Stream', status: 'LIVE', platform: 'YouTube', uptime: '4h 23m', viewers: 1240, health: 98, thumbnail: 'https://picsum.photos/seed/loop1/400/225' },
  { id: 2, name: 'Lofi Beats 24/7', status: 'LIVE', platform: 'YouTube', uptime: '12d 5h', viewers: 450, health: 100, thumbnail: 'https://picsum.photos/seed/loop2/400/225' },
  { id: 3, name: 'Best Moments Compilation', status: 'ERROR', platform: 'Twitch', uptime: '0m', viewers: 0, health: 0, thumbnail: 'https://picsum.photos/seed/loop3/400/225' },
];

interface LoopAutomationProps {
  addNotification?: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const LoopAutomation: React.FC<LoopAutomationProps> = ({ addNotification }) => {
  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <Repeat className="text-cyan-400" />
             Looping Monitor
          </h2>
          <p className="text-gray-400 mt-2">Real-time status of your automated 24/7 streams.</p>
        </div>
        
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg text-white font-bold transition-all shadow-lg shadow-cyan-900/20">
            <Plus size={20} /> New Loop
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Loops Grid */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity size={20} className="text-cyan-400" /> Active Streams
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ACTIVE_LOOPS.map((loop) => (
                    <div key={loop.id} className="bg-[#161920] rounded-xl border border-gray-800 overflow-hidden group hover:border-gray-700 transition-all shadow-lg">
                        <div className="relative aspect-video bg-black">
                            <img src={loop.thumbnail} alt={loop.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-3 left-3">
                                {loop.status === 'LIVE' ? (
                                    <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-600 text-white text-[10px] font-bold tracking-wider animate-pulse">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div> LIVE
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-500 text-black text-[10px] font-bold tracking-wider">
                                        <AlertCircle size={10} /> RETRYING
                                    </span>
                                )}
                            </div>
                            <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                                    {loop.platform}
                                </span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                    <Settings size={20} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="text-white font-bold text-sm truncate max-w-[200px]">{loop.name}</h4>
                                    <p className="text-gray-500 text-xs mt-1">Looping: <span className="text-cyan-400">Video {loop.id + 12}</span></p>
                                </div>
                                <button className="text-gray-500 hover:text-white transition-colors">
                                    <MoreVertical size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                                <div className="bg-[#0f1115] p-2 rounded border border-gray-800">
                                    <span className="text-gray-500 block text-[10px] uppercase">Uptime</span>
                                    <span className="text-white font-mono">{loop.uptime}</span>
                                </div>
                                <div className="bg-[#0f1115] p-2 rounded border border-gray-800">
                                    <span className="text-gray-500 block text-[10px] uppercase">Health</span>
                                    <span className={`${loop.health > 90 ? 'text-green-400' : 'text-red-400'} font-mono`}>{loop.health}%</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 py-2 rounded-lg bg-[#0f1115] border border-gray-700 hover:bg-gray-800 text-gray-300 text-xs font-bold transition-colors">
                                    View Logs
                                </button>
                                <button className="flex-1 py-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-colors">
                                    Stop
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Quick Launch & Stats */}
        <div className="space-y-6">
             {/* System Status */}
             <div className="bg-[#161920] rounded-xl border border-gray-800 p-5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <MonitorPlay size={16} className="text-green-400" /> System Resources
                </h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Total CPU Usage</span>
                            <span className="text-white">45%</span>
                        </div>
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[45%]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Bandwidth</span>
                            <span className="text-white">12.5 Mbps</span>
                        </div>
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[60%]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Active Slots</span>
                            <span className="text-white">2 / 5</span>
                        </div>
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[40%]"></div>
                        </div>
                    </div>
                </div>
             </div>

             {/* Quick Launch */}
             <div className="bg-[#161920] rounded-xl border border-gray-800 p-5">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Launch</h3>
                 <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-[#0f1115] border border-gray-800 hover:border-cyan-500/30 cursor-pointer group transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-cyan-400 group-hover:bg-cyan-900/20 transition-colors">
                                <Youtube size={20} />
                            </div>
                            <div>
                                <h4 className="text-white text-sm font-bold group-hover:text-cyan-400 transition-colors">Start YouTube Loop</h4>
                                <p className="text-xs text-gray-500">Select asset & go live</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0f1115] border border-gray-800 hover:border-purple-500/30 cursor-pointer group transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-purple-400 group-hover:bg-purple-900/20 transition-colors">
                                <Repeat size={20} />
                            </div>
                            <div>
                                <h4 className="text-white text-sm font-bold group-hover:text-purple-400 transition-colors">Resume Previous</h4>
                                <p className="text-xs text-gray-500">Lofi Beats 24/7</p>
                            </div>
                        </div>
                    </div>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};