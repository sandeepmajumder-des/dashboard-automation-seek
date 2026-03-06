import { useState } from 'react';
import { 
  Search, 
  Plus,
  Shield,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  Lock,
  Eye,
  MoreVertical,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import './Guardrails.css';

interface Guardrail {
  id: string;
  name: string;
  description: string;
  category: 'security' | 'compliance' | 'quality' | 'access';
  status: 'active' | 'inactive' | 'draft';
  appliedTo: number;
  lastUpdated: string;
  createdBy: string;
}

const sampleGuardrails: Guardrail[] = [
  {
    id: '1',
    name: 'Data Privacy Compliance',
    description: 'Ensures all automations comply with GDPR and data privacy regulations. Monitors data handling and prevents unauthorized access.',
    category: 'compliance',
    status: 'active',
    appliedTo: 12,
    lastUpdated: 'Mar 02, 2026',
    createdBy: 'Sandeep M.',
  },
  {
    id: '2',
    name: 'Authentication Required',
    description: 'Requires multi-factor authentication for sensitive operations. Blocks automations that bypass security protocols.',
    category: 'security',
    status: 'active',
    appliedTo: 24,
    lastUpdated: 'Mar 01, 2026',
    createdBy: 'Admin',
  },
  {
    id: '3',
    name: 'Quality Threshold Check',
    description: 'Validates output quality before completing automation tasks. Ensures accuracy meets defined thresholds.',
    category: 'quality',
    status: 'active',
    appliedTo: 8,
    lastUpdated: 'Feb 28, 2026',
    createdBy: 'Sandeep M.',
  },
  {
    id: '4',
    name: 'Role-Based Access Control',
    description: 'Restricts automation access based on user roles and permissions. Prevents unauthorized task execution.',
    category: 'access',
    status: 'active',
    appliedTo: 30,
    lastUpdated: 'Feb 27, 2026',
    createdBy: 'Admin',
  },
  {
    id: '5',
    name: 'Audit Trail Logging',
    description: 'Maintains comprehensive logs of all automation activities. Required for compliance and troubleshooting.',
    category: 'compliance',
    status: 'active',
    appliedTo: 30,
    lastUpdated: 'Feb 25, 2026',
    createdBy: 'Admin',
  },
  {
    id: '6',
    name: 'Rate Limiting',
    description: 'Prevents excessive API calls and resource consumption. Protects system stability and performance.',
    category: 'security',
    status: 'inactive',
    appliedTo: 0,
    lastUpdated: 'Feb 20, 2026',
    createdBy: 'Sandeep M.',
  },
  {
    id: '7',
    name: 'Human Approval Workflow',
    description: 'Requires human approval for high-value or sensitive transactions before automation proceeds.',
    category: 'quality',
    status: 'active',
    appliedTo: 5,
    lastUpdated: 'Feb 18, 2026',
    createdBy: 'Admin',
  },
  {
    id: '8',
    name: 'Data Validation Rules',
    description: 'Validates input data format and integrity before processing. Prevents errors from invalid data.',
    category: 'quality',
    status: 'draft',
    appliedTo: 0,
    lastUpdated: 'Feb 15, 2026',
    createdBy: 'Sandeep M.',
  },
];

export default function GuardrailsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const stats = {
    total: sampleGuardrails.length,
    active: sampleGuardrails.filter(g => g.status === 'active').length,
    inactive: sampleGuardrails.filter(g => g.status === 'inactive').length,
    draft: sampleGuardrails.filter(g => g.status === 'draft').length,
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return <Lock size={20} />;
      case 'compliance': return <FileText size={20} />;
      case 'quality': return <CheckCircle2 size={20} />;
      case 'access': return <Users size={20} />;
      default: return <Shield size={20} />;
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'security': return 'category-security';
      case 'compliance': return 'category-compliance';
      case 'quality': return 'category-quality';
      case 'access': return 'category-access';
      default: return '';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="status-badge status-active"><ToggleRight size={14} /> Active</span>;
      case 'inactive':
        return <span className="status-badge status-inactive"><ToggleLeft size={14} /> Inactive</span>;
      case 'draft':
        return <span className="status-badge status-draft"><Clock size={14} /> Draft</span>;
      default:
        return null;
    }
  };

  const filteredGuardrails = sampleGuardrails.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         g.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || g.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="guardrails-page">
      <div className="guardrails-header">
        <div className="breadcrumb">
          <span className="breadcrumb-current">Guardrails</span>
          <span className="breadcrumb-separator">/</span>
        </div>
        <div className="header-row">
          <h1 className="page-title">Guardrails</h1>
          <button className="btn btn-primary">
            <Plus size={18} />
            Create Guardrail
          </button>
        </div>
        <p className="page-description">
          Manage and configure guardrails from DAP guidance dashboard to ensure safe and compliant automation execution.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Shield size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Guardrails</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value stat-active">{stats.active}</span>
            <span className="stat-label">Active</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper gray">
            <ToggleLeft size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.inactive}</span>
            <span className="stat-label">Inactive</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper orange">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.draft}</span>
            <span className="stat-label">Drafts</span>
          </div>
        </div>
      </div>

      <div className="guardrails-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search guardrails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="category-filters">
          <button 
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'security' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('security')}
          >
            <Lock size={14} /> Security
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'compliance' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('compliance')}
          >
            <FileText size={14} /> Compliance
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'quality' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('quality')}
          >
            <CheckCircle2 size={14} /> Quality
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'access' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('access')}
          >
            <Users size={14} /> Access
          </button>
        </div>
      </div>

      <div className="guardrails-grid">
        {filteredGuardrails.map(guardrail => (
          <div key={guardrail.id} className="guardrail-card">
            <div className="card-header">
              <div className={`category-icon ${getCategoryClass(guardrail.category)}`}>
                {getCategoryIcon(guardrail.category)}
              </div>
              <button className="card-menu">
                <MoreVertical size={18} />
              </button>
            </div>
            <div className="card-body">
              <h3 className="guardrail-name">{guardrail.name}</h3>
              <p className="guardrail-description">{guardrail.description}</p>
            </div>
            <div className="card-footer">
              <div className="footer-left">
                {getStatusBadge(guardrail.status)}
                <span className="applied-count">
                  <Eye size={14} />
                  Applied to {guardrail.appliedTo} automations
                </span>
              </div>
              <div className="footer-right">
                <span className="last-updated">Updated {guardrail.lastUpdated}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
