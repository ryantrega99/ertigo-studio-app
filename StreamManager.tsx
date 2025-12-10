import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Users, Wifi, Mic, MicOff, Video, VideoOff, 
  Settings, Radio, Activity, Share2, MoreHorizontal, Send
} from 'lucide-react';
import { ChatMessage } from '../types';

interface StreamManagerProps {
  addNotification?: (type: 'success' | 'error' | 'info', message: string) => void;
}

const MOCK_CHAT: ChatMessage[] = [
  { id: '1', user: 'SuperFan99', message: 'Hype! 🔥', timestamp: '10:01', color: 'text-cyan-400' },
  { id: '2', user: 'TechGeek', message: 'Is this the new AI tool?', timestamp: '10:02', color: 'text-green-400' },
  { id: '3', user: 'ReactDev', message: 'Look at that UI!', timestamp: '10:02', color: 'text-purple-400' },
];

export const StreamManager: React.FC<StreamManagerProps> = ({ addNotification }) => {
  const [isLive, setIsLive] = useState(false);
  const [duration, setDuration] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [chat, setChat] = useState<ChatMessage[]>(MOCK_CHAT);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isLive) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      if (addNotification) addNotification('success', 'Stream Started Successfully - Live on Channel 1');
    } else if (duration > 0) {
      setDuration(0);
      if (addNotification) addNotification('info', 'Stream Ended');
    }
    return () => clearInterval(interval);
  }, [isLive]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      user: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      color: 'text-cyan-500 font-bold'
    };
    setChat(prev => [...prev, msg]);
    setNewMessage('');
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 animate-fade-in pb-8">
      {/* Main Stream Area */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 tracking-tight">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLive ? 'bg-red-400' : 'bg-gray-500'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? 'bg-red-500' : 'bg-gray-500'}`}></span>
              </span>
              Live Control Room
            </h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Manage your broadcast output and engagement.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isLive && (
              <div className="bg-[#161920] border border-red-500/20 px-3 py-2 rounded-lg flex items-center gap-2 md:gap-3 flex-1 sm:flex-none justify-center">
                <Activity size={16} className="text-red-500 animate-pulse" />
                <span className="text-red-400 font-mono font-bold tracking-wider text-sm">{formatTime(duration)}</span>
              </div>
            )}
            <button 
              onClick={() => setIsLive(!isLive)}
              className={`px-6 py-3 rounded-lg font-bold transition-all uppercase tracking-wide text-xs md:text-sm flex-1 sm:flex-none ${
                isLive 
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' 
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_20px_rgba(8,145,178,0.3)]'
              }`}
            >
              {isLive ? 'End Stream' : 'Go Live'}
            </button>
          </div>
        </div>

        <div className="w-full aspect-video bg-black rounded-2xl relative overflow-hidden group border border-gray-800 shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center">
            {camOn ? (
              <div className="text-center w-full h-full relative">
                <img src="https://picsum.photos/1280/720" alt="Stream Preview" className="w-full h-full object-cover opacity-80" />
                {!isLive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <div className="text-center p-6 md:p-8 border border-gray-700 bg-[#0f1115]/90 rounded-2xl max-w-sm w-full">
                            <Radio className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-4 text-gray-500" />
                            <h3 className="text-lg md:text-xl font-bold text-white">Stream is Offline</h3>
                            <p className="text-gray-400 mt-2 text-sm">Check your output settings in OBS before going live.</p>
                        </div>
                    </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-600">
                <VideoOff size={48} className="mb-4" />
                <p>Camera source disconnected</p>
              </div>
            )}
          </div>
          
          {/* Overlay Controls */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 px-4 md:px-6 py-2 md:py-3 bg-[#0f1115]/80 backdrop-blur-md rounded-2xl border border-gray-700/50 transition-all opacity-100 lg:translate-y-2 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 w-[90%] md:w-auto justify-center z-10">
              <button 
                onClick={() => setMicOn(!micOn)}
                className={`p-2 md:p-3 rounded-xl transition-colors ${micOn ? 'bg-gray-700/50 text-white hover:bg-gray-600' : 'bg-red-500 text-white'}`}
              >
                {micOn ? <Mic size={18} /> : <MicOff size={18} />}
              </button>
              <button 
                onClick={() => setCamOn(!camOn)}
                className={`p-2 md:p-3 rounded-xl transition-colors ${camOn ? 'bg-gray-700/50 text-white hover:bg-gray-600' : 'bg-red-500 text-white'}`}
              >
                {camOn ? <Video size={18} /> : <VideoOff size={18} />}
              </button>
              <div className="w-px h-6 md:h-8 bg-gray-600 mx-1 md:mx-2"></div>
              <button className="p-2 md:p-3 rounded-xl bg-gray-700/50 text-white hover:bg-gray-600 transition-colors">
                 <Share2 size={18} />
              </button>
              <button className="p-2 md:p-3 rounded-xl bg-gray-700/50 text-white hover:bg-gray-600 transition-colors">
                 <Settings size={18} />
              </button>
          </div>
          
          {/* Stats Overlay */}
          <div className="absolute top-4 left-4 flex gap-2 md:gap-3">
             <div className="bg-black/60 backdrop-blur-md px-2 md:px-3 py-1 md:py-1.5 rounded-lg flex items-center gap-2 text-white border border-white/10">
                <Wifi size={12} className={isLive ? 'text-green-400' : 'text-gray-400'} />
                <span className="text-[10px] md:text-xs font-bold tracking-wide">{isLive ? '12ms' : '---'}</span>
             </div>
             <div className="bg-black/60 backdrop-blur-md px-2 md:px-3 py-1 md:py-1.5 rounded-lg flex items-center gap-2 text-white border border-white/10">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></span>
                <span className="text-[10px] md:text-xs font-bold tracking-wide">1080p60</span>
             </div>
          </div>
             
          {isLive && (
             <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg animate-pulse">
               <Users size={14} />
               <span className="text-xs font-bold">1,245</span>
             </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-full lg:w-80 h-[400px] lg:h-auto bg-[#161920] rounded-2xl border border-gray-800 flex flex-col overflow-hidden shrink-0 shadow-xl">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#161920]">
          <h3 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wide">
            <MessageSquare size={16} className="text-cyan-400" />
            Live Chat
          </h3>
          <button className="text-gray-500 hover:text-white">
            <MoreHorizontal size={16} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0f1115] scrollbar-thin scrollbar-thumb-gray-700">
          {chat.map((msg) => (
            <div key={msg.id} className="text-sm animate-fade-in-up flex items-start gap-2 group">
              <span className="text-gray-600 text-[10px] mt-1 select-none font-mono min-w-[35px]">{msg.timestamp}</span>
              <div className="break-words min-w-0 flex-1">
                  <span className={`font-bold text-xs ${msg.color} mr-1 block`}>{msg.user}</span>
                  <span className="text-gray-300 leading-relaxed text-xs md:text-sm">{msg.message}</span>
              </div>
            </div>
          ))}
          {chat.length === 0 && (
            <div className="h-full flex items-center justify-center text-gray-600 text-xs italic">
              Waiting for messages...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        <div className="p-3 border-t border-gray-800 bg-[#161920]">
          <form onSubmit={handleSendMessage} className="relative flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Send..."
              className="flex-1 bg-[#0f1115] border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 text-sm"
            />
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};