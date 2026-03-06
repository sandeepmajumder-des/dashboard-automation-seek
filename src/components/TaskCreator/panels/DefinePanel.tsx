import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useTask } from '../../../context/TaskContext';
import { TaskStep } from '../../../types';

export default function DefinePanel() {
  const { currentTask, updateTask } = useTask();
  const [taskName, setTaskName] = useState(currentTask?.name || '');
  const [taskDescription, setTaskDescription] = useState(currentTask?.description || '');
  const [steps, setSteps] = useState<TaskStep[]>(currentTask?.steps || []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
    if (currentTask) {
      updateTask(currentTask.id, { name: e.target.value });
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(e.target.value);
    if (currentTask) {
      updateTask(currentTask.id, { description: e.target.value });
    }
  };

  const addStep = () => {
    const newStep: TaskStep = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'click',
      description: 'New step',
    };
    const newSteps = [...steps, newStep];
    setSteps(newSteps);
    if (currentTask) {
      updateTask(currentTask.id, { steps: newSteps });
    }
  };

  const removeStep = (stepId: string) => {
    const newSteps = steps.filter(s => s.id !== stepId);
    setSteps(newSteps);
    if (currentTask) {
      updateTask(currentTask.id, { steps: newSteps });
    }
  };

  return (
    <>
      <div className="right-panel-card">
        <h3 className="panel-title">Task Details</h3>
        <div className="panel-form-group">
          <label className="panel-form-label">Task Name</label>
          <input
            type="text"
            className="panel-form-input"
            placeholder="Enter task name"
            value={taskName}
            onChange={handleNameChange}
          />
        </div>
        <div className="panel-form-group">
          <label className="panel-form-label">Description</label>
          <textarea
            className="panel-form-input panel-form-textarea"
            placeholder="Describe what this task does..."
            value={taskDescription}
            onChange={handleDescriptionChange}
          />
        </div>
      </div>

      <div className="right-panel-card">
        <h3 className="panel-title">Task Steps</h3>
        <div className="panel-steps-list">
          {steps.map((step, index) => (
            <div key={step.id} className="panel-step-item">
              <span className="panel-step-number">{index + 1}</span>
              <div className="panel-step-content">
                <div className="panel-step-type">{step.type}</div>
                <div className="panel-step-desc">{step.description}</div>
              </div>
              <button
                onClick={() => removeStep(step.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-light)',
                  padding: '4px',
                  cursor: 'pointer',
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button className="panel-add-btn" onClick={addStep}>
          <Plus size={16} />
          Add Step
        </button>
      </div>
    </>
  );
}
