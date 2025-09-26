'use client';

import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  AlertTriangle,
  Activity,
  Clock,
  CheckCircle
} from 'lucide-react';

// Mock data
const kpis = [
  { label: 'Active Clients', value: '156', change: '+3', trend: 'up' },
  { label: 'Staff on Duty', value: '89', change: '-2', trend: 'down' },
  { label: 'Occupancy Rate', value: '94%', change: '+1.2%', trend: 'up' },
  { label: 'Today\'s Tasks', value: '23', change: '5 pending', trend: 'neutral' }
];

const alerts = [
  { id: 1, type: 'warning', title: 'Medication Due', message: 'John Smith - 2:00 PM', time: '5 min ago' },
  { id: 2, type: 'info', title: 'Staff Check-in', message: 'Sarah Johnson arrived', time: '12 min ago' },
  { id: 3, type: 'error', title: 'System Alert', message: 'Backup completed with warnings', time: '1 hour ago' }
];

const tasks = [
  { id: 1, title: 'Weekly Medication Audit', assignee: 'Clinical Lead', due: '2:00 PM', status: 'pending' },
  { id: 2, title: 'Staff Rota Review', assignee: 'HR Manager', due: '3:30 PM', status: 'in-progress' },
  { id: 3, title: 'Quality Assessment', assignee: 'Quality Lead', due: '4:00 PM', status: 'completed' },
  { id: 4, title: 'Family Meeting Prep', assignee: 'Care Coordinator', due: '5:00 PM', status: 'pending' }
];

export default function TodayPage() {
  return (
    <motion.div 
      className="p-6 space-y-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Today's Overview</h1>
          <p className="text-[var(--surface-7)] mt-1">
            Executive dashboard for {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-[var(--surface-7)] font-mono">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">All systems operational</span>
          </div>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="aegis-card p-6 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="space-y-2">
              <div className="text-sm text-[var(--surface-7)]">{kpi.label}</div>
              <div className="text-3xl font-bold">{kpi.value}</div>
              <div className={`text-sm flex items-center gap-1 ${
                kpi.trend === 'up' ? 'text-green-400' : 
                kpi.trend === 'down' ? 'text-red-400' : 
                'text-[var(--surface-7)]'
              }`}>
                {kpi.trend === 'up' && <TrendingUp size={14} />}
                {kpi.trend === 'down' && <TrendingUp size={14} className="rotate-180" />}
                <span>{kpi.change}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <motion.div 
          className="aegis-card p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-[var(--accent)]" />
            Recent Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex gap-3 p-3 rounded-lg bg-[var(--surface-1)] border border-[var(--surface-3)]">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'error' ? 'bg-red-400' :
                  alert.type === 'warning' ? 'bg-yellow-400' :
                  'bg-blue-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{alert.title}</div>
                  <div className="text-sm text-[var(--surface-7)]">{alert.message}</div>
                  <div className="text-xs text-[var(--surface-6)] mt-1">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Today's Tasks */}
        <motion.div 
          className="aegis-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-[var(--accent)]" />
            Today's Priority Tasks
          </h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-1)] border border-[var(--surface-3)]">
                <div className={`w-3 h-3 rounded-full ${
                  task.status === 'completed' ? 'bg-green-400' :
                  task.status === 'in-progress' ? 'bg-yellow-400' :
                  'bg-[var(--surface-5)]'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{task.title}</div>
                  <div className="text-xs text-[var(--surface-7)]">
                    {task.assignee} • Due {task.due}
                  </div>
                </div>
                {task.status === 'completed' && (
                  <CheckCircle size={16} className="text-green-400" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="aegis-card p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Activity size={20} className="text-[var(--accent)]" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full aegis-button text-left p-3 flex items-center gap-3">
              <Users size={16} />
              <div>
                <div className="font-medium text-sm">Staff Check-In</div>
                <div className="text-xs text-[var(--surface-7)]">View who's on duty</div>
              </div>
            </button>
            
            <button className="w-full aegis-button text-left p-3 flex items-center gap-3">
              <Clock size={16} />
              <div>
                <div className="font-medium text-sm">Medication Round</div>
                <div className="text-xs text-[var(--surface-7)]">Start today's eMAR</div>
              </div>
            </button>
            
            <button className="w-full aegis-button text-left p-3 flex items-center gap-3">
              <Calendar size={16} />
              <div>
                <div className="font-medium text-sm">Schedule Meeting</div>
                <div className="text-xs text-[var(--surface-7)]">Book with families</div>
              </div>
            </button>
            
            <button className="w-full aegis-button text-left p-3 flex items-center gap-3">
              <TrendingUp size={16} />
              <div>
                <div className="font-medium text-sm">Generate Report</div>
                <div className="text-xs text-[var(--surface-7)]">Weekly analytics</div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div 
        className="aegis-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Activity size={20} className="text-[var(--accent)]" />
          System Health Monitor
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-400">99.9%</div>
            <div className="text-sm text-[var(--surface-7)]">Uptime</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-400">47ms</div>
            <div className="text-sm text-[var(--surface-7)]">Response Time</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-yellow-400">73%</div>
            <div className="text-sm text-[var(--surface-7)]">Memory Usage</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-400">156</div>
            <div className="text-sm text-[var(--surface-7)]">Active Users</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}