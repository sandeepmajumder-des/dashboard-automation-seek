import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Zap, Clock, CheckCircle, AlertCircle, MoreVertical, Search } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import './CreateTaskList.css';

export default function CreateTaskList() {
  const navigate = useNavigate();
  const { tasks, createTask, setCurrentTask } = useTask();

  const handleCreateTask = () => {
    const newTask = createTask();
    navigate(`/task/${newTask.id}`);
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setCurrentTask(task);
      navigate(`/task/${taskId}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed':
        return <CheckCircle size={16} className="status-icon deployed" />;
      case 'paused':
        return <AlertCircle size={16} className="status-icon paused" />;
      default:
        return <Clock size={16} className="status-icon draft" />;
    }
  };

  const stats = {
    total: tasks.length,
    deployed: tasks.filter(t => t.status === 'deployed').length,
    draft: tasks.filter(t => t.status === 'draft').length,
  };

  return (
    <div className="create-task-list-page">
      <div className="page-header">
        <div className="breadcrumb">
          <span className="breadcrumb-current">Create task</span>
          <span className="breadcrumb-separator">/</span>
        </div>
        <div className="header-row">
          <h1 className="page-title">Create task</h1>
          <button className="create-task-btn" onClick={handleCreateTask}>
            <Plus size={20} />
            New Task
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <Zap size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon deployed">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.deployed}</span>
            <span className="stat-label">Deployed</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon draft">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.draft}</span>
            <span className="stat-label">Drafts</span>
          </div>
        </div>
      </div>

      <div className="tasks-section">
        <div className="tasks-header">
          <h2 className="tasks-title">Your Tasks</h2>
          <div className="tasks-search">
            <Search size={18} />
            <input type="text" placeholder="Search tasks..." />
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Zap size={48} />
            </div>
            <h3>No tasks yet</h3>
            <p>Create your first automated task to get started</p>
            <button className="create-task-btn" onClick={handleCreateTask}>
              <Plus size={20} />
              Create Task
            </button>
          </div>
        ) : (
          <div className="tasks-list">
            {tasks.map(task => (
              <div key={task.id} className="task-card" onClick={() => handleEditTask(task.id)}>
                <div className="task-info">
                  {getStatusIcon(task.status)}
                  <div className="task-details">
                    <h3 className="task-name">{task.name}</h3>
                    <p className="task-url">{task.url || 'No URL configured'}</p>
                  </div>
                </div>
                <div className="task-meta">
                  <span className={`task-status ${task.status}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                  <span className="task-date">
                    {new Date(task.updatedAt).toLocaleDateString()}
                  </span>
                  <button className="task-menu" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
