import { useState } from 'react';
import { 
  X, 
  Sparkles, 
  MousePointer2, 
  FileText, 
  Play, 
  Settings,
  ChevronRight,
  Zap,
  Eye,
  MessageSquare,
  HelpCircle,
  Layers
} from 'lucide-react';
import './WhatfixStudio.css';

interface WhatfixStudioProps {
  onClose: () => void;
  onSeekClick: () => void;
  isVisible: boolean;
}

export default function WhatfixStudio({ onClose, onSeekClick, isVisible }: WhatfixStudioProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');

  if (!isVisible) return null;

  return (
    <div className="whatfix-studio-overlay">
      <div className="whatfix-studio-modal">
        {/* Header */}
        <div className="studio-header">
          <div className="studio-brand">
            <div className="studio-logo">
              <Sparkles size={20} />
            </div>
            <span className="studio-title">Whatfix Studio</span>
          </div>
          <button className="studio-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="studio-tabs">
          <button 
            className={`studio-tab ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create
          </button>
          <button 
            className={`studio-tab ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            Manage
          </button>
        </div>

        {/* Content */}
        <div className="studio-content">
          {activeTab === 'create' && (
            <>
              {/* Seek AI Option - Primary */}
              <div className="studio-option seek-option" onClick={onSeekClick}>
                <div className="option-icon seek-icon">
                  <Zap size={24} />
                </div>
                <div className="option-content">
                  <div className="option-header">
                    <h3>Seek AI</h3>
                    <span className="option-badge">New</span>
                  </div>
                  <p>AI-powered task capture. Walk through your workflow and let Seek automatically document each step.</p>
                </div>
                <ChevronRight size={20} className="option-arrow" />
              </div>

              {/* Divider */}
              <div className="studio-divider">
                <span>Or create manually</span>
              </div>

              {/* Other Options */}
              <div className="studio-options-grid">
                <div className="studio-option-card">
                  <div className="card-icon">
                    <MousePointer2 size={20} />
                  </div>
                  <h4>Flow</h4>
                  <p>Step-by-step guidance</p>
                </div>

                <div className="studio-option-card">
                  <div className="card-icon">
                    <FileText size={20} />
                  </div>
                  <h4>Smart Tip</h4>
                  <p>Contextual tooltips</p>
                </div>

                <div className="studio-option-card">
                  <div className="card-icon">
                    <MessageSquare size={20} />
                  </div>
                  <h4>Beacon</h4>
                  <p>Attention grabbers</p>
                </div>

                <div className="studio-option-card">
                  <div className="card-icon">
                    <Layers size={20} />
                  </div>
                  <h4>Pop-up</h4>
                  <p>Modal announcements</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="studio-quick-actions">
                <h4>Quick Actions</h4>
                <div className="quick-action-list">
                  <button className="quick-action-btn">
                    <Play size={16} />
                    <span>Preview Content</span>
                  </button>
                  <button className="quick-action-btn">
                    <Eye size={16} />
                    <span>View Analytics</span>
                  </button>
                  <button className="quick-action-btn">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'manage' && (
            <div className="manage-content">
              <div className="manage-empty">
                <HelpCircle size={48} />
                <h3>No content yet</h3>
                <p>Create your first flow or smart tip to see it here.</p>
                <button className="manage-create-btn" onClick={() => setActiveTab('create')}>
                  Start Creating
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="studio-footer">
          <span className="footer-text">Powered by</span>
          <span className="footer-brand">whatfix</span>
        </div>
      </div>
    </div>
  );
}
