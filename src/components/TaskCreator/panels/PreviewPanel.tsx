import { } from 'react';
import { Play, CheckCircle } from 'lucide-react';
import { useTask } from '../../../context/TaskContext';

export default function PreviewPanel() {
  const { currentTask } = useTask();

  const getTriggerLabel = () => {
    if (!currentTask?.trigger) return 'Not configured';
    const labels: Record<string, string> = {
      url: 'URL Match',
      element: 'Element Interaction',
      event: 'Custom Event',
      manual: 'Manual Trigger',
    };
    return labels[currentTask.trigger.type] || 'Unknown';
  };

  const getEnabledGuardrails = () => {
    if (!currentTask?.guardrails) return 0;
    return currentTask.guardrails.filter(g => g.enabled).length;
  };

  const checklist = [
    { label: 'Task name defined', done: !!currentTask?.name && currentTask.name !== 'Untitled Task' },
    { label: 'Target URL configured', done: !!currentTask?.url },
    { label: 'At least one step added', done: (currentTask?.steps?.length || 0) > 0 },
    { label: 'Trigger configured', done: !!currentTask?.trigger },
    { label: 'Guardrails reviewed', done: (currentTask?.guardrails?.length || 0) > 0 },
  ];

  return (
    <>
      <div className="right-panel-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="panel-title" style={{ marginBottom: 0 }}>Task Summary</h3>
          <span className={`panel-badge ${currentTask?.status === 'deployed' ? 'deployed' : 'draft'}`}>
            {currentTask?.status === 'deployed' ? 'Deployed' : 'Draft'}
          </span>
        </div>
        
        <div className="panel-preview-item">
          <div className="panel-preview-label">Task Name</div>
          <div className="panel-preview-value">{currentTask?.name || 'Untitled Task'}</div>
        </div>
        <div className="panel-preview-item">
          <div className="panel-preview-label">Target URL</div>
          <div className="panel-preview-value">{currentTask?.url || 'Not set'}</div>
        </div>
        <div className="panel-preview-item">
          <div className="panel-preview-label">Trigger Type</div>
          <div className="panel-preview-value">{getTriggerLabel()}</div>
        </div>
        <div className="panel-preview-item">
          <div className="panel-preview-label">Active Guardrails</div>
          <div className="panel-preview-value">{getEnabledGuardrails()} enabled</div>
        </div>
      </div>

      <div className="right-panel-card">
        <h3 className="panel-title">Test Task</h3>
        <p className="panel-description">
          Run a test to verify the task works as expected.
        </p>
        <button className="panel-test-btn">
          <Play size={16} />
          Run Test
        </button>
      </div>

      <div className="right-panel-card">
        <h3 className="panel-title">Deployment Checklist</h3>
        {checklist.map((item, index) => (
          <div key={index} className="panel-checklist-item">
            <CheckCircle
              size={18}
              style={{
                color: item.done ? 'var(--success-color)' : 'var(--border-color)',
              }}
            />
            <span style={{ 
              fontSize: '13px',
              color: item.done ? 'var(--text-primary)' : 'var(--text-light)' 
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
