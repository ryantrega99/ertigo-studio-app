import React, { useState } from 'react';
import { Users, Plus, RefreshCw, Trash2, ExternalLink, CheckCircle2, AlertTriangle, Youtube, BarChart3, Video } from 'lucide-react';
import { ChannelData } from '../types';

const MOCK_CHANNELS: ChannelData[] = [
  { 
    id: '1', 
    name: 'Tech Daily', 
    handle: '@techdaily_official', 
    subscribers: '125K', 
    views: '45.2M', 
    videoCount: 843, 
    avatarUrl: 'https://picsum.photos/seed/tech/64/64', 
    status: 'ACTIVE', 
    lastSync: '2 mins ago' 
  },
  { 
    id: '2', 
    name: 'Lofi Vibes', 
    handle: '@lofivibes_music', 
    subscribers: '8.4K', 
    views: '1.2M', 
    videoCount: 120, 
    avatarUrl: 'https://picsum.photos/seed/lofi/64/64', 
    status: 'ACTIVE', 
    lastSync: '1 hour ago' 
  },
  { 
    id: '3', 
    name: 'Gaming Highlights', 
    handle: '@gaming_clips_hd', 
    subscribers: '12K', 
    views: '560K', 
    videoCount: 45, 
    avatarUrl: 'https://picsum.photos/seed/gaming/64/64', 
    status: 'EXPIRED', 
    lastSync: '3 days ago' 
  }
];

interface DataChannelProps {
  addNotification?: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const DataChannel: React.FC<DataChannelProps> = ({ addNotification }) => {
  const [channels, setChannels] = useState<ChannelData[]>(MOCK_CHANNELS);

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <Users className="text-cyan-400" />
             Channel Management
          </h2>
          <p className="text-gray-400 mt-2">Connect and manage multiple YouTube channels from a single dashboard.</p>
        </div>
        
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#ff0000] hover:bg-[#cc0000] rounded-lg text-white font-bold transition-all shadow-lg shadow-red-900/20">
            <Plus size={20} /> Connect New Channel
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#161920] p-6 rounded-xl border border-gray-800 flex items-center gap-4">
             <div className="p-3 bg-cyan-900/20 rounded-lg text-cyan-400">
                <Youtube size={24} />
             </div>
             <div>
                <p className="text-gray-400 text-xs font-bold uppercase">Total Connected</p>
                <h3 className="text-2xl font-bold text-white">{channels.length} Channels</h3>
             </div>
          </div>
          <div className="bg-[#161920] p-6 rounded-xl border border-gray-800 flex items-center gap-4">
             <div className="p-3 bg-purple-900/20 rounded-lg text-purple-400">
                <Users size={24} />
             </div>
             <div>
                <p className="text-gray-400 text-xs font-bold uppercase">Total Subscribers</p>
                <h3 className="text-2xl font-bold text-white">145.4K</h3>
             </div>
          </div>
          <div className="bg-[#161920] p-6 rounded-xl border border-gray-800 flex items-center gap-4">
             <div className="p-3 bg-green-900/20 rounded-lg text-green-400">
                <Video size={24} />
             </div>
             <div>
                <p className="text-gray-400 text-xs font-bold uppercase">Total Videos</p>
                <h3 className="text-2xl font-bold text-white">1,008 Uploads</h3>
             </div>
          </div>
      </div>

      {/* Channel List */}
      <div className="grid grid-cols-1 gap-4">
        {channels.map((channel) => (
            <div key={channel.id} className="bg-[#161920] rounded-xl border border-gray-800 p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-gray-700 transition-colors">
                <div className="relative">
                    <img src={channel.avatarUrl} alt={channel.name} className="w-16 h-16 rounded-full border-2 border-gray-800 shadow-lg" />
                    <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-1">
                        <Youtube size={16} className="text-red-500" />
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left min-w-0">
                    <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
                        {channel.name}
                        <ExternalLink size={14} className="text-gray-600 hover:text-white cursor-pointer" />
                    </h3>
                    <p className="text-gray-500 text-sm font-medium">{channel.handle}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3">
                         <span className="flex items-center gap-1.5 text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded">
                            <Users size={12} /> {channel.subscribers}
                         </span>
                         <span className="flex items-center gap-1.5 text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded">
                            <BarChart3 size={12} /> {channel.views} Views
                         </span>
                         <span className="flex items-center gap-1.5 text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded">
                            <Video size={12} /> {channel.videoCount}
                         </span>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2 min-w-[140px]">
                    <div className="flex items-center gap-2 mb-1">
                         <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Sync Status</span>
                    </div>
                    {channel.status === 'ACTIVE' ? (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-900/10 border border-green-500/20 px-3 py-1.5 rounded-full">
                            <CheckCircle2 size={12} /> Active
                        </span>
                    ) : (
                         <span className="flex items-center gap-1.5 text-xs font-bold text-yellow-400 bg-yellow-900/10 border border-yellow-500/20 px-3 py-1.5 rounded-full">
                            <AlertTriangle size={12} /> Re-Auth Req
                        </span>
                    )}
                    <span className="text-[10px] text-gray-600">Last sync: {channel.lastSync}</span>
                </div>

                <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t border-gray-800 md:border-t-0 md:pl-6 md:border-l">
                    <button className="flex-1 md:flex-none p-2.5 bg-[#0f1115] hover:bg-cyan-900/20 hover:text-cyan-400 text-gray-400 rounded-lg border border-gray-700 transition-colors" title="Sync Data">
                        <RefreshCw size={18} />
                    </button>
                    <button className="flex-1 md:flex-none p-2.5 bg-[#0f1115] hover:bg-red-900/20 hover:text-red-400 text-gray-400 rounded-lg border border-gray-700 transition-colors" title="Remove Channel">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};