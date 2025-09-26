import React, { useState } from 'react';
import { 
  Crown, Heart, Users, DollarSign, Award, Bot, Calendar, Radio, 
  TrendingUp, AlertTriangle, Activity, Pill, Stethoscope, FileText, 
  Shield, UserCheck, Settings, Wrench, Clock, GraduationCap, FolderOpen, 
  Layers, Receipt, Wallet, Package, FileSpreadsheet, Package2, ShoppingCart, 
  BarChart3, FileCheck, CheckSquare, AlertOctagon, Target, BarChart, 
  Home, Calculator, History, Zap, FileEdit, ChevronDown
} from 'lucide-react';
import { Button } from '../ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator 
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { PALACE_GATES } from '../../lib/palace-gate-structure';
import { applyTheme, getCurrentTheme } from '../../lib/theme-system';

// Icon mapping for dynamic icon rendering
const iconMap = {
  Crown, Heart, Users, DollarSign, Award, Bot, Calendar, Radio, 
  TrendingUp, AlertTriangle, Activity, Pill, Stethoscope, FileText, 
  Shield, UserCheck, Settings, Wrench, Clock, GraduationCap, FolderOpen, 
  Layers, Receipt, Wallet, Package, FileSpreadsheet, Package2, ShoppingCart, 
  BarChart3, FileCheck, CheckSquare, AlertOctagon, Target, BarChart, 
  Home, Calculator, History, Zap, FileEdit
} as const;

interface PalaceGateNavProps {
  activeGate: string;
  activeSubTab: string;
  onGateChange: (gateId: string, subTabId?: string) => void;
}

export function PalaceGateNav({ activeGate, activeSubTab, onGateChange }: PalaceGateNavProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const currentTheme = getCurrentTheme();

  const handleGateClick = (gateId: string, defaultSubTab?: string) => {
    try {
      const gate = PALACE_GATES.find(gate => gate.id === gateId);
      applyTheme(gate?.themeId || 'royal-gold');
      onGateChange(gateId, defaultSubTab);
      setOpenDropdown(null);
    } catch (error) {
      console.error('Error in handleGateClick:', error);
    }
  };

  const handleSubTabClick = (gateId: string, subTabId: string) => {
    try {
      onGateChange(gateId, subTabId);
      setOpenDropdown(null);
    } catch (error) {
      console.error('Error in handleSubTabClick:', error);
    }
  };

  const getIcon = (iconName: string) => {
    try {
      const IconComponent = iconMap[iconName as keyof typeof iconMap];
      return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
    } catch (error) {
      console.warn(`Icon not found: ${iconName}`);
      return null;
    }
  };

  // Get theme-specific hover colors
  const getThemeHoverClasses = (isActive: boolean, isSpecial: boolean) => {
    const baseClasses = 'h-10 px-4 gap-2 transition-all duration-300 ease-out backdrop-blur-sm aegis-ceremonial-hover';
    
    if (isActive) {
      // Active state with theme resonance
      return `${baseClasses} bg-primary/15 text-primary border border-primary/30 shadow-lg shadow-primary/20 transform hover:scale-105`;
    } else if (isSpecial) {
      // AI Hub special styling with pulsing effect
      return `${baseClasses} bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/20 aegis-pulse`;
    } else {
      // Default hover with theme awareness
      const isLightTheme = currentTheme.includes('-light');
      const hoverBg = isLightTheme ? 'hover:bg-black/5' : 'hover:bg-white/8';
      const hoverBorder = isLightTheme ? 'hover:border-black/10' : 'hover:border-white/15';
      return `${baseClasses} ${hoverBg} hover:border ${hoverBorder} hover:shadow-md hover:transform hover:scale-102`;
    }
  };

  // Get theme-specific dropdown hover classes
  const getDropdownItemHoverClasses = (isSubTabActive: boolean) => {
    const baseClasses = 'flex items-center justify-between p-3 rounded cursor-pointer transition-all duration-200 aegis-ceremonial-hover';
    
    if (isSubTabActive) {
      return `${baseClasses} bg-primary/15 border border-primary/30 shadow-sm`;
    } else {
      const isLightTheme = currentTheme.includes('-light');
      const hoverBg = isLightTheme ? 'hover:bg-black/5' : 'hover:bg-accent/12';
      const hoverBorder = isLightTheme ? 'hover:border-black/10' : 'hover:border-primary/20';
      return `${baseClasses} ${hoverBg} hover:border ${hoverBorder} hover:shadow-sm hover:transform hover:translateX-1`;
    }
  };

  return (
    <div className="border-b border-border/20 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-16">
          {/* Palace Gates Navigation - Perfectly Centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2">
              {PALACE_GATES.map((gate) => {
                const isActive = activeGate === gate.id;
                const isSpecial = gate.special;
                
                return (
                  <DropdownMenu 
                    key={gate.id} 
                    open={openDropdown === gate.id}
                    onOpenChange={(open) => setOpenDropdown(open ? gate.id : null)}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className={getThemeHoverClasses(isActive, isSpecial)}
                      >
                        {getIcon(gate.icon)}
                        <span className={`aegis-nav-text ${isSpecial ? 'font-semibold' : 'font-medium'}`}>
                          {gate.name}
                        </span>
                        <ChevronDown className="w-3 h-3 opacity-60" />
                      </Button>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent 
                      className="w-80 dropdown-content aegis-glass-panel border-0 p-3" 
                      align="start"
                      sideOffset={8}
                    >
                      <DropdownMenuLabel className="flex items-center gap-2 mb-2">
                        {getIcon(gate.icon)}
                        <div>
                          <div className="aegis-text-primary font-semibold">{gate.name}</div>
                          <div className="text-xs font-normal aegis-text-secondary">
                            {gate.description}
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      
                      <DropdownMenuSeparator className="bg-border/20 mb-2" />
                      
                      <div className="grid gap-1">
                        {gate.subTabs.map((subTab) => {
                          const isSubTabActive = activeGate === gate.id && activeSubTab === subTab.id;
                          
                          return (
                            <DropdownMenuItem
                              key={subTab.id}
                              onClick={() => handleSubTabClick(gate.id, subTab.id)}
                              className={getDropdownItemHoverClasses(isSubTabActive)}
                            >
                              <div className="flex items-center gap-3">
                                {getIcon(subTab.icon || '')}
                                <div>
                                  <div className="font-medium text-sm aegis-text-primary">{subTab.name}</div>
                                  {subTab.description && (
                                    <div className="text-xs aegis-text-secondary">
                                      {subTab.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {subTab.badge && (
                                <Badge 
                                  variant={typeof subTab.badge === 'number' && subTab.badge > 0 ? 'destructive' : 'secondary'}
                                  className="text-xs aegis-pulse"
                                >
                                  {subTab.badge}
                                </Badge>
                              )}
                            </DropdownMenuItem>
                          );
                        })}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              })}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}