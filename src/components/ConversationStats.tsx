import React from 'react';
import { BarChart, Activity, TrendingUp } from 'lucide-react';

interface ConversationStatsProps {
  participantCount: number;
  traditionalEfficiency: number;
  bufferedEfficiency: number;
  improvement: number;
}

export const ConversationStats: React.FC<ConversationStatsProps> = ({
  participantCount,
  traditionalEfficiency,
  bufferedEfficiency,
  improvement
}) => {
  // Calculate optimal participant count based on efficiency
  const recommendedCount = Math.min(10, Math.max(2, Math.floor(bufferedEfficiency / 10)));
  
  // Calculate ideas per hour based on the new formula
  const ideasPerParticipant = 20; // T_max value
  const collisionProbability = 0.1; // P value
  
  // Traditional communication formula
  const traditionalCollisions = (participantCount * (participantCount - 1) / 2) * collisionProbability * ideasPerParticipant;
  const traditionalOverflow = participantCount * collisionProbability * ideasPerParticipant;
  const traditionalIdeasPerHour = participantCount * ideasPerParticipant - (traditionalCollisions + traditionalOverflow);
  
  // Buffered communication formula (no collisions or overflow)
  const bufferedIdeasPerHour = participantCount * ideasPerParticipant;
  
  // Round values for display
  const tIdeas = Math.round(traditionalIdeasPerHour);
  const bIdeas = Math.round(bufferedIdeasPerHour);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-gray-500 text-sm mb-1">Participants</div>
          <div className="text-2xl font-bold text-gray-900">{participantCount}</div>
          <div className={`text-sm ${participantCount > recommendedCount ? 'text-amber-600' : 'text-green-600'}`}>
            {participantCount > recommendedCount 
              ? `${participantCount - recommendedCount} above optimal`
              : participantCount < recommendedCount
                ? `${recommendedCount - participantCount} below optimal`
                : 'Optimal count'
            }
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-gray-500 text-sm mb-1">Traditional Efficiency</div>
          <div className="text-2xl font-bold text-gray-900">{traditionalEfficiency}%</div>
          <div className="text-sm text-gray-600">
            ~{tIdeas} ideas/hour
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-gray-500 text-sm mb-1">Buffered Efficiency</div>
          <div className="text-2xl font-bold text-indigo-600">{bufferedEfficiency}%</div>
          <div className="flex items-center">
            <span className="text-sm text-green-600 mr-2">+{improvement}%</span>
            <span className="text-sm text-gray-600">~{bIdeas} ideas/hour</span>
          </div>
        </div>
      </div>
      
      {/* Efficiency Visualization */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
          <BarChart size={16} className="mr-1" /> Efficiency Comparison
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Traditional</span>
              <span>{traditionalEfficiency}%</span>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-400" 
                style={{ width: `${traditionalEfficiency}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Buffered</span>
              <span>{bufferedEfficiency}%</span>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500" 
                style={{ width: `${bufferedEfficiency}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-600">
          <p className="flex items-center">
            <Activity size={14} className="mr-1 text-gray-400" />
            Traditional efficiency decreases rapidly as participants increase due to conversational collisions
          </p>
          <p className="flex items-center mt-1">
            <TrendingUp size={14} className="mr-1 text-indigo-500" />
            Buffered communication prevents idea loss, maintaining optimal efficiency as group size grows
          </p>
        </div>
      </div>
    </div>
  );
};