import React from 'react';
import { Zap, MessageSquare, Search, UploadCloud, FileText, Bot, ArrowRight, Sparkles, Tag } from 'lucide-react';

const ToolCard = ({ title, description, icon: Icon, color }: any) => (
  <div className="bg-[#161920] p-6 rounded-2xl border border-gray-800 group hover:border-gray-600 transition-all cursor-pointer relative overflow-hidden">
     <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>
     
     <div className={`w-12 h-12 rounded-xl bg-${color}-500/20 flex items-center justify-center text-${color}-400 mb-4 group-hover:bg-${color}-500/30 transition-colors`}>
        <Icon size={24} />
     </div>
     
     <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{title}</h3>
     <p className="text-gray-400 text-sm mb-6 leading-relaxed min-h-[40px]">{description}</p>
     
     <div className="flex items-center text-sm font-bold text-gray-500 group-hover:text-white transition-colors">
        Launch Tool <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
     </div>
  </div>
);

interface YtAutomationProps {
  addNotification?: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const YtAutomation: React.FC<YtAutomationProps> = ({ addNotification }) => {
  return (
    <div className="h-full flex flex-col gap-8 animate-fade-in pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <Zap className="text-yellow-400" />
             YouTube Automation
          </h2>
          <p className="text-gray-400 mt-2">AI-powered tools to automate your channel growth and engagement.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-[#161920] px-4 py-2 rounded-lg border border-gray-800">
             <Bot size={18} className="text-cyan-400" />
             <span className="text-sm font-bold text-gray-300">AI Credits: <span className="text-white">450 / 1000</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard 
            title="Auto Comment Reply" 
            description="Automatically reply to new comments using AI that mimics your tone and personality."
            icon={MessageSquare}
            color="cyan"
        />
        <ToolCard 
            title="SEO Keyword Researcher" 
            description="Find low-competition, high-volume keywords to rank your videos #1 on search."
            icon={Search}
            color="purple"
        />
        <ToolCard 
            title="Description Generator" 
            description="Generate SEO-optimized video descriptions with timestamps and hashtags in seconds."
            icon={FileText}
            color="green"
        />
        <ToolCard 
            title="Bulk Metadata Update" 
            description="Update titles, descriptions, and tags across hundreds of videos simultaneously."
            icon={UploadCloud}
            color="blue"
        />
        <ToolCard 
            title="Thumbnail A/B Testing" 
            description="AI analyzes your thumbnails and suggests improvements for higher CTR."
            icon={Sparkles}
            color="pink"
        />
        <ToolCard 
            title="Tag Generator" 
            description="Get the perfect mix of broad and specific tags based on your video content."
            icon={Tag}
            color="orange"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-[#161920] rounded-2xl border border-gray-800 p-6">
        <h3 className="text-lg font-bold text-white mb-6">Recent Automation Activity</h3>
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#0f1115] rounded-xl border border-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-900/20 flex items-center justify-center text-cyan-400">
                            <MessageSquare size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm">Replied to 45 comments</h4>
                            <p className="text-xs text-gray-500">Channel: Tech Daily • 2 hours ago</p>
                        </div>
                    </div>
                    <span className="text-xs font-bold text-green-400 bg-green-900/10 px-2 py-1 rounded border border-green-500/20">COMPLETED</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};