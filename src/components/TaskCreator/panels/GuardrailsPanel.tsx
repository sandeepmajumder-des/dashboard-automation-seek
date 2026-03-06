import { useState } from 'react';
import { useTask } from '../../../context/TaskContext';
import { GuardrailConfig } from '../../../types';

const defaultGuardrails: GuardrailConfig[] = [
  {
    id: 'confirm-action',
    name: 'Confirm Before Action',
    enabled: true,
    type: 'confirmation',
  },
  {
    id: 'validate-input',
    name: 'Validate User Input',
    enabled: true,
    type: 'validation',
  },
  {
    id: 'prevent-duplicate',
    name: 'Prevent Duplicates',
    enabled: false,
    type: 'restriction',
  },
  {
    id: 'timeout-protection',
    name: 'Timeout Protection',
    enabled: true,
    type: 'restriction',
  },
  {
    id: 'audit-logging',
    name: 'Audit Logging',
    enabled: true,
    type: 'validation',
  },
];

const guardrailDescriptions: Record<string, string> = {
  'confirm-action': 'Ask for confirmation before critical actions',
  'validate-input': 'Validate all inputs before processing',
  'prevent-duplicate': 'Prevent duplicate submissions',
  'timeout-protection': 'Cancel long-running operations',
  'audit-logging': 'Log all task executions',
};

export default function GuardrailsPanel() {
  const { currentTask, updateTask } = useTask();
  const [guardrails, setGuardrails] = useState<GuardrailConfig[]>(
    currentTask?.guardrails?.length ? currentTask.guardrails : defaultGuardrails
  );

  const toggleGuardrail = (id: string) => {
    const newGuardrails = guardrails.map(g =>
      g.id === id ? { ...g, enabled: !g.enabled } : g
    );
    setGuardrails(newGuardrails);
    if (currentTask) {
      updateTask(currentTask.id, { guardrails: newGuardrails });
    }
  };

  return (
    <>
      <div className="right-panel-card">
        <h3 className="panel-title">Safety Guardrails</h3>
        <p className="panel-description">
          Configure safety measures for reliable task execution.
        </p>

        {guardrails.map(guardrail => (
          <div key={guardrail.id} className="panel-guardrail-item">
            <div className="panel-toggle">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={guardrail.enabled}
                  onChange={() => toggleGuardrail(guardrail.id)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="panel-guardrail-content">
              <div className="panel-guardrail-name">{guardrail.name}</div>
              <div className="panel-guardrail-desc">
                {guardrailDescriptions[guardrail.id]}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="right-panel-card">
        <h3 className="panel-title">Advanced Settings</h3>
        <div className="panel-form-group">
          <label className="panel-form-label">Max Retry Attempts</label>
          <input
            type="number"
            className="panel-form-input"
            placeholder="3"
            defaultValue={3}
            min={0}
            max={10}
            style={{ width: '80px' }}
          />
        </div>
        <div className="panel-form-group">
          <label className="panel-form-label">Timeout (seconds)</label>
          <input
            type="number"
            className="panel-form-input"
            placeholder="30"
            defaultValue={30}
            min={5}
            max={300}
            style={{ width: '80px' }}
          />
        </div>
      </div>
    </>
  );
}
