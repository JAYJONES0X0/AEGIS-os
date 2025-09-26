import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, AlertTriangle, CheckCircle, Info, Zap, Heart, Users, Calendar, FileText, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface Notification {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  source: string;
  category: 'clinical' | 'operational' | 'financial' | 'system' | 'workforce';
  priority: 'high' | 'medium' | 'low';
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'default' | 'destructive' | 'outline';
  }>;
  read: boolean;
}

interface RealTimeNotificationSystemProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function RealTimeNotificationSystem({ isOpen, onToggle }: RealTimeNotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulate real-time notifications
  useEffect(() => {
    const notificationTypes = [
      {
        type: 'critical' as const,
        title: 'Critical Patient Alert',
        message: 'Margaret Thompson requires immediate attention - vital signs abnormal',
        source: 'Healthcare System',
        category: 'clinical' as const,
        priority: 'high' as const,
        actions: [
          { label: 'View Patient', action: () => toast.info('Opening patient record') },
          { label: 'Call Team', action: () => toast.success('Medical team alerted') }
        ]
      },
      {
        type: 'warning' as const,
        title: 'Medication Due',
        message: '8 medications are due for administration in the next hour',
        source: 'eMAR System',
        category: 'clinical' as const,
        priority: 'medium' as const,
        actions: [
          { label: 'View Schedule', action: () => toast.info('Opening medication schedule') }
        ]
      },
      {
        type: 'info' as const,
        title: 'Staff Shift Change',
        message: 'Evening shift handover scheduled in 30 minutes',
        source: 'Workforce Management',
        category: 'workforce' as const,
        priority: 'medium' as const
      },
      {
        type: 'success' as const,
        title: 'Quality Audit Complete',
        message: 'Monthly quality audit completed with 98% compliance rate',
        source: 'Quality System',
        category: 'operational' as const,
        priority: 'low' as const
      }
    ];

    const interval = setInterval(() => {
      const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const newNotification: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        ...randomNotification,
        timestamp: new Date(),
        read: false
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Keep last 20
      setUnreadCount(prev => prev + 1);

      // Show system toast for critical notifications
      if (randomNotification.type === 'critical') {
        toast.error(randomNotification.title, {
          description: randomNotification.message,
          duration: 8000
        });
      }
    }, 12000); // New notification every 12 seconds

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-success" />;
      default: return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'clinical': return <Heart className="w-3 h-3" />;
      case 'workforce': return <Users className="w-3 h-3" />;
      case 'operational': return <Zap className="w-3 h-3" />;
      case 'financial': return <FileText className="w-3 h-3" />;
      default: return <Bell className="w-3 h-3" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const filteredNotifications = notifications.filter(notif => 
    filter === 'all' || notif.category === filter
  );

  return (
    <>
      {/* Notification Bell Button */}
      <motion.div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggle}
          className="relative aegis-ceremonial-hover"
          style={{
            background: 'rgba(18, 22, 28, 0.8)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-xs text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </Button>
      </motion.div>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-16 right-4 w-96 z-50"
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 20, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card 
              className="overflow-hidden"
              style={{
                background: 'rgba(18, 22, 28, 0.95)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '16px',
                boxShadow: 'inset 0 1px 0 rgba(212, 175, 55, 0.2), 0 8px 32px rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(16px)'
              }}
            >
              {/* Header */}
              <div className="p-4 border-b border-border/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                      <p className="text-xs text-muted-foreground">
                        {unreadCount} unread
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={markAllAsRead}
                        className="text-xs h-6 px-2"
                      >
                        Mark all read
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={onToggle}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 mt-3">
                  {['all', 'clinical', 'operational', 'workforce', 'financial'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilter(category)}
                      className={`px-2 py-1 rounded-full text-xs transition-colors ${
                        filter === category 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notifications List */}
              <ScrollArea className="h-96">
                <div className="p-2">
                  {filteredNotifications.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredNotifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          className={`p-3 rounded-lg transition-all cursor-pointer ${
                            !notification.read 
                              ? 'bg-primary/5 border border-primary/20' 
                              : 'bg-muted/20 hover:bg-muted/30'
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {getIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm text-foreground truncate">
                                    {notification.title}
                                  </span>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                  )}
                                </div>
                                <div className="flex items-center gap-1">
                                  {getCategoryIcon(notification.category)}
                                  <span className="text-xs text-muted-foreground">
                                    {notification.timestamp.toLocaleTimeString([], { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" size="sm" className="text-xs">
                                    {notification.source}
                                  </Badge>
                                  <Badge 
                                    variant={notification.priority === 'high' ? 'destructive' : 'secondary'} 
                                    size="sm" 
                                    className="text-xs"
                                  >
                                    {notification.priority}
                                  </Badge>
                                </div>
                                {notification.actions && (
                                  <div className="flex items-center gap-1">
                                    {notification.actions.map((action, actionIndex) => (
                                      <Button
                                        key={actionIndex}
                                        variant={action.variant || 'outline'}
                                        size="sm"
                                        className="h-6 px-2 text-xs"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          action.action();
                                        }}
                                      >
                                        {action.label}
                                      </Button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}