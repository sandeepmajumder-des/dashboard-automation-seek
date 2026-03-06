import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronLeft, ChevronRight as ChevronRightIcon, RotateCw, MoreVertical, Maximize2, Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../../context/TaskContext';
import { TabType } from '../../types';
import CapturePanel, { CapturedStep } from './panels/CapturePanel';
import DefinePanel from './panels/DefinePanel';
import TriggerPanel from './panels/TriggerPanel';
import GuardrailsPanel from './panels/GuardrailsPanel';
import PreviewPanel from './panels/PreviewPanel';
import DummyAriba from './DummyAriba';
import './TaskCreator.css';

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

export default function TaskCreator() {
  const navigate = useNavigate();
  const { activeTab, setActiveTab, currentTask, saveDraft, deployTask } = useTask();
  const [isExpanded, setIsExpanded] = useState(false);
  const [capturedSteps, setCapturedSteps] = useState<CapturedStep[]>([]);
  const [clickMarkers, setClickMarkers] = useState<ClickMarker[]>([]);
  const [showDummyAriba, setShowDummyAriba] = useState(false);
  const aribaWrapperRef = useRef<HTMLDivElement>(null);
  const expandedAribaWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentTask?.url?.toLowerCase().includes('ariba')) {
      setShowDummyAriba(true);
    }
  }, [currentTask?.url]);

  const handleUrlSubmit = (url: string) => {
    if (url.toLowerCase().includes('ariba')) {
      setShowDummyAriba(true);
      setCapturedSteps([]);
      setClickMarkers([]);
    }
  };

  const handleElementClick = (elementInfo: {
    elementName: string;
    elementType: string;
    coordinates: { x: number; y: number };
  }, aribaWrapperRef: HTMLDivElement | null) => {
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

    if (aribaWrapperRef) {
      const rect = aribaWrapperRef.getBoundingClientRect();
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
            isCapturing={showDummyAriba}
            onUrlSubmit={handleUrlSubmit}
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
            isCapturing={showDummyAriba}
            onUrlSubmit={handleUrlSubmit}
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
      ) : currentTask?.url ? (
        <iframe
          src={currentTask.url}
          title="Application Preview"
          className="preview-iframe"
          sandbox="allow-same-origin allow-scripts allow-forms"
        />
      ) : (
        <div className="preview-placeholder">
          <div className="placeholder-icon">
            <Globe size={32} />
          </div>
          <p className="placeholder-text">Application preview will appear here</p>
          <p className="placeholder-subtext">Enter URL above to start capturing</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="task-creator">
      <div className="task-creator-header">
        <div className="breadcrumb">
          <span className="breadcrumb-current">Create task</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Via Seek</span>
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
                  value={currentTask?.url || 'https://example-application.com'}
                  readOnly
                  className="url-input"
                />
              </div>
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
          </div>
        </div>

        <div className="right-panel">
          {renderPanelContent()}
        </div>
      </div>

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
              </div>
            </div>
            <div className="expanded-chat">
              {renderPanelContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
