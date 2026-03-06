import { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import './SeekAnalytics.css';

interface AnalyticsData {
  id: string;
  taskName: string;
  totalRuns: number;
  successRate: number;
  avgDuration: string;
  lastRun: string;
  trend: 'up' | 'down' | 'stable';
  status: 'healthy' | 'warning' | 'critical';
}

const sampleAnalytics: AnalyticsData[] = [
  {
    id: '1',
    taskName: 'New Employee Onboarding',
    totalRuns: 156,
    successRate: 98.2,
    avgDuration: '2m 34s',
    lastRun: '2 hours ago',
    trend: 'up',
    status: 'healthy',
  },
  {
    id: '2',
    taskName: 'Purchase Requisition',
    totalRuns: 423,
    successRate: 95.7,
    avgDuration: '1m 12s',
    lastRun: '30 mins ago',
    trend: 'up',
    status: 'healthy',
  },
  {
    id: '3',
    taskName: 'IT Ticket Triage',
    totalRuns: 89,
    successRate: 78.4,
    avgDuration: '45s',
    lastRun: '1 day ago',
    trend: 'down',
    status: 'warning',
  },
  {
    id: '4',
    taskName: 'Customer Refund',
    totalRuns: 67,
    successRate: 45.2,
    avgDuration: '3m 21s',
    lastRun: '3 hours ago',
    trend: 'down',
    status: 'critical',
  },
  {
    id: '5',
    taskName: 'Invoice Processing',
    totalRuns: 312,
    successRate: 99.1,
    avgDuration: '58s',
    lastRun: '15 mins ago',
    trend: 'stable',
    status: 'healthy',
  },
];

export default function SeekAnalytics() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('7d');

  const overallStats = {
    totalExecutions: 1247,
    successRate: 94.3,
    avgDuration: '1m 42s',
    activeAutomations: 16,
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'healthy': return 'status-healthy';
      case 'warning': return 'status-warning';
      case 'critical': return 'status-critical';
      default: return '';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} className="trend-up" />;
      case 'down': return <TrendingDown size={16} className="trend-down" />;
      default: return <Activity size={16} className="trend-stable" />;
    }
  };

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div className="breadcrumb">
          <span className="breadcrumb-current">Seek Analytics</span>
          <span className="breadcrumb-separator">/</span>
        </div>
        <div className="header-row">
          <h1 className="page-title">Seek Analytics</h1>
          <div className="header-actions">
            <select 
              className="time-range-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{overallStats.totalExecutions.toLocaleString()}</span>
            <span className="stat-label">Total Executions</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value stat-success">{overallStats.successRate}%</span>
            <span className="stat-label">Success Rate</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{overallStats.avgDuration}</span>
            <span className="stat-label">Avg. Duration</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper orange">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{overallStats.activeAutomations}</span>
            <span className="stat-label">Active Automations</span>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="chart-card large">
          <div className="card-header">
            <h3>Execution Trends</h3>
            <div className="chart-legend">
              <span className="legend-item"><span className="dot success"></span> Success</span>
              <span className="legend-item"><span className="dot failed"></span> Failed</span>
            </div>
          </div>
          <div className="chart-placeholder">
            <BarChart3 size={48} />
            <p>Execution trend chart</p>
          </div>
        </div>

        <div className="chart-card">
          <div className="card-header">
            <h3>Success Distribution</h3>
          </div>
          <div className="chart-placeholder">
            <PieChart size={48} />
            <p>Success rate breakdown</p>
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
          <table className="analytics-table">
          <thead>
            <tr>
              <th>Automation Name</th>
              <th>Total Runs</th>
              <th>Success Rate</th>
              <th>Avg. Duration</th>
              <th>Last Run</th>
              <th>Trend</th>
              <th>Health</th>
            </tr>
          </thead>
          <tbody>
            {sampleAnalytics.map(item => (
              <tr key={item.id}>
                <td className="task-name">{item.taskName}</td>
                <td>{item.totalRuns}</td>
                <td>
                  <div className="success-rate">
                    <div className="rate-bar">
                      <div 
                        className="rate-fill" 
                        style={{ width: `${item.successRate}%` }}
                      ></div>
                    </div>
                    <span>{item.successRate}%</span>
                  </div>
                </td>
                <td>{item.avgDuration}</td>
                <td className="last-run">{item.lastRun}</td>
                <td>{getTrendIcon(item.trend)}</td>
                <td>
                  <span className={`health-badge ${getStatusClass(item.status)}`}>
                    {item.status === 'healthy' && <CheckCircle2 size={14} />}
                    {item.status === 'warning' && <Clock size={14} />}
                    {item.status === 'critical' && <XCircle size={14} />}
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
