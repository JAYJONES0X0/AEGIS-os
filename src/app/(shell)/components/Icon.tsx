'use client';

import { 
  Crown, Heart, Users, Package, Users2, Award, BarChart3,
  Calendar, Radio, Bot, TrendingUp, AlertTriangle, Activity,
  Pill, Stethoscope, FileText, Shield, UserCheck, Settings,
  Wrench, Clock, GraduationCap, FolderOpen, Layers, Receipt,
  Wallet, FileSpreadsheet, ShoppingCart, Package2, Boxes,
  ContactRound, Home, Network, Megaphone, FileCheck, CheckSquare,
  AlertOctagon, Target, BarChart, Monitor, FileBarChart, Crystal,
  Download, Menu, Search, Bell, Palette, User, Command, ChevronDown,
  type LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  // Main modules
  Crown, Heart, Users, Package, Users2, Award, BarChart3,
  
  // Command Centre
  Calendar, Radio, Bot, TrendingUp, AlertTriangle, Activity,
  
  // Healthcare
  Pill, Stethoscope, FileText, Shield, UserCheck,
  
  // Workforce
  Settings, Wrench, Clock, GraduationCap, FolderOpen, Layers,
  
  // Inventory & Finance
  Receipt, Wallet, FileSpreadsheet, ShoppingCart, Package2, Boxes,
  
  // CRM
  ContactRound, Home, Network, Megaphone,
  
  // Quality
  FileCheck, CheckSquare, AlertOctagon, Target, BarChart,
  
  // Analytics
  Monitor, FileBarChart, Crystal, Download,
  
  // UI Icons
  Menu, Search, Bell, Palette, User, Command, ChevronDown,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className = '' }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    // Fallback to a generic icon or return null
    return <div className={`w-${size/4} h-${size/4} bg-[var(--surface-4)] rounded ${className}`} />;
  }
  
  return <IconComponent size={size} className={className} />;
}