import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bell, User, Settings, LogOut, Activity, Shield, Clock, Zap, Monitor, Sun, Moon, Volume2, VolumeX, Lock, Wifi, Database, Server, AlertTriangle, CheckCircle, XCircle, Palette, User2, Mail, Phone, MapPin, Calendar, Edit, Save, X, Users, UserCheck, UserX, Eye, FileText, Clipboard, BarChart3, TrendingUp, DollarSign, Heart, Scale, BookOpen, Key, Globe, Download, Upload, Trash2, RefreshCw, AlertCircle, CheckCircle2, Timer, Gauge, PieChart, LineChart, Building, MapPin as Building2, Search, Filter, SortAsc, SortDesc, MoreHorizontal, Play, Pause, Square, RotateCcw, HardDrive, Cpu, MemoryStick, Network, ChevronRight, ExternalLink, Copy, Printer, Share2, Archive, History, Bug, Wrench, Cog, Target, Layers, Grid, List, Calendar as CalendarIcon, Folder, FolderOpen, Star, Bookmark, Tag, Hash, AtSign, Link2, Paperclip, Image, Video, Music, Package, Box, Truck, MapPin as LocationIcon, CreditCard, Receipt, DollarSign as Currency, Percent, Calculator, Briefcase, Building2 as Office, Home, School, Hospital, Factory, Store, Warehouse, Car, Plane, Ship, Train, Bus, Bike, Crown, Plus } from "lucide-react";
import aegisLogo from 'figma:asset/84f9bbba063a068a05f4226ec41db1c74ab17300.png';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { 
  Switch 
} from "../ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RealTimeNotificationSystem } from "../common/RealTimeNotificationSystem";
import { SimpleThemeSwitcher } from "./SimpleThemeSwitcher";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from "../../utils/supabase/info";

interface SessionBarSimpleProps {
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  notifications?: number;
}

export function SessionBarSimple({ user, notifications = 0 }: SessionBarSimpleProps) {
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileEditing, setProfileEditing] = useState(false);
  
  // Enterprise Administrative State Management
  const [settings, setSettings] = useState({
    theme: 'royal-gold',
    darkMode: true,
    notifications: {
      email: true,
      push: true,
      sound: true,
      desktop: false
    },
    accessibility: {
      reducedMotion: false,
      highContrast: false,
      fontSize: 14,
      colorBlindMode: false
    },
    privacy: {
      analyticsEnabled: true,
      crashReporting: true,
      dataSharing: false
    },
    advanced: {
      autoSave: true,
      sessionTimeout: 30,
      debugMode: false
    }
  });

  // Real-time Data State
  const [systemStatus, setSystemStatus] = useState({
    database: 'connected',
    api: 'connected', 
    notifications: 'enabled',
    security: 'secure',
    uptime: '99.8%'
  });
  const [userManagement, setUserManagement] = useState(null);
  const [systemMonitoring, setSystemMonitoring] = useState(null);
  const [complianceData, setComplianceData] = useState(null);
  const [operationsData, setOperationsData] = useState(null);
  const [securityData, setSecurityData] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [realtimeMetrics, setRealtimeMetrics] = useState(null);
  const [userActivity, setUserActivity] = useState([]);
  const [complianceActions, setComplianceActions] = useState([]);
  const [securityAlerts, setSecurityAlerts] = useState([]);
  
  // Loading States
  const [loadingStates, setLoadingStates] = useState({
    overview: false,
    users: false,
    monitoring: false,
    compliance: false,
    operations: false,
    security: false
  });

  // Error States
  const [errors, setErrors] = useState({});

  // Real-time Update References
  const intervalRefs = useRef({});
  const wsRef = useRef(null);

  // API Configuration
  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d3b92db3`;
  const API_HEADERS = {
    'Authorization': `Bearer ${publicAnonKey}`,
    'Content-Type': 'application/json'
  };

  // Enhanced API Functions with Error Handling
  const fetchWithErrorHandling = useCallback(async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: API_HEADERS,
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      setErrors(prev => ({ ...prev, [endpoint]: error.message }));
      throw error;
    }
  }, []);

  // Data Fetching Functions
  const fetchSystemStatus = useCallback(async () => {
    try {
      const data = await fetchWithErrorHandling('/admin/system/status');
      setSystemStatus(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch system status:', error);
    }
  }, [fetchWithErrorHandling]);

  const fetchUserManagement = useCallback(async () => {
    try {
      const [overview, activity] = await Promise.all([
        fetchWithErrorHandling('/admin/users/overview'),
        fetchWithErrorHandling('/admin/users/activity')
      ]);
      
      setUserManagement(overview);
      setUserActivity(activity);
      return { overview, activity };
    } catch (error) {
      console.error('Failed to fetch user management data:', error);
    }
  }, [fetchWithErrorHandling]);

  const fetchSystemMonitoring = useCallback(async () => {
    try {
      const [status, metrics] = await Promise.all([
        fetchWithErrorHandling('/admin/system/status'),
        fetchWithErrorHandling('/admin/metrics/realtime')
      ]);
      
      setSystemMonitoring(status);
      setRealtimeMetrics(metrics);
      return { status, metrics };
    } catch (error) {
      console.error('Failed to fetch monitoring data:', error);
    }
  }, [fetchWithErrorHandling]);

  const fetchComplianceData = useCallback(async () => {
    try {
      const [overview, actions] = await Promise.all([
        fetchWithErrorHandling('/admin/compliance/overview'),
        fetchWithErrorHandling('/admin/compliance/actions')
      ]);
      
      setComplianceData(overview);
      setComplianceActions(actions);
      return { overview, actions };
    } catch (error) {
      console.error('Failed to fetch compliance data:', error);
    }
  }, [fetchWithErrorHandling]);

  const fetchOperationsData = useCallback(async () => {
    try {
      const data = await fetchWithErrorHandling('/admin/operations/overview');
      setOperationsData(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch operations data:', error);
    }
  }, [fetchWithErrorHandling]);

  const fetchSecurityData = useCallback(async () => {
    try {
      const [overview, alerts] = await Promise.all([
        fetchWithErrorHandling('/admin/security/overview'),
        fetchWithErrorHandling('/admin/security/alerts')
      ]);
      
      setSecurityData(overview);
      setSecurityAlerts(alerts);
      return { overview, alerts };
    } catch (error) {
      console.error('Failed to fetch security data:', error);
    }
  }, [fetchWithErrorHandling]);

  const fetchAuditLogs = useCallback(async () => {
    try {
      const data = await fetchWithErrorHandling('/admin/audit/logs');
      setAuditLogs(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    }
  }, [fetchWithErrorHandling]);

  // Administrative Action Functions
  const approveUser = useCallback(async (userId) => {
    setLoadingStates(prev => ({ ...prev, users: true }));
    try {
      await fetchWithErrorHandling(`/admin/users/approve/${userId}`, { method: 'POST' });
      await fetchUserManagement(); // Refresh data
      toast.success(`User ${userId} approved successfully`);
    } catch (error) {
      toast.error('Failed to approve user');
    } finally {
      setLoadingStates(prev => ({ ...prev, users: false }));
    }
  }, [fetchWithErrorHandling, fetchUserManagement]);

  const lockUser = useCallback(async (userId) => {
    setLoadingStates(prev => ({ ...prev, users: true }));
    try {
      await fetchWithErrorHandling(`/admin/users/lock/${userId}`, { method: 'POST' });
      await fetchUserManagement(); // Refresh data
      toast.success(`User ${userId} locked successfully`);
    } catch (error) {
      toast.error('Failed to lock user');
    } finally {
      setLoadingStates(prev => ({ ...prev, users: false }));
    }
  }, [fetchWithErrorHandling, fetchUserManagement]);

  const bulkImportUsers = useCallback(async (users) => {
    setLoadingStates(prev => ({ ...prev, users: true }));
    try {
      const result = await fetchWithErrorHandling('/admin/users/bulk-import', {
        method: 'POST',
        body: JSON.stringify({ users })
      });
      await fetchUserManagement(); // Refresh data
      toast.success(`Successfully imported ${result.imported} users`);
    } catch (error) {
      toast.error('Failed to import users');
    } finally {
      setLoadingStates(prev => ({ ...prev, users: false }));
    }
  }, [fetchWithErrorHandling, fetchUserManagement]);

  const runSecurityScan = useCallback(async () => {
    setLoadingStates(prev => ({ ...prev, security: true }));
    try {
      const result = await fetchWithErrorHandling('/admin/security/scan', { method: 'POST' });
      await fetchSecurityData(); // Refresh data
      toast.success(`Security scan completed. Scan ID: ${result.scanId}`);
    } catch (error) {
      toast.error('Failed to run security scan');
    } finally {
      setLoadingStates(prev => ({ ...prev, security: false }));
    }
  }, [fetchWithErrorHandling, fetchSecurityData]);

  const generateComplianceReport = useCallback(async () => {
    setLoadingStates(prev => ({ ...prev, compliance: true }));
    try {
      const result = await fetchWithErrorHandling('/admin/compliance/generate-report', { method: 'POST' });
      toast.success(`Compliance report generated. Report ID: ${result.reportId}`);
      return result;
    } catch (error) {
      toast.error('Failed to generate compliance report');
    } finally {
      setLoadingStates(prev => ({ ...prev, compliance: false }));
    }
  }, [fetchWithErrorHandling]);

  const restartServices = useCallback(async () => {
    setLoadingStates(prev => ({ ...prev, operations: true }));
    try {
      const result = await fetchWithErrorHandling('/admin/operations/restart-services', { method: 'POST' });
      await fetchSystemStatus(); // Refresh data
      toast.success(`Services restarted successfully in ${result.totalDuration}`);
    } catch (error) {
      toast.error('Failed to restart services');
    } finally {
      setLoadingStates(prev => ({ ...prev, operations: false }));
    }
  }, [fetchWithErrorHandling, fetchSystemStatus]);

  const forceBackup = useCallback(async () => {
    setLoadingStates(prev => ({ ...prev, operations: true }));
    try {
      const result = await fetchWithErrorHandling('/admin/operations/backup', { method: 'POST' });
      toast.success(`Backup initiated. Backup ID: ${result.backupId}`);
    } catch (error) {
      toast.error('Failed to initiate backup');
    } finally {
      setLoadingStates(prev => ({ ...prev, operations: false }));
    }
  }, [fetchWithErrorHandling]);

  const clearCache = useCallback(async () => {
    setLoadingStates(prev => ({ ...prev, operations: true }));
    try {
      const result = await fetchWithErrorHandling('/admin/operations/clear-cache', { method: 'POST' });
      toast.success(`Cache cleared successfully. Total cleared: ${result.totalCleared}`);
    } catch (error) {
      toast.error('Failed to clear cache');
    } finally {
      setLoadingStates(prev => ({ ...prev, operations: false }));
    }
  }, [fetchWithErrorHandling]);

  const runHealthCheck = useCallback(async () => {
    setLoadingStates(prev => ({ ...prev, operations: true }));
    try {
      const result = await fetchWithErrorHandling('/admin/operations/health-check', { method: 'POST' });
      await fetchSystemMonitoring(); // Refresh data
      toast.success(`Health check completed. Status: ${result.overallStatus}`);
    } catch (error) {
      toast.error('Failed to run health check');
    } finally {
      setLoadingStates(prev => ({ ...prev, operations: false }));
    }
  }, [fetchWithErrorHandling, fetchSystemMonitoring]);

  const exportAuditLogs = useCallback(async () => {
    try {
      const result = await fetchWithErrorHandling('/admin/audit/export', { method: 'POST' });
      toast.success(`Audit logs exported. Export ID: ${result.exportId}`);
      return result;
    } catch (error) {
      toast.error('Failed to export audit logs');
    }
  }, [fetchWithErrorHandling]);

  // Profile editing state
  const [profileData, setProfileData] = useState({
    name: user.name,
    role: user.role,
    email: 'user@aegis.healthcare',
    phone: '+44 20 7946 0958',
    department: 'Clinical Operations',
    location: 'London, UK',
    bio: 'Healthcare professional dedicated to quality care delivery and operational excellence.',
    avatar: user.avatar
  });

  // Initialize Data on Mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch initial data for all tabs
        await Promise.all([
          fetchSystemStatus(),
          fetchUserManagement(),
          fetchSystemMonitoring(),
          fetchComplianceData(),
          fetchOperationsData(),
          fetchSecurityData(),
          fetchAuditLogs()
        ]);
      } catch (error) {
        console.error('Failed to initialize administrative data:', error);
        toast.error('Failed to load administrative data');
      }
    };

    initializeData();
  }, [
    fetchSystemStatus,
    fetchUserManagement,
    fetchSystemMonitoring,
    fetchComplianceData,
    fetchOperationsData,
    fetchSecurityData,
    fetchAuditLogs
  ]);

  // Real-time Updates
  useEffect(() => {
    // System status updates every 30 seconds
    intervalRefs.current.systemStatus = setInterval(fetchSystemStatus, 30000);
    
    // Real-time metrics every 10 seconds
    intervalRefs.current.realtimeMetrics = setInterval(() => {
      fetchWithErrorHandling('/admin/metrics/realtime')
        .then(setRealtimeMetrics)
        .catch(console.error);
    }, 10000);
    
    // User activity updates every 60 seconds
    intervalRefs.current.userActivity = setInterval(fetchUserManagement, 60000);
    
    // Security alerts every 45 seconds
    intervalRefs.current.securityAlerts = setInterval(fetchSecurityData, 45000);

    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, [fetchSystemStatus, fetchUserManagement, fetchSecurityData, fetchWithErrorHandling]);

  // WebSocket-style real-time dashboard updates
  useEffect(() => {
    const realtimeDashboard = setInterval(async () => {
      try {
        const dashboardData = await fetchWithErrorHandling('/admin/realtime/dashboard');
        
        // Update relevant state with real-time data
        if (systemMonitoring) {
          setSystemMonitoring(prev => ({
            ...prev,
            serverLoad: dashboardData.systemHealth.cpu,
            memoryUsage: dashboardData.systemHealth.memory,
            diskSpace: dashboardData.systemHealth.disk,
            activeConnections: dashboardData.activeUsers
          }));
        }
      } catch (error) {
        console.error('Real-time dashboard update failed:', error);
      }
    }, 5000); // Every 5 seconds

    return () => clearInterval(realtimeDashboard);
  }, [fetchWithErrorHandling, systemMonitoring]);

  // Settings handlers
  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
    
    // Show confirmation
    toast.success(`${setting.charAt(0).toUpperCase() + setting.slice(1)} updated successfully`);
  };

  const handleNotificationToggle = () => {
    setNotificationsPanelOpen(!notificationsPanelOpen);
  };

  const handleProfileSave = () => {
    setProfileEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleSignOut = () => {
    toast.success('Signing out...');
    // Simulate sign out delay
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'enabled':
      case 'secure':
        return <CheckCircle className="w-3 h-3 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-3 h-3 text-warning" />;
      case 'error':
      case 'disconnected':
        return <XCircle className="w-3 h-3 text-destructive" />;
      default:
        return <Activity className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'enabled':
      case 'secure':
        return 'rgba(16, 185, 129, 0.1)';
      case 'warning':
        return 'rgba(245, 158, 11, 0.1)';
      case 'error':
      case 'disconnected':
        return 'rgba(239, 68, 68, 0.1)';
      default:
        return 'rgba(156, 163, 175, 0.1)';
    }
  };

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'enabled':
      case 'secure':
        return 'rgba(16, 185, 129, 0.3)';
      case 'warning':
        return 'rgba(245, 158, 11, 0.3)';
      case 'error':
      case 'disconnected':
        return 'rgba(239, 68, 68, 0.3)';
      default:
        return 'rgba(156, 163, 175, 0.3)';
    }
  };

  return (
    <div className="navbar-blur-only flex items-center gap-3 px-4 py-2" style={{
      background: 'rgba(18, 22, 28, 0.95)',
      border: '1px solid rgba(212, 175, 55, 0.15)',
      borderRadius: '0',
      boxShadow: 'var(--shadow-deep), inset 0 1px 0 rgba(212, 175, 55, 0.06)'
    }}>
      <div className="flex items-center gap-3 flex-1">
        <img 
          src={aegisLogo} 
          alt="AEGIS Logo" 
          className="h-16 w-auto"
        />
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            AEGIS
          </h1>
          <p className="text-xs text-muted-foreground font-medium">
            Health & Social Care Management System
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Real-time Notification System */}
        <RealTimeNotificationSystem 
          isOpen={notificationsPanelOpen}
          onToggle={() => setNotificationsPanelOpen(!notificationsPanelOpen)}
        />

        {/* System Status Indicators - Enhanced */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 px-2 py-1 rounded" 
               style={{ 
                 background: getStatusColor(systemStatus.database), 
                 border: `1px solid ${getStatusBorderColor(systemStatus.database)}` 
               }}>
            {getStatusIcon(systemStatus.database)}
            <span className="text-xs font-medium">DB</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded"
               style={{ 
                 background: getStatusColor(systemStatus.api), 
                 border: `1px solid ${getStatusBorderColor(systemStatus.api)}` 
               }}>
            {getStatusIcon(systemStatus.api)}
            <span className="text-xs font-medium">API</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded"
               style={{ 
                 background: getStatusColor(systemStatus.security), 
                 border: `1px solid ${getStatusBorderColor(systemStatus.security)}` 
               }}>
            <Shield className="w-3 h-3 text-primary" />
            <span className="text-xs text-primary font-medium">Secure</span>
          </div>
        </div>

        {/* Legacy Notifications (keeping for compatibility) */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative hover:bg-primary/10"
          onClick={handleNotificationToggle}
          title="Toggle notifications panel"
        >
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center bg-primary text-primary-foreground"
            >
              {notifications > 9 ? "9+" : notifications}
            </Badge>
          )}
        </Button>

        {/* Settings Dialog */}
        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-primary/10"
              title="Open settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] aegis-glass-panel border-0 max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-foreground aegis-text-ultra">
                <Shield className="w-6 h-6 text-primary" />
                <Settings className="w-5 h-5" />
                AEGIS Administrative Control Centre
              </DialogTitle>
              <DialogDescription className="text-muted-foreground aegis-text-enhanced">
                Registered Manager access to institutional controls, user permissions, system monitoring, compliance oversight, and operational governance. Configure all aspects of your AEGIS health & social care management system.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-7 mb-6">
                <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                <TabsTrigger value="users" className="text-xs">Users</TabsTrigger>
                <TabsTrigger value="monitoring" className="text-xs">Monitoring</TabsTrigger>
                <TabsTrigger value="compliance" className="text-xs">Compliance</TabsTrigger>
                <TabsTrigger value="operations" className="text-xs">Operations</TabsTrigger>
                <TabsTrigger value="security" className="text-xs">Security</TabsTrigger>
                <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                {/* Executive Dashboard Header */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="aegis-kpi p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">System Health</p>
                        <p className="text-2xl font-bold text-success">
                          {systemStatus?.uptime || "99.97%"}
                        </p>
                      </div>
                      <Monitor className="w-8 h-8 text-success" />
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 mt-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: "99%" }}></div>
                    </div>
                  </div>
                  
                  <div className="aegis-kpi p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Active Users</p>
                        <p className="text-2xl font-bold text-primary">
                          {userManagement?.activeUsers || 198}
                        </p>
                      </div>
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-success">↑ 12%</span>
                      <span className="text-xs text-muted-foreground">vs last hour</span>
                    </div>
                  </div>
                  
                  <div className="aegis-kpi p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Security Score</p>
                        <p className="text-2xl font-bold text-success">
                          {securityData?.securityScore || "98.5"}%
                        </p>
                      </div>
                      <Shield className="w-8 h-8 text-success" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-success">Excellent</span>
                      <span className="text-xs text-muted-foreground">No threats</span>
                    </div>
                  </div>
                  
                  <div className="aegis-kpi p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Compliance</p>
                        <p className="text-2xl font-bold text-success">
                          {complianceData?.overallScore || "97.8"}%
                        </p>
                      </div>
                      <Scale className="w-8 h-8 text-success" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-success">GDPR/HIPAA</span>
                      <span className="text-xs text-muted-foreground">Compliant</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {/* Real-time System Metrics */}
                  <div className="aegis-card-glass p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Gauge className="w-5 h-5 text-primary" />
                        Real-time Metrics
                      </h3>
                      <Button variant="ghost" size="sm" onClick={() => fetchSystemMonitoring()}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-primary" />
                          <span className="text-sm">CPU Load</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {realtimeMetrics?.cpu || systemStatus?.serverLoad || 67}%
                          </span>
                          <div className="w-16 bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${realtimeMetrics?.cpu || systemStatus?.serverLoad || 67}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MemoryStick className="w-4 h-4 text-warning" />
                          <span className="text-sm">Memory</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {realtimeMetrics?.memory || systemStatus?.memoryUsage || 54}%
                          </span>
                          <div className="w-16 bg-secondary rounded-full h-2">
                            <div 
                              className="bg-warning h-2 rounded-full" 
                              style={{ width: `${realtimeMetrics?.memory || systemStatus?.memoryUsage || 54}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HardDrive className="w-4 h-4 text-destructive" />
                          <span className="text-sm">Disk Space</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {realtimeMetrics?.disk || systemStatus?.diskSpace || 78}%
                          </span>
                          <div className="w-16 bg-secondary rounded-full h-2">
                            <div 
                              className="bg-destructive h-2 rounded-full" 
                              style={{ width: `${realtimeMetrics?.disk || systemStatus?.diskSpace || 78}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Network className="w-4 h-4 text-success" />
                          <span className="text-sm">Network</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-success">
                            {realtimeMetrics?.responseTime || systemStatus?.networkLatency || 45}ms
                          </span>
                          <CheckCircle className="w-4 h-4 text-success" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Critical Alerts & Actions */}
                  <div className="aegis-card-glass p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        Priority Actions
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {(userManagement?.pendingApprovals || 0) + (securityData?.securityAlerts || 0)} pending
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {loadingStates.users ? (
                        <div className="animate-pulse p-3 rounded-lg border bg-card/30">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start h-auto p-3"
                          onClick={() => approveUser('pending_batch')}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-success" />
                              <span>Approve Pending Users</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {userManagement?.pendingApprovals || 12}
                            </Badge>
                          </div>
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start h-auto p-3"
                        onClick={() => setActiveSubTab && setActiveSubTab('security')}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-warning" />
                            <span>Review Security Alerts</span>
                          </div>
                          <Badge variant="destructive" className="text-xs">
                            {securityData?.securityAlerts || 2}
                          </Badge>
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start h-auto p-3"
                        onClick={generateComplianceReport}
                        disabled={loadingStates.compliance}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            <span>Generate Compliance Report</span>
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start h-auto p-3"
                        onClick={exportAuditLogs}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <Download className="w-4 h-4 text-primary" />
                            <span>Export Audit Logs</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {auditLogs.length} records
                          </span>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* System Status Grid */}
                  <div className="aegis-card-glass p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        System Services
                      </h3>
                      <Button variant="ghost" size="sm" onClick={runHealthCheck}>
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg border bg-success/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Database className="w-4 h-4 text-success" />
                            <span className="text-xs font-medium">Database</span>
                          </div>
                          <CheckCircle className="w-3 h-3 text-success" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Connected</p>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-success/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Server className="w-4 h-4 text-success" />
                            <span className="text-xs font-medium">API</span>
                          </div>
                          <CheckCircle className="w-3 h-3 text-success" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Healthy</p>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-success/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-success" />
                            <span className="text-xs font-medium">Security</span>
                          </div>
                          <CheckCircle className="w-3 h-3 text-success" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Secure</p>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-warning/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Archive className="w-4 h-4 text-warning" />
                            <span className="text-xs font-medium">Backup</span>
                          </div>
                          <AlertTriangle className="w-3 h-3 text-warning" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {operationsData?.backupStatus?.lastBackup ? 
                            `${Math.floor((Date.now() - new Date(operationsData.backupStatus.lastBackup).getTime()) / 3600000)}h ago` : 
                            "4h ago"
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Overall Status</span>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-success"></div>
                          <span className="text-xs font-medium text-success">Operational</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Administrative Activity */}
                <div className="aegis-card-glass p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <History className="w-5 h-5 text-primary" />
                      Recent Administrative Activity
                    </h3>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Filter className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={fetchUserManagement}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {userActivity.slice(0, 8).map((activity, index) => (
                      <div key={activity.id || index} className="flex items-center justify-between p-3 rounded-lg border bg-card/30 hover:bg-card/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.status === 'success' ? 'bg-success' : 
                            activity.status === 'warning' ? 'bg-warning' : 
                            activity.status === 'error' ? 'bg-destructive' : 'bg-primary'
                          }`} />
                          <div>
                            <p className="text-sm font-medium">{activity.user}</p>
                            <p className="text-xs text-muted-foreground">{activity.action}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground">
                            {activity.timestamp ? 
                              new Date(activity.timestamp).toLocaleTimeString() : 
                              activity.time
                            }
                          </span>
                          {activity.ip && (
                            <p className="text-xs text-muted-foreground">{activity.ip}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex justify-center">
                    <Button variant="outline" size="sm">
                      <History className="w-4 h-4 mr-2" />
                      View Full Activity Log
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="users" className="space-y-6">
                {/* User Overview Statistics */}
                <div className="grid grid-cols-5 gap-4">
                  <div className="aegis-kpi p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">{userManagement?.totalUsers || 247}</p>
                        <p className="text-xs text-muted-foreground">Total Users</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-success">↑ 5</span>
                      <span className="text-xs text-muted-foreground">this week</span>
                    </div>
                  </div>
                  
                  <div className="aegis-kpi p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-8 h-8 text-success" />
                      <div>
                        <p className="text-2xl font-bold text-success">{userManagement?.activeUsers || 198}</p>
                        <p className="text-xs text-muted-foreground">Active Now</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                      <span className="text-xs text-success">Live</span>
                    </div>
                  </div>
                  
                  <div className="aegis-kpi p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-8 h-8 text-warning" />
                      <div>
                        <p className="text-2xl font-bold text-warning">{userManagement?.pendingApprovals || 12}</p>
                        <p className="text-xs text-muted-foreground">Pending Approval</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs h-6 p-1 mt-1"
                      onClick={() => approveUser('batch')}
                      disabled={loadingStates.users}
                    >
                      Approve All
                    </Button>
                  </div>
                  
                  <div className="aegis-kpi p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <UserX className="w-8 h-8 text-destructive" />
                      <div>
                        <p className="text-2xl font-bold text-destructive">{userManagement?.lockedAccounts || 3}</p>
                        <p className="text-xs text-muted-foreground">Locked Accounts</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs h-6 p-1 mt-1"
                    >
                      Review
                    </Button>
                  </div>
                  
                  <div className="aegis-kpi p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">{userManagement?.newRegistrations || 8}</p>
                        <p className="text-xs text-muted-foreground">New Today</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {userManagement?.lastLogin ? 
                        `Last: ${new Date(userManagement.lastLogin).toLocaleTimeString()}` : 
                        "Last: 2m ago"
                      }
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Advanced User Management */}
                  <div className="aegis-card-glass p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Key className="w-5 h-5 text-primary" />
                        Access Control & Security
                      </h3>
                      <Button variant="ghost" size="sm">
                        <Cog className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Multi-Factor Authentication</Label>
                          <p className="text-xs text-muted-foreground">Enforce MFA for all administrative users</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Auto-lock Inactive Accounts</Label>
                          <p className="text-xs text-muted-foreground">Lock accounts after 90 days of inactivity</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Password Complexity Rules</Label>
                          <p className="text-xs text-muted-foreground">Enforce strong password requirements</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">IP Address Restrictions</Label>
                          <p className="text-xs text-muted-foreground">Limit access to approved IP ranges</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Session Timeout</Label>
                          <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
                        </div>
                        <Select defaultValue="30">
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15m</SelectItem>
                            <SelectItem value="30">30m</SelectItem>
                            <SelectItem value="60">1h</SelectItem>
                            <SelectItem value="120">2h</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Role & Permission Management */}
                  <div className="aegis-card-glass p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Role & Permission Templates
                      </h3>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border bg-card/30 hover:bg-card/50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Heart className="w-5 h-5 text-success" />
                            <div>
                              <p className="text-sm font-medium">Clinical Staff</p>
                              <p className="text-xs text-muted-foreground">Full patient care access</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">147 users</Badge>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-card/30 hover:bg-card/50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Building className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm font-medium">Administrative</p>
                              <p className="text-xs text-muted-foreground">Operations & management</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">23 users</Badge>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-card/30 hover:bg-card/50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Eye className="w-5 h-5 text-warning" />
                            <div>
                              <p className="text-sm font-medium">Read-Only Observer</p>
                              <p className="text-xs text-muted-foreground">View-only access</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">12 users</Badge>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-card/30 hover:bg-card/50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Crown className="w-5 h-5 text-warning" />
                            <div>
                              <p className="text-sm font-medium">Senior Manager</p>
                              <p className="text-xs text-muted-foreground">Full system access</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">8 users</Badge>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-card/30 hover:bg-card/50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Bug className="w-5 h-5 text-destructive" />
                            <div>
                              <p className="text-sm font-medium">System Administrator</p>
                              <p className="text-xs text-muted-foreground">Technical maintenance</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="destructive" className="text-xs">3 users</Badge>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Custom Role
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Advanced User Operations */}
                <div className="grid grid-cols-3 gap-6">
                  {/* Bulk Operations */}
                  <div className="aegis-card-glass p-6 rounded-lg">
                    <h3 className="font-semibold flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-primary" />
                      Bulk Operations
                    </h3>
                    
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => bulkImportUsers([])}
                        disabled={loadingStates.users}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Import Users from CSV
                      </Button>
                      
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Export User Data
                      </Button>
                      
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync Active Directory
                      </Button>
                      
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Bulk Notifications
                      </Button>
                      
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Lock className="w-4 h-4 mr-2" />
                        Bulk Password Reset
                      </Button>
                    </div>
                  </div>

                  {/* User Activity Monitoring */}
                  <div className="aegis-card-glass p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        Live Activity
                      </h3>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                        <span className="text-xs text-success">Live</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {userActivity.slice(0, 6).map((activity, index) => (
                        <div key={activity.id || index} className="flex items-center gap-3 p-2 rounded border bg-card/20">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.status === 'success' ? 'bg-success' : 
                            activity.status === 'warning' ? 'bg-warning' : 
                            activity.status === 'error' ? 'bg-destructive' : 'bg-primary'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{activity.user}</p>
                            <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {activity.timestamp ? 
                              new Date(activity.timestamp).toLocaleTimeString().slice(0, 5) : 
                              activity.time?.split(' ')[0]
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t">
                      <Button variant="ghost" size="sm" className="w-full text-xs">
                        View Full Activity Log
                      </Button>
                    </div>
                  </div>

                  {/* Quick User Actions */}
                  <div className="aegis-card-glass p-6 rounded-lg">
                    <h3 className="font-semibold flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-primary" />
                      Quick Actions
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border bg-warning/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Pending Approvals</span>
                          <Badge variant="outline" className="text-xs">
                            {userManagement?.pendingApprovals || 12}
                          </Badge>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full h-8"
                          onClick={() => approveUser('batch')}
                          disabled={loadingStates.users}
                        >
                          {loadingStates.users ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <UserCheck className="w-4 h-4 mr-2" />
                              Approve All
                            </>
                          )}
                        </Button>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-destructive/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Locked Accounts</span>
                          <Badge variant="outline" className="text-xs">
                            {userManagement?.lockedAccounts || 3}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm" className="w-full h-8">
                          <UserX className="w-4 h-4 mr-2" />
                          Review Locks
                        </Button>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-primary/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Password Resets</span>
                          <Badge variant="outline" className="text-xs">5</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="w-full h-8">
                          <Key className="w-4 h-4 mr-2" />
                          Process Resets
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="ghost" size="sm" className="w-full">
                        <Search className="w-4 h-4 mr-2" />
                        Advanced User Search
                      </Button>
                    </div>
                  </div>
                </div>

                {/* User Directory Search & Management */}
                <div className="aegis-card-glass p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Search className="w-5 h-5 text-primary" />
                      User Directory Management
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          placeholder="Search users..."
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <SortAsc className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 p-3 border-b">
                      <div className="grid grid-cols-6 gap-4 text-xs font-medium text-muted-foreground">
                        <span>User</span>
                        <span>Role</span>
                        <span>Last Active</span>
                        <span>Status</span>
                        <span>Location</span>
                        <span>Actions</span>
                      </div>
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto">
                      {userActivity.slice(0, 10).map((user, index) => (
                        <div key={user.id || index} className="grid grid-cols-6 gap-4 p-3 border-b hover:bg-muted/30 items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                              {user.user?.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <span className="text-sm font-medium">{user.user}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Clinical Staff</span>
                          <span className="text-xs text-muted-foreground">
                            {user.timestamp ? 
                              new Date(user.timestamp).toLocaleTimeString() : 
                              user.time
                            }
                          </span>
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${
                              user.status === 'success' ? 'bg-success' : 
                              user.status === 'warning' ? 'bg-warning' : 
                              user.status === 'error' ? 'bg-destructive' : 'bg-primary'
                            }`} />
                            <span className="text-xs capitalize">{user.status}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{user.location || user.ip}</span>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">
                      Showing 10 of {userManagement?.totalUsers || 247} users
                    </span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Previous</Button>
                      <Button variant="outline" size="sm">Next</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="monitoring" className="space-y-6">
                {/* Performance Dashboard Header */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="aegis-kpi p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">CPU Load</p>
                        <p className="text-2xl font-bold" style={{
                          color: (realtimeMetrics?.cpu || systemStatus?.serverLoad || 67) > 80 ? 'rgb(239, 68, 68)' : 
                                 (realtimeMetrics?.cpu || systemStatus?.serverLoad || 67) > 60 ? 'rgb(245, 158, 11)' : 
                                 'rgb(34, 197, 94)'
                        }}>
                          {realtimeMetrics?.cpu || systemStatus?.serverLoad || 67}%
                        </p>
                      </div>
                      <Cpu className="w-8 h-8" style={{
                        color: (realtimeMetrics?.cpu || systemStatus?.serverLoad || 67) > 80 ? 'rgb(239, 68, 68)' : 
                               (realtimeMetrics?.cpu || systemStatus?.serverLoad || 67) > 60 ? 'rgb(245, 158, 11)' : 
                               'rgb(34, 197, 94)'
                      }} />
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 mt-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300" 
                        style={{ 
                          width: `${realtimeMetrics?.cpu || systemStatus?.serverLoad || 67}%`,
                          backgroundColor: (realtimeMetrics?.cpu || systemStatus?.serverLoad || 67) > 80 ? 'rgb(239, 68, 68)' : 
                                         (realtimeMetrics?.cpu || systemStatus?.serverLoad || 67) > 60 ? 'rgb(245, 158, 11)' : 
                                         'rgb(34, 197, 94)'
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="aegis-kpi p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Memory</p>
                        <p className="text-2xl font-bold text-warning">
                          {realtimeMetrics?.memory || systemStatus?.memoryUsage || 54}%
                        </p>
                      </div>
                      <MemoryStick className="w-8 h-8 text-warning" />
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 mt-2">
                      <div 
                        className="bg-warning h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${realtimeMetrics?.memory || systemStatus?.memoryUsage || 54}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="aegis-kpi p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Disk Usage</p>
                        <p className="text-2xl font-bold text-destructive">
                          {realtimeMetrics?.disk || systemStatus?.diskSpace || 78}%
                        </p>
                      </div>
                      <HardDrive className="w-8 h-8 text-destructive" />
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 mt-2">
                      <div 
                        className="bg-destructive h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${realtimeMetrics?.disk || systemStatus?.diskSpace || 78}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="aegis-kpi p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Network</p>
                        <p className="text-2xl font-bold text-success">
                          {realtimeMetrics?.responseTime || `${systemStatus?.networkLatency || 45}ms`}
                        </p>
                      </div>
                      <Network className="w-8 h-8 text-success" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                      <span className="text-xs text-success">Optimal</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {/* Real-time System Metrics */}
                  <div className="aegis-card-glass p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Live Performance
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                        <span className="text-xs text-success">Real-time</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg border bg-card/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Requests/Second</span>
                          <span className="text-sm font-bold text-primary">
                            {realtimeMetrics?.requestsPerSecond || Math.floor(Math.random() * 200) + 100}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Peak today: {Math.floor(Math.random() * 100) + 250}
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-card/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Response Time</span>
                          <span className="text-sm font-bold text-success">
                            {realtimeMetrics?.responseTime || operationsData?.averageResponseTime || "1.2s"}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Avg 24h: 1.4s
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-card/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Throughput</span>
                          <span className="text-sm font-bold text-primary">
                            {realtimeMetrics?.throughput || `${(Math.random() * 5 + 15).toFixed(1)}MB/s`}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Data processed: {operationsData?.dataProcessed || "2.3TB"}
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-card/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Active Connections</span>
                          <span className="text-sm font-bold text-success">
                            {realtimeMetrics?.activeUsers || systemStatus?.activeConnections || 342}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Peak concurrent: {Math.floor(Math.random() * 100) + 400}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Health & Status */}
                  <div className="aegis-card-glass p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-primary" />
                        Service Health
                      </h3>
                      <Button variant="ghost" size="sm" onClick={runHealthCheck}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-success/10">
                        <div className="flex items-center gap-3">
                          <Database className="w-5 h-5 text-success" />
                          <div>
                            <p className="text-sm font-medium">Database Cluster</p>
                            <p className="text-xs text-muted-foreground">Primary + 2 replicas</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <CheckCircle className="w-4 h-4 text-success mb-1" />
                          <p className="text-xs text-muted-foreground">12ms</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-success/10">
                        <div className="flex items-center gap-3">
                          <Server className="w-5 h-5 text-success" />
                          <div>
                            <p className="text-sm font-medium">API Gateway</p>
                            <p className="text-xs text-muted-foreground">Load balanced</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <CheckCircle className="w-4 h-4 text-success mb-1" />
                          <p className="text-xs text-muted-foreground">8ms</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-success/10">
                        <div className="flex items-center gap-3">
                          <Archive className="w-5 h-5 text-success" />
                          <div>
                            <p className="text-sm font-medium">Cache Layer</p>
                            <p className="text-xs text-muted-foreground">Redis cluster</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <CheckCircle className="w-4 h-4 text-success mb-1" />
                          <p className="text-xs text-muted-foreground">3ms</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-warning/10">
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-warning" />
                          <div>
                            <p className="text-sm font-medium">Message Queue</p>
                            <p className="text-xs text-muted-foreground">Backup lag detected</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <AlertTriangle className="w-4 h-4 text-warning mb-1" />
                          <p className="text-xs text-muted-foreground">250ms</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-success/10">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-success" />
                          <div>
                            <p className="text-sm font-medium">Auth Service</p>
                            <p className="text-xs text-muted-foreground">OAuth + JWT</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <CheckCircle className="w-4 h-4 text-success mb-1" />
                          <p className="text-xs text-muted-foreground">9ms</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Alerts & Incidents */}
                  <div className="aegis-card-glass p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        System Alerts
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {(systemStatus?.securityAlerts || 0) + (systemStatus?.performanceAlerts || 0)} active
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      <div className="p-3 rounded-lg border bg-destructive/10">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">High Disk Usage</p>
                            <p className="text-xs text-muted-foreground">Database partition at 78% capacity</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-destructive font-medium">Critical</span>
                              <span className="text-xs text-muted-foreground">5 mins ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-warning/10">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Performance Degradation</p>
                            <p className="text-xs text-muted-foreground">API response time increased by 15%</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-warning font-medium">Warning</span>
                              <span className="text-xs text-muted-foreground">1 hour ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-warning/10">
                        <div className="flex items-start gap-3">
                          <Timer className="w-4 h-4 text-warning mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Queue Backup</p>
                            <p className="text-xs text-muted-foreground">Message processing delay detected</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-warning font-medium">Warning</span>
                              <span className="text-xs text-muted-foreground">2 hours ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-success/10">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Backup Completed</p>
                            <p className="text-xs text-muted-foreground">Daily backup completed successfully</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-success font-medium">Resolved</span>
                              <span className="text-xs text-muted-foreground">
                                {operationsData?.backupStatus?.lastBackup ? 
                                  new Date(operationsData.backupStatus.lastBackup).toLocaleTimeString() : 
                                  "4 hours ago"
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-primary/10">
                        <div className="flex items-start gap-3">
                          <Network className="w-4 h-4 text-primary mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Network Optimization</p>
                            <p className="text-xs text-muted-foreground">CDN cache refreshed automatically</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-primary font-medium">Info</span>
                              <span className="text-xs text-muted-foreground">6 hours ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm" className="w-full">
                        <History className="w-4 h-4 mr-2" />
                        View All Alerts
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Infrastructure Overview */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Resource Utilization */}
                  <div className="aegis-card-glass p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Resource Utilization
                      </h3>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Grid className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <LineChart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Application Servers</span>
                          <span className="text-sm text-muted-foreground">3 of 5 active</span>
                        </div>
                        <div className="grid grid-cols-5 gap-1">
                          <div className="h-8 bg-success rounded flex items-center justify-center text-xs font-bold text-white">1</div>
                          <div className="h-8 bg-success rounded flex items-center justify-center text-xs font-bold text-white">2</div>
                          <div className="h-8 bg-warning rounded flex items-center justify-center text-xs font-bold text-white">3</div>
                          <div className="h-8 bg-muted/30 rounded flex items-center justify-center text-xs text-muted-foreground">4</div>
                          <div className="h-8 bg-muted/30 rounded flex items-center justify-center text-xs text-muted-foreground">5</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Database Instances</span>
                          <span className="text-sm text-muted-foreground">Primary + 2 replicas</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="h-8 bg-success rounded flex items-center justify-center text-xs font-bold text-white">P</div>
                          <div className="h-8 bg-success rounded flex items-center justify-center text-xs font-bold text-white">R1</div>
                          <div className="h-8 bg-success rounded flex items-center justify-center text-xs font-bold text-white">R2</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Load Balancers</span>
                          <span className="text-sm text-muted-foreground">High availability</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="h-8 bg-success rounded flex items-center justify-center text-xs font-bold text-white">LB1</div>
                          <div className="h-8 bg-success rounded flex items-center justify-center text-xs font-bold text-white">LB2</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Analytics */}
                  <div className="aegis-card-glass p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-primary" />
                        Performance Analytics
                      </h3>
                      <Select defaultValue="1h">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1h">1h</SelectItem>
                          <SelectItem value="6h">6h</SelectItem>
                          <SelectItem value="24h">24h</SelectItem>
                          <SelectItem value="7d">7d</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg border bg-card/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">API Performance</span>
                          <span className="text-sm text-success">↑ 5.2%</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <p className="text-muted-foreground">Avg Response</p>
                            <p className="font-bold">{operationsData?.averageResponseTime || "1.2s"}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Throughput</p>
                            <p className="font-bold">{operationsData?.apiCalls?.toLocaleString() || "156,789"}/day</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-card/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Database Performance</span>
                          <span className="text-sm text-success">↑ 2.8%</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <p className="text-muted-foreground">Query Time</p>
                            <p className="font-bold">45ms</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Cache Hit</p>
                            <p className="font-bold">{operationsData?.cacheHitRate || 94.2}%</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border bg-card/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">User Experience</span>
                          <span className="text-sm text-success">↑ 8.1%</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <p className="text-muted-foreground">Page Load</p>
                            <p className="font-bold">2.1s</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Error Rate</p>
                            <p className="font-bold">{systemStatus?.errorRate || 0.02}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Monitoring Controls */}
                <div className="aegis-card-glass p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-primary" />
                      Monitoring & Diagnostics
                    </h3>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Metrics
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure Alerts
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-3">
                    <Button variant="outline" size="sm" onClick={runHealthCheck}>
                      <Monitor className="w-4 h-4 mr-2" />
                      Health Check
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Bug className="w-4 h-4 mr-2" />
                      Debug Mode
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <History className="w-4 h-4 mr-2" />
                      View Logs
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Metrics Dashboard
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Alert Rules
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Target className="w-4 h-4 mr-2" />
                      Performance Test
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-6">
                <div className="space-y-6">
                  {/* Compliance Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">GDPR Compliance</p>
                          <p className="text-2xl font-bold text-success">{complianceData?.gdprCompliance || "97.8"}%</p>
                        </div>
                        <Scale className="w-8 h-8 text-success" />
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">HIPAA Compliance</p>
                          <p className="text-2xl font-bold text-success">{complianceData?.hipaaCompliance || "99.2"}%</p>
                        </div>
                        <Heart className="w-8 h-8 text-success" />
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Overall Score</p>
                          <p className="text-2xl font-bold text-primary">{complianceData?.complianceScore || complianceData?.overallScore || "97.8"}%</p>
                        </div>
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Audit Information */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Audit Management
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
                          <span className="text-sm font-medium">Total Audit Logs</span>
                          <span className="text-sm font-bold">{complianceData?.auditLogs?.toLocaleString() || "145,672"}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
                          <span className="text-sm font-medium">Last Audit</span>
                          <span className="text-sm font-bold">{complianceData?.lastAudit || "2024-01-15"}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
                          <span className="text-sm font-medium">Next Audit</span>
                          <span className="text-sm font-bold">{complianceData?.nextAudit || "2024-04-15"}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
                          <span className="text-sm font-medium">Risk Level</span>
                          <span className="text-sm font-bold text-success">{complianceData?.riskLevel || "Low"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Clipboard className="w-5 h-5 text-primary" />
                        Action Items
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-warning/10">
                          <div>
                            <p className="text-sm font-medium">Update Privacy Policy</p>
                            <p className="text-xs text-muted-foreground">Due in 15 days</p>
                          </div>
                          <span className="text-xs font-bold text-warning">High</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-primary/10">
                          <div>
                            <p className="text-sm font-medium">Review Data Retention</p>
                            <p className="text-xs text-muted-foreground">Due in 30 days</p>
                          </div>
                          <span className="text-xs font-bold text-primary">Medium</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-success/10">
                          <div>
                            <p className="text-sm font-medium">Staff Training Complete</p>
                            <p className="text-xs text-muted-foreground">97% completion</p>
                          </div>
                          <span className="text-xs font-bold text-success">Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Compliance Actions */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Compliance Actions
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Audit Report
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Assessment
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Run Compliance Check
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="operations" className="space-y-6">
                <div className="space-y-6">
                  {/* Operational Metrics */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Daily Transactions</p>
                          <p className="text-xl font-bold">{operationsData?.dailyTransactions?.toLocaleString() || "8,457"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-warning" />
                        <div>
                          <p className="text-sm font-medium">System Errors</p>
                          <p className="text-xl font-bold text-warning">{operationsData?.systemErrors || 23}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center gap-2">
                        <Database className="w-6 h-6 text-success" />
                        <div>
                          <p className="text-sm font-medium">Data Processed</p>
                          <p className="text-xl font-bold">{operationsData?.dataProcessed || "2.3TB"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center gap-2">
                        <Timer className="w-6 h-6 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Avg Response</p>
                          <p className="text-xl font-bold">{operationsData?.averageResponseTime || "1.2s"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scheduled Tasks */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Scheduled Tasks
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-success/10">
                          <span className="text-sm font-medium">Completed</span>
                          <span className="text-sm font-bold text-success">{operationsData?.scheduledTasks?.completed || 245}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-destructive/10">
                          <span className="text-sm font-medium">Failed</span>
                          <span className="text-sm font-bold text-destructive">{operationsData?.scheduledTasks?.failed || 2}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-warning/10">
                          <span className="text-sm font-medium">Pending</span>
                          <span className="text-sm font-bold text-warning">{operationsData?.scheduledTasks?.pending || 18}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        API Performance
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
                          <span className="text-sm font-medium">Total API Calls</span>
                          <span className="text-sm font-bold">{operationsData?.apiCalls?.toLocaleString() || "156,789"}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
                          <span className="text-sm font-medium">Cache Hit Rate</span>
                          <span className="text-sm font-bold text-success">{operationsData?.cacheHitRate || 94.2}%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-card/30">
                          <span className="text-sm font-medium">Error Rate</span>
                          <span className="text-sm font-bold text-success">{systemMonitoring?.errorRate || systemStatus?.errorRate || 0.02}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Controls */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      System Operations
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Restart Services
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Force Backup
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Cache
                      </Button>
                      <Button variant="outline" size="sm">
                        <Monitor className="w-4 h-4 mr-2" />
                        Health Check
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <div className="space-y-6">
                  {/* Security Status */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Active Sessions</p>
                          <p className="text-2xl font-bold">{systemMonitoring?.activeConnections || 456}</p>
                        </div>
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Security Alerts</p>
                          <p className="text-2xl font-bold text-warning">{systemMonitoring?.securityAlerts || securityData?.alertsCount || 3}</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-warning" />
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Security Score</p>
                          <p className="text-2xl font-bold text-success">98.5%</p>
                        </div>
                        <Shield className="w-8 h-8 text-success" />
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary" />
                        Authentication Settings
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">Enforce MFA</Label>
                            <p className="text-xs text-muted-foreground">Require two-factor authentication</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">Session Timeout</Label>
                            <p className="text-xs text-muted-foreground">Auto logout after inactivity</p>
                          </div>
                          <Select defaultValue="30">
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15m</SelectItem>
                              <SelectItem value="30">30m</SelectItem>
                              <SelectItem value="60">1h</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">IP Restriction</Label>
                            <p className="text-xs text-muted-foreground">Limit access by IP address</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Eye className="w-5 h-5 text-primary" />
                        Monitoring & Logging
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">Audit Logging</Label>
                            <p className="text-xs text-muted-foreground">Log all user actions</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">Failed Login Alerts</Label>
                            <p className="text-xs text-muted-foreground">Alert on failed attempts</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">Real-time Monitoring</Label>
                            <p className="text-xs text-muted-foreground">Live security monitoring</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Actions */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Security Operations
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Security Log
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Security Scan
                      </Button>
                      <Button variant="outline" size="sm">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        View Threats
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div className="space-y-6">
                  {/* Appearance Settings */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Palette className="w-5 h-5 text-primary" />
                      Appearance & Theme
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Theme Selection</Label>
                          <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <SimpleThemeSwitcher />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Dark Mode</Label>
                          <p className="text-xs text-muted-foreground">Use dark theme variant</p>
                        </div>
                        <Switch 
                          checked={settings.darkMode}
                          onCheckedChange={(checked) => handleSettingChange('general', 'darkMode', checked)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Bell className="w-5 h-5 text-primary" />
                      Notifications & Alerts
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Email Notifications</Label>
                          <p className="text-xs text-muted-foreground">Receive updates via email</p>
                        </div>
                        <Switch 
                          checked={settings.notifications.email}
                          onCheckedChange={(checked) => handleSettingChange('notifications', 'email', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Push Notifications</Label>
                          <p className="text-xs text-muted-foreground">Browser push notifications</p>
                        </div>
                        <Switch 
                          checked={settings.notifications.push}
                          onCheckedChange={(checked) => handleSettingChange('notifications', 'push', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Sound Alerts</Label>
                          <p className="text-xs text-muted-foreground">Play sound for notifications</p>
                        </div>
                        <Switch 
                          checked={settings.notifications.sound}
                          onCheckedChange={(checked) => handleSettingChange('notifications', 'sound', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Desktop Notifications</Label>
                          <p className="text-xs text-muted-foreground">Show desktop notifications</p>
                        </div>
                        <Switch 
                          checked={settings.notifications.desktop}
                          onCheckedChange={(checked) => handleSettingChange('notifications', 'desktop', checked)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Accessibility Settings */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Eye className="w-5 h-5 text-primary" />
                      Accessibility Options
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Reduced Motion</Label>
                          <p className="text-xs text-muted-foreground">Minimize animations</p>
                        </div>
                        <Switch 
                          checked={settings.accessibility.reducedMotion}
                          onCheckedChange={(checked) => handleSettingChange('accessibility', 'reducedMotion', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">High Contrast</Label>
                          <p className="text-xs text-muted-foreground">Enhanced visual contrast</p>
                        </div>
                        <Switch 
                          checked={settings.accessibility.highContrast}
                          onCheckedChange={(checked) => handleSettingChange('accessibility', 'highContrast', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Color Blind Mode</Label>
                          <p className="text-xs text-muted-foreground">Enhanced color accessibility</p>
                        </div>
                        <Switch 
                          checked={settings.accessibility.colorBlindMode}
                          onCheckedChange={(checked) => handleSettingChange('accessibility', 'colorBlindMode', checked)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Font Size</Label>
                        <Slider
                          value={[settings.accessibility.fontSize]}
                          onValueChange={([value]) => handleSettingChange('accessibility', 'fontSize', value)}
                          max={18}
                          min={12}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>12px</span>
                          <span>{settings.accessibility.fontSize}px</span>
                          <span>18px</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Settings */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      System Configuration
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Auto Save</Label>
                          <p className="text-xs text-muted-foreground">Automatically save changes</p>
                        </div>
                        <Switch 
                          checked={settings.advanced.autoSave}
                          onCheckedChange={(checked) => handleSettingChange('advanced', 'autoSave', checked)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Session Timeout</Label>
                        <Select 
                          value={settings.advanced.sessionTimeout.toString()}
                          onValueChange={(value) => handleSettingChange('advanced', 'sessionTimeout', parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                            <SelectItem value="240">4 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Debug Mode</Label>
                          <p className="text-xs text-muted-foreground">Enable debug logging</p>
                        </div>
                        <Switch 
                          checked={settings.advanced.debugMode}
                          onCheckedChange={(checked) => handleSettingChange('advanced', 'debugMode', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Advanced Monitoring</Label>
                          <p className="text-xs text-muted-foreground">Enable detailed system monitoring</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Simple User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 px-2 hover:bg-primary/10"
            >
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xs bg-primary/20 text-primary font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium tracking-wide">{user.name}</p>
                <p className="text-xs text-primary font-medium">{user.role}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            align="end" 
            className="w-64 aegis-glass-panel border-0"
            sideOffset={8}
          >
            <DropdownMenuLabel className="flex items-center gap-3 p-3">
              <Avatar className="h-10 w-10 ring-2 ring-primary/30">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-sm bg-primary/20 text-primary font-bold">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-primary font-medium">{user.role}</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-border/20" />
            
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem 
                  className="flex items-center gap-3 p-3 cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  <User className="h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] aegis-glass-panel border-0">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-foreground">
                    <User2 className="w-5 h-5" />
                    Profile Settings
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Update your profile information and preferences
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 ring-2 ring-primary/30">
                      <AvatarImage src={profileData.avatar} alt={profileData.name} />
                      <AvatarFallback className="text-lg bg-primary/20 text-primary font-bold">
                        {profileData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <User className="w-4 h-4 mr-2" />
                        Change Avatar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                      <Input 
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!profileEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                      <Input 
                        id="role"
                        value={profileData.role}
                        onChange={(e) => setProfileData(prev => ({ ...prev, role: e.target.value }))}
                        disabled={!profileEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!profileEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                      <Input 
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!profileEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                      <Input 
                        id="department"
                        value={profileData.department}
                        onChange={(e) => setProfileData(prev => ({ ...prev, department: e.target.value }))}
                        disabled={!profileEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                      <Input 
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!profileEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                    <Textarea 
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!profileEditing}
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    {profileEditing ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setProfileEditing(false)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                        <Button 
                          size="sm"
                          onClick={handleProfileSave}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => setProfileEditing(true)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <DropdownMenuItem 
              className="flex items-center gap-3 p-3 cursor-pointer"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="h-4 w-4" />
              <span>Preferences</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-border/20" />
            
            <DropdownMenuItem 
              className="flex items-center gap-3 p-3 cursor-pointer text-destructive hover:bg-destructive/10"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}