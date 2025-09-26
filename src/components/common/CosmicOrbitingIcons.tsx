import React from 'react';
import { 
  Stethoscope, 
  Heart, 
  Activity, 
  Pill, 
  Shield, 
  Users, 
  FileText, 
  Calendar,
  AlertCircle,
  TrendingUp,
  Clock,
  UserCheck,
  BarChart3,
  DollarSign,
  Settings,
  Building,
  Globe,
  Award,
  Briefcase,
  Target,
  Zap,
  Star,
  Eye,
  Crown,
  Cog
} from 'lucide-react';

export const CosmicOrbitingIcons: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {/* Inner Orbit - Clockwise - Core Healthcare */}
      <div className="cosmic-orbit-inner">
        <Stethoscope size={28} />
      </div>
      <div className="cosmic-orbit-inner orbit-delay-1">
        <Heart size={24} />
      </div>
      <div className="cosmic-orbit-inner orbit-delay-2">
        <Activity size={26} />
      </div>
      <div className="cosmic-orbit-inner orbit-delay-3">
        <Pill size={22} />
      </div>

      {/* Middle Orbit - Clockwise - Business Operations */}
      <div className="cosmic-orbit-middle">
        <Shield size={22} />
      </div>
      <div className="cosmic-orbit-middle orbit-delay-4">
        <Users size={24} />
      </div>
      <div className="cosmic-orbit-middle orbit-delay-5">
        <FileText size={20} />
      </div>
      <div className="cosmic-orbit-middle orbit-delay-6">
        <Calendar size={22} />
      </div>
      <div className="cosmic-orbit-middle orbit-delay-7">
        <TrendingUp size={20} />
      </div>

      {/* Outer Orbit - Clockwise - Executive Level */}
      <div className="cosmic-orbit-outer">
        <BarChart3 size={18} />
      </div>
      <div className="cosmic-orbit-outer orbit-delay-1">
        <DollarSign size={18} />
      </div>
      <div className="cosmic-orbit-outer orbit-delay-2">
        <Settings size={16} />
      </div>
      <div className="cosmic-orbit-outer orbit-delay-3">
        <Building size={18} />
      </div>
      <div className="cosmic-orbit-outer orbit-delay-4">
        <Globe size={16} />
      </div>
      <div className="cosmic-orbit-outer orbit-delay-5">
        <Award size={18} />
      </div>
      <div className="cosmic-orbit-outer orbit-delay-6">
        <Crown size={16} />
      </div>

      {/* Counter-Clockwise Inner - Management */}
      <div className="cosmic-orbit-counter-inner">
        <Briefcase size={24} />
      </div>
      <div className="cosmic-orbit-counter-inner orbit-delay-2">
        <Target size={22} />
      </div>
      <div className="cosmic-orbit-counter-inner orbit-delay-4">
        <UserCheck size={24} />
      </div>

      {/* Counter-Clockwise Middle - Quality & Performance */}
      <div className="cosmic-orbit-counter-middle">
        <Star size={20} />
      </div>
      <div className="cosmic-orbit-counter-middle orbit-delay-3">
        <Eye size={20} />
      </div>
      <div className="cosmic-orbit-counter-middle orbit-delay-5">
        <Zap size={18} />
      </div>
      <div className="cosmic-orbit-counter-middle orbit-delay-7">
        <AlertCircle size={20} />
      </div>

      {/* Elliptical Orbit - Innovation & Technology */}
      <div className="cosmic-orbit-elliptical">
        <Cog size={22} />
      </div>
      <div className="cosmic-orbit-elliptical orbit-delay-6">
        <Clock size={20} />
      </div>
      <div className="cosmic-orbit-elliptical orbit-delay-8">
        <AlertCircle size={18} />
      </div>
    </div>
  );
};