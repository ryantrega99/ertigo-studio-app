import React from 'react';
import { Calendar as CalendarIcon, Clock, Plus, MoreVertical, Youtube, Twitch, CheckCircle2, Clock3 } from 'lucide-react';

const EVENTS = [
  { id: 1, title: 'Weekly Tech Roundup', time: '14:00', date: 'Today', platform: 'YouTube', status: 'READY', duration: '2h' },
  { id: 2, title: 'Live Coding Session', time: '20:00', date: 'Today', platform: 'Twitch', status: 'SCHEDULED', duration: '4h' },
  { id: 3, title: 'Product Launch Event', time: '10:00', date: 'Tomorrow', platform: 'Multi', status: 'SCHEDULED', duration: '1h 30m' },
];

interface ScheduleProps {
  addNotification?: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const Schedule: React.FC<ScheduleProps> = ({ addNotification }) => {
  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <CalendarIcon className="text-cyan-400" />
             Broadcast Schedule
          </h2>
          <p className="text-gray-400 mt-2">Manage upcoming live streams and automated events.</p>
        </div>
        
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg text-white font-bold transition-all shadow-lg shadow-cyan-900/20">
            <Plus size={20} /> Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Schedule List */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#161920] rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-2 h-6 bg-cyan-500 rounded-full"></span> Today's Schedule
                </h3>
                
                <div className="space-y-4">
                    {EVENTS.map((event) => (
                        <div key={event.id} className="group flex items-center gap-4 p-4 rounded-xl bg-[#0f1115] border border-gray-800 hover:border-cyan-500/30 transition-all">
                             <div className="flex-shrink-0 w-16 text-center">
                                <span className="block text-lg font-bold text-white">{event.time}</span>
                                <span className="text-xs text-gray-500 uppercase font-bold">{event.duration}</span>
                             </div>
                             
                             <div className="w-px h-10 bg-gray-800 group-hover:bg-gray-700 transition-colors"></div>
                             
                             <div className="flex-1 min-w-0">
                                <h4 className="text-white font-bold truncate group-hover:text-cyan-400 transition-colors">{event.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                                        event.platform === 'YouTube' ? 'bg-red-900/20 text-red-400 border-red-500/20' : 
                                        event.platform === 'Twitch' ? 'bg-purple-900/20 text-purple-400 border-purple-500/20' :
                                        'bg-blue-900/20 text-blue-400 border-blue-500/20'
                                    }`}>
                                        {event.platform}
                                    </span>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <Clock size={12} /> {event.date}
                                    </span>
                                </div>
                             </div>

                             <div className="flex-shrink-0 flex items-center gap-4">
                                {event.status === 'READY' ? (
                                    <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-900/10 px-2 py-1 rounded border border-green-500/20">
                                        <CheckCircle2 size={12} /> READY
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-800 px-2 py-1 rounded border border-gray-700">
                                        <Clock3 size={12} /> SCHEDULED
                                    </span>
                                )}
                                <button className="text-gray-500 hover:text-white transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#161920] rounded-xl border border-gray-800 p-6 opacity-60 hover:opacity-100 transition-opacity">
                 <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Tomorrow</h3>
                 <div className="p-8 border-2 border-dashed border-gray-800 rounded-xl flex flex-col items-center justify-center text-gray-500">
                    <p className="text-sm mb-2">No events scheduled</p>
                    <button className="text-cyan-400 text-xs font-bold hover:underline">Schedule Stream</button>
                 </div>
            </div>
        </div>

        {/* Calendar Widget Area */}
        <div className="space-y-6">
            <div className="bg-[#161920] rounded-xl border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-white">April 2025</h4>
                    <div className="flex gap-1">
                        <button className="p-1 hover:bg-gray-800 rounded text-gray-400">&lt;</button>
                        <button className="p-1 hover:bg-gray-800 rounded text-gray-400">&gt;</button>
                    </div>
                </div>
                {/* Simplified Calendar Grid Visual */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                    <span className="text-gray-500">Su</span>
                    <span className="text-gray-500">Mo</span>
                    <span className="text-gray-500">Tu</span>
                    <span className="text-gray-500">We</span>
                    <span className="text-gray-500">Th</span>
                    <span className="text-gray-500">Fr</span>
                    <span className="text-gray-500">Sa</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {Array.from({length: 30}).map((_, i) => (
                        <div key={i} className={`p-2 rounded hover:bg-gray-800 cursor-pointer ${i === 11 ? 'bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-900/50' : 'text-gray-400'}`}>
                            {i+1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};