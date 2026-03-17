import { } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { AccountProvider } from './context/AccountContext';
import Sidebar from './components/Sidebar/Sidebar';
import Overview from './pages/Overview';
import AutomationDetail from './pages/AutomationDetail';
import TaskCreator from './components/TaskCreator/TaskCreator';
import TaskCreatorV2 from './components/TaskCreator/TaskCreatorV2';
import SeekAnalytics from './pages/SeekAnalytics';
import GuardrailsPage from './pages/Guardrails';
import EvalsLive from './pages/EvalsLive';
import EvalsTest from './pages/EvalsTest';

function App() {
  return (
    <AccountProvider>
    <TaskProvider>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/automation/:id" element={<AutomationDetail />} />
            <Route path="/create-task" element={<TaskCreator />} />
            <Route path="/create-task-v2" element={<TaskCreatorV2 />} />
            <Route path="/analytics" element={<SeekAnalytics />} />
            <Route path="/evals" element={<Navigate to="/evals/live" replace />} />
            <Route path="/evals/live" element={<EvalsLive />} />
            <Route path="/evals/live/:id" element={<EvalsLive />} />
            <Route path="/evals/test" element={<EvalsTest />} />
            <Route path="/evals/test/:id" element={<EvalsTest />} />
            <Route path="/guardrails" element={<GuardrailsPage />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
            <Route path="/help" element={<PlaceholderPage title="Help and Support" />} />
            <Route path="/notifications" element={<PlaceholderPage title="Notifications" />} />
          </Routes>
        </main>
      </div>
    </TaskProvider>
    </AccountProvider>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div style={{ 
      padding: '32px', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: 'var(--text-secondary)',
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>{title}</h1>
      <p>This page is under construction</p>
    </div>
  );
}

export default App;
