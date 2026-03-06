import React, { useState } from 'react';
import { Link, MousePointer, Calendar, Play } from 'lucide-react';
import { useTask } from '../../../context/TaskContext';
import { TriggerConfig } from '../../../types';

const triggerTypes = [
  {
    type: 'url',
    icon: <Link size={18} />,
    name: 'URL Match',
    description: 'Trigger when user visits a specific URL',
  },
  {
    type: 'element',
    icon: <MousePointer size={18} />,
    name: 'Element Interaction',
    description: 'Trigger on element click or hover',
  },
  {
    type: 'event',
    icon: <Calendar size={18} />,
    name: 'Custom Event',
    description: 'Trigger on custom JS events',
  },
  {
    type: 'manual',
    icon: <Play size={18} />,
    name: 'Manual Trigger',
    description: 'Triggered manually by user',
  },
];

export default function TriggerPanel() {
  const { currentTask, updateTask } = useTask();
  const [selectedTrigger, setSelectedTrigger] = useState<string>(
    currentTask?.trigger?.type || 'url'
  );
  const [triggerCondition, setTriggerCondition] = useState(
    currentTask?.trigger?.condition || ''
  );

  const handleTriggerSelect = (type: string) => {
    setSelectedTrigger(type);
    const trigger: TriggerConfig = {
      type: type as TriggerConfig['type'],
      condition: triggerCondition,
    };
    if (currentTask) {
      updateTask(currentTask.id, { trigger });
    }
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTriggerCondition(e.target.value);
    if (currentTask) {
      updateTask(currentTask.id, {
        trigger: {
          type: selectedTrigger as TriggerConfig['type'],
          condition: e.target.value,
        },
      });
    }
  };

  return (
    <>
      <div className="right-panel-card">
        <h3 className="panel-title">Select Trigger Type</h3>
        <div className="panel-trigger-options">
          {triggerTypes.map(trigger => (
            <button
              key={trigger.type}
              className={`panel-trigger-option ${selectedTrigger === trigger.type ? 'selected' : ''}`}
              onClick={() => handleTriggerSelect(trigger.type)}
            >
              <div className="panel-trigger-icon">{trigger.icon}</div>
              <div className="panel-trigger-name">{trigger.name}</div>
              <div className="panel-trigger-desc">{trigger.description}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedTrigger && selectedTrigger !== 'manual' && (
        <div className="right-panel-card">
          <h3 className="panel-title">Configure Trigger</h3>
          {selectedTrigger === 'url' && (
            <div className="panel-form-group">
              <label className="panel-form-label">URL Pattern</label>
              <input
                type="text"
                className="panel-form-input"
                placeholder="e.g., https://example.com/*"
                value={triggerCondition}
                onChange={handleConditionChange}
              />
              <p style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '6px' }}>
                Use * as wildcard for matching
              </p>
            </div>
          )}
          {selectedTrigger === 'element' && (
            <div className="panel-form-group">
              <label className="panel-form-label">CSS Selector</label>
              <input
                type="text"
                className="panel-form-input"
                placeholder="e.g., #submit-btn"
                value={triggerCondition}
                onChange={handleConditionChange}
              />
            </div>
          )}
          {selectedTrigger === 'event' && (
            <div className="panel-form-group">
              <label className="panel-form-label">Event Name</label>
              <input
                type="text"
                className="panel-form-input"
                placeholder="e.g., user-logged-in"
                value={triggerCondition}
                onChange={handleConditionChange}
              />
            </div>
          )}
        </div>
      )}

      {selectedTrigger === 'manual' && (
        <div className="right-panel-card">
          <p className="panel-description">
            This task will only run when manually triggered by the user through the Seek widget or API.
          </p>
        </div>
      )}
    </>
  );
}
