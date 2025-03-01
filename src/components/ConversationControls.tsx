import React, { useState } from 'react';
import { 
  Volume2, VolumeX, FastForward, Settings, 
  Clock, ToggleLeft, ToggleRight 
} from 'lucide-react';

export const ConversationControls: React.FC = () => {
  const [globalMuted, setGlobalMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [aiAssistEnabled, setAiAssistEnabled] = useState(true);
  const [autoBufferEnabled, setAutoBufferEnabled] = useState(true);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setGlobalMuted(!globalMuted)}
              className={`p-2 rounded-full ${
                globalMuted ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}
            >
              {globalMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div>
              <div className="text-sm font-medium">Global Audio</div>
              <div className="text-xs text-gray-500">
                {globalMuted ? 'Muted' : 'Active'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              className={`p-1 rounded-full ${
                playbackSpeed === 0.5 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setPlaybackSpeed(0.5)}
            >
              0.5x
            </button>
            <button
              className={`p-1 rounded-full ${
                playbackSpeed === 1 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setPlaybackSpeed(1)}
            >
              1x
            </button>
            <button
              className={`p-1 rounded-full ${
                playbackSpeed === 1.5 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setPlaybackSpeed(1.5)}
            >
              1.5x
            </button>
            <button
              className={`p-1 rounded-full ${
                playbackSpeed === 2 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setPlaybackSpeed(2)}
            >
              2x
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Clock size={18} className="text-gray-400" />
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-500">Buffer Timeout</span>
              <span className="text-xs font-medium">30s</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="60" 
              defaultValue="30" 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings size={18} className="text-gray-500" />
            <span className="text-sm">AI-Assisted Summarization</span>
          </div>
          <button 
            onClick={() => setAiAssistEnabled(!aiAssistEnabled)}
            className="text-indigo-600"
          >
            {aiAssistEnabled ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FastForward size={18} className="text-gray-500" />
            <span className="text-sm">Auto-Buffer During High Load</span>
          </div>
          <button 
            onClick={() => setAutoBufferEnabled(!autoBufferEnabled)}
            className="text-indigo-600"
          >
            {autoBufferEnabled ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
          </button>
        </div>
        
        <div className="mt-3 flex space-x-2">
          <button className="px-3 py-1.5 bg-indigo-100 text-indigo-600 rounded text-sm font-medium hover:bg-indigo-200">
            Reset All Buffers
          </button>
          <button className="px-3 py-1.5 bg-amber-100 text-amber-600 rounded text-sm font-medium hover:bg-amber-200">
            Global Pause
          </button>
        </div>
      </div>
    </div>
  );
};