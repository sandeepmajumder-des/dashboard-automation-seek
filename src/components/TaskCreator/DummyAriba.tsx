import React from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  User, 
  ChevronDown,
  FileText,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  BarChart3,
  Settings,
  Home
} from 'lucide-react';
import './DummyAriba.css';

interface DummyAribaProps {
  onElementClick: (elementInfo: {
    elementName: string;
    elementType: string;
    coordinates: { x: number; y: number };
  }) => void;
}

export default function DummyAriba({ onElementClick }: DummyAribaProps) {
  const handleClick = (e: React.MouseEvent, elementName: string, elementType: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + rect.width / 2;
    const y = e.clientY - rect.top + rect.height / 2;
    
    onElementClick({
      elementName,
      elementType,
      coordinates: { x: e.clientX, y: e.clientY }
    });
  };

  return (
    <div className="ariba-app">
      {/* Top Header */}
      <header className="ariba-header">
        <div className="ariba-header-left">
          <div 
            className="ariba-logo clickable-element"
            onClick={(e) => handleClick(e, 'SAP Ariba Logo', 'Logo')}
          >
            <span className="sap-text">SAP</span>
            <span className="ariba-text">Ariba</span>
          </div>
          <nav className="ariba-nav">
            <button 
              className="nav-link active clickable-element"
              onClick={(e) => handleClick(e, 'Home', 'Navigation Link')}
            >
              <Home size={16} />
              Home
            </button>
            <button 
              className="nav-link clickable-element"
              onClick={(e) => handleClick(e, 'Procurement', 'Navigation Link')}
            >
              <ShoppingCart size={16} />
              Procurement
              <ChevronDown size={14} />
            </button>
            <button 
              className="nav-link clickable-element"
              onClick={(e) => handleClick(e, 'Invoicing', 'Navigation Link')}
            >
              <FileText size={16} />
              Invoicing
              <ChevronDown size={14} />
            </button>
            <button 
              className="nav-link clickable-element"
              onClick={(e) => handleClick(e, 'Sourcing', 'Navigation Link')}
            >
              <Package size={16} />
              Sourcing
            </button>
          </nav>
        </div>
        <div className="ariba-header-right">
          <button 
            className="header-icon clickable-element"
            onClick={(e) => handleClick(e, 'Search', 'Icon Button')}
          >
            <Search size={18} />
          </button>
          <button 
            className="header-icon clickable-element"
            onClick={(e) => handleClick(e, 'Notifications', 'Icon Button')}
          >
            <Bell size={18} />
            <span className="notification-badge">3</span>
          </button>
          <button 
            className="header-icon clickable-element"
            onClick={(e) => handleClick(e, 'Help', 'Icon Button')}
          >
            <HelpCircle size={18} />
          </button>
          <button 
            className="user-menu clickable-element"
            onClick={(e) => handleClick(e, 'User Profile Menu', 'Dropdown Button')}
          >
            <div className="user-avatar">
              <User size={16} />
            </div>
            <span>Sandeep M.</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="ariba-main">
        {/* Sidebar */}
        <aside className="ariba-sidebar">
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <button 
              className="sidebar-item clickable-element"
              onClick={(e) => handleClick(e, 'Create Requisition', 'Menu Item')}
            >
              <ShoppingCart size={18} />
              Create Requisition
            </button>
            <button 
              className="sidebar-item clickable-element"
              onClick={(e) => handleClick(e, 'Create Invoice', 'Menu Item')}
            >
              <FileText size={18} />
              Create Invoice
            </button>
            <button 
              className="sidebar-item clickable-element"
              onClick={(e) => handleClick(e, 'Track Orders', 'Menu Item')}
            >
              <Truck size={18} />
              Track Orders
            </button>
            <button 
              className="sidebar-item clickable-element"
              onClick={(e) => handleClick(e, 'Payment Status', 'Menu Item')}
            >
              <CreditCard size={18} />
              Payment Status
            </button>
          </div>
          <div className="sidebar-section">
            <h3>Reports</h3>
            <button 
              className="sidebar-item clickable-element"
              onClick={(e) => handleClick(e, 'Spend Analytics', 'Menu Item')}
            >
              <BarChart3 size={18} />
              Spend Analytics
            </button>
            <button 
              className="sidebar-item clickable-element"
              onClick={(e) => handleClick(e, 'Settings', 'Menu Item')}
            >
              <Settings size={18} />
              Settings
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div className="ariba-content">
          <div className="content-header">
            <h1>Procurement Dashboard</h1>
            <div className="header-actions">
              <button 
                className="btn-secondary clickable-element"
                onClick={(e) => handleClick(e, 'Export', 'Button')}
              >
                Export
              </button>
              <button 
                className="btn-primary clickable-element"
                onClick={(e) => handleClick(e, 'Create New', 'Primary Button')}
              >
                + Create New
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-row">
            <div 
              className="stat-card clickable-element"
              onClick={(e) => handleClick(e, 'Pending Approvals Card', 'Dashboard Card')}
            >
              <div className="stat-icon orange">
                <FileText size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">12</span>
                <span className="stat-label">Pending Approvals</span>
              </div>
            </div>
            <div 
              className="stat-card clickable-element"
              onClick={(e) => handleClick(e, 'Open Orders Card', 'Dashboard Card')}
            >
              <div className="stat-icon blue">
                <ShoppingCart size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">48</span>
                <span className="stat-label">Open Orders</span>
              </div>
            </div>
            <div 
              className="stat-card clickable-element"
              onClick={(e) => handleClick(e, 'In Transit Card', 'Dashboard Card')}
            >
              <div className="stat-icon green">
                <Truck size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">23</span>
                <span className="stat-label">In Transit</span>
              </div>
            </div>
            <div 
              className="stat-card clickable-element"
              onClick={(e) => handleClick(e, 'Pending Invoices Card', 'Dashboard Card')}
            >
              <div className="stat-icon purple">
                <CreditCard size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">$124K</span>
                <span className="stat-label">Pending Invoices</span>
              </div>
            </div>
          </div>

          {/* Recent Requisitions Table */}
          <div className="data-table-container">
            <div className="table-header">
              <h2>Recent Requisitions</h2>
              <button 
                className="view-all clickable-element"
                onClick={(e) => handleClick(e, 'View All Requisitions', 'Link Button')}
              >
                View All →
              </button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Requisition ID</th>
                  <th>Description</th>
                  <th>Requester</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  className="clickable-element"
                  onClick={(e) => handleClick(e, 'Requisition REQ-2024-001', 'Table Row')}
                >
                  <td className="req-id">REQ-2024-001</td>
                  <td>Office Supplies Q1</td>
                  <td>John Smith</td>
                  <td>$2,450.00</td>
                  <td><span className="status-badge pending">Pending</span></td>
                  <td>
                    <button 
                      className="action-btn clickable-element"
                      onClick={(e) => handleClick(e, 'Approve REQ-2024-001', 'Action Button')}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
                <tr 
                  className="clickable-element"
                  onClick={(e) => handleClick(e, 'Requisition REQ-2024-002', 'Table Row')}
                >
                  <td className="req-id">REQ-2024-002</td>
                  <td>IT Equipment</td>
                  <td>Sarah Johnson</td>
                  <td>$15,800.00</td>
                  <td><span className="status-badge approved">Approved</span></td>
                  <td>
                    <button 
                      className="action-btn secondary clickable-element"
                      onClick={(e) => handleClick(e, 'View REQ-2024-002', 'Action Button')}
                    >
                      View
                    </button>
                  </td>
                </tr>
                <tr 
                  className="clickable-element"
                  onClick={(e) => handleClick(e, 'Requisition REQ-2024-003', 'Table Row')}
                >
                  <td className="req-id">REQ-2024-003</td>
                  <td>Marketing Materials</td>
                  <td>Mike Chen</td>
                  <td>$5,200.00</td>
                  <td><span className="status-badge pending">Pending</span></td>
                  <td>
                    <button 
                      className="action-btn clickable-element"
                      onClick={(e) => handleClick(e, 'Approve REQ-2024-003', 'Action Button')}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
