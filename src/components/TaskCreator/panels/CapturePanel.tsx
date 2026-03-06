import React, { useState } from 'react';
import { ArrowUp, MousePointer2, Eye, Trash2 } from 'lucide-react';
import { useTask } from '../../../context/TaskContext';
import './CapturePanel.css';

interface ChatMessage {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

export interface CapturedStep {
  id: string;
  stepNumber: number;
  elementName: string;
  elementType: string;
  action: string;
  timestamp: Date;
  coordinates: { x: number; y: number };
}

interface CapturePanelProps {
  capturedSteps?: CapturedStep[];
  onClearSteps?: () => void;
  isCapturing?: boolean;
  onUrlSubmit?: (url: string) => void;
  onCreateTaskSpec?: () => void;
}

export default function CapturePanel({ capturedSteps = [], onClearSteps, isCapturing = false, onUrlSubmit, onCreateTaskSpec }: CapturePanelProps) {
  const { currentTask, updateTask } = useTask();
  const [inputUrl, setInputUrl] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Please enter the application URL for fetching the details',
      timestamp: new Date(),
    },
  ]);

  const handleUrlSubmit = () => {
    if (inputUrl.trim()) {
      let formattedUrl = inputUrl.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: formattedUrl,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);

      if (currentTask) {
        updateTask(currentTask.id, { url: formattedUrl });
      }

      if (onUrlSubmit) {
        onUrlSubmit(formattedUrl);
      }

      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: `Loading ${formattedUrl}. Click on any element in the preview to capture your workflow steps. Each click will be recorded with a blue highlight marker.`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 500);

      setInputUrl('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUrlSubmit();
    }
  };

  const getActionDescription = (elementType: string, elementName: string): string => {
    switch (elementType) {
      case 'Button':
      case 'Primary Button':
      case 'Action Button':
        return `Click the "${elementName}" button`;
      case 'Navigation Link':
        return `Navigate to "${elementName}" section`;
      case 'Menu Item':
        return `Select "${elementName}" from the menu`;
      case 'Icon Button':
        return `Click the ${elementName} icon`;
      case 'Dashboard Card':
        return `View ${elementName} details`;
      case 'Table Row':
        return `Select ${elementName}`;
      case 'Link Button':
        return `Click "${elementName}" link`;
      case 'Dropdown Button':
        return `Open ${elementName}`;
      case 'Logo':
        return `Click on ${elementName}`;
      default:
        return `Interact with ${elementName}`;
    }
  };

  return (
    <div className="capture-panel">
      {/* Show captured steps if any */}
      {capturedSteps.length > 0 && (
        <div className="captured-steps-section">
          <div className="steps-header">
            <h3>Captured Steps</h3>
            <span className="step-count">{capturedSteps.length} steps</span>
            {onClearSteps && (
              <button className="clear-steps-btn" onClick={onClearSteps} title="Clear all steps">
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <div className="steps-list">
            {capturedSteps.map((step, index) => (
              <div key={step.id} className="captured-step">
                <div className="step-indicator">
                  <div className="step-number">{step.stepNumber}</div>
                  {index < capturedSteps.length - 1 && <div className="step-connector" />}
                </div>
                <div className="step-content">
                  <div className="step-icon">
                    <MousePointer2 size={16} />
                  </div>
                  <div className="step-details">
                    <span className="step-action">{getActionDescription(step.elementType, step.elementName)}</span>
                    <span className="step-element-type">{step.elementType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recording indicator */}
      {isCapturing && (
        <div className="recording-indicator">
          <span className="recording-dot" />
          <span>Recording clicks...</span>
        </div>
      )}

      {/* Chat messages */}
      <div className="chat-messages">
        {messages.map(message => (
          <div key={message.id} className={`chat-message ${message.type}`}>
            <div className="message-content">
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <div className={`chat-input-container ${isFocused ? 'focused' : ''}`}>
          <input
            type="text"
            placeholder="https://www.sap.ariba.com"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="chat-input"
          />
          <button 
            className={`chat-send-btn ${inputUrl.trim() ? 'active' : ''}`} 
            onClick={handleUrlSubmit}
            disabled={!inputUrl.trim()}
          >
            <ArrowUp size={18} />
          </button>
        </div>
        <button 
          className="create-task-spec-btn"
          onClick={onCreateTaskSpec}
          disabled={capturedSteps.length === 0}
        >
          Create task spec
        </button>
        <p className="chat-disclaimer">AI can make mistakes. Please monitor its activity.</p>
      </div>
    </div>
  );
}
