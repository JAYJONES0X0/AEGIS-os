import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Clock, User, MapPin, ChevronLeft, ChevronRight, 
  Plus, Settings, Filter, Search, MoreVertical, AlertTriangle,
  CheckCircle, Edit3, Trash2, Copy, Share2
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { mockStaffProfiles } from '../../lib/expanded-mock-data';

interface RotaSchedulerProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

interface ShiftBlock {
  id: string;
  staffId: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'regular' | 'break' | 'meeting' | 'training' | 'overtime';
  status: 'confirmed' | 'pending' | 'cancelled';
  clientId?: string;
  notes?: string;
  color: string;
}

// Simplified without drag and drop for now to prevent timeout issues

// Time slots configuration (7:00 AM to 11:00 PM)
const timeSlots = Array.from({ length: 17 }, (_, i) => {
  const hour = i + 7;
  return {
    time: `${hour.toString().padStart(2, '0')}:00`,
    label: hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`
  };
});

// Sample shift data with AEGIS styling
const initialShifts: ShiftBlock[] = [
  {
    id: 'shift_1',
    staffId: 'staff_001',
    startTime: '08:00',
    endTime: '16:00',
    location: 'Hazelbury House',
    type: 'regular',
    status: 'confirmed',
    clientId: 'client_001',
    notes: 'Regular care duties',
    color: '#3B82F6'
  },
  {
    id: 'shift_2', 
    staffId: 'staff_002',
    startTime: '14:00',
    endTime: '22:00',
    location: 'Station House',
    type: 'regular',
    status: 'confirmed',
    clientId: 'client_002',
    notes: 'Evening care',
    color: '#10B981'
  },
  {
    id: 'shift_3',
    staffId: 'staff_001',
    startTime: '12:00',
    endTime: '13:00',
    location: 'Hazelbury House',
    type: 'break',
    status: 'confirmed',
    notes: 'Lunch break',
    color: '#F59E0B'
  },
  {
    id: 'shift_4',
    staffId: 'staff_003',
    startTime: '22:00',
    endTime: '07:00',
    location: 'Newton House',
    type: 'regular',
    status: 'pending',
    clientId: 'client_003',
    notes: 'Night shift',
    color: '#8B5CF6'
  }
];

const ShiftBlockComponent: React.FC<{ 
  shift: ShiftBlock; 
  staffId: string;
  onEdit: (shift: ShiftBlock) => void;
  onDelete: (shiftId: string) => void;
}> = ({ shift, staffId, onEdit, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);

  const getShiftWidth = () => {
    const start = parseInt(shift.startTime.split(':')[0]);
    const end = parseInt(shift.endTime.split(':')[0]);
    let duration = end - start;
    
    // Handle overnight shifts
    if (duration <= 0) {
      duration = (24 - start) + end;
    }
    
    return Math.max(duration * 60, 80); // Minimum 80px width
  };

  const getShiftPosition = () => {
    const startHour = parseInt(shift.startTime.split(':')[0]);
    const startMinute = parseInt(shift.startTime.split(':')[1]);
    return ((startHour - 7) * 60) + startMinute + (startHour >= 7 ? 0 : 17 * 60);
  };

  return (
    <motion.div
      className={`absolute h-12 rounded-lg border-2 cursor-move aegis-ceremonial-hover group ${
        isDragging ? 'opacity-50 z-50' : 'z-10'
      }`}
      style={{
        left: `${getShiftPosition()}px`,
        width: `${getShiftWidth()}px`,
        backgroundColor: shift.color + '20',
        borderColor: shift.color,
        borderStyle: shift.status === 'pending' ? 'dashed' : 'solid'
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileDrag={{ scale: 1.05, rotate: 2 }}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <div className="relative h-full flex items-center justify-between px-3 text-sm">
        <div className="flex-1 min-w-0">
          <div className="font-medium text-foreground truncate">
            {shift.startTime} - {shift.endTime}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {shift.location}
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge 
            variant={shift.status === 'confirmed' ? 'success' : shift.status === 'pending' ? 'warning' : 'destructive'} 
            size="sm"
          >
            {shift.type}
          </Badge>
          
          <div className="flex items-center gap-1 ml-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(shift);
              }}
            >
              <Edit3 className="w-3 h-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(shift.id);
              }}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* 3D depth effect */}
        <div 
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${shift.color}10 0%, ${shift.color}05 100%)`,
            boxShadow: `inset 0 1px 0 ${shift.color}40, 0 2px 8px ${shift.color}20`
          }}
        />
      </div>
    </motion.div>
  );
};

const DropZone: React.FC<{
  staffId: string;
  timeSlot: string;
  onDrop: (staffId: string, timeSlot: string) => void;
}> = ({ staffId, timeSlot, onDrop }) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <div
      className={`absolute inset-0 transition-all duration-200 hover:bg-primary/5`}
      onClick={() => onDrop(staffId, timeSlot)}
    />
  );
};

const StaffRow: React.FC<{
  staff: any;
  shifts: ShiftBlock[];
  onDropShift: (staffId: string, timeSlot: string) => void;
  onEditShift: (shift: ShiftBlock) => void;
  onDeleteShift: (shiftId: string) => void;
  onAddShift: (staffId: string) => void;
}> = ({ staff, shifts, onDropShift, onEditShift, onDeleteShift, onAddShift }) => {
  const staffShifts = shifts.filter(shift => shift.staffId === staff.id);
  const totalHours = staffShifts.reduce((acc, shift) => {
    const start = parseInt(shift.startTime.split(':')[0]);
    const end = parseInt(shift.endTime.split(':')[0]);
    return acc + (end > start ? end - start : (24 - start) + end);
  }, 0);

  return (
    <motion.div 
      className="relative h-20 border-b border-border/20 aegis-glass-panel"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.03)' }}
    >
      {/* Staff Info Column */}
      <div className="absolute left-0 top-0 w-48 h-full flex items-center px-4 bg-card/90 border-r border-border/20">
        <div className="flex items-center gap-3 w-full">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              {staff.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-foreground truncate">{staff.name}</div>
            <div className="text-xs text-muted-foreground">{staff.role}</div>
            <div className="text-xs text-primary">{totalHours}h scheduled</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Badge variant={staff.status === 'On Duty' ? 'success' : 'secondary'} size="sm">
              {staff.status}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onAddShift(staff.id)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="absolute left-48 top-0 right-0 h-full">
        <div className="relative h-full" style={{ width: '1020px' }}>
          {/* Time slot drop zones */}
          {timeSlots.map((slot, index) => (
            <div
              key={slot.time}
              className="absolute top-0 h-full w-16 border-r border-border/10"
              style={{ left: `${index * 60}px` }}
            >
              <DropZone
                staffId={staff.id}
                timeSlot={slot.time}
                onDrop={onDropShift}
              />
            </div>
          ))}

          {/* Shift blocks */}
          <AnimatePresence>
            {staffShifts.map((shift) => (
              <ShiftBlockComponent
                key={shift.id}
                shift={shift}
                staffId={staff.id}
                onEdit={onEditShift}
                onDelete={onDeleteShift}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export function RotaScheduler({ selectedDate = new Date(), onDateChange }: RotaSchedulerProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [shifts, setShifts] = useState<ShiftBlock[]>(initialShifts);
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<string>('all');

  const handleDropShift = useCallback((targetStaffId: string, targetTimeSlot: string) => {
    // Simplified for now - would implement proper drag and drop logic here
    console.log('Drop shift at:', targetStaffId, targetTimeSlot);
  }, []);

  const handleEditShift = useCallback((shift: ShiftBlock) => {
    // Open edit modal - for now just log
    console.log('Edit shift:', shift);
  }, []);

  const handleDeleteShift = useCallback((shiftId: string) => {
    setShifts(prev => prev.filter(shift => shift.id !== shiftId));
  }, []);

  const handleAddShift = useCallback((staffId: string) => {
    const newShift: ShiftBlock = {
      id: `shift_${Date.now()}`,
      staffId,
      startTime: '09:00',
      endTime: '17:00',
      location: 'Hazelbury House',
      type: 'regular',
      status: 'pending',
      notes: 'New shift',
      color: '#3B82F6'
    };
    setShifts(prev => [...prev, newShift]);
  }, []);

  const filteredStaff = mockStaffProfiles.filter(staff => 
    selectedStaff === 'all' || staff.id === selectedStaff
  ).filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  return (
    <div className="w-full h-full min-h-screen bg-background">
        {/* Header */}
        <Card className="aegis-glass-panel m-6 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate('prev')}
                  className="aegis-ceremonial-hover"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-lg font-semibold text-foreground min-w-[200px] text-center">
                  {currentDate.toLocaleDateString('en-GB', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate('next')}
                  className="aegis-ceremonial-hover"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48"
                />
                <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All staff" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Staff</SelectItem>
                    {mockStaffProfiles.map(staff => (
                      <SelectItem key={staff.id} value={staff.id}>
                        {staff.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="healthcare-heartbeat heartbeat-vital">
                {shifts.length} shifts scheduled
              </Badge>
              <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="aegis-ceremonial-hover">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" className="aegis-ceremonial-hover">
                <Plus className="w-4 h-4 mr-2" />
                Add Shift
              </Button>
            </div>
          </div>
        </Card>

        {/* Time Header */}
        <div className="mx-6">
          <Card className="aegis-glass-panel">
            <div className="flex">
              {/* Staff column header */}
              <div className="w-48 p-4 border-r border-border/20 bg-card/90">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Staff Members</span>
                </div>
              </div>

              {/* Time slots header */}
              <div className="flex-1 p-4 overflow-x-auto">
                <div className="flex" style={{ width: '1020px' }}>
                  {timeSlots.map((slot, index) => (
                    <div
                      key={slot.time}
                      className="w-16 text-center border-r border-border/10 last:border-r-0"
                    >
                      <div className="text-xs font-medium text-foreground">{slot.time}</div>
                      <div className="text-xs text-muted-foreground">
                        {index % 2 === 0 ? '●' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Schedule Grid */}
        <div className="mx-6 mt-2">
          <Card className="aegis-glass-panel overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto institutional-scroll">
              {filteredStaff.map((staff, index) => (
                <StaffRow
                  key={staff.id}
                  staff={staff}
                  shifts={shifts}
                  onDropShift={handleDropShift}
                  onEditShift={handleEditShift}
                  onDeleteShift={handleDeleteShift}
                  onAddShift={handleAddShift}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Statistics Footer */}
        <Card className="aegis-glass-panel m-6 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-success/5 border border-success/10">
              <div className="text-2xl font-bold text-success">
                {shifts.filter(s => s.status === 'confirmed').length}
              </div>
              <div className="text-sm text-muted-foreground">Confirmed Shifts</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-warning/5 border border-warning/10">
              <div className="text-2xl font-bold text-warning">
                {shifts.filter(s => s.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">Pending Shifts</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/10">
              <div className="text-2xl font-bold text-primary">
                {shifts.reduce((acc, shift) => {
                  const start = parseInt(shift.startTime.split(':')[0]);
                  const end = parseInt(shift.endTime.split(':')[0]);
                  return acc + (end > start ? end - start : (24 - start) + end);
                }, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Hours</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-cyan/5 border border-cyan/10">
              <div className="text-2xl font-bold text-cyan">
                {new Set(shifts.map(s => s.location)).size}
              </div>
              <div className="text-sm text-muted-foreground">Locations Covered</div>
            </div>
          </div>
        </Card>
    </div>
  );
}