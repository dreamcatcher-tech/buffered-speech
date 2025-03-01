import React, { useState, useEffect } from 'react';
import { 
  Pause, Play, Mic, MicOff, MessageSquarePlus, Brain, 
  Plus, Minus, UserPlus, MoveHorizontal, Settings, 
  BarChart4, Github, Info
} from 'lucide-react';
import { Participant, ParticipantProps } from './components/Participant';
import { ConversationStats } from './components/ConversationStats';
import { generateParticipant } from './utils/participantGenerator';
import { ConversationControls } from './components/ConversationControls';
import { InfoPanel } from './components/InfoPanel';

function App() {
  const [participants, setParticipants] = useState<ParticipantProps[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  
  // Initialize with 4 random participants
  useEffect(() => {
    if (participants.length === 0) {
      const initialParticipants = Array.from({ length: 4 }, () => generateParticipant());
      setParticipants(initialParticipants);
    }
  }, [participants.length]);

  const addParticipant = () => {
    setParticipants([...participants, generateParticipant()]);
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  // Calculate system efficiency metrics based on new formula
  const calculateEfficiency = () => {
    const ideasPerParticipant = 20; // T_max value
    const collisionProbability = 0.1; // P value
    const n = participants.length;
    
    // Traditional communication formula
    const traditionalCollisions = (n * (n - 1) / 2) * collisionProbability;
    const traditionalOverflow = n * collisionProbability;
    const traditionalEfficiency = 100 * (n - traditionalCollisions - traditionalOverflow) / n;
    
    // Buffered communication (no collisions or overflow)
    const bufferedEfficiency = 100; // Always 100% with perfect buffering
    
    // Calculate efficiency metrics
    return {
      traditional: Math.max(0, Math.round(traditionalEfficiency * 10) / 10),
      buffered: Math.round(bufferedEfficiency * 10) / 10,
      improvement: Math.round((bufferedEfficiency / Math.max(1, traditionalEfficiency) - 1) * 100)
    };
  };

  const efficiency = calculateEfficiency();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6" />
            <h1 className="text-xl font-bold">Conversation Without Compromise</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center space-x-1 bg-indigo-500 hover:bg-indigo-400 px-3 py-1 rounded-md"
            >
              <Info size={18} />
              <span>System Info</span>
            </button>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-200">
              <Github size={20} />
            </a>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
        {/* Info Panel */}
        {showInfo && <InfoPanel onClose={() => setShowInfo(false)} />}
        
        {/* Controls */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Settings size={20} className="mr-2" /> System Controls
            </h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={addParticipant}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex items-center"
              >
                <UserPlus size={18} className="mr-1" /> Add Participant
              </button>
            </div>
          </div>
          <ConversationControls />
        </div>
        
        {/* Efficiency Stats */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
            <BarChart4 size={20} className="mr-2" /> Communication Efficiency
          </h2>
          <ConversationStats 
            participantCount={participants.length}
            traditionalEfficiency={efficiency.traditional}
            bufferedEfficiency={efficiency.buffered}
            improvement={efficiency.improvement}
          />
        </div>
        
        {/* Participants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {participants.map((participant) => (
            <Participant 
              key={participant.id}
              {...participant}
              onRemove={() => removeParticipant(participant.id)}
            />
          ))}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center text-sm">
          <p>Communication System Prototype - ©2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;