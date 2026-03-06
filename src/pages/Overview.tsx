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

const sampleAutomations: Automation[] = [
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
];

export default function Overview() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(2);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const totalPages = 5;
  const totalRows = 30;
  const rowsPerPage = 6;

  const stats = {
    total: 30,
    active: 16,
    paused: 8,
    errors: 6,
  };

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
    if (selectedRows.length === sampleAutomations.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sampleAutomations.map(a => a.id));
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
                  checked={selectedRows.length === sampleAutomations.length}
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
            {sampleAutomations.map(automation => (
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
