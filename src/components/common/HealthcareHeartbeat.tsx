import React from 'react';

interface HealthcareHeartbeatProps {
  type: 'vital' | 'urgent' | 'critical' | 'medication' | 'observation' | 'wellness';
  intensity?: 'low' | 'medium' | 'high';
  children: React.ReactNode;
  className?: string;
}

/**
 * AEGIS Healthcare Heartbeat Component
 * 
 * Provides contextual heartbeat/pulse effects for healthcare elements:
 * - vital: Steady cardiac rhythm for life signs
 * - urgent: Accelerated pulse for priority cases
 * - critical: Rapid emergency pulse for high-risk situations
 * - medication: Rhythmic dosing pulse for eMAR
 * - observation: Gentle monitoring rhythm for vitals
 * - wellness: Calm, peaceful pulse for positive metrics
 */
export function HealthcareHeartbeat({ 
  type, 
  intensity = 'medium', 
  children, 
  className = '' 
}: HealthcareHeartbeatProps) {
  
  const getHeartbeatClass = () => {
    const baseClass = 'healthcare-heartbeat';
    const typeClass = `heartbeat-${type}`;
    const intensityClass = `intensity-${intensity}`;
    
    return `${baseClass} ${typeClass} ${intensityClass}`;
  };

  return (
    <div className={`${getHeartbeatClass()} ${className}`}>
      {children}
    </div>
  );
}

interface VitalSignsProps {
  value: string | number;
  label: string;
  status: 'normal' | 'warning' | 'critical';
  unit?: string;
}

/**
 * Specialized component for vital signs with contextual heartbeat
 */
export function VitalSignPulse({ value, label, status, unit = '' }: VitalSignsProps) {
  const getStatusHeartbeat = () => {
    switch (status) {
      case 'critical': return 'critical';
      case 'warning': return 'urgent'; 
      case 'normal': return 'vital';
      default: return 'vital';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'text-red-400 border-red-400/30';
      case 'warning': return 'text-yellow-400 border-yellow-400/30';
      case 'normal': return 'text-green-400 border-green-400/30';
      default: return 'text-green-400 border-green-400/30';
    }
  };

  return (
    <HealthcareHeartbeat 
      type={getStatusHeartbeat() as any} 
      intensity={status === 'critical' ? 'high' : status === 'warning' ? 'medium' : 'low'}
      className={`relative p-4 rounded-lg border backdrop-blur-sm ${getStatusColor()}`}
    >
      <div className="text-center">
        <div className="text-2xl font-bold">{value}{unit}</div>
        <div className="text-xs text-muted-foreground mt-1">{label}</div>
      </div>
      
      {/* Heartbeat visualization overlay */}
      {status !== 'normal' && (
        <div className="absolute top-2 right-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'critical' ? 'bg-red-400' : 'bg-yellow-400'
          } healthcare-heartbeat-indicator`}></div>
        </div>
      )}
    </HealthcareHeartbeat>
  );
}

interface MedicationAlertProps {
  isDue: boolean;
  isOverdue: boolean;
  children: React.ReactNode;
}

/**
 * Medication timing heartbeat for eMAR alerts
 */
export function MedicationPulse({ isDue, isOverdue, children }: MedicationAlertProps) {
  const getMedicationType = () => {
    if (isOverdue) return 'critical';
    if (isDue) return 'urgent';
    return 'medication';
  };

  const getIntensity = () => {
    if (isOverdue) return 'high';
    if (isDue) return 'medium';
    return 'low';
  };

  return (
    <HealthcareHeartbeat 
      type={getMedicationType() as any}
      intensity={getIntensity() as any}
    >
      {children}
    </HealthcareHeartbeat>
  );
}