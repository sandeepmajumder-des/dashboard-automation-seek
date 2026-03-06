import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task, TabType, TriggerConfig, GuardrailConfig, TaskStep } from '../types';

interface TaskContextType {
  tasks: Task[];
  currentTask: Task | null;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  createTask: () => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setCurrentTask: (task: Task | null) => void;
  saveDraft: () => void;
  deployTask: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const generateId = () => Math.random().toString(36).substring(2, 9);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('capture');

  const createTask = (): Task => {
    const newTask: Task = {
      id: generateId(),
      name: 'Untitled Task',
      status: 'draft',
      steps: [],
      guardrails: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
    setCurrentTask(newTask);
    setActiveTab('capture');
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
    if (currentTask?.id === id) {
      setCurrentTask(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    }
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    if (currentTask?.id === id) {
      setCurrentTask(null);
    }
  };

  const saveDraft = () => {
    if (currentTask) {
      updateTask(currentTask.id, { status: 'draft' });
    }
  };

  const deployTask = () => {
    if (currentTask) {
      updateTask(currentTask.id, { status: 'deployed' });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        currentTask,
        activeTab,
        setActiveTab,
        createTask,
        updateTask,
        deleteTask,
        setCurrentTask,
        saveDraft,
        deployTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}
