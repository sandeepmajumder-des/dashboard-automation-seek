import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronLeft, ChevronRight as ChevronRightIcon, RotateCw, MoreVertical, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../../context/TaskContext';
import { TabType } from '../../types';
import CapturePanel, { CapturedStep } from './panels/CapturePanel';
import DefinePanel from './panels/DefinePanel';
import TriggerPanel from './panels/TriggerPanel';
import GuardrailsPanel from './panels/GuardrailsPanel';
import PreviewPanel from './panels/PreviewPanel';
import DummyAriba from './DummyAriba';
import WhatfixStudio from './WhatfixStudio';
import './TaskCreator.css';
import './TaskCreatorV2.css';

const tabs: { id: TabType; label: string }[] = [
  { id: 'capture', label: 'Capture' },
  { id: 'define', label: 'Define' },
  { id: 'trigger', label: 'Trigger' },
  { id: 'guardrails', label: 'Guardrails' },
  { id: 'preview', label: 'Preview' },
];

interface ClickMarker {
  id: string;
  xPercent: number;
  yPercent: number;
  stepNumber: number;
}

type V2Mode = 'initial' | 'studio' | 'seek-capture';

export default function TaskCreatorV2() {
  const navigate = useNavigate();
  const { activeTab, setActiveTab, currentTask, createTask, updateTask, saveDraft, deployTask } = useTask();
  const [isExpanded, setIsExpanded] = useState(false);
  const [capturedSteps, setCapturedSteps] = useState<CapturedStep[]>([]);
  const [clickMarkers, setClickMarkers] = useState<ClickMarker[]>([]);
  const [showDummyAriba, setShowDummyAriba] = useState(false);
  const [v2Mode, setV2Mode] = useState<V2Mode>('initial');
  const [showStudio, setShowStudio] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const aribaWrapperRef = useRef<HTMLDivElement>(null);
  const expandedAribaWrapperRef = useRef<HTMLDivElement>(null);

  // Create a task on mount if none exists
  useEffect(() => {
    if (!currentTask) {
      createTask();
    }
  }, []);

  // Sync showDummyAriba state with currentTask.url on mount and URL changes
  useEffect(() => {
    if (currentTask?.url?.toLowerCase().includes('ariba')) {
      setShowDummyAriba(true);
      if (v2Mode === 'initial') {
        setV2Mode('studio');
      }
    }
  }, [currentTask?.url]);

  const handleUrlSubmit = () => {
    if (!inputUrl.trim()) return;
    
    let formattedUrl = inputUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    
    // Create task if none exists, then update URL
    let taskId = currentTask?.id;
    if (!taskId) {
      const newTask = createTask();
      taskId = newTask.id;
    }
    
    // Update task URL
    updateTask(taskId, { url: formattedUrl });
    
    if (formattedUrl.toLowerCase().includes('ariba')) {
      setShowDummyAriba(true);
      setV2Mode('studio');
      setShowStudio(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUrlSubmit();
    }
  };

  const handleStudioClose = () => {
    setShowStudio(false);
  };

  const handleSeekClick = () => {
    setShowStudio(false);
    setV2Mode('seek-capture');
    setCapturedSteps([]);
    setClickMarkers([]);
  };

  const handleExtensionClick = () => {
    if (showDummyAriba) {
      setShowStudio(true);
    }
  };

  const handleElementClick = (elementInfo: {
    elementName: string;
    elementType: string;
    coordinates: { x: number; y: number };
  }, wrapperRef: HTMLDivElement | null) => {
    if (v2Mode !== 'seek-capture') return;
    
    const stepNumber = capturedSteps.length + 1;
    
    const newStep: CapturedStep = {
      id: Date.now().toString(),
      stepNumber,
      elementName: elementInfo.elementName,
      elementType: elementInfo.elementType,
      action: 'click',
      timestamp: new Date(),
      coordinates: elementInfo.coordinates,
    };

    setCapturedSteps(prev => [...prev, newStep]);

    if (wrapperRef) {
      const rect = wrapperRef.getBoundingClientRect();
      const relativeX = elementInfo.coordinates.x - rect.left;
      const relativeY = elementInfo.coordinates.y - rect.top;
      
      const xPercent = (relativeX / rect.width) * 100;
      const yPercent = (relativeY / rect.height) * 100;

      const newMarker: ClickMarker = {
        id: newStep.id,
        xPercent,
        yPercent,
        stepNumber,
      };
      setClickMarkers(prev => [...prev, newMarker]);
    }
  };

  const handleClearSteps = () => {
    setCapturedSteps([]);
    setClickMarkers([]);
  };

  const handleCreateTaskSpec = () => {
    if (capturedSteps.length > 0) {
      setActiveTab('define');
    }
  };

  const renderPanelContent = () => {
    switch (activeTab) {
      case 'capture':
        return (
          <CapturePanel 
            capturedSteps={capturedSteps}
            onClearSteps={handleClearSteps}
            isCapturing={v2Mode === 'seek-capture'}
            onUrlSubmit={(url) => {
              setInputUrl(url);
              handleUrlSubmit();
            }}
            onCreateTaskSpec={handleCreateTaskSpec}
          />
        );
      case 'define':
        return <div className="panel-scroll-container"><DefinePanel /></div>;
      case 'trigger':
        return <div className="panel-scroll-container"><TriggerPanel /></div>;
      case 'guardrails':
        return <div className="panel-scroll-container"><GuardrailsPanel /></div>;
      case 'preview':
        return <div className="panel-scroll-container"><PreviewPanel /></div>;
      default:
        return (
          <CapturePanel 
            capturedSteps={capturedSteps}
            onClearSteps={handleClearSteps}
            isCapturing={v2Mode === 'seek-capture'}
            onUrlSubmit={(url) => {
              setInputUrl(url);
              handleUrlSubmit();
            }}
            onCreateTaskSpec={handleCreateTaskSpec}
          />
        );
    }
  };

  const renderBrowserContent = (wrapperRef: React.RefObject<HTMLDivElement | null>) => (
    <div className="browser-content">
      {showDummyAriba ? (
        <div className="ariba-wrapper" ref={wrapperRef}>
          <DummyAriba onElementClick={(info) => handleElementClick(info, wrapperRef.current)} />
          {clickMarkers.map(marker => (
            <div
              key={marker.id}
              className="click-marker"
              style={{
                left: `${marker.xPercent}%`,
                top: `${marker.yPercent}%`,
              }}
            >
              <div className="click-marker-ring" />
              <div className="click-marker-number">{marker.stepNumber}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="preview-placeholder v2-placeholder">
          <div className="v2-url-input-section">
            <div className="placeholder-icon">
              <Globe size={48} />
            </div>
            <h2>Enter Application URL</h2>
            <p>Enter the URL of the application you want to automate</p>
            <div className="v2-url-input-container">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="https://service.ariba.com/"
                className="v2-url-input"
              />
              <button 
                className="v2-url-submit-btn"
                onClick={handleUrlSubmit}
                disabled={!inputUrl.trim()}
              >
                Open Application
              </button>
            </div>
            <p className="v2-hint">Try: https://service.ariba.com/</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="task-creator task-creator-v2">
      <div className="task-creator-header">
        <div className="breadcrumb">
          <span className="breadcrumb-current">Create task</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Via Seek</span>
          <span className="v2-badge">V2</span>
        </div>
        <div className="header-row">
          <h1 className="page-title">Create task</h1>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={saveDraft}>
              Discard changes
            </button>
            <button className="btn btn-primary" onClick={deployTask}>
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="task-creator-content">
        <div className="browser-preview-section">
          <div className="browser-frame">
            <div className="browser-toolbar">
              <div className="browser-controls">
                <span className="control-dot red"></span>
                <span className="control-dot yellow"></span>
                <span className="control-dot green"></span>
              </div>
              <div className="browser-nav">
                <button className="nav-btn">
                  <ChevronLeft size={16} />
                </button>
                <button className="nav-btn">
                  <ChevronRightIcon size={16} />
                </button>
                <button className="nav-btn">
                  <RotateCw size={16} />
                </button>
              </div>
              <div className="browser-url-bar">
                <Globe size={14} className="url-icon" />
                <input
                  type="text"
                  value={currentTask?.url || inputUrl || ''}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter URL..."
                  className="url-input"
                />
              </div>
              {showDummyAriba && (
                <button 
                  className="extension-btn"
                  onClick={handleExtensionClick}
                  title="Open Whatfix Studio"
                >
                  <Sparkles size={16} />
                </button>
              )}
              <button className="browser-menu">
                <MoreVertical size={16} />
              </button>
              <button 
                className="expand-btn"
                onClick={() => setIsExpanded(true)}
                title="Expand view"
              >
                <Maximize2 size={16} />
              </button>
            </div>
            {renderBrowserContent(aribaWrapperRef)}
            
            {/* Seek Capture Mode Indicator */}
            {v2Mode === 'seek-capture' && (
              <div className="seek-capture-indicator">
                <span className="capture-dot"></span>
                <span>Seek AI Capturing</span>
              </div>
            )}
          </div>
        </div>

        <div className="right-panel">
          {renderPanelContent()}
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="expanded-overlay">
          <div className="expanded-container">
            <div className="expanded-browser">
              <div className="browser-frame">
                <div className="browser-toolbar">
                  <div className="browser-controls">
                    <span className="control-dot red"></span>
                    <span className="control-dot yellow"></span>
                    <span className="control-dot green"></span>
                  </div>
                  <div className="browser-nav">
                    <button className="nav-btn">
                      <ChevronLeft size={16} />
                    </button>
                    <button className="nav-btn">
                      <ChevronRightIcon size={16} />
                    </button>
                    <button className="nav-btn">
                      <RotateCw size={16} />
                    </button>
                  </div>
                  <div className="browser-url-bar">
                    <Globe size={14} className="url-icon" />
                    <input
                      type="text"
                      value={currentTask?.url || 'https://example-application.com'}
                      readOnly
                      className="url-input"
                    />
                  </div>
                  {showDummyAriba && (
                    <button 
                      className="extension-btn"
                      onClick={handleExtensionClick}
                      title="Open Whatfix Studio"
                    >
                      <Sparkles size={16} />
                    </button>
                  )}
                  <button className="browser-menu">
                    <MoreVertical size={16} />
                  </button>
                  <button 
                    className="expand-btn"
                    onClick={() => setIsExpanded(false)}
                    title="Minimize view"
                  >
                    <Minimize2 size={16} />
                  </button>
                </div>
                {renderBrowserContent(expandedAribaWrapperRef)}
                
                {v2Mode === 'seek-capture' && (
                  <div className="seek-capture-indicator">
                    <span className="capture-dot"></span>
                    <span>Seek AI Capturing</span>
                  </div>
                )}
              </div>
            </div>
            <div className="expanded-chat">
              {renderPanelContent()}
            </div>
          </div>
        </div>
      )}

      {/* Whatfix Studio Modal */}
      <WhatfixStudio 
        isVisible={showStudio}
        onClose={handleStudioClose}
        onSeekClick={handleSeekClick}
      />
    </div>
  );
}
