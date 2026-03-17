import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  List,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
  Eye
} from 'lucide-react';
import { useAccount } from '../context/AccountContext';
import './Overview.css';

interface Automation {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Paused' | 'Error' | 'Draft';
  automationType: string;
  trigger: string;
  members: string[];
  lastRun: string;
  totalRuns: number;
  successRate: number;
}

const automationsByAccount: Record<string, Automation[]> = {
  sandeep: [
    {
      id: '1',
      name: 'New Employee Onboarding',
      description: 'Automates the onboarding process for new employees over a period o...',
      status: 'Active',
      automationType: 'Onboarding',
      trigger: 'Email, Schedule',
      members: ['K', 'R'],
      lastRun: 'Mar 03, 2026',
      totalRuns: 30,
      successRate: 93,
    },
    {
      id: '2',
      name: 'Purchase requisition',
      description: 'Process all purchase requisition from power dynamics automatically',
      status: 'Active',
      automationType: 'Vendor purchase processing',
      trigger: 'Email, ticket',
      members: ['T', 'M'],
      lastRun: 'Mar 02, 2026',
      totalRuns: 45,
      successRate: 89,
    },
    {
      id: '3',
      name: 'IT Ticket Triage',
      description: 'Automatically categorizes and routes incoming success tickets',
      status: 'Paused',
      automationType: 'IT helpdesk',
      trigger: 'Ticket',
      members: ['S', 'A', 'R'],
      lastRun: 'Feb 27, 2026',
      totalRuns: 120,
      successRate: 96,
    },
    {
      id: '4',
      name: 'Customer refund',
      description: 'Automatically processes customer refund requests from raised tickets',
      status: 'Error',
      automationType: 'Refund processing',
      trigger: 'Email,Ticket',
      members: ['S', 'R'],
      lastRun: 'Feb 24, 2026',
      totalRuns: 28,
      successRate: 71,
    },
    {
      id: '5',
      name: 'Weekly Sales Report',
      description: 'Generates and distributes weekly sales performance report',
      status: 'Draft',
      automationType: '--',
      trigger: '--',
      members: ['A'],
      lastRun: '--',
      totalRuns: 0,
      successRate: 0,
    },
    {
      id: '6',
      name: 'Invoice Processing',
      description: 'Processes incoming invoices and routes for business units',
      status: 'Active',
      automationType: 'Invoice processing',
      trigger: 'Email',
      members: ['S', 'A', 'R'],
      lastRun: 'Feb 23, 2026',
      totalRuns: 85,
      successRate: 94,
    },
  ],
  ravi: [
    {
      id: 'r1',
      name: 'Vendor Onboarding',
      description: 'Automates vendor registration and approval workflow',
      status: 'Active',
      automationType: 'Vendor Management',
      trigger: 'Form, Email',
      members: ['R', 'P'],
      lastRun: 'Mar 05, 2026',
      totalRuns: 67,
      successRate: 91,
    },
    {
      id: 'r2',
      name: 'Contract Renewal Alerts',
      description: 'Sends automated reminders for upcoming contract renewals',
      status: 'Active',
      automationType: 'Contract Management',
      trigger: 'Schedule',
      members: ['R', 'K'],
      lastRun: 'Mar 04, 2026',
      totalRuns: 23,
      successRate: 100,
    },
    {
      id: 'r3',
      name: 'Expense Report Processing',
      description: 'Processes and validates employee expense reports',
      status: 'Paused',
      automationType: 'Finance',
      trigger: 'Email, Form',
      members: ['R', 'S'],
      lastRun: 'Feb 28, 2026',
      totalRuns: 156,
      successRate: 88,
    },
    {
      id: 'r4',
      name: 'Leave Request Approval',
      description: 'Automates leave request routing and approval',
      status: 'Active',
      automationType: 'HR',
      trigger: 'Form',
      members: ['R'],
      lastRun: 'Mar 06, 2026',
      totalRuns: 89,
      successRate: 97,
    },
  ],
  sarthak: [
    {
      id: 's1',
      name: 'Customer Feedback Analysis',
      description: 'Analyzes customer feedback and generates sentiment reports',
      status: 'Active',
      automationType: 'Analytics',
      trigger: 'Schedule, API',
      members: ['S', 'M'],
      lastRun: 'Mar 06, 2026',
      totalRuns: 45,
      successRate: 98,
    },
    {
      id: 's2',
      name: 'Social Media Monitoring',
      description: 'Monitors brand mentions across social platforms',
      status: 'Active',
      automationType: 'Marketing',
      trigger: 'Schedule',
      members: ['S', 'A'],
      lastRun: 'Mar 06, 2026',
      totalRuns: 210,
      successRate: 99,
    },
    {
      id: 's3',
      name: 'Lead Scoring Automation',
      description: 'Automatically scores and prioritizes sales leads',
      status: 'Active',
      automationType: 'Sales',
      trigger: 'API, Form',
      members: ['S', 'R', 'K'],
      lastRun: 'Mar 05, 2026',
      totalRuns: 178,
      successRate: 94,
    },
    {
      id: 's4',
      name: 'Email Campaign Scheduler',
      description: 'Schedules and sends targeted email campaigns',
      status: 'Draft',
      automationType: 'Marketing',
      trigger: '--',
      members: ['S'],
      lastRun: '--',
      totalRuns: 0,
      successRate: 0,
    },
  ],
};

const statsByAccount: Record<string, { total: number; active: number; paused: number; errors: number }> = {
  sandeep: { total: 16, active: 10, paused: 4, errors: 2 },
  ravi: { total: 12, active: 8, paused: 3, errors: 1 },
  sarthak: { total: 8, active: 6, paused: 1, errors: 1 },
};

export default function Overview() {
  const navigate = useNavigate();
  const { currentAccount } = useAccount();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const automations = automationsByAccount[currentAccount.id] || [];
  const stats = statsByAccount[currentAccount.id] || { total: 0, active: 0, paused: 0, errors: 0 };
  
  const totalPages = Math.ceil(automations.length / 6) || 1;
  const totalRows = automations.length;
  const rowsPerPage = 6;

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Paused': return 'status-paused';
      case 'Error': return 'status-error';
      case 'Draft': return 'status-draft';
      default: return '';
    }
  };

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === automations.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(automations.map(a => a.id));
    }
  };

  const handleRowClick = (id: string) => {
    navigate(`/automation/${id}`);
  };

  return (
    <div className="overview-page">
      <div className="overview-header">
        <div className="breadcrumb">
          <span className="breadcrumb-current">Overview</span>
          <span className="breadcrumb-separator">/</span>
        </div>
        <div className="header-row">
          <h1 className="page-title">Overview</h1>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Automations</span>
        </div>
        <div className="stat-card">
          <span className="stat-value stat-active">{stats.active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card">
          <span className="stat-value stat-paused">{stats.paused}</span>
          <span className="stat-label">Paused</span>
        </div>
        <div className="stat-card">
          <span className="stat-value stat-errors">{stats.errors}</span>
          <span className="stat-label">Errors</span>
        </div>
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <button className="toolbar-btn">
              <SlidersHorizontal size={18} />
              Filters
            </button>
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="table-scroll-wrapper">
          <table className="automations-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input 
                  type="checkbox" 
                  checked={selectedRows.length === automations.length && automations.length > 0}
                  onChange={toggleAllRows}
                />
              </th>
              <th>
                <div className="th-content">
                  Name <ArrowUpDown size={14} />
                </div>
              </th>
              <th>Status</th>
              <th>Automation type</th>
              <th>Trigger</th>
              <th>
                <div className="th-content">
                  Runs <ArrowUpDown size={14} />
                </div>
              </th>
              <th>Success Rate</th>
              <th>
                <div className="th-content">
                  Last run <ArrowUpDown size={14} />
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {automations.map(automation => (
              <tr 
                key={automation.id} 
                className={selectedRows.includes(automation.id) ? 'selected' : ''}
              >
                <td className="checkbox-col" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    checked={selectedRows.includes(automation.id)}
                    onChange={() => toggleRowSelection(automation.id)}
                  />
                </td>
                <td>
                  <div className="name-cell">
                    <span className="automation-name">{automation.name}</span>
                    <span className="automation-desc">{automation.description}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${getStatusClass(automation.status)}`}>
                    <span className="status-dot"></span>
                    {automation.status}
                  </span>
                </td>
                <td>{automation.automationType}</td>
                <td>{automation.trigger}</td>
                <td>
                  <span className="runs-count">{automation.totalRuns}</span>
                </td>
                <td>
                  {automation.totalRuns > 0 ? (
                    <div className="success-rate-cell">
                      <div className="success-rate-bar">
                        <div 
                          className="success-rate-fill" 
                          style={{ width: `${automation.successRate}%` }}
                        />
                      </div>
                      <span className="success-rate-text">{automation.successRate}%</span>
                    </div>
                  ) : (
                    <span className="no-data">--</span>
                  )}
                </td>
                <td>{automation.lastRun}</td>
                <td className="actions-col">
                  <button 
                    className="view-details-btn-secondary"
                    onClick={() => handleRowClick(automation.id)}
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
          <span className="rows-info">Rows 1-{rowsPerPage} of {totalRows}</span>
          <div className="pagination">
            <button 
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            {[1, 2, 3, 4, 5].map(page => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
