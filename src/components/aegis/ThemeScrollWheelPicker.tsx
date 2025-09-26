import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Palette, Settings } from 'lucide-react';
import { Button } from "../ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { AEGIS_THEMES, ThemeId, applyTheme, getCurrentTheme, setThemeScope, getThemeScope } from '../../lib/theme-system';
import orbThemesImage from 'figma:asset/41bb53732a86c185bdf2221fff99454d09fa8542.png';

interface ThemeScrollWheelPickerProps {
  className?: string;
}

// All themes in a wheel order for smooth scrolling
const THEME_WHEEL: ThemeId[] = [
  'royal-gold',
  'arctic-silver', 
  'ember-glass',
  'verdant-jade',
  'midnight-navy',
  'obsidian-black',
  'marble-white',
  'crimson-ember',
  'sapphire-steel',
  'onyx-frost',
  'royal-gold-light',
  'arctic-silver-light',
  'ember-glass-light',
  'verdant-jade-light',
  'midnight-navy-light',
  'obsidian-black-light',
  'marble-white-light',
  'crimson-ember-light',
  'sapphire-steel-light',
  'onyx-frost-light'
];

// Map themes to their orb positions in the strip image
const THEME_ORB_POSITIONS = {
  'royal-gold': 0,           // Golden orb at top
  'arctic-silver': 1,        // Silver/grey orb 
  'ember-glass': 2,          // Orange/ember orb (highlighted in image)
  'verdant-jade': 3,         // Green orb
  'midnight-navy': 4,        // Blue orb (bottom row, left)
  'obsidian-black': 5,       // Black orb
  'marble-white': 6,         // White/marble orb
  'crimson-ember': 7,        // Red orb (bottom row)
  'sapphire-steel': 8,       // Blue steel orb (bottom row, center)
  'onyx-frost': 9,           // Dark grey orb (bottom row, right)
  // Light theme variants use same orbs but with different filters
  'royal-gold-light': 0,
  'arctic-silver-light': 1,
  'ember-glass-light': 2,
  'verdant-jade-light': 3,
  'midnight-navy-light': 4,
  'obsidian-black-light': 5,
  'marble-white-light': 6,
  'crimson-ember-light': 7,
  'sapphire-steel-light': 8,
  'onyx-frost-light': 9
};

// Get the orb visual style for each theme
function getThemeOrbStyle(themeId: ThemeId): { 
  position: number;
  filter: string;
  shadowColor: string;
  isLight: boolean;
  name: string;
} {
  const position = THEME_ORB_POSITIONS[themeId] || 0;
  const isLight = themeId.includes('light');
  
  switch (themeId.replace('-light', '') as ThemeId) {
    case 'royal-gold':
      return { 
        position,
        filter: isLight ? 'hue-rotate(15deg) saturate(1.4) brightness(1.3) contrast(1.1)' : 'hue-rotate(0deg) saturate(1.2) brightness(1.1) contrast(1.1)',
        shadowColor: '#D4AF37',
        isLight,
        name: 'ROYAL'
      };
    case 'arctic-silver':
      return { 
        position,
        filter: isLight ? 'hue-rotate(0deg) saturate(0.8) brightness(1.4) contrast(1.2)' : 'hue-rotate(0deg) saturate(0.9) brightness(1.2) contrast(1.1)',
        shadowColor: '#64748B',
        isLight,
        name: 'ARCTIC'
      };
    case 'ember-glass':
      return { 
        position,
        filter: isLight ? 'hue-rotate(-10deg) saturate(1.6) brightness(1.2) contrast(1.3)' : 'hue-rotate(0deg) saturate(1.4) brightness(1.1) contrast(1.2)',
        shadowColor: '#EA580C',
        isLight,
        name: 'EMBER'
      };
    case 'verdant-jade':
      return { 
        position,
        filter: isLight ? 'hue-rotate(5deg) saturate(1.5) brightness(1.3) contrast(1.2)' : 'hue-rotate(0deg) saturate(1.3) brightness(1.1) contrast(1.1)',
        shadowColor: '#059669',
        isLight,
        name: 'VERDANT'
      };
    case 'midnight-navy':
      return { 
        position,
        filter: isLight ? 'hue-rotate(10deg) saturate(1.4) brightness(1.3) contrast(1.2)' : 'hue-rotate(0deg) saturate(1.2) brightness(1.0) contrast(1.1)',
        shadowColor: '#2563EB',
        isLight,
        name: 'MIDNIGHT'
      };
    case 'obsidian-black':
      return { 
        position,
        filter: isLight ? 'hue-rotate(0deg) saturate(1.2) brightness(1.4) contrast(1.3)' : 'hue-rotate(0deg) saturate(0.8) brightness(0.9) contrast(1.2)',
        shadowColor: '#374151',
        isLight,
        name: 'OBSIDIAN'
      };
    case 'marble-white':
      return { 
        position,
        filter: isLight ? 'hue-rotate(0deg) saturate(0.6) brightness(1.6) contrast(0.9)' : 'hue-rotate(0deg) saturate(0.7) brightness(1.4) contrast(1.0)',
        shadowColor: '#F3F4F6',
        isLight,
        name: 'MARBLE'
      };
    case 'crimson-ember':
      return { 
        position,
        filter: isLight ? 'hue-rotate(-5deg) saturate(1.6) brightness(1.2) contrast(1.3)' : 'hue-rotate(0deg) saturate(1.5) brightness(1.1) contrast(1.2)',
        shadowColor: '#DC2626',
        isLight,
        name: 'CRIMSON'
      };
    case 'sapphire-steel':
      return { 
        position,
        filter: isLight ? 'hue-rotate(5deg) saturate(1.4) brightness(1.3) contrast(1.2)' : 'hue-rotate(0deg) saturate(1.2) brightness(1.1) contrast(1.1)',
        shadowColor: '#0284C7',
        isLight,
        name: 'SAPPHIRE'
      };
    case 'onyx-frost':
      return { 
        position,
        filter: isLight ? 'hue-rotate(0deg) saturate(1.3) brightness(1.3) contrast(1.1)' : 'hue-rotate(0deg) saturate(1.1) brightness(1.0) contrast(1.1)',
        shadowColor: '#4B5563',
        isLight,
        name: 'ONYX'
      };
    default:
      return { 
        position: 0,
        filter: 'hue-rotate(0deg) saturate(1.1) brightness(1.1) contrast(1.1)',
        shadowColor: '#D4AF37',
        isLight: false,
        name: 'ROYAL'
      };
  }
}

// Beautiful orb from the strip image
function ThemeOrb({ 
  themeId, 
  isActive, 
  size = 'md',
  className = ''
}: { 
  themeId: ThemeId; 
  isActive?: boolean; 
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const orbStyle = getThemeOrbStyle(themeId);
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };
  
  // Calculate orb position in the strip - assuming 3 columns, 4 rows layout
  const col = orbStyle.position % 3;
  const row = Math.floor(orbStyle.position / 3);
  const backgroundPositionX = (col * -100) / 2; // 3 columns = 0%, -50%, -100%
  const backgroundPositionY = (row * -100) / 3; // 4 rows = 0%, -33.33%, -66.66%, -100%
  
  return (
    <div className={`relative ${className}`}>
      <div 
        className={`${sizeClasses[size]} rounded-full transition-all duration-500 border-2 overflow-hidden ${
          isActive 
            ? 'border-primary/60 ring-4 ring-primary/20 ring-offset-2 ring-offset-background shadow-2xl scale-110' 
            : 'border-white/20 shadow-lg hover:border-white/40'
        }`}
        style={{ 
          backgroundImage: `url(${orbThemesImage})`,
          backgroundSize: '300% 400%', // 3 columns x 4 rows
          backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
          backgroundRepeat: 'no-repeat',
          filter: orbStyle.filter,
          boxShadow: isActive 
            ? `0 0 20px ${orbStyle.shadowColor}60, 0 0 40px ${orbStyle.shadowColor}30, inset 0 2px 4px rgba(255,255,255,0.2), 0 8px 16px rgba(0,0,0,0.3)`
            : `inset 0 1px 2px rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.2)`
        }}
      />
      
      {/* Active state glow effect */}
      {isActive && (
        <>
          <div 
            className={`absolute inset-0 ${sizeClasses[size]} rounded-full animate-ping opacity-60`}
            style={{ 
              backgroundImage: `url(${orbThemesImage})`,
              backgroundSize: '300% 400%',
              backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
              filter: `${orbStyle.filter} blur(2px)`,
              opacity: 0.4
            }}
          />
          <div 
            className={`absolute inset-0 ${sizeClasses[size]} rounded-full heartbeat-vital`}
            style={{ 
              background: `radial-gradient(circle, ${orbStyle.shadowColor}40, transparent 70%)`,
              opacity: 0.6
            }}
          />
        </>
      )}
      
      {/* Golden highlight for active theme */}
      {isActive && (
        <div 
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-primary/40`}
          style={{
            background: `conic-gradient(from 0deg, transparent, ${orbStyle.shadowColor}20, transparent)`,
            animation: 'spin 3s linear infinite'
          }}
        />
      )}
      
      {/* Shimmer effect for metallic themes */}
      {(themeId.includes('silver') || themeId.includes('steel') || themeId.includes('frost') || themeId.includes('marble')) && (
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full opacity-40 overflow-hidden`}>
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
              transform: 'translateX(-100%)',
              animation: isActive ? 'shimmer 2s ease-in-out infinite' : 'none'
            }}
          />
        </div>
      )}
    </div>
  );
}

export function ThemeScrollWheelPicker({ className }: ThemeScrollWheelPickerProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('royal-gold');
  const [themeScope, setLocalThemeScope] = useState<'global' | 'page'>('global');
  const [isOpen, setIsOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    try {
      const theme = getCurrentTheme();
      setCurrentTheme(theme);
      setLocalThemeScope(getThemeScope());
      
      // Set the wheel position to current theme
      const themeIndex = THEME_WHEEL.findIndex(t => t === theme);
      setSelectedIndex(themeIndex >= 0 ? themeIndex : 0);
      
      applyTheme(theme);
    } catch (error) {
      console.error('Error initializing theme picker:', error);
      setCurrentTheme('royal-gold');
      setLocalThemeScope('global');
    }
  }, []);

  // Scroll to center the selected theme with TradingView-style snapping
  useEffect(() => {
    if (scrollContainerRef.current && isOpen) {
      const container = scrollContainerRef.current;
      const itemHeight = 90; // Height of each theme item
      const containerHeight = container.clientHeight;
      const scrollPosition = (selectedIndex * itemHeight) - (containerHeight / 2) + (itemHeight / 2);
      
      container.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  }, [selectedIndex, isOpen]);

  const handleThemeChange = (themeId: ThemeId, index: number) => {
    try {
      applyTheme(themeId);
      setThemeScope(themeScope);
      setCurrentTheme(themeId);
      setSelectedIndex(index);
    } catch (error) {
      console.error('Error changing theme:', error);
    }
  };

  // TradingView-style scroll snapping
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const itemHeight = 90;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const centerPosition = scrollTop + (containerHeight / 2);
    const newIndex = Math.round(centerPosition / itemHeight);
    
    if (newIndex !== selectedIndex && newIndex >= 0 && newIndex < THEME_WHEEL.length) {
      setSelectedIndex(Math.max(0, Math.min(newIndex, THEME_WHEEL.length - 1)));
    }
  };

  const currentThemeData = AEGIS_THEMES[currentTheme];
  const isCurrentThemeDark = !currentTheme.includes('light');
  const currentOrbStyle = getThemeOrbStyle(currentTheme);

  if (!currentThemeData) {
    console.error('Theme not found:', currentTheme);
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={`aegis-button-primary-metal min-w-[160px] justify-between ${className}`}
        >
          <div className="flex items-center gap-3">
            <ThemeOrb themeId={currentTheme} isActive={true} size="sm" />
            <div className="text-left">
              <div className="text-xs font-bold tracking-wider">
                {currentOrbStyle.name}
              </div>
              <div className="text-xs opacity-70">
                {isCurrentThemeDark ? 'Dark' : 'Light'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {isCurrentThemeDark ? (
              <Moon className="w-3 h-3 opacity-70" />
            ) : (
              <Sun className="w-3 h-3 opacity-70" />
            )}
            <Palette className="w-3 h-3 opacity-70" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="start" 
        className="w-96 h-[500px] dropdown-content aegis-glass-panel border-0 p-0 overflow-hidden"
        sideOffset={8}
      >
        {/* Header with active theme preview */}
        <div 
          className="p-5 border-b border-border/20"
          style={{
            background: `linear-gradient(135deg, ${currentOrbStyle.shadowColor}15, ${currentOrbStyle.shadowColor}05)`
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground tracking-wider">AEGIS THEME WHEEL</span>
            </div>
            <div className="flex items-center gap-2">
              {isCurrentThemeDark ? (
                <Moon className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Sun className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </div>
          
          {/* Current theme showcase */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-card/60 border border-primary/20">
            <ThemeOrb themeId={currentTheme} isActive={true} size="md" />
            <div className="flex-1">
              <div className="font-bold text-primary tracking-wider">{currentOrbStyle.name}</div>
              <div className="text-sm text-foreground font-medium">{currentThemeData.name}</div>
              <div className="text-xs text-muted-foreground">
                {themeScope === 'global' ? 'Applied System-wide' : 'Applied to This Page'}
              </div>
            </div>
          </div>
        </div>

        {/* TradingView-style scroll wheel with highlight window */}
        <div className="relative flex-1 bg-gradient-to-b from-card/20 to-card/40">
          {/* Center highlight window - TradingView style */}
          <div className="absolute left-3 right-3 top-1/2 transform -translate-y-1/2 h-20 rounded-xl border-2 border-primary/40 z-10 pointer-events-none">
            <div 
              className="absolute inset-0 rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${currentOrbStyle.shadowColor}10, ${currentOrbStyle.shadowColor}05)`,
                boxShadow: `inset 0 0 20px ${currentOrbStyle.shadowColor}20, 0 0 30px ${currentOrbStyle.shadowColor}15`
              }}
            />
          </div>
          
          {/* Center selection indicator */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-primary z-20 pointer-events-none" />
          
          {/* Scrollable orb container */}
          <div 
            ref={scrollContainerRef}
            className="h-full overflow-y-auto py-32"
            onScroll={handleScroll}
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            <div className="space-y-3 px-5">
              {THEME_WHEEL.map((themeId, index) => {
                const theme = AEGIS_THEMES[themeId];
                if (!theme) return null;
                
                const isActive = currentTheme === themeId;
                const isSelected = selectedIndex === index;
                const orbStyle = getThemeOrbStyle(themeId);
                
                return (
                  <div
                    key={`${themeId}-${index}`}
                    onClick={() => handleThemeChange(themeId, index)}
                    className={`
                      flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-500 transform
                      ${isSelected 
                        ? 'bg-card/80 border-2 border-primary/50 scale-110 shadow-xl z-30 relative' 
                        : 'hover:bg-card/40 border-2 border-transparent hover:border-white/10'
                      }
                      ${isActive ? 'ring-2 ring-primary/60' : ''}
                    `}
                    style={{ 
                      height: '82px',
                      background: isSelected 
                        ? `linear-gradient(135deg, ${orbStyle.shadowColor}15, ${orbStyle.shadowColor}08, transparent)`
                        : undefined
                    }}
                  >
                    <ThemeOrb 
                      themeId={themeId} 
                      isActive={isActive} 
                      size={isSelected ? 'lg' : 'md'}
                      className={isSelected ? 'heartbeat-vital' : ''}
                    />
                    <div className="flex-1">
                      <div className={`font-bold tracking-wider transition-all duration-300 ${
                        isSelected ? 'text-foreground text-lg' : 'text-muted-foreground text-base'
                      }`}>
                        {orbStyle.name}
                      </div>
                      <div className={`font-medium transition-all duration-300 ${
                        isSelected ? 'text-foreground text-sm' : 'text-muted-foreground text-sm'
                      }`}>
                        {theme.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {orbStyle.isLight ? (
                          <Sun className="w-3 h-3 text-yellow-500" />
                        ) : (
                          <Moon className="w-3 h-3 text-blue-400" />
                        )}
                        <span className="text-xs text-muted-foreground font-medium">
                          {orbStyle.isLight ? 'Light' : 'Dark'} Edition
                        </span>
                      </div>
                    </div>
                    {isActive && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border-2 border-primary/40">
                        <div className="w-3 h-3 rounded-full bg-primary heartbeat-vital" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Gradient fade at top and bottom */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-card to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none z-20" />
        </div>

        {/* Footer controls */}
        <div 
          className="p-4 border-t border-border/20 space-y-3"
          style={{
            background: `linear-gradient(135deg, ${currentOrbStyle.shadowColor}10, ${currentOrbStyle.shadowColor}05)`
          }}
        >
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">
            Application Scope
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setThemeScope('global');
                setLocalThemeScope('global');
                if (themeScope !== 'global') {
                  applyTheme(currentTheme);
                }
              }}
              className={`flex-1 flex flex-col items-center text-xs py-3 px-3 rounded-lg cursor-pointer transition-all ${ 
                themeScope === 'global'
                  ? 'bg-primary/20 border-2 border-primary/40 text-primary font-bold'
                  : 'bg-card/50 border-2 border-border/20 text-muted-foreground hover:bg-card/80'
              }`}
            >
              <Settings className="w-4 h-4 mb-1" />
              System-wide
            </button>
            <button
              onClick={() => {
                setThemeScope('page');
                setLocalThemeScope('page');
              }}
              className={`flex-1 flex flex-col items-center text-xs py-3 px-3 rounded-lg cursor-pointer transition-all ${
                themeScope === 'page'
                  ? 'bg-primary/20 border-2 border-primary/40 text-primary font-bold'
                  : 'bg-card/50 border-2 border-border/20 text-muted-foreground hover:bg-card/80'
              }`}
            >
              <div className="w-4 h-4 mb-1 border-2 border-current rounded" />
              Page Only
            </button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}