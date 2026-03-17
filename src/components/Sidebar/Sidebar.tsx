import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Shield,
  Settings,
  HelpCircle,
  Bell,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  Database,
  TestTube2,
  PanelLeftClose,
  Check,
} from 'lucide-react';
import { useAccount } from '../../context/AccountContext';
import './Sidebar.css';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} />, path: '/' },
  { id: 'analytics', label: 'Seek Analytics', icon: <BarChart3 size={20} />, path: '/analytics' },
  { 
    id: 'evals', 
    label: 'Evals', 
    icon: <FlaskConical size={20} />, 
    path: '/evals',
    children: [
      { id: 'evals-live', label: 'Live Data', icon: <Database size={18} />, path: '/evals/live' },
      { id: 'evals-test', label: 'Test Data', icon: <TestTube2 size={18} />, path: '/evals/test' },
    ]
  },
  { id: 'guardrails', label: 'Guardrails', icon: <Shield size={20} />, path: '/guardrails' },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
];

const bottomNavItems: NavItem[] = [
  { id: 'help', label: 'Help and support', icon: <HelpCircle size={20} />, path: '/help' },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, path: '/notifications' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>(['evals']);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const { currentAccount, accounts, switchAccount } = useAccount();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAccountSwitch = (accountId: string) => {
    switchAccount(accountId);
    setIsAccountDropdownOpen(false);
  };

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
    if (!isCollapsed) {
      setExpandedItems([]);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isParentActive = (item: NavItem) => {
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    return false;
  };

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleNavClick = (item: NavItem) => {
    if (item.children && !isCollapsed) {
      toggleExpand(item.id);
    } else if (item.children && isCollapsed) {
      navigate(item.children[0].path);
    } else {
      navigate(item.path);
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo" onClick={isCollapsed ? toggleCollapse : undefined} style={isCollapsed ? { cursor: 'pointer' } : undefined}>
          <div className="logo-icon">
            <span className="logo-text">S</span>
          </div>
          {!isCollapsed && <span className="logo-label">Seek</span>}
        </div>
        {!isCollapsed && (
          <button className="collapse-btn" onClick={toggleCollapse} title="Collapse sidebar">
            <PanelLeftClose size={18} />
          </button>
        )}
      </div>

      <div className="user-section-wrapper" ref={dropdownRef}>
        <div 
          className="user-section" 
          title={isCollapsed ? currentAccount.name : undefined}
          onClick={() => !isCollapsed && setIsAccountDropdownOpen(!isAccountDropdownOpen)}
        >
          <div className="user-avatar">
            <img src={currentAccount.avatar} alt="User" />
          </div>
          {!isCollapsed && (
            <>
              <span className="user-name">{currentAccount.name}</span>
              <ChevronDown 
                size={16} 
                className={`user-chevron ${isAccountDropdownOpen ? 'rotated' : ''}`} 
              />
            </>
          )}
        </div>
        
        {!isCollapsed && isAccountDropdownOpen && (
          <div className="account-dropdown">
            <div className="dropdown-header">Switch Account</div>
            {accounts.map(account => (
              <div 
                key={account.id}
                className={`account-option ${account.id === currentAccount.id ? 'active' : ''}`}
                onClick={() => handleAccountSwitch(account.id)}
              >
                <div className="account-option-avatar">
                  <img src={account.avatar} alt={account.name} />
                </div>
                <div className="account-option-info">
                  <span className="account-option-name">{account.name}</span>
                  <span className="account-option-stats">{account.automationsCount} automations</span>
                </div>
                {account.id === currentAccount.id && (
                  <Check size={16} className="account-check" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map(item => (
            <li key={item.id} className={item.children ? 'has-children' : ''}>
              <button
                className={`nav-item ${isActive(item.path) || isParentActive(item) ? 'active' : ''}`}
                onClick={() => handleNavClick(item)}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="nav-label">{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                    {item.children && (
                      <ChevronRight 
                        size={16} 
                        className={`nav-chevron ${expandedItems.includes(item.id) ? 'expanded' : ''}`} 
                      />
                    )}
                  </>
                )}
              </button>
              {!isCollapsed && item.children && expandedItems.includes(item.id) && (
                <ul className="nav-sub-list">
                  {item.children.map(child => (
                    <li key={child.id}>
                      <button
                        className={`nav-item nav-sub-item ${isActive(child.path) ? 'active' : ''}`}
                        onClick={() => navigate(child.path)}
                      >
                        <span className="nav-icon">{child.icon}</span>
                        <span className="nav-label">{child.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <ul className="nav-list">
          {bottomNavItems.map(item => (
            <li key={item.id}>
              <button
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>

        {!isCollapsed && (
          <div className="brand-footer">
            <span className="brand-name">whatfix</span>
          </div>
        )}
        
        {isCollapsed && (
          <button className="expand-btn" onClick={toggleCollapse} title="Expand sidebar">
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </aside>
  );
}
