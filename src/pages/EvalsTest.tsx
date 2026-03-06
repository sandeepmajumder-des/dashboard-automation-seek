import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Target,
  Eye,
  Play,
  FileText,
  AlertCircle,
  Plus,
  Upload,
  X,
  Database,
  FileUp,
  Link,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import './Evals.css';

interface TestDataset {
  id: string;
  name: string;
  version: string;
  testCases: number;
  lastUpdated: string;
}

interface AutomationTestEval {
  id: string;
  name: string;
  testDataset: TestDataset;
  passRate: number;
  failRate: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  lastRun: string;
  runDuration: string;
  status: 'Passed' | 'Failed' | 'Running' | 'Pending';
  regressions: number;
}

const testEvals: AutomationTestEval[] = [
  {
    id: '1',
    name: 'New Employee Onboarding',
    testDataset: { id: 'ds1', name: 'Onboarding Test Suite v2.1', version: '2.1', testCases: 156, lastUpdated: 'Mar 01, 2026' },
    passRate: 98.1,
    failRate: 1.9,
    accuracy: 97.4,
    precision: 96.8,
    recall: 98.2,
    f1Score: 97.5,
    lastRun: 'Mar 03, 2026 09:30 AM',
    runDuration: '4m 23s',
    status: 'Passed',
    regressions: 0,
  },
  {
    id: '2',
    name: 'Purchase requisition',
    testDataset: { id: 'ds2', name: 'PR Validation Suite', version: '3.0', testCases: 234, lastUpdated: 'Feb 28, 2026' },
    passRate: 94.4,
    failRate: 5.6,
    accuracy: 93.8,
    precision: 92.5,
    recall: 95.1,
    f1Score: 93.8,
    lastRun: 'Mar 03, 2026 08:15 AM',
    runDuration: '6m 45s',
    status: 'Passed',
    regressions: 2,
  },
  {
    id: '3',
    name: 'IT Ticket Triage',
    testDataset: { id: 'ds3', name: 'IT Support Test Cases', version: '1.5', testCases: 412, lastUpdated: 'Feb 25, 2026' },
    passRate: 99.3,
    failRate: 0.7,
    accuracy: 99.1,
    precision: 98.9,
    recall: 99.3,
    f1Score: 99.1,
    lastRun: 'Mar 02, 2026 11:00 PM',
    runDuration: '8m 12s',
    status: 'Passed',
    regressions: 0,
  },
  {
    id: '4',
    name: 'Customer refund',
    testDataset: { id: 'ds4', name: 'Refund Processing Tests', version: '2.3', testCases: 89, lastUpdated: 'Feb 20, 2026' },
    passRate: 71.9,
    failRate: 28.1,
    accuracy: 74.2,
    precision: 72.8,
    recall: 75.6,
    f1Score: 74.2,
    lastRun: 'Mar 03, 2026 10:00 AM',
    runDuration: '2m 34s',
    status: 'Failed',
    regressions: 8,
  },
  {
    id: '5',
    name: 'Invoice Processing',
    testDataset: { id: 'ds5', name: 'Invoice Validation Suite', version: '4.1', testCases: 278, lastUpdated: 'Mar 02, 2026' },
    passRate: 96.8,
    failRate: 3.2,
    accuracy: 96.4,
    precision: 95.9,
    recall: 96.9,
    f1Score: 96.4,
    lastRun: 'Mar 03, 2026 07:45 AM',
    runDuration: '5m 56s',
    status: 'Passed',
    regressions: 1,
  },
];

const availableAutomations = [
  { id: '1', name: 'New Employee Onboarding' },
  { id: '2', name: 'Purchase requisition' },
  { id: '3', name: 'IT Ticket Triage' },
  { id: '4', name: 'Customer refund' },
  { id: '5', name: 'Invoice Processing' },
];

export default function EvalsTest() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewDatasetModal, setShowNewDatasetModal] = useState(false);
  const [datasetForm, setDatasetForm] = useState({
    name: '',
    description: '',
    sourceType: 'upload' as 'upload' | 'url' | 'generate',
    selectedAutomation: '',
    file: null as File | null,
    url: '',
    generateCount: 100,
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDatasetForm(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmitDataset = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setShowNewDatasetModal(false);
      setDatasetForm({
        name: '',
        description: '',
        sourceType: 'upload',
        selectedAutomation: '',
        file: null,
        url: '',
        generateCount: 100,
      });
    }, 2000);
  };

  const overallStats = {
    totalTestCases: testEvals.reduce((sum, e) => sum + e.testDataset.testCases, 0),
    avgPassRate: (testEvals.reduce((sum, e) => sum + e.passRate, 0) / testEvals.length).toFixed(1),
    avgF1Score: (testEvals.reduce((sum, e) => sum + e.f1Score, 0) / testEvals.length).toFixed(1),
    totalRegressions: testEvals.reduce((sum, e) => sum + e.regressions, 0),
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Passed': return 'test-passed';
      case 'Failed': return 'test-failed';
      case 'Running': return 'test-running';
      case 'Pending': return 'test-pending';
      default: return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Passed': return <CheckCircle2 size={14} />;
      case 'Failed': return <XCircle size={14} />;
      case 'Running': return <Activity size={14} className="spinning" />;
      case 'Pending': return <Clock size={14} />;
      default: return null;
    }
  };

  const getScoreClass = (score: number) => {
    if (score >= 95) return 'score-excellent';
    if (score >= 85) return 'score-good';
    if (score >= 70) return 'score-fair';
    return 'score-poor';
  };

  return (
    <div className="evals-page">
      <div className="evals-header">
        <div className="breadcrumb">
          <span className="breadcrumb-current">Evals</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Test Data</span>
        </div>
        <div className="header-row">
          <div>
            <h1 className="page-title">Test Data Evaluations</h1>
            <p className="page-subtitle">Performance metrics from curated test datasets</p>
          </div>
          <div className="header-actions">
            <button className="secondary-btn" onClick={() => setShowNewDatasetModal(true)}>
              <Plus size={18} />
              Try New Dataset
            </button>
            <button className="primary-btn">
              <Play size={18} />
              Run All Tests
            </button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{overallStats.totalTestCases.toLocaleString()}</span>
            <span className="stat-label">Total Test Cases</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{overallStats.avgPassRate}%</span>
            <span className="stat-label">Avg Pass Rate</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{overallStats.avgF1Score}%</span>
            <span className="stat-label">Avg F1 Score</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">
            <AlertCircle size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{overallStats.totalRegressions}</span>
            <span className="stat-label">Total Regressions</span>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search automations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <button className="toolbar-btn">
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </div>
        </div>

        <div className="table-scroll-wrapper">
          <table className="evals-table">
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  Automation <ArrowUpDown size={14} />
                </div>
              </th>
              <th>Test Dataset</th>
              <th>Status</th>
              <th>
                <div className="th-content">
                  Pass Rate <ArrowUpDown size={14} />
                </div>
              </th>
              <th>Accuracy</th>
              <th>Precision</th>
              <th>Recall</th>
              <th>F1 Score</th>
              <th>Regressions</th>
              <th>Last Run</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testEvals.map(evalItem => (
              <tr key={evalItem.id} className={evalItem.status === 'Failed' ? 'error-row' : ''}>
                <td>
                  <span className="automation-name">{evalItem.name}</span>
                </td>
                <td>
                  <div className="dataset-cell">
                    <span className="dataset-name">{evalItem.testDataset.name}</span>
                    <span className="dataset-meta">
                      v{evalItem.testDataset.version} • {evalItem.testDataset.testCases} cases
                    </span>
                  </div>
                </td>
                <td>
                  <span className={`test-status-badge ${getStatusClass(evalItem.status)}`}>
                    {getStatusIcon(evalItem.status)}
                    {evalItem.status}
                  </span>
                </td>
                <td>
                  <div className="pass-rate-cell">
                    <div className="pass-rate-bar">
                      <div 
                        className={`pass-rate-fill ${evalItem.passRate >= 90 ? 'fill-good' : evalItem.passRate >= 70 ? 'fill-fair' : 'fill-poor'}`}
                        style={{ width: `${evalItem.passRate}%` }}
                      />
                    </div>
                    <span className="pass-rate-text">{evalItem.passRate}%</span>
                  </div>
                </td>
                <td>
                  <span className={`score-badge ${getScoreClass(evalItem.accuracy)}`}>
                    {evalItem.accuracy}%
                  </span>
                </td>
                <td>
                  <span className={`score-badge ${getScoreClass(evalItem.precision)}`}>
                    {evalItem.precision}%
                  </span>
                </td>
                <td>
                  <span className={`score-badge ${getScoreClass(evalItem.recall)}`}>
                    {evalItem.recall}%
                  </span>
                </td>
                <td>
                  <span className={`score-badge ${getScoreClass(evalItem.f1Score)}`}>
                    {evalItem.f1Score}%
                  </span>
                </td>
                <td>
                  <span className={`regression-count ${evalItem.regressions > 0 ? 'has-regressions' : ''}`}>
                    {evalItem.regressions > 0 && <AlertCircle size={14} />}
                    {evalItem.regressions}
                  </span>
                </td>
                <td>
                  <div className="last-run-cell">
                    <span className="last-run-date">{evalItem.lastRun}</span>
                    <span className="run-duration">{evalItem.runDuration}</span>
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="view-details-btn"
                      onClick={() => navigate(`/evals/test/${evalItem.id}`)}
                    >
                      <Eye size={14} />
                      View details
                    </button>
                    <button className="run-btn" title="Run tests">
                      <Play size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span className="rows-info">Showing 1-{testEvals.length} of {testEvals.length} automations</span>
          <div className="pagination">
            <button className="page-btn" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="page-btn active">1</button>
            <button className="page-btn" disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {showNewDatasetModal && (
        <div className="modal-overlay" onClick={() => setShowNewDatasetModal(false)}>
          <div className="dataset-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Try New Dataset</h2>
              <button className="modal-close" onClick={() => setShowNewDatasetModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Dataset Name</label>
                <input
                  type="text"
                  placeholder="Enter dataset name..."
                  value={datasetForm.name}
                  onChange={(e) => setDatasetForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label>Description (optional)</label>
                <textarea
                  placeholder="Describe the test dataset..."
                  value={datasetForm.description}
                  onChange={(e) => setDatasetForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Select Automation to Test</label>
                <div className="select-wrapper">
                  <select
                    value={datasetForm.selectedAutomation}
                    onChange={(e) => setDatasetForm(prev => ({ ...prev, selectedAutomation: e.target.value }))}
                  >
                    <option value="">Select an automation...</option>
                    {availableAutomations.map(auto => (
                      <option key={auto.id} value={auto.id}>{auto.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="select-icon" />
                </div>
              </div>

              <div className="form-group">
                <label>Data Source</label>
                <div className="source-options">
                  <button
                    className={`source-option ${datasetForm.sourceType === 'upload' ? 'active' : ''}`}
                    onClick={() => setDatasetForm(prev => ({ ...prev, sourceType: 'upload' }))}
                  >
                    <Upload size={20} />
                    <span>Upload File</span>
                    <p>CSV, JSON, or Excel</p>
                  </button>
                  <button
                    className={`source-option ${datasetForm.sourceType === 'url' ? 'active' : ''}`}
                    onClick={() => setDatasetForm(prev => ({ ...prev, sourceType: 'url' }))}
                  >
                    <Link size={20} />
                    <span>From URL</span>
                    <p>Import from endpoint</p>
                  </button>
                  <button
                    className={`source-option ${datasetForm.sourceType === 'generate' ? 'active' : ''}`}
                    onClick={() => setDatasetForm(prev => ({ ...prev, sourceType: 'generate' }))}
                  >
                    <Sparkles size={20} />
                    <span>AI Generate</span>
                    <p>Create synthetic data</p>
                  </button>
                </div>
              </div>

              {datasetForm.sourceType === 'upload' && (
                <div className="form-group">
                  <label>Upload Test Data File</label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="dataset-file"
                      accept=".csv,.json,.xlsx,.xls"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <label htmlFor="dataset-file" className="file-upload-label">
                      <FileUp size={32} />
                      {datasetForm.file ? (
                        <span className="file-name">{datasetForm.file.name}</span>
                      ) : (
                        <>
                          <span>Drop your file here or click to browse</span>
                          <p>Supports CSV, JSON, Excel (max 50MB)</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              )}

              {datasetForm.sourceType === 'url' && (
                <div className="form-group">
                  <label>Data URL</label>
                  <input
                    type="url"
                    placeholder="https://api.example.com/test-data"
                    value={datasetForm.url}
                    onChange={(e) => setDatasetForm(prev => ({ ...prev, url: e.target.value }))}
                  />
                  <p className="form-hint">Enter a URL that returns JSON or CSV data</p>
                </div>
              )}

              {datasetForm.sourceType === 'generate' && (
                <div className="form-group">
                  <label>Number of Test Cases to Generate</label>
                  <input
                    type="number"
                    min={10}
                    max={1000}
                    value={datasetForm.generateCount}
                    onChange={(e) => setDatasetForm(prev => ({ ...prev, generateCount: parseInt(e.target.value) || 100 }))}
                  />
                  <p className="form-hint">AI will generate synthetic test cases based on your automation's expected inputs and outputs</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowNewDatasetModal(false)}>
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={handleSubmitDataset}
                disabled={!datasetForm.name || !datasetForm.selectedAutomation || isUploading}
              >
                {isUploading ? (
                  <>
                    <Activity size={16} className="spinning" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    Run Evaluation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
