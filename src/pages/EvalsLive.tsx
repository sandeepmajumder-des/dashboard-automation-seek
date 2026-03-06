import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Target,
  Zap,
  Eye,
  RefreshCw
} from 'lucide-react';
import './Evals.css';

interface AutomationEval {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Error';
  totalRuns: number;
  successRate: number;
  avgLatency: string;
  accuracy: number;
  lastEval: string;
  trend: 'up' | 'down' | 'stable';
  errorRate: number;
  dataPoints: number;
}

const liveEvals: AutomationEval[] = [
  {
    id: '1',
    name: 'New Employee Onboarding',
    status: 'Active',
    totalRuns: 1247,
    successRate: 94.2,
    avgLatency: '2.3s',
    accuracy: 96.8,
    lastEval: '2 min ago',
    trend: 'up',
    errorRate: 5.8,
    dataPoints: 15420,
  },
  {
    id: '2',
    name: 'Purchase requisition',
    status: 'Active',
    totalRuns: 3562,
    successRate: 91.5,
    avgLatency: '1.8s',
    accuracy: 93.2,
    lastEval: '5 min ago',
    trend: 'stable',
    errorRate: 8.5,
    dataPoints: 42180,
  },
  {
    id: '3',
    name: 'IT Ticket Triage',
    status: 'Paused',
    totalRuns: 8934,
    successRate: 97.1,
    avgLatency: '0.9s',
    accuracy: 98.4,
    lastEval: '1 hour ago',
    trend: 'up',
    errorRate: 2.9,
    dataPoints: 89340,
  },
  {
    id: '4',
    name: 'Customer refund',
    status: 'Error',
    totalRuns: 892,
    successRate: 72.3,
    avgLatency: '4.1s',
    accuracy: 78.5,
    lastEval: '15 min ago',
    trend: 'down',
    errorRate: 27.7,
    dataPoints: 8920,
  },
  {
    id: '5',
    name: 'Invoice Processing',
    status: 'Active',
    totalRuns: 5621,
    successRate: 95.8,
    avgLatency: '1.5s',
    accuracy: 97.2,
    lastEval: '3 min ago',
    trend: 'up',
    errorRate: 4.2,
    dataPoints: 67452,
  },
];

export default function EvalsLive() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const overallStats = {
    totalDataPoints: liveEvals.reduce((sum, e) => sum + e.dataPoints, 0),
    avgAccuracy: (liveEvals.reduce((sum, e) => sum + e.accuracy, 0) / liveEvals.length).toFixed(1),
    avgSuccessRate: (liveEvals.reduce((sum, e) => sum + e.successRate, 0) / liveEvals.length).toFixed(1),
    activeAutomations: liveEvals.filter(e => e.status === 'Active').length,
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Paused': return 'status-paused';
      case 'Error': return 'status-error';
      default: return '';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={14} className="trend-up" />;
      case 'down': return <TrendingDown size={14} className="trend-down" />;
      default: return <Activity size={14} className="trend-stable" />;
    }
  };

  const getAccuracyClass = (accuracy: number) => {
    if (accuracy >= 95) return 'accuracy-excellent';
    if (accuracy >= 85) return 'accuracy-good';
    if (accuracy >= 70) return 'accuracy-fair';
    return 'accuracy-poor';
  };

  return (
    <div className="evals-page">
      <div className="evals-header">
        <div className="breadcrumb">
          <span className="breadcrumb-current">Evals</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Live Data</span>
        </div>
        <div className="header-row">
          <div>
            <h1 className="page-title">Live Data Evaluations</h1>
            <p className="page-subtitle">Real-time performance metrics from production data</p>
          </div>
          <button className="refresh-btn">
            <RefreshCw size={18} />
            Refresh Data
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{overallStats.totalDataPoints.toLocaleString()}</span>
            <span className="stat-label">Total Data Points</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{overallStats.avgAccuracy}%</span>
            <span className="stat-label">Avg Accuracy</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{overallStats.avgSuccessRate}%</span>
            <span className="stat-label">Avg Success Rate</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <Zap size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{overallStats.activeAutomations}</span>
            <span className="stat-label">Active Automations</span>
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
              <th>Status</th>
              <th>
                <div className="th-content">
                  Data Points <ArrowUpDown size={14} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Accuracy <ArrowUpDown size={14} />
                </div>
              </th>
              <th>Success Rate</th>
              <th>Error Rate</th>
              <th>Avg Latency</th>
              <th>Trend</th>
              <th>Last Eval</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {liveEvals.map(evalItem => (
              <tr key={evalItem.id}>
                <td>
                  <span className="automation-name">{evalItem.name}</span>
                </td>
                <td>
                  <span className={`status-badge ${getStatusClass(evalItem.status)}`}>
                    <span className="status-dot"></span>
                    {evalItem.status}
                  </span>
                </td>
                <td>
                  <span className="data-points">{evalItem.dataPoints.toLocaleString()}</span>
                </td>
                <td>
                  <div className={`accuracy-cell ${getAccuracyClass(evalItem.accuracy)}`}>
                    <div className="accuracy-bar">
                      <div 
                        className="accuracy-fill" 
                        style={{ width: `${evalItem.accuracy}%` }}
                      />
                    </div>
                    <span className="accuracy-text">{evalItem.accuracy}%</span>
                  </div>
                </td>
                <td>
                  <span className={`rate-badge ${evalItem.successRate >= 90 ? 'rate-good' : evalItem.successRate >= 80 ? 'rate-fair' : 'rate-poor'}`}>
                    <CheckCircle2 size={14} />
                    {evalItem.successRate}%
                  </span>
                </td>
                <td>
                  <span className={`rate-badge ${evalItem.errorRate <= 5 ? 'rate-good' : evalItem.errorRate <= 15 ? 'rate-fair' : 'rate-poor'}`}>
                    <XCircle size={14} />
                    {evalItem.errorRate}%
                  </span>
                </td>
                <td>
                  <span className="latency">{evalItem.avgLatency}</span>
                </td>
                <td>
                  <span className={`trend-badge trend-${evalItem.trend}`}>
                    {getTrendIcon(evalItem.trend)}
                  </span>
                </td>
                <td>
                  <span className="last-eval">
                    <Clock size={14} />
                    {evalItem.lastEval}
                  </span>
                </td>
                <td>
                  <button 
                    className="view-details-btn"
                    onClick={() => navigate(`/evals/live/${evalItem.id}`)}
                  >
                    <Eye size={14} />
                    View details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span className="rows-info">Showing 1-{liveEvals.length} of {liveEvals.length} automations</span>
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
    </div>
  );
}
