import React, { useState, useEffect } from 'react';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import { Button } from "../ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator 
} from "../ui/dropdown-menu";
import { AEGIS_THEMES, ThemeId, applyTheme, getCurrentTheme, setThemeScope, getThemeScope } from '../../lib/theme-system';

interface ThemeSwitcherProps {
  className?: string;
}

// Define dark and light theme categories
const DARK_THEMES: ThemeId[] = [
  'royal-gold',
  'arctic-silver',
  'ember-glass', 
  'midnight-navy',
  'verdant-jade',
  'obsidian-black',
  'marble-white',
  'crimson-ember',
  'sapphire-steel',
  'onyx-frost'
];

const LIGHT_THEMES: ThemeId[] = [
  'royal-gold-light',
  'arctic-silver-light',
  'ember-glass-light', 
  'midnight-navy-light',
  'verdant-jade-light',
  'obsidian-black-light',
  'marble-white-light',
  'crimson-ember-light',
  'sapphire-steel-light',
  'onyx-frost-light'
];

// Get distinct theme orb characteristics for each theme
function getThemeOrbStyle(themeId: ThemeId): { color: string; gradient?: string; pattern?: string } {
  switch (themeId) {
    // Dark Themes - Distinct Colors
    case 'royal-gold':
      return { color: '#D4AF37', gradient: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)' };
    case 'arctic-silver':
      return { color: '#64748B', gradient: 'linear-gradient(135deg, #64748B 0%, #94A3B8 100%)' };
    case 'ember-glass':
      return { color: '#EA580C', gradient: 'linear-gradient(135deg, #EA580C 0%, #FB923C 100%)' };
    case 'midnight-navy':
      return { color: '#2563EB', gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)' };
    case 'verdant-jade':
      return { color: '#059669', gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' };
    case 'obsidian-black':
      return { color: '#A78BFA', gradient: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)' };
    case 'marble-white':
      return { color: '#F3F4F6', gradient: 'linear-gradient(135deg, #F3F4F6 0%, #FFFFFF 100%)' };
    case 'crimson-ember':
      return { color: '#DC2626', gradient: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)' };
    case 'sapphire-steel':
      return { color: '#0284C7', gradient: 'linear-gradient(135deg, #0284C7 0%, #0EA5E9 100%)' };
    case 'onyx-frost':
      return { color: '#6EE7B7', gradient: 'linear-gradient(135deg, #6EE7B7 0%, #A7F3D0 100%)' };
    
    // Light Themes - Brighter, More Saturated Colors
    case 'royal-gold-light':
      return { color: '#F59E0B', gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)' };
    case 'arctic-silver-light':
      return { color: '#64748B', gradient: 'linear-gradient(135deg, #64748B 0%, #94A3B8 100%)' };
    case 'ember-glass-light':
      return { color: '#DC2626', gradient: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)' };
    case 'midnight-navy-light':
      return { color: '#1D4ED8', gradient: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)' };
    case 'verdant-jade-light':
      return { color: '#16A34A', gradient: 'linear-gradient(135deg, #16A34A 0%, #22C55E 100%)' };
    case 'obsidian-black-light':
      return { color: '#8B5CF6', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)' };
    case 'marble-white-light':
      return { color: '#71717A', gradient: 'linear-gradient(135deg, #71717A 0%, #A1A1AA 100%)' };
    case 'crimson-ember-light':
      return { color: '#B91C1C', gradient: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)' };
    case 'sapphire-steel-light':
      return { color: '#0369A1', gradient: 'linear-gradient(135deg, #0369A1 0%, #0284C7 100%)' };
    case 'onyx-frost-light':
      return { color: '#10B981', gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' };
    
    default:
      return { color: '#D4AF37', gradient: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)' };
  }
}

// Enhanced animated orb component with distinct visual characteristics
function ThemeOrb({ themeId, isActive }: { themeId: ThemeId; isActive?: boolean }) {
  const orbStyle = getThemeOrbStyle(themeId);
  
  return (
    <div className="relative">
      <div 
        className={`w-8 h-8 rounded-full transition-all duration-300 border border-white/20 ${
          isActive ? 'ring-2 ring-primary/30 ring-offset-1 ring-offset-background aegis-pulse' : ''
        }`}
        style={{ 
          background: orbStyle.gradient || orbStyle.color,
          boxShadow: isActive 
            ? `0 0 8px ${orbStyle.color}60, 0 0 16px ${orbStyle.color}40, inset 0 1px 0 rgba(255,255,255,0.2)`
            : `inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.1)`
        }}
      />
      {isActive && (
        <div 
          className="absolute inset-0 w-8 h-8 rounded-full animate-ping"
          style={{ 
            background: orbStyle.gradient || orbStyle.color,
            opacity: 0.3
          }}
        />
      )}
      {/* Shimmer effect for metallic themes */}
      {(themeId.includes('silver') || themeId.includes('steel') || themeId.includes('frost')) && (
        <div 
          className="absolute inset-0 w-8 h-8 rounded-full opacity-30"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
            transform: 'translateX(-100%)',
            animation: isActive ? 'shimmer 2s ease-in-out infinite' : 'none'
          }}
        />
      )}
    </div>
  );
}

// Pulsing icon component
function PulsingIcon({ children, isActive }: { children: React.ReactNode; isActive?: boolean }) {
  return (
    <div className={`transition-all duration-300 ${isActive ? 'aegis-pulse' : ''}`}>
      {children}
    </div>
  );
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('royal-gold');
  const [themeScope, setLocalThemeScope] = useState<'global' | 'page'>('global');

  useEffect(() => {
    try {
      const theme = getCurrentTheme();
      setCurrentTheme(theme);
      setLocalThemeScope(getThemeScope());
      
      // Apply theme on mount
      applyTheme(theme);
    } catch (error) {
      console.error('Error initializing theme switcher:', error);
      // Fallback to default
      setCurrentTheme('royal-gold');
      setLocalThemeScope('global');
    }
  }, []);

  const handleThemeChange = (themeId: ThemeId, scope: 'global' | 'page' = 'global') => {
    try {
      applyTheme(themeId);
      setThemeScope(scope);
      setCurrentTheme(themeId);
      setLocalThemeScope(scope);
    } catch (error) {
      console.error('Error changing theme:', error);
    }
  };

  const currentThemeData = AEGIS_THEMES[currentTheme];
  const isCurrentThemeDark = DARK_THEMES.includes(currentTheme);

  if (!currentThemeData) {
    console.error('Theme not found:', currentTheme);
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={`aegis-button-primary-metal min-w-[50px] justify-center ${className}`}
        >
          <div className="flex items-center gap-2">
            <PulsingIcon isActive={true}>
              {isCurrentThemeDark ? (
                <Moon className="w-8 h-8" />
              ) : (
                <Sun className="w-8 h-8" />
              )}
            </PulsingIcon>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="start" 
        className="w-80 dropdown-content aegis-glass-panel border-0 p-2"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">
          AEGIS Themes
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/20" />
        
        {/* Current Theme Status */}
        <div className="px-2 py-2 mb-2">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/5 border border-accent/10">
            <ThemeOrb themeId={currentTheme} isActive={true} />
            <div className="flex-1">
              <div className="text-sm font-medium text-accent">{currentThemeData.name}</div>
              <div className="text-xs text-muted-foreground">
                {themeScope === 'global' ? 'Applied Globally' : 'This Page Only'}
              </div>
            </div>
          </div>
        </div>

        {/* Dark Themes Section */}
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1 flex items-center gap-2">
          <PulsingIcon isActive={isCurrentThemeDark}>
            <Moon className="w-8 h-8" />
          </PulsingIcon>
          <span>Dark Themes ({DARK_THEMES.length})</span>
        </DropdownMenuLabel>
        <div className="px-2 py-1 mb-2">
          <div className="grid grid-cols-3 gap-3">
            {DARK_THEMES.map((themeId) => {
              const theme = AEGIS_THEMES[themeId];
              if (!theme) return null;
              
              const isActive = currentTheme === themeId;
              
              return (
                <DropdownMenuItem
                  key={themeId}
                  onClick={() => handleThemeChange(themeId, themeScope)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer transition-all hover:bg-accent/5 border border-transparent hover:border-accent/10"
                >
                  <ThemeOrb themeId={themeId} isActive={isActive} />
                  <div className="text-center">
                    <div className="text-xs font-medium leading-tight truncate w-full">{theme.name.split(' ')[0]}</div>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </div>
        </div>

        <DropdownMenuSeparator className="bg-border/20" />

        {/* Light Themes Section */}
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1 flex items-center gap-2">
          <PulsingIcon isActive={!isCurrentThemeDark}>
            <Sun className="w-8 h-8" />
          </PulsingIcon>
          <span>Light Themes ({LIGHT_THEMES.length})</span>
        </DropdownMenuLabel>
        <div className="px-2 py-1 mb-2">
          <div className="grid grid-cols-3 gap-3">
            {LIGHT_THEMES.map((themeId) => {
              const theme = AEGIS_THEMES[themeId];
              if (!theme) return null;
              
              const isActive = currentTheme === themeId;
              
              return (
                <DropdownMenuItem
                  key={themeId}
                  onClick={() => handleThemeChange(themeId, themeScope)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer transition-all hover:bg-accent/5 border border-transparent hover:border-accent/10"
                >
                  <ThemeOrb themeId={themeId} isActive={isActive} />
                  <div className="text-center">
                    <div className="text-xs font-medium leading-tight truncate w-full">{theme.name.split(' ')[0]}</div>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </div>
        </div>

        <DropdownMenuSeparator className="bg-border/10 mt-3" />
        
        {/* Theme Description */}
        <div className="px-2 py-2 space-y-2">
          <div className="text-xs text-muted-foreground text-center">
            {currentThemeData.description}
          </div>
          
          <DropdownMenuSeparator className="bg-border/10" />
          
          {/* Theme Scope Settings */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">
              Application Scope
            </div>
            <div className="flex gap-1">
              <DropdownMenuItem
                onClick={() => {
                  setThemeScope('global');
                  setLocalThemeScope('global');
                  if (themeScope !== 'global') {
                    applyTheme(currentTheme);
                  }
                }}
                className={`flex-1 text-center justify-center text-xs py-2 cursor-pointer transition-all ${
                  themeScope === 'global' 
                    ? 'bg-accent/10 border border-accent/20 text-accent' 
                    : 'hover:bg-accent/5 border border-transparent'
                }`}
              >
                System-wide
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setThemeScope('page');
                  setLocalThemeScope('page');
                }}
                className={`flex-1 text-center justify-center text-xs py-2 cursor-pointer transition-all ${
                  themeScope === 'page' 
                    ? 'bg-accent/10 border border-accent/20 text-accent' 
                    : 'hover:bg-accent/5 border border-transparent'
                }`}
              >
                Page Only
              </DropdownMenuItem>
            </div>
            <div className="text-xs text-muted-foreground text-center opacity-80">
              {themeScope === 'global' 
                ? 'New themes apply to entire system' 
                : 'New themes apply to current page only'
              }
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}