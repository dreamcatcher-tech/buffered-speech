import React, { useState, useEffect } from 'react';
import { 
  Pause, Play, Mic, MicOff, MessageSquarePlus, 
  FastForward, UserMinus, Info, Maximize2, Minimize2
} from 'lucide-react';

export interface ParticipantProps {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  bufferState: {
    isPaused: boolean;
    isBuffering: boolean;
    bufferSize: number;
  };
  onRemove?: () => void;
}

export const Participant: React.FC<ParticipantProps> = ({
  id,
  name,
  avatarUrl,
  role,
  bufferState: initialBufferState,
  onRemove
}) => {
  const [expanded, setExpanded] = useState(false);
  const [bufferState, setBufferState] = useState(initialBufferState);
  const [lastActivity, setLastActivity] = useState(new Date());
  const [isActive, setIsActive] = useState(false);
  const [feedMessages, setFeedMessages] = useState<string[]>([]);
  const [bufferMessages, setBufferMessages] = useState<string[]>([]);
  
  // Randomly change activity state
  useEffect(() => {
    const activityInterval = setInterval(() => {
      const shouldBeActive = Math.random() > 0.7;
      setIsActive(shouldBeActive);
      if (shouldBeActive) {
        setLastActivity(new Date());
      }
    }, 5000 + Math.random() * 7000);
    
    return () => clearInterval(activityInterval);
  }, []);
  
  // Simulate random messages coming in
  useEffect(() => {
    const messageInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newMessage = generateRandomMessage();
        if (bufferState.isPaused) {
          setBufferMessages(prev => [...prev, newMessage]);
        } else {
          setFeedMessages(prev => [newMessage, ...prev].slice(0, 5));
        }
      }
    }, 3000 + Math.random() * 5000);
    
    return () => clearInterval(messageInterval);
  }, [bufferState.isPaused]);
  
  const generateRandomMessage = () => {
    const messages = [
      "I think we should consider...",
      "What about trying a different approach?",
      "That's an interesting point!",
      "I need more clarity on this topic.",
      "Let me share my perspective...",
      "I wonder if we've considered all options?",
      "Building on that idea...",
      "Let's explore this further.",
      "I have a question about that.",
      "This reminds me of a similar case."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };
  
  const togglePause = () => {
    setBufferState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  };
  
  const toggleBuffer = () => {
    setBufferState(prev => ({
      ...prev,
      isBuffering: !prev.isBuffering
    }));
  };
  
  const resumePlayback = () => {
    // Move buffer messages to feed and clear buffer
    setFeedMessages(prev => [...bufferMessages.reverse(), ...prev].slice(0, 5));
    setBufferMessages([]);
    setBufferState(prev => ({
      ...prev,
      isPaused: false
    }));
  };
  
  // Format time since last activity
  const formatTimeSince = () => {
    const diffMs = new Date().getTime() - lastActivity.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return `${diffSec}s ago`;
    return `${Math.floor(diffSec / 60)}m ago`;
  };
  
  // Calculate buffer fullness percentage
  const bufferPercentage = (bufferMessages.length / 10) * 100;
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${expanded ? 'col-span-2 row-span-2' : ''}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <img 
                src={avatarUrl} 
                alt={name} 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
            </div>
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-xs text-indigo-100">{role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-white hover:bg-white/10 p-1 rounded"
            >
              {expanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            {onRemove && (
              <button 
                onClick={onRemove}
                className="text-white hover:bg-white/10 p-1 rounded"
              >
                <UserMinus size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Buffer Status */}
      <div className="px-4 py-2 bg-gray-50 border-b flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {isActive ? (
            <div className="flex items-center text-green-600">
              <Mic size={16} className="mr-1" />
              <span className="text-xs">Speaking</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-500">
              <MicOff size={16} className="mr-1" />
              <span className="text-xs">Idle {formatTimeSince()}</span>
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <div className="text-xs font-medium flex items-center">
            Buffer: 
            <div className="w-20 h-2 bg-gray-200 rounded-full ml-1">
              <div 
                className="h-2 bg-indigo-500 rounded-full" 
                style={{ width: `${bufferPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className={`text-xs px-2 py-0.5 rounded ${bufferState.isPaused ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
            {bufferState.isPaused ? 'Paused' : 'Listening'}
          </div>
          {bufferState.isBuffering && (
            <div className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Buffering
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Buffer Area */}
        {bufferMessages.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-amber-700 mb-2 flex items-center">
              <Pause size={16} className="mr-1" /> Buffered Messages
            </h4>
            <div className="bg-amber-50 rounded-md p-2 space-y-2">
              {bufferMessages.map((message, index) => (
                <div key={index} className="text-sm p-2 bg-white rounded border border-amber-200">
                  {message}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Feed Area */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Messages</h4>
          <div className="space-y-2">
            {feedMessages.length > 0 ? (
              feedMessages.map((message, index) => (
                <div key={index} className="text-sm p-2 bg-gray-50 rounded border border-gray-200">
                  {message}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 italic">No recent messages</div>
            )}
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="p-3 bg-gray-100 border-t">
        <div className="flex justify-around">
          <button 
            onClick={togglePause}
            className={`flex flex-col items-center text-xs ${
              bufferState.isPaused ? 'text-green-600' : 'text-amber-600'
            }`}
            title={bufferState.isPaused ? "Resume Listening" : "Pause Incoming"}
          >
            {bufferState.isPaused ? <Play size={18} /> : <Pause size={18} />}
            <span className="mt-1">{bufferState.isPaused ? "Resume" : "Pause"}</span>
          </button>
          
          <button 
            onClick={toggleBuffer}
            className={`flex flex-col items-center text-xs ${
              bufferState.isBuffering ? 'text-blue-600' : 'text-gray-600'
            }`}
            title={bufferState.isBuffering ? "Stop Buffering" : "Start Buffering"}
          >
            <MessageSquarePlus size={18} />
            <span className="mt-1">Buffer</span>
          </button>
          
          <button 
            onClick={resumePlayback}
            className={`flex flex-col items-center text-xs ${
              bufferMessages.length > 0 ? 'text-indigo-600' : 'text-gray-400'
            }`}
            disabled={bufferMessages.length === 0}
            title="Process Buffered Messages"
          >
            <FastForward size={18} />
            <span className="mt-1">Playback</span>
          </button>
        </div>
      </div>
    </div>
  );
};