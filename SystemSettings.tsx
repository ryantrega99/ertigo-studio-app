import React, { useState } from 'react';
import { Settings, Server, Key, Save, RefreshCw, Database, Shield, Globe, Check, Loader2 } from 'lucide-react';

interface SystemSettingsProps {
  addNotification?: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const SystemSettings: React.FC<SystemSettingsProps> = ({ addNotification }) => {
  const [activeTab, setActiveTab] = useState('stream');
  const [saving, setSaving] = useState(false);
  
  // Local state for inputs
  const [streamUrl, setStreamUrl] = useState('rtmp://localhost/live');
  const [streamKeyPrefix, setStreamKeyPrefix] = useState('neostream_');
  const [vodPath, setVodPath] = useState('/var/www/neostream/vods');
  const [tempPath, setTempPath] = useState('/tmp/hls_fragments');

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      if (addNotification) {
        addNotification('success', 'System configurations saved successfully.');
      }
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in pb-8">
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <Settings className="text-cyan-400" />
             System Configuration
          </h2>
          <p className="text-gray-400 mt-2">Manage stream keys, server paths, and system preferences.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-[#161920] border border-gray-700 hover:border-green-500 hover:text-green-400 rounded-lg text-gray-300 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2">
            {[
                { id: 'stream', label: 'Stream Settings', icon: Globe },
                { id: 'storage', label: 'Storage & Paths', icon: Database },
                { id: 'api', label: 'API & Security', icon: Key },
                { id: 'server', label: 'Server Info', icon: Server },
            ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                        activeTab === tab.id 
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                >
                    <tab.icon size={18} />
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 bg-[#161920] rounded-xl border border-gray-800 p-6 md:p-8">
            {activeTab === 'stream' && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-4">Stream Configuration</h3>
                    
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Default RTMP Ingest URL</span>
                            <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  value={streamUrl}
                                  onChange={(e) => setStreamUrl(e.target.value)}
                                  className="flex-1 bg-[#0f1115] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 outline-none font-mono text-sm" 
                                />
                                <button className="p-2.5 bg-[#0f1115] border border-gray-700 rounded-lg text-gray-400 hover:text-white"><RefreshCw size={18} /></button>
                            </div>
                        </label>

                        <label className="block">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Stream Key Prefix</span>
                            <input 
                              type="text" 
                              value={streamKeyPrefix}
                              onChange={(e) => setStreamKeyPrefix(e.target.value)}
                              className="w-full bg-[#0f1115] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-cyan-500 outline-none font-mono text-sm" 
                            />
                        </label>

                        <div className="pt-4">
                             <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Output Resolution</span>
                             <div className="grid grid-cols-3 gap-4">
                                 <button className="p-3 rounded-lg bg-cyan-900/20 border border-cyan-500/50 text-cyan-400 font-bold text-sm">1080p60</button>
                                 <button className="p-3 rounded-lg bg-[#0f1115] border border-gray-700 text-gray-400 hover:text-white font-bold text-sm">720p60</button>
                                 <button className="p-3 rounded-lg bg-[#0f1115] border border-gray-700 text-gray-400 hover:text-white font-bold text-sm">480p30</button>
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'storage' && (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-4">Storage Configuration</h3>
                    <div className="p-4 bg-yellow-900/10 border border-yellow-500/20 rounded-lg flex gap-3 text-yellow-500 text-sm mb-6">
                        <Shield size={20} className="shrink-0" />
                        <p>Ensure the system user has write permissions to these directories.</p>
                    </div>

                    <label className="block">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">VOD Storage Path</span>
                        <input 
                          type="text" 
                          value={vodPath}
                          onChange={(e) => setVodPath(e.target.value)}
                          className="w-full bg-[#0f1115] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 focus:border-cyan-500 outline-none font-mono text-sm" 
                        />
                    </label>

                     <label className="block mt-4">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Temp Recording Path</span>
                        <input 
                          type="text" 
                          value={tempPath}
                          onChange={(e) => setTempPath(e.target.value)}
                          className="w-full bg-[#0f1115] border border-gray-700 rounded-lg px-4 py-2.5 text-gray-300 focus:border-cyan-500 outline-none font-mono text-sm" 
                        />
                    </label>
                </div>
            )}

            {activeTab === 'api' && (
                 <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-4">API & Security</h3>
                    
                    <div className="bg-[#0f1115] border border-gray-700 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-500/10 rounded-lg text-green-400 border border-green-500/20">
                          <Globe size={24} />
                        </div>
                        <div>
                           <h4 className="text-white font-bold text-lg">Gemini AI Service</h4>
                           <p className="text-gray-400 text-sm mt-1">Status: <span className="text-green-400 font-bold">Connected & Ready</span></p>
                           <p className="text-gray-500 text-xs mt-2">API Credential is managed securely via environment variables.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0f1115] border border-gray-700 rounded-xl p-6 opacity-75">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gray-800 rounded-lg text-gray-400 border border-gray-700">
                          <Key size={24} />
                        </div>
                        <div>
                           <h4 className="text-gray-300 font-bold text-lg">YouTube Data API</h4>
                           <p className="text-gray-500 text-sm mt-1">Status: <span className="text-yellow-500 font-bold">Quota Limiting Active</span></p>
                        </div>
                      </div>
                    </div>
                 </div>
            )}

            {activeTab === 'server' && (
                 <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-4">Server Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0f1115] p-4 rounded-lg border border-gray-700">
                            <span className="text-gray-500 text-xs uppercase block mb-1">Node Version</span>
                            <span className="text-white font-mono">v18.16.0</span>
                        </div>
                        <div className="bg-[#0f1115] p-4 rounded-lg border border-gray-700">
                            <span className="text-gray-500 text-xs uppercase block mb-1">Uptime</span>
                            <span className="text-white font-mono">14d 2h 12m</span>
                        </div>
                         <div className="bg-[#0f1115] p-4 rounded-lg border border-gray-700">
                            <span className="text-gray-500 text-xs uppercase block mb-1">FFmpeg</span>
                            <span className="text-white font-mono">5.1.2-ubuntu-2</span>
                        </div>
                    </div>
                 </div>
            )}
        </div>
      </div>
    </div>
  );
};