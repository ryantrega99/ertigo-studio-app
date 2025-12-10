import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { MagicEditor } from './components/MagicEditor';
import { StreamManager } from './components/StreamManager';
import { VideoGallery } from './components/VideoGallery';
import { LoopAutomation } from './components/LoopAutomation';
import { Schedule } from './components/Schedule';
import { SystemSettings } from './components/SystemSettings';
import { DataChannel } from './components/DataChannel';
import { YtAutomation } from './components/YtAutomation';
import { ViewState, Notification } from './types';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const renderView = () => {
    const commonProps = { addNotification };

    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard {...commonProps} />;
      case ViewState.DATA_CHANNEL:
        return <DataChannel {...commonProps} />;
      case ViewState.YT_AUTOMATION:
        return <YtAutomation {...commonProps} />;
      case ViewState.MAGIC_EDITOR:
        return <MagicEditor {...commonProps} />;
      case ViewState.STREAMING:
        return <StreamManager {...commonProps} />;
      case ViewState.VIDEO_GALLERY:
        return <VideoGallery {...commonProps} />;
      case ViewState.LOOPING:
        return <LoopAutomation {...commonProps} />;
      case ViewState.SCHEDULE:
        return <Schedule {...commonProps} />;
      case ViewState.SYSTEM:
        return <SystemSettings {...commonProps} />;
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen text-gray-100 font-sans flex flex-col relative overflow-hidden">
      {/* Toast Notification Container */}
      <div className="fixed top-24 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {notifications.map((n) => (
          <div 
            key={n.id} 
            className={`pointer-events-auto min-w-[300px] p-4 rounded-xl border backdrop-blur-md shadow-2xl animate-fade-in-left flex items-start gap-3 transition-all ${
              n.type === 'success' ? 'bg-green-900/80 border-green-500/30 text-green-100' :
              n.type === 'error' ? 'bg-red-900/80 border-red-500/30 text-red-100' :
              'bg-blue-900/80 border-blue-500/30 text-blue-100'
            }`}
          >
            <div className="mt-0.5">
              {n.type === 'success' && <CheckCircle size={18} className="text-green-400" />}
              {n.type === 'error' && <AlertCircle size={18} className="text-red-400" />}
              {n.type === 'info' && <Info size={18} className="text-blue-400" />}
            </div>
            <div className="flex-1 text-sm font-medium leading-tight pt-0.5">{n.message}</div>
            <button 
              onClick={() => removeNotification(n.id)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="w-full max-w-[1400px] mx-auto p-4 md:p-8 pb-0 z-50 relative">
        <TopBar 
          currentView={currentView} 
          onNavigate={setCurrentView}
        />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 w-full relative z-10 flex flex-col">
        <div className="max-w-[1400px] mx-auto h-full w-full flex-1">
           {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;