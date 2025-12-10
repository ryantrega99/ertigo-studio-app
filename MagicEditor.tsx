import React, { useState, useRef } from 'react';
import { Wand2, Upload, Download, Loader2, Image as ImageIcon, Sparkles, RefreshCcw, Save } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';

interface MagicEditorProps {
  addNotification?: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const MagicEditor: React.FC<MagicEditorProps> = ({ addNotification }) => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setProcessedImage(null); // Reset previous result
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!originalImage || !originalImageFile || !prompt) return;

    setLoading(true);
    setError(null);

    try {
      // Extract base64 without prefix
      const base64Data = originalImage.split(',')[1];
      const mimeType = originalImageFile.type;

      const resultBase64 = await editImageWithGemini(base64Data, mimeType, prompt);

      if (resultBase64) {
        setProcessedImage(`data:${mimeType};base64,${resultBase64}`);
        if (addNotification) addNotification('success', 'Image generated successfully');
      } else {
        throw new Error("Failed to generate image.");
      }
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred during image generation.";
      setError(errorMessage);
      if (addNotification) addNotification('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `neostream-edit-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (addNotification) addNotification('info', 'Image downloaded');
  };

  return (
    <div className="h-full flex flex-col gap-6 md:gap-8 animate-fade-in pb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-gray-800 pb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <Sparkles size={20} className="text-white" />
            </span>
            Creative Studio
          </h2>
          <p className="text-gray-400 mt-2 text-sm md:text-base">AI-Powered Asset Generation & Editing</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
             <button className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-[#161920] border border-gray-700 text-gray-400 hover:text-white text-sm font-medium transition-colors">
                History
             </button>
             <button className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-[#161920] border border-gray-700 text-gray-400 hover:text-white text-sm font-medium transition-colors">
                Templates
             </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        {/* Editor Controls */}
        <div className="lg:col-span-4 space-y-6 bg-[#161920] p-6 rounded-2xl border border-gray-800 h-fit">
          <div className="space-y-4">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">1. Source Asset</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 hover:bg-gray-800/30 transition-all group relative overflow-hidden"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="p-4 bg-[#0f1115] rounded-full mb-3 group-hover:scale-110 transition-transform shadow-lg border border-gray-800">
                <Upload className="text-cyan-400" size={24} />
              </div>
              <p className="text-sm text-gray-300 font-medium text-center">Click or Drag File</p>
              <p className="text-xs text-gray-500 mt-1">Supports PNG, JPG (Max 10MB)</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">2. AI Instruction</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the changes (e.g., 'Add a neon glow', 'Remove background')..."
              className="w-full bg-[#0f1115] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 min-h-[140px] resize-none text-sm leading-relaxed"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!originalImage || !prompt || loading}
            className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg ${
              !originalImage || !prompt || loading
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-cyan-900/40 hover:scale-[1.01] border border-cyan-500/20'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Processing...
              </>
            ) : (
              <>
                <Wand2 size={18} />
                Generate
              </>
            )}
          </button>
          
          {error && (
            <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-xl text-red-400 text-xs break-words">
              Error: {error}
            </div>
          )}
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex-1 bg-[#161920] rounded-2xl border border-gray-800 relative overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-[500px] p-2">
            {!originalImage ? (
              <div className="text-center text-gray-600">
                <ImageIcon size={64} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm">Upload an image to open the studio</p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col md:flex-row gap-4 md:gap-2">
                 {/* Original Image */}
                 <div className="flex-1 flex flex-col h-[300px] md:h-auto">
                    <div className="flex justify-between items-center mb-2 px-2 shrink-0">
                         <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Original</span>
                    </div>
                    <div className="flex-1 bg-[#0f1115] rounded-xl border border-gray-800 overflow-hidden relative">
                        <img 
                          src={originalImage} 
                          alt="Original" 
                          className="w-full h-full object-contain" 
                        />
                    </div>
                 </div>
                 
                 {/* Processed Image */}
                 {(processedImage || loading) && (
                   <div className="flex-1 flex flex-col h-[300px] md:h-auto animate-fade-in">
                      <div className="flex justify-between items-center mb-2 px-2 shrink-0">
                         <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                            <Sparkles size={12} /> Processed
                         </span>
                      </div>
                      <div className="flex-1 bg-[#0f1115] rounded-xl border border-cyan-500/20 overflow-hidden relative">
                          {loading ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f1115]/80 z-10 backdrop-blur-sm">
                              <Loader2 className="animate-spin text-cyan-500 mb-2" size={32} />
                              <p className="text-gray-400 text-xs font-medium animate-pulse uppercase tracking-widest">Generating...</p>
                            </div>
                          ) : processedImage ? (
                            <img 
                              src={processedImage} 
                              alt="Processed" 
                              className="w-full h-full object-contain" 
                            />
                          ) : null}
                      </div>
                   </div>
                 )}
              </div>
            )}
          </div>

          {processedImage && (
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button 
                onClick={() => setProcessedImage(null)}
                className="px-6 py-3 bg-[#161920] border border-gray-700 hover:border-gray-500 text-gray-300 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm"
              >
                <RefreshCcw size={18} />
                Reset
              </button>
              <button 
                onClick={handleDownload}
                className="px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg text-sm"
              >
                <Save size={18} />
                Save Asset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};