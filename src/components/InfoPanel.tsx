import React, { useEffect, useRef } from 'react';
import { X, Brain, BarChart4, Users, Zap, Pause, Play } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface InfoPanelProps {
  onClose: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside the modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold flex items-center">
            <Brain className="mr-2 text-indigo-600" /> Conversation Without Compromise
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Brain className="mr-2 text-indigo-500" />
              Core Concepts
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50 rounded-md">
                <h4 className="font-medium">Bi-directional Cognitive Buffering</h4>
                <p className="text-sm text-gray-700">
                  Participants can pause incoming information streams or immediately buffer their responses privately
                  without interrupting ongoing communication. This reduces cognitive overload and prevents loss of
                  valuable insights or spontaneous ideas.
                </p>
              </div>
              
              <div className="p-3 bg-indigo-50 rounded-md">
                <h4 className="font-medium">Etiquette and Flow Management</h4>
                <p className="text-sm text-gray-700">
                  Silent, etiquette-preserving pauses combined with subtle backpressure signals inform speakers about 
                  listener status, guiding speakers to adjust their delivery without explicit interruptions or discomfort.
                </p>
              </div>
              
              <div className="p-3 bg-indigo-50 rounded-md">
                <h4 className="font-medium">Adaptive Flow Control</h4>
                <p className="text-sm text-gray-700">
                  Leveraging networking principles, the system dynamically adjusts conversational flow rates based on 
                  real-time cognitive load indicators, optimizing communication efficiency and clarity.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <BarChart4 className="mr-2 text-indigo-500" />
              Communication Efficiency Formula
            </h3>
            <div className="p-4 bg-white border rounded-md">
              <p className="mb-3 text-sm">Communication effectiveness, measured as ideas successfully communicated per hour, can be represented intuitively:</p>
              <div className="bg-gray-50 p-4 rounded text-center mb-3">
                <BlockMath math="E = n \times T_{max} - (C + O)" />
              </div>
              <ul className="text-sm space-y-1 mb-4">
                <li><strong><InlineMath math="E" /></strong>: Effective ideas communicated per hour for the entire group.</li>
                <li><strong><InlineMath math="T_{max}" /></strong>: Maximum realistic ideas communicated per hour per participant (e.g., 20 ideas/hour).</li>
                <li><strong><InlineMath math="n" /></strong>: Number of participants.</li>
                <li><strong><InlineMath math="C" /></strong>: Ideas lost per hour due to conversational collisions.</li>
                <li><strong><InlineMath math="O" /></strong>: Ideas lost per hour due to inbound buffer overflow.</li>
              </ul>
              
              <p className="mb-2 text-sm font-medium">Traditional vs. Buffered Communication:</p>
              
              <div className="mb-4">
                <p className="mb-1 text-sm"><strong>Traditional (no buffering):</strong></p>
                <div className="bg-gray-50 p-4 rounded text-center mb-2">
                  <BlockMath math="C \approx \frac{n(n-1)}{2} \times P" />
                  <BlockMath math="O \approx n \times P" />
                </div>
              </div>
              
              <div>
                <p className="mb-1 text-sm"><strong>Buffered Communication:</strong></p>
                <div className="bg-gray-50 p-4 rounded text-center">
                  <BlockMath math="C \approx 0" />
                  <BlockMath math="O \approx 0" />
                </div>
              </div>
              
              <p className="mt-2 text-xs text-gray-500">
                <InlineMath math="P" />: Probability of collision or overflow per idea
              </p>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <BarChart4 className="mr-2 text-indigo-500" />
              Communication Efficiency Numerical Example
            </h3>
            <div className="p-4 bg-white border rounded-md">
              <p className="mb-3 text-sm">
                Assuming <InlineMath math="T_{max}=20" /> ideas/hour per participant, collision probability <InlineMath math="P=0.1" />:
              </p>
              
              <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Two participants scenario:</h4>
                  
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Traditional:</span> Collisions <InlineMath math="C=0.1 \times 20=2" />, 
                      Overflow <InlineMath math="O=0.1 \times 2 \times 20=4" />
                    </p>
                    <div className="bg-white p-2 rounded text-sm">
                      Effective: <InlineMath math="E=2 \times 20 - (2+4)=34" /> ideas/hour
                    </div>
                    
                    <p className="text-sm mt-1">
                      <span className="font-medium">Buffered:</span> Collisions <InlineMath math="C=0" />, 
                      Overflow <InlineMath math="O=0" />
                    </p>
                    <div className="bg-white p-2 rounded text-sm">
                      Effective: <InlineMath math="E=2 \times 20=40" /> ideas/hour
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Ten participants scenario:</h4>
                  
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Traditional:</span> Collisions <InlineMath math="C=0.1 \times 20 \times \frac{10 \times 9}{2}=90" />, 
                      Overflow <InlineMath math="O=0.1 \times 10 \times 20=20" />
                    </p>
                    <div className="bg-white p-2 rounded text-sm">
                      Effective: <InlineMath math="E=10 \times 20 - (90+20)=90" /> ideas/hour (severely reduced effectiveness)
                    </div>
                    
                    <p className="text-sm mt-1">
                      <span className="font-medium">Buffered:</span> Collisions <InlineMath math="C=0" />, 
                      Overflow <InlineMath math="O=0" />
                    </p>
                    <div className="bg-white p-2 rounded text-sm">
                      Effective: <InlineMath math="E=10 \times 20=200" /> ideas/hour (optimal and consistent)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Users className="mr-2 text-indigo-500" />
              User Interface Elements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-indigo-50 rounded-md">
                <h4 className="font-medium">Key Buttons for Participants</h4>
                <ul className="text-sm space-y-2 mt-2">
                  <li className="flex items-start">
                    <span className="bg-white p-1 rounded mr-2"><Pause size={16} /></span>
                    <span><strong>Pause Incoming Stream:</strong> Temporarily pauses incoming audio transparently.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-white p-1 rounded mr-2"><X size={16} /></span>
                    <span><strong>Instant Capture:</strong> Immediately buffers spontaneous ideas privately.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-white p-1 rounded mr-2"><Play size={16} /></span>
                    <span><strong>Resume Playback:</strong> Resumes buffered streams seamlessly at adjustable speeds.</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-3 bg-indigo-50 rounded-md">
                <h4 className="font-medium">Key Informational Indicators</h4>
                <ul className="text-sm space-y-2 mt-2">
                  <li><strong>Buffer states</strong> of participants (paused, active, buffering status).</li>
                  <li><strong>Speaking indicators</strong> (response buffering, directed topic).</li>
                  <li><strong>Active conversational topics</strong>, references, and links.</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Zap className="mr-2 text-indigo-500" />
              Benefits
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 bg-green-50 rounded-md">
                <h4 className="font-medium text-green-800">Enhanced Cognitive Efficiency</h4>
                <p className="text-sm text-gray-700">
                  Reduces fatigue, increases retention, and supports thoughtful, high-quality interactions.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-md">
                <h4 className="font-medium text-green-800">Deeper Knowledge Discovery</h4>
                <p className="text-sm text-gray-700">
                  Allows immediate idea capture and reflective pauses, facilitating deeper understanding and richer insights.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-md">
                <h4 className="font-medium text-green-800">Optimized Multi-Party Communication</h4>
                <p className="text-sm text-gray-700">
                  Effectively manages multiple simultaneous speakers, providing clear contexts and minimized confusion.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-md">
                <h4 className="font-medium text-green-800">Stop Idea Loss</h4>
                <p className="text-sm text-gray-700">
                  Significantly decreases the chance of important ideas being lost or forgotten due to interruptions or buffer overflow.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-md">
                <h4 className="font-medium text-green-800">Seamless AI Integration</h4>
                <p className="text-sm text-gray-700">
                  Provides natural checkpoints for AI involvement, enabling summarization and content enhancement without disrupting the flow.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Brain className="mr-2 text-indigo-500" />
              Conclusion
            </h3>
            <div className="p-3 bg-indigo-50 rounded-md">
              <p className="text-sm text-gray-700">
                This conversational approach resolves inherent communication tensions, fostering respectful, efficient, and insightful exchanges. 
                Some measurements are presented but deeper the feeling of being cut off, or experiencing buffer overflow are hard to quantify - 
                all would agree that they should be stopped.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};