import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Search, 
  SlidersHorizontal, 
  Download,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  Timer,
  MoreVertical,
  Play,
  Pause,
  Settings,
  TrendingUp,
  TrendingDown,
  FileText,
  X,
  Copy,
  CheckCheck,
  Activity,
  Brain,
  Lightbulb,
  Target,
  MousePointer,
  Eye,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import './AutomationDetail.css';

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  details?: string;
}

interface ActivityStep {
  id: string;
  stepNumber: number;
  title: string;
  status: 'completed' | 'failed' | 'in-progress' | 'pending';
  timestamp: string;
  duration: string;
  thinking: string;
  reasoning: string;
  action: {
    type: 'click' | 'type' | 'navigate' | 'extract' | 'validate' | 'api_call' | 'decision';
    target?: string;
    value?: string;
    description: string;
  };
  result?: string;
  screenshot?: string;
}

interface AutomationRun {
  id: string;
  runId: string;
  user: string;
  userEmail: string;
  system: string;
  status: 'Success' | 'Failed' | 'In Progress' | 'Pending';
  startTime: string;
  endTime: string;
  duration: string;
  stepsCompleted: number;
  totalSteps: number;
  errorMessage?: string;
  retryCount: number;
  logs: LogEntry[];
  activities: ActivityStep[];
}

interface AutomationInfo {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Paused' | 'Error' | 'Draft';
  automationType: string;
  trigger: string;
  createdAt: string;
  lastModified: string;
  totalRuns: number;
  successRate: number;
  avgDuration: string;
}

const automationData: Record<string, AutomationInfo> = {
  '1': {
    id: '1',
    name: 'New Employee Onboarding',
    description: 'Automates the onboarding process for new employees over a period of time including document collection, system access provisioning, and training assignments.',
    status: 'Active',
    automationType: 'Onboarding',
    trigger: 'Email, Schedule',
    createdAt: 'Jan 15, 2026',
    lastModified: 'Mar 01, 2026',
    totalRuns: 30,
    successRate: 93,
    avgDuration: '4m 32s',
  },
  '2': {
    id: '2',
    name: 'Purchase requisition',
    description: 'Process all purchase requisition from power dynamics automatically including approval workflows and vendor notifications.',
    status: 'Active',
    automationType: 'Vendor purchase processing',
    trigger: 'Email, ticket',
    createdAt: 'Feb 01, 2026',
    lastModified: 'Mar 02, 2026',
    totalRuns: 45,
    successRate: 89,
    avgDuration: '2m 15s',
  },
  '3': {
    id: '3',
    name: 'IT Ticket Triage',
    description: 'Automatically categorizes and routes incoming support tickets to appropriate teams based on content analysis.',
    status: 'Paused',
    automationType: 'IT helpdesk',
    trigger: 'Ticket',
    createdAt: 'Jan 20, 2026',
    lastModified: 'Feb 27, 2026',
    totalRuns: 120,
    successRate: 96,
    avgDuration: '1m 45s',
  },
  '4': {
    id: '4',
    name: 'Customer refund',
    description: 'Automatically processes customer refund requests from raised tickets including validation and payment processing.',
    status: 'Error',
    automationType: 'Refund processing',
    trigger: 'Email, Ticket',
    createdAt: 'Feb 10, 2026',
    lastModified: 'Feb 24, 2026',
    totalRuns: 28,
    successRate: 71,
    avgDuration: '3m 20s',
  },
  '5': {
    id: '5',
    name: 'Weekly Sales Report',
    description: 'Generates and distributes weekly sales performance report to stakeholders.',
    status: 'Draft',
    automationType: '--',
    trigger: '--',
    createdAt: 'Mar 01, 2026',
    lastModified: 'Mar 01, 2026',
    totalRuns: 0,
    successRate: 0,
    avgDuration: '--',
  },
  '6': {
    id: '6',
    name: 'Invoice Processing',
    description: 'Processes incoming invoices and routes for business units with automatic data extraction and validation.',
    status: 'Active',
    automationType: 'Invoice processing',
    trigger: 'Email',
    createdAt: 'Jan 05, 2026',
    lastModified: 'Feb 23, 2026',
    totalRuns: 85,
    successRate: 94,
    avgDuration: '2m 50s',
  },
};

const generateLogs = (runId: string, status: string, startTime: Date, errorMessage?: string): LogEntry[] => {
  const logs: LogEntry[] = [];
  const currentTime = new Date(startTime);
  
  const formatTime = (date: Date) => date.toISOString();
  
  logs.push({
    timestamp: formatTime(currentTime),
    level: 'INFO',
    message: `Automation run ${runId} initiated`,
    details: 'Starting automation execution pipeline'
  });
  
  currentTime.setSeconds(currentTime.getSeconds() + 2);
  logs.push({
    timestamp: formatTime(currentTime),
    level: 'INFO',
    message: 'Connecting to target system',
    details: 'Establishing secure connection via API gateway'
  });
  
  currentTime.setSeconds(currentTime.getSeconds() + 3);
  logs.push({
    timestamp: formatTime(currentTime),
    level: 'DEBUG',
    message: 'Authentication successful',
    details: 'OAuth2 token acquired, session established'
  });
  
  currentTime.setSeconds(currentTime.getSeconds() + 5);
  logs.push({
    timestamp: formatTime(currentTime),
    level: 'INFO',
    message: 'Step 1/5: Data extraction started',
    details: 'Querying source database for required records'
  });
  
  currentTime.setSeconds(currentTime.getSeconds() + 10);
  logs.push({
    timestamp: formatTime(currentTime),
    level: 'INFO',
    message: 'Step 1/5: Data extraction completed',
    details: 'Retrieved 156 records from source system'
  });
  
  currentTime.setSeconds(currentTime.getSeconds() + 3);
  logs.push({
    timestamp: formatTime(currentTime),
    level: 'INFO',
    message: 'Step 2/5: Data validation started',
    details: 'Applying business rules and validation checks'
  });
  
  if (status === 'Failed') {
    currentTime.setSeconds(currentTime.getSeconds() + 5);
    logs.push({
      timestamp: formatTime(currentTime),
      level: 'WARN',
      message: 'Validation warning detected',
      details: 'Some records contain incomplete data fields'
    });
    
    currentTime.setSeconds(currentTime.getSeconds() + 2);
    logs.push({
      timestamp: formatTime(currentTime),
      level: 'ERROR',
      message: `Automation failed: ${errorMessage}`,
      details: 'Critical error encountered. Automation execution halted. Please review the error details and retry.'
    });
    
    currentTime.setSeconds(currentTime.getSeconds() + 1);
    logs.push({
      timestamp: formatTime(currentTime),
      level: 'INFO',
      message: 'Cleanup initiated',
      details: 'Rolling back partial changes and releasing resources'
    });
  } else if (status === 'Success') {
    currentTime.setSeconds(currentTime.getSeconds() + 8);
    logs.push({
      timestamp: formatTime(currentTime),
      level: 'INFO',
      message: 'Step 2/5: Data validation completed',
      details: 'All records passed validation checks'
    });
    
    currentTime.setSeconds(currentTime.getSeconds() + 5);
    logs.push({
      timestamp: formatTime(currentTime),
      level: 'INFO',
      message: 'Step 3/5: Data transformation started',
      details: 'Applying transformation rules and mappings'
    });
    
    currentTime.setSeconds(currentTime.getSeconds() + 12);
    logs.push({
      timestamp: formatTime(currentTime),
      level: 'INFO',
      message: 'Step 3/5: Data transformation completed',
      details: 'Successfully transformed 156 records'
    });
    
    currentTime.setSeconds(currentTime.getSeconds() + 3);
    logs.push({
      timestamp: formatTime(currentTime),
      level: 'INFO',
      message: 'Step 4/5: Data loading started',
      details: 'Inserting transformed data into target system'
    });
    
    currentTime.setSeconds(currentTime.getSeconds() + 15);
    logs.push({
      timestamp: formatTime(currentTime),
      level: 'INFO',
      message: 'Step 4/5: Data loading completed',
      details: 'All records successfully loaded to target'
    });
    
    currentTime.setSeconds(currentTime.getSeconds() + 5);
    logs.push({
      timestamp: formatTime(currentTime),
      level: 'INFO',
      message: 'Step 5/5: Post-processing started',
      details: 'Sending notifications and updating audit logs'
    });
    
    currentTime.setSeconds(currentTime.getSeconds() + 8);
    logs.push({
      timestamp: formatTime(currentTime),
      level: 'INFO',
      message: 'Step 5/5: Post-processing completed',
      details: 'Email notifications sent to 3 recipients'
    });
    
    currentTime.setSeconds(currentTime.getSeconds() + 2);
    logs.push({
      timestamp: formatTime(currentTime),
      level: 'INFO',
      message: `Automation run ${runId} completed successfully`,
      details: 'All steps executed without errors. Total execution time: 68 seconds'
    });
  } else if (status === 'In Progress') {
    currentTime.setSeconds(currentTime.getSeconds() + 8);
    logs.push({
      timestamp: formatTime(currentTime),
      level: 'INFO',
      message: 'Step 2/5: Data validation in progress',
      details: 'Processing validation rules...'
    });
  }
  
  return logs;
};

const generateActivities = (runId: string, status: string, startTime: Date): ActivityStep[] => {
  const activities: ActivityStep[] = [];
  let currentTime = new Date(startTime);
  
  const formatTime = (date: Date) => date.toISOString();
  
  // Step 1: Initial Analysis
  activities.push({
    id: `${runId}-step-1`,
    stepNumber: 1,
    title: 'Analyze Input Data',
    status: 'completed',
    timestamp: formatTime(currentTime),
    duration: '12s',
    thinking: 'I need to first understand the input data structure and identify the key fields required for this automation. Let me examine the incoming request and validate the data format.',
    reasoning: 'Before taking any action, I should analyze the input to ensure all required fields are present and properly formatted. This prevents errors downstream and ensures data quality.',
    action: {
      type: 'extract',
      target: 'Input Payload',
      description: 'Extracted and parsed incoming data from the trigger source'
    },
    result: 'Successfully extracted 12 data fields including user_id, request_type, priority, and metadata'
  });
  
  currentTime.setSeconds(currentTime.getSeconds() + 15);
  
  // Step 2: Authentication
  activities.push({
    id: `${runId}-step-2`,
    stepNumber: 2,
    title: 'Authenticate with Target System',
    status: 'completed',
    timestamp: formatTime(currentTime),
    duration: '8s',
    thinking: 'Now I need to establish a secure connection with the target system. I will use the stored credentials and OAuth2 flow to obtain an access token.',
    reasoning: 'Authentication is critical for security. I am using the principle of least privilege and will request only the necessary scopes for this operation.',
    action: {
      type: 'api_call',
      target: 'OAuth2 Token Endpoint',
      description: 'Initiated OAuth2 authentication flow with target system'
    },
    result: 'Authentication successful. Access token obtained with 3600s expiry.'
  });
  
  currentTime.setSeconds(currentTime.getSeconds() + 10);
  
  // Step 3: Navigate to Application
  activities.push({
    id: `${runId}-step-3`,
    stepNumber: 3,
    title: 'Navigate to Target Application',
    status: 'completed',
    timestamp: formatTime(currentTime),
    duration: '5s',
    thinking: 'With authentication complete, I need to navigate to the specific module within the application where I can perform the required action.',
    reasoning: 'I am choosing the direct navigation path to minimize page loads and reduce execution time. The URL pattern follows the application standard routing.',
    action: {
      type: 'navigate',
      target: 'https://app.example.com/module/workflow',
      description: 'Navigated to the workflow module in the target application'
    },
    result: 'Successfully loaded workflow module. Page ready for interaction.'
  });
  
  currentTime.setSeconds(currentTime.getSeconds() + 8);
  
  // Step 4: Decision Point
  activities.push({
    id: `${runId}-step-4`,
    stepNumber: 4,
    title: 'Evaluate Processing Path',
    status: 'completed',
    timestamp: formatTime(currentTime),
    duration: '3s',
    thinking: 'Based on the input data analysis, I need to determine the correct processing path. The request type indicates this requires the standard workflow, but the priority level suggests expedited handling.',
    reasoning: 'I am applying the business rules defined in the automation configuration. High priority requests (priority >= 8) should skip the queue and go directly to processing. Current priority: 9.',
    action: {
      type: 'decision',
      description: 'Evaluated business rules and determined expedited processing path'
    },
    result: 'Decision: Route to expedited processing queue based on priority level 9'
  });
  
  currentTime.setSeconds(currentTime.getSeconds() + 5);
  
  if (status === 'Failed') {
    // Step 5: Failed interaction
    activities.push({
      id: `${runId}-step-5`,
      stepNumber: 5,
      title: 'Submit Form Data',
      status: 'failed',
      timestamp: formatTime(currentTime),
      duration: '15s',
      thinking: 'I will now fill in the form fields with the extracted data and submit for processing. Let me locate each field and enter the appropriate values.',
      reasoning: 'I am following the field mapping configuration to ensure data is entered in the correct fields. I will validate each entry before submission.',
      action: {
        type: 'type',
        target: 'Form Fields',
        value: 'User data, request details, metadata',
        description: 'Attempted to fill and submit the processing form'
      },
      result: 'ERROR: Form submission failed. Server returned 500 - Internal Server Error. The system appears to be experiencing connectivity issues.'
    });
  } else if (status === 'Success') {
    // Step 5: Form interaction
    activities.push({
      id: `${runId}-step-5`,
      stepNumber: 5,
      title: 'Submit Form Data',
      status: 'completed',
      timestamp: formatTime(currentTime),
      duration: '18s',
      thinking: 'I will now fill in the form fields with the extracted data and submit for processing. Let me locate each field and enter the appropriate values.',
      reasoning: 'I am following the field mapping configuration to ensure data is entered in the correct fields. Using Tab key navigation for efficiency.',
      action: {
        type: 'type',
        target: 'Form Fields',
        value: 'User data, request details, metadata',
        description: 'Filled all required form fields and submitted for processing'
      },
      result: 'Form submitted successfully. Confirmation ID: CNF-2026-00847'
    });
    
    currentTime.setSeconds(currentTime.getSeconds() + 20);
    
    // Step 6: Validation
    activities.push({
      id: `${runId}-step-6`,
      stepNumber: 6,
      title: 'Validate Submission',
      status: 'completed',
      timestamp: formatTime(currentTime),
      duration: '6s',
      thinking: 'I need to verify that the submission was processed correctly by checking the confirmation page and validating the returned data matches our input.',
      reasoning: 'Validation is essential to ensure data integrity. I will compare key fields between input and confirmation to detect any discrepancies.',
      action: {
        type: 'validate',
        target: 'Confirmation Page',
        description: 'Validated submission confirmation and cross-referenced data'
      },
      result: 'Validation passed. All 12 fields match expected values. Status: APPROVED'
    });
    
    currentTime.setSeconds(currentTime.getSeconds() + 8);
    
    // Step 7: Notification
    activities.push({
      id: `${runId}-step-7`,
      stepNumber: 7,
      title: 'Send Notifications',
      status: 'completed',
      timestamp: formatTime(currentTime),
      duration: '4s',
      thinking: 'The automation is complete. I should now notify the relevant stakeholders about the successful completion as per the notification rules.',
      reasoning: 'Based on the automation configuration, I will send email notifications to the requestor and CC the department manager for high priority requests.',
      action: {
        type: 'api_call',
        target: 'Notification Service',
        description: 'Sent completion notifications via email and in-app alerts'
      },
      result: 'Notifications sent to 3 recipients: requestor, manager, and audit log'
    });
  } else if (status === 'In Progress') {
    // Step 5: In progress
    activities.push({
      id: `${runId}-step-5`,
      stepNumber: 5,
      title: 'Submit Form Data',
      status: 'in-progress',
      timestamp: formatTime(currentTime),
      duration: '--',
      thinking: 'I will now fill in the form fields with the extracted data and submit for processing. Currently entering data into the form fields...',
      reasoning: 'I am following the field mapping configuration to ensure data is entered in the correct fields.',
      action: {
        type: 'type',
        target: 'Form Fields',
        value: 'User data, request details',
        description: 'Filling form fields with extracted data...'
      }
    });
  }
  
  return activities;
};

const generateRuns = (automationId: string, count: number): AutomationRun[] => {
  const users = [
    { name: 'John Smith', email: 'john.smith@company.com', system: 'SAP-PROD-01' },
    { name: 'Sarah Johnson', email: 'sarah.j@company.com', system: 'SAP-PROD-02' },
    { name: 'Mike Williams', email: 'mike.w@company.com', system: 'ARIBA-MAIN' },
    { name: 'Emily Davis', email: 'emily.d@company.com', system: 'SAP-PROD-01' },
    { name: 'Robert Brown', email: 'robert.b@company.com', system: 'ORACLE-FIN' },
    { name: 'Lisa Anderson', email: 'lisa.a@company.com', system: 'SAP-PROD-03' },
    { name: 'David Wilson', email: 'david.w@company.com', system: 'ARIBA-MAIN' },
    { name: 'Jennifer Taylor', email: 'jennifer.t@company.com', system: 'SAP-PROD-02' },
    { name: 'James Martinez', email: 'james.m@company.com', system: 'WORKDAY-HR' },
    { name: 'Amanda Garcia', email: 'amanda.g@company.com', system: 'SAP-PROD-01' },
  ];

  const statuses: AutomationRun['status'][] = ['Success', 'Success', 'Success', 'Success', 'Failed', 'Success', 'In Progress', 'Success', 'Pending', 'Success'];
  const errors = [
    'Connection timeout to SAP server',
    'Invalid credentials for user account',
    'Data validation failed: Missing required field',
    'API rate limit exceeded',
    'Network error: Unable to reach destination',
  ];

  return Array.from({ length: count }, (_, i) => {
    const user = users[i % users.length];
    const status = statuses[i % statuses.length];
    const baseDate = new Date('2026-03-03');
    baseDate.setHours(baseDate.getHours() - i * 2);
    
    const startTime = new Date(baseDate);
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + Math.floor(Math.random() * 10) + 1);
    
    const durationMs = endTime.getTime() - startTime.getTime();
    const durationMin = Math.floor(durationMs / 60000);
    const durationSec = Math.floor((durationMs % 60000) / 1000);
    
    const runId = `RUN-${automationId.padStart(3, '0')}-${(1000 + i).toString()}`;
    const errorMessage = status === 'Failed' ? errors[i % errors.length] : undefined;

    return {
      id: `run-${automationId}-${i + 1}`,
      runId,
      user: user.name,
      userEmail: user.email,
      system: user.system,
      status,
      startTime: startTime.toLocaleString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      endTime: status === 'In Progress' || status === 'Pending' ? '--' : endTime.toLocaleString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      duration: status === 'In Progress' || status === 'Pending' ? '--' : `${durationMin}m ${durationSec}s`,
      stepsCompleted: status === 'Success' ? 5 : status === 'Failed' ? Math.floor(Math.random() * 4) + 1 : status === 'In Progress' ? 3 : 0,
      totalSteps: 5,
      errorMessage,
      retryCount: status === 'Failed' ? Math.floor(Math.random() * 3) : 0,
      logs: status !== 'Pending' ? generateLogs(runId, status, startTime, errorMessage) : [],
      activities: status !== 'Pending' ? generateActivities(runId, status, startTime) : [],
    };
  });
};

export default function AutomationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRun, setSelectedRun] = useState<AutomationRun | null>(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const automation = automationData[id || '1'] || automationData['1'];
  const allRuns = generateRuns(automation.id, automation.totalRuns);

  const handleViewLogs = (run: AutomationRun) => {
    setSelectedRun(run);
    setShowLogModal(true);
  };

  const handleCloseLogModal = () => {
    setShowLogModal(false);
    setSelectedRun(null);
    setCopied(false);
  };

  const formatLogForDownload = (run: AutomationRun): string => {
    let content = `=== LOG REPORT ===\n`;
    content += `Run ID: ${run.runId}\n`;
    content += `User: ${run.user} (${run.userEmail})\n`;
    content += `System: ${run.system}\n`;
    content += `Status: ${run.status}\n`;
    content += `Start Time: ${run.startTime}\n`;
    content += `End Time: ${run.endTime}\n`;
    content += `Duration: ${run.duration}\n`;
    content += `Progress: ${run.stepsCompleted}/${run.totalSteps} steps\n`;
    if (run.errorMessage) {
      content += `Error: ${run.errorMessage}\n`;
    }
    content += `Retries: ${run.retryCount}\n`;
    content += `\n=== LOG ENTRIES ===\n\n`;
    
    run.logs.forEach(log => {
      content += `[${log.timestamp}] [${log.level}] ${log.message}\n`;
      if (log.details) {
        content += `    Details: ${log.details}\n`;
      }
      content += '\n';
    });
    
    return content;
  };

  const handleDownloadLog = (run: AutomationRun) => {
    const content = formatLogForDownload(run);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${run.runId}-log-report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyLogs = (run: AutomationRun) => {
    const content = formatLogForDownload(run);
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewActivity = (run: AutomationRun) => {
    setSelectedRun(run);
    setShowActivityModal(true);
    setExpandedSteps([run.activities[0]?.id || '']);
  };

  const handleCloseActivityModal = () => {
    setShowActivityModal(false);
    setSelectedRun(null);
    setExpandedSteps([]);
  };

  const toggleStepExpansion = (stepId: string) => {
    setExpandedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'click': return <MousePointer size={14} />;
      case 'type': return <FileText size={14} />;
      case 'navigate': return <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />;
      case 'extract': return <Download size={14} />;
      case 'validate': return <CheckCircle2 size={14} />;
      case 'api_call': return <RefreshCw size={14} />;
      case 'decision': return <Lightbulb size={14} />;
      default: return <Activity size={14} />;
    }
  };

  const getStepStatusClass = (status: string) => {
    switch (status) {
      case 'completed': return 'step-completed';
      case 'failed': return 'step-failed';
      case 'in-progress': return 'step-in-progress';
      case 'pending': return 'step-pending';
      default: return '';
    }
  };

  const getLevelClass = (level: string) => {
    switch (level) {
      case 'INFO': return 'log-info';
      case 'WARN': return 'log-warn';
      case 'ERROR': return 'log-error';
      case 'DEBUG': return 'log-debug';
      default: return '';
    }
  };
  
  const filteredRuns = allRuns.filter(run => {
    const matchesSearch = run.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         run.runId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         run.system.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || run.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const rowsPerPage = 10;
  const totalPages = Math.ceil(filteredRuns.length / rowsPerPage);
  const paginatedRuns = filteredRuns.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const runStats = {
    total: allRuns.length,
    success: allRuns.filter(r => r.status === 'Success').length,
    failed: allRuns.filter(r => r.status === 'Failed').length,
    inProgress: allRuns.filter(r => r.status === 'In Progress').length,
    pending: allRuns.filter(r => r.status === 'Pending').length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return <CheckCircle2 size={16} />;
      case 'Failed': return <XCircle size={16} />;
      case 'In Progress': return <RefreshCw size={16} className="spinning" />;
      case 'Pending': return <Clock size={16} />;
      default: return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Success': return 'status-success';
      case 'Failed': return 'status-failed';
      case 'In Progress': return 'status-progress';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  };

  const getAutomationStatusClass = (status: string) => {
    switch (status) {
      case 'Active': return 'auto-status-active';
      case 'Paused': return 'auto-status-paused';
      case 'Error': return 'auto-status-error';
      case 'Draft': return 'auto-status-draft';
      default: return '';
    }
  };

  return (
    <div className="automation-detail-page">
      <div className="detail-header">
        <div className="breadcrumb">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={18} />
          </button>
          <span className="breadcrumb-link" onClick={() => navigate('/')}>Overview</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{automation.name}</span>
        </div>
        
        <div className="header-content">
          <div className="header-left">
            <h1 className="page-title">{automation.name}</h1>
            <p className="automation-description">{automation.description}</p>
            <div className="automation-meta">
              <span className={`auto-status-badge ${getAutomationStatusClass(automation.status)}`}>
                <span className="status-dot"></span>
                {automation.status}
              </span>
              <span className="meta-item">
                <Calendar size={14} />
                Created: {automation.createdAt}
              </span>
              <span className="meta-item">
                <RefreshCw size={14} />
                Modified: {automation.lastModified}
              </span>
            </div>
          </div>
          <div className="header-actions">
            <button className="action-btn secondary">
              <Settings size={18} />
              Configure
            </button>
            {automation.status === 'Active' ? (
              <button className="action-btn warning">
                <Pause size={18} />
                Pause
              </button>
            ) : automation.status === 'Paused' ? (
              <button className="action-btn primary">
                <Play size={18} />
                Resume
              </button>
            ) : null}
            <button className="action-btn">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card total">
          <div className="stat-icon">
            <User size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{runStats.total}</span>
            <span className="stat-label">Total Runs</span>
          </div>
        </div>
        <div className="stat-card success">
          <div className="stat-icon">
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{runStats.success}</span>
            <span className="stat-label">Successful</span>
            <span className="stat-percentage">
              <TrendingUp size={12} />
              {automation.successRate}%
            </span>
          </div>
        </div>
        <div className="stat-card failed">
          <div className="stat-icon">
            <XCircle size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{runStats.failed}</span>
            <span className="stat-label">Failed</span>
            <span className="stat-percentage negative">
              <TrendingDown size={12} />
              {100 - automation.successRate}%
            </span>
          </div>
        </div>
        <div className="stat-card duration">
          <div className="stat-icon">
            <Timer size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{automation.avgDuration}</span>
            <span className="stat-label">Avg Duration</span>
          </div>
        </div>
      </div>

      <div className="runs-section">
        <div className="section-header">
          <h2>Run History</h2>
          <div className="section-actions">
            <button className="refresh-btn">
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className="export-btn">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by user, run ID, or system..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <select 
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="in progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
            <button className="toolbar-btn">
              <SlidersHorizontal size={18} />
              More Filters
            </button>
          </div>
        </div>

        <div className="table-scroll-wrapper">
          <table className="runs-table">
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  Run ID <ArrowUpDown size={14} />
                </div>
              </th>
              <th>User / System</th>
              <th>Status</th>
              <th>
                <div className="th-content">
                  Start Time <ArrowUpDown size={14} />
                </div>
              </th>
              <th>End Time</th>
              <th>Duration</th>
              <th>Progress</th>
              <th>Error</th>
              <th>Retries</th>
              <th>Activity</th>
              <th>Logs</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRuns.map(run => (
              <tr key={run.id} className={run.status === 'Failed' ? 'error-row' : ''}>
                <td>
                  <span className="run-id">{run.runId}</span>
                </td>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">{run.user.charAt(0)}</div>
                    <div className="user-info">
                      <span className="user-name">{run.user}</span>
                      <span className="user-system">{run.system}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`run-status ${getStatusClass(run.status)}`}>
                    {getStatusIcon(run.status)}
                    {run.status}
                  </span>
                </td>
                <td>{run.startTime}</td>
                <td>{run.endTime}</td>
                <td>{run.duration}</td>
                <td>
                  <div className="progress-cell">
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${getStatusClass(run.status)}`}
                        style={{ width: `${(run.stepsCompleted / run.totalSteps) * 100}%` }}
                      />
                    </div>
                    <span className="progress-text">{run.stepsCompleted}/{run.totalSteps}</span>
                  </div>
                </td>
                <td>
                  {run.errorMessage ? (
                    <div className="error-cell">
                      <AlertTriangle size={14} />
                      <span className="error-message" title={run.errorMessage}>
                        {run.errorMessage.length > 30 ? run.errorMessage.substring(0, 30) + '...' : run.errorMessage}
                      </span>
                    </div>
                  ) : (
                    <span className="no-error">--</span>
                  )}
                </td>
                <td>
                  <span className={`retry-count ${run.retryCount > 0 ? 'has-retries' : ''}`}>
                    {run.retryCount}
                  </span>
                </td>
                <td>
                  {run.activities.length > 0 ? (
                    <button 
                      className="view-activity-btn"
                      onClick={() => handleViewActivity(run)}
                      title="See AI activity"
                    >
                      <Brain size={14} />
                      See Activity
                    </button>
                  ) : (
                    <span className="no-activity">--</span>
                  )}
                </td>
                <td>
                  {run.logs.length > 0 ? (
                    <div className="logs-actions">
                      <button 
                        className="view-logs-btn"
                        onClick={() => handleViewLogs(run)}
                        title="View logs"
                      >
                        <FileText size={14} />
                        View Logs
                      </button>
                      <button 
                        className="download-log-btn"
                        onClick={() => handleDownloadLog(run)}
                        title="Download log"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  ) : (
                    <span className="no-logs">--</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span className="rows-info">
            Showing {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, filteredRuns.length)} of {filteredRuns.length} runs
          </span>
          <div className="pagination">
            <button 
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            {totalPages > 5 && <span className="page-ellipsis">...</span>}
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

      {showLogModal && selectedRun && (
        <div className="log-modal-overlay" onClick={handleCloseLogModal}>
          <div className="log-modal" onClick={(e) => e.stopPropagation()}>
            <div className="log-modal-header">
              <div className="log-modal-title">
                <FileText size={20} />
                <div>
                  <h2>Log Report</h2>
                  <span className="log-run-id">{selectedRun.runId}</span>
                </div>
              </div>
              <button className="log-modal-close" onClick={handleCloseLogModal}>
                <X size={20} />
              </button>
            </div>

            <div className="log-modal-info">
              <div className="log-info-grid">
                <div className="log-info-item">
                  <span className="log-info-label">User</span>
                  <span className="log-info-value">{selectedRun.user}</span>
                </div>
                <div className="log-info-item">
                  <span className="log-info-label">System</span>
                  <span className="log-info-value">{selectedRun.system}</span>
                </div>
                <div className="log-info-item">
                  <span className="log-info-label">Status</span>
                  <span className={`run-status ${getStatusClass(selectedRun.status)}`}>
                    {getStatusIcon(selectedRun.status)}
                    {selectedRun.status}
                  </span>
                </div>
                <div className="log-info-item">
                  <span className="log-info-label">Duration</span>
                  <span className="log-info-value">{selectedRun.duration}</span>
                </div>
                <div className="log-info-item">
                  <span className="log-info-label">Start Time</span>
                  <span className="log-info-value">{selectedRun.startTime}</span>
                </div>
                <div className="log-info-item">
                  <span className="log-info-label">End Time</span>
                  <span className="log-info-value">{selectedRun.endTime}</span>
                </div>
              </div>
            </div>

            <div className="log-modal-body">
              <div className="log-entries-header">
                <span className="log-entries-count">{selectedRun.logs.length} log entries</span>
                <div className="log-legend">
                  <span className="legend-item log-info"><span className="legend-dot"></span>INFO</span>
                  <span className="legend-item log-debug"><span className="legend-dot"></span>DEBUG</span>
                  <span className="legend-item log-warn"><span className="legend-dot"></span>WARN</span>
                  <span className="legend-item log-error"><span className="legend-dot"></span>ERROR</span>
                </div>
              </div>
              <div className="log-entries">
                {selectedRun.logs.map((log, index) => (
                  <div key={index} className={`log-entry ${getLevelClass(log.level)}`}>
                    <div className="log-entry-header">
                      <span className="log-timestamp">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      <span className={`log-level-badge ${getLevelClass(log.level)}`}>{log.level}</span>
                    </div>
                    <div className="log-message">{log.message}</div>
                    {log.details && (
                      <div className="log-details">{log.details}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="log-modal-footer">
              <button 
                className="log-action-btn secondary"
                onClick={() => handleCopyLogs(selectedRun)}
              >
                {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button 
                className="log-action-btn primary"
                onClick={() => handleDownloadLog(selectedRun)}
              >
                <Download size={16} />
                Download Log
              </button>
            </div>
          </div>
        </div>
      )}

      {showActivityModal && selectedRun && (
        <div className="activity-modal-overlay" onClick={handleCloseActivityModal}>
          <div className="activity-modal" onClick={(e) => e.stopPropagation()}>
            <div className="activity-modal-header">
              <div className="activity-modal-title">
                <Brain size={22} />
                <div>
                  <h2>AI Activity Report</h2>
                  <span className="activity-run-id">{selectedRun.runId}</span>
                </div>
              </div>
              <button className="activity-modal-close" onClick={handleCloseActivityModal}>
                <X size={20} />
              </button>
            </div>

            <div className="activity-modal-info">
              <div className="activity-info-grid">
                <div className="activity-info-item">
                  <span className="activity-info-label">User</span>
                  <span className="activity-info-value">{selectedRun.user}</span>
                </div>
                <div className="activity-info-item">
                  <span className="activity-info-label">System</span>
                  <span className="activity-info-value">{selectedRun.system}</span>
                </div>
                <div className="activity-info-item">
                  <span className="activity-info-label">Status</span>
                  <span className={`run-status ${getStatusClass(selectedRun.status)}`}>
                    {getStatusIcon(selectedRun.status)}
                    {selectedRun.status}
                  </span>
                </div>
                <div className="activity-info-item">
                  <span className="activity-info-label">Total Steps</span>
                  <span className="activity-info-value">{selectedRun.activities.length} steps executed</span>
                </div>
              </div>
            </div>

            <div className="activity-modal-body">
              <div className="activity-timeline">
                {selectedRun.activities.map((step, index) => (
                  <div key={step.id} className={`activity-step ${getStepStatusClass(step.status)}`}>
                    <div className="step-connector">
                      <div className={`step-dot ${getStepStatusClass(step.status)}`}>
                        {step.status === 'completed' && <CheckCircle2 size={14} />}
                        {step.status === 'failed' && <XCircle size={14} />}
                        {step.status === 'in-progress' && <RefreshCw size={14} className="spinning" />}
                        {step.status === 'pending' && <Clock size={14} />}
                      </div>
                      {index < selectedRun.activities.length - 1 && <div className="step-line"></div>}
                    </div>
                    
                    <div className="step-content">
                      <div 
                        className="step-header"
                        onClick={() => toggleStepExpansion(step.id)}
                      >
                        <div className="step-header-left">
                          <span className="step-number">Step {step.stepNumber}</span>
                          <span className="step-title">{step.title}</span>
                          <span className={`step-status-badge ${getStepStatusClass(step.status)}`}>
                            {step.status}
                          </span>
                        </div>
                        <div className="step-header-right">
                          <span className="step-duration">{step.duration}</span>
                          {expandedSteps.includes(step.id) ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </div>
                      </div>

                      {expandedSteps.includes(step.id) && (
                        <div className="step-details">
                          <div className="thinking-section">
                            <div className="section-header">
                              <Sparkles size={16} />
                              <span>AI Thinking</span>
                            </div>
                            <p className="thinking-text">{step.thinking}</p>
                          </div>

                          <div className="reasoning-section">
                            <div className="section-header">
                              <Lightbulb size={16} />
                              <span>Reasoning</span>
                            </div>
                            <p className="reasoning-text">{step.reasoning}</p>
                          </div>

                          <div className="action-section">
                            <div className="section-header">
                              <Target size={16} />
                              <span>Action Taken</span>
                            </div>
                            <div className="action-details">
                              <div className="action-type">
                                {getActionIcon(step.action.type)}
                                <span className="action-type-label">{step.action.type.replace('_', ' ').toUpperCase()}</span>
                              </div>
                              <p className="action-description">{step.action.description}</p>
                              {step.action.target && (
                                <div className="action-target">
                                  <span className="target-label">Target:</span>
                                  <code>{step.action.target}</code>
                                </div>
                              )}
                            </div>
                          </div>

                          {step.result && (
                            <div className={`result-section ${step.status === 'failed' ? 'result-error' : 'result-success'}`}>
                              <div className="section-header">
                                <Eye size={16} />
                                <span>Result</span>
                              </div>
                              <p className="result-text">{step.result}</p>
                            </div>
                          )}

                          <div className="step-timestamp">
                            <Clock size={12} />
                            <span>{new Date(step.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="activity-modal-footer">
              <button className="activity-action-btn secondary" onClick={handleCloseActivityModal}>
                Close
              </button>
              <button 
                className="activity-action-btn primary"
                onClick={() => {
                  handleCloseActivityModal();
                  handleViewLogs(selectedRun);
                }}
              >
                <FileText size={16} />
                View Full Logs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
