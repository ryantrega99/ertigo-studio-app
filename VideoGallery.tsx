import React, { useState } from 'react';
import { Search, Filter, Trash2, Eye, Edit2, Play, CheckSquare, Square, Repeat, Upload, FileVideo, MoreVertical, Download } from 'lucide-react';
import { VideoAsset } from '../types';

const MOCK_ASSETS: VideoAsset[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `vid-${i + 1}`,
  no: i + 1,
  channel: 'd2kg',
  source: 'LIVE',
  fileName: `Looping Video Live ${100 - i}.mp4`,
  category: 'Video Looping Live',
  date: '2025-04-12',
  duration: '10:00:00',
  status: i === 0 ? 'LOOPING' : i === 2 ? 'SCHEDULED' : 'IDLE'
}));

interface VideoGalleryProps {
  addNotification?: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({ addNotification }) => {
  const [assets, setAssets] = useState<VideoAsset[]>(MOCK_ASSETS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === assets.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(assets.map(a => a.id));
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
        setAssets(prev => prev.filter(a => a.id !== id));
        setSelectedIds(prev => prev.filter(i => i !== id));
        if (addNotification) addNotification('success', 'Video deleted successfully');
    }
  };

  const handleLoop = (asset: VideoAsset) => {
    if (addNotification) addNotification('success', `Added "${asset.fileName}" to Loop Queue`);
  };

  const filteredAssets = assets.filter(asset => 
    asset.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <FileVideo className="text-cyan-400" />
             Video Assets
          </h2>
          <p className="text-gray-400 mt-2">Manage your video library, uploads, and recorded streams.</p>
        </div>
        
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-[#161920] border border-gray-700 hover:border-gray-500 rounded-lg text-white font-medium transition-colors">
                <Download size={18} /> Import from YouTube
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg text-white font-bold transition-colors shadow-lg shadow-cyan-900/20">
                <Upload size={18} /> Upload Video
             </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-[#161920] p-4 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
                <input 
                    type="text" 
                    placeholder="Search video files..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0f1115] border border-gray-700 text-gray-300 text-sm rounded-lg pl-9 pr-3 py-2 focus:border-cyan-500 outline-none placeholder-gray-600 transition-colors"
                />
                <Search size={14} className="absolute left-3 top-2.5 text-gray-500" />
            </div>
            <button className="p-2 bg-[#0f1115] border border-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors">
                <Filter size={18} />
            </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
             {selectedIds.length > 0 && (
                <div className="flex items-center gap-2 animate-fade-in">
                    <span className="text-xs text-gray-500 font-bold uppercase">{selectedIds.length} Selected</span>
                    <button 
                        onClick={() => {
                            if(confirm('Delete selected?')) {
                                setAssets(prev => prev.filter(a => !selectedIds.includes(a.id)));
                                setSelectedIds([]);
                                if (addNotification) addNotification('success', 'Selected videos deleted');
                            }
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-900/50 rounded-lg text-xs font-bold transition-colors"
                    >
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 bg-[#161920] rounded-xl border border-gray-800 overflow-hidden shadow-xl min-h-0 flex flex-col">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-[#0f1115] border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                        <th className="p-4 w-12 text-center">
                            <button onClick={handleSelectAll} className="hover:text-cyan-400">
                                {selectedIds.length === assets.length && assets.length > 0 ? <CheckSquare size={16} className="text-cyan-400" /> : <Square size={16} />}
                            </button>
                        </th>
                        <th className="p-4">Filename</th>
                        <th className="p-4 hidden md:table-cell">Duration</th>
                        <th className="p-4 hidden md:table-cell">Date Added</th>
                        <th className="p-4 hidden lg:table-cell">Size</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
                    {filteredAssets.map((asset) => (
                        <tr key={asset.id} className={`hover:bg-gray-800/30 transition-colors group ${selectedIds.includes(asset.id) ? 'bg-cyan-900/05' : ''}`}>
                            <td className="p-4 text-center">
                                <button onClick={() => handleSelect(asset.id)} className={`${selectedIds.includes(asset.id) ? 'text-cyan-400' : 'text-gray-600 hover:text-gray-400'}`}>
                                    {selectedIds.includes(asset.id) ? <CheckSquare size={16} /> : <Square size={16} />}
                                </button>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-black/50 border border-gray-700 flex items-center justify-center shrink-0">
                                        <Play size={16} className="text-gray-500" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-medium text-white truncate max-w-[200px] md:max-w-xs group-hover:text-cyan-400 transition-colors">{asset.fileName}</span>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                            <span className="bg-gray-800 px-1.5 rounded">{asset.source}</span>
                                            {asset.status === 'LOOPING' && <span className="text-red-400 font-bold">• Live Now</span>}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 font-mono text-gray-400 hidden md:table-cell">{asset.duration}</td>
                            <td className="p-4 text-gray-500 hidden md:table-cell">{asset.date}</td>
                            <td className="p-4 text-gray-500 hidden lg:table-cell">2.4 GB</td>
                            <td className="p-4">
                                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => handleLoop(asset)}
                                        className="px-3 py-1.5 bg-cyan-600/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-600 hover:text-white rounded text-xs font-bold transition-all whitespace-nowrap"
                                        title="Use in Looper"
                                    >
                                        <Repeat size={14} className="inline mr-1" /> Loop This
                                    </button>
                                    <button 
                                        className="p-1.5 hover:bg-gray-700 text-gray-400 hover:text-white rounded transition-colors"
                                        title="Edit Details"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(asset.id)}
                                        className="p-1.5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded transition-colors" 
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {filteredAssets.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
                <FileVideo size={48} className="opacity-20 mb-4" />
                <p>No videos found matching your criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
};