import React, { useState, useEffect, useRef } from 'react';
import { Button } from "../ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { AEGIS_THEMES, ThemeId, applyTheme, getCurrentTheme, setThemeScope, getThemeScope } from '../../lib/theme-system';
import moonIcon from 'figma:asset/5be20fd3bc3e08a4a1c29b4c856b5de62f379a7d.png';
import sunIcon from 'figma:asset/b5c7a63ac111aacfee15c37d9d4ce257791e52e2.png';
import pageIcon from 'figma:asset/a7ed1999eff8a8561ff54876e75b46a654852f0b.png';
import globalIcon from 'figma:asset/60ba87f4cf1c198b1a20a70de3c61b52f5220044.png';

interface VerticalThemeSelectorProps {
  className?: string;
}

// AEGIS Theme Configuration - Master Dark & Light Orb System
const AEGIS_THEME_ORBS = [
  // Dark Themes (10)
  { 
    id: 'royal-gold', 
    name: 'Royal', 
    colors: {
      primary: '#D4AF37',
      secondary: '#B8941F', 
      accent: '#F4E4A6',
      glow: '#D4AF37'
    },
    isDark: true 
  },
  { 
    id: 'arctic-silver', 
    name: 'Arctic', 
    colors: {
      primary: '#64748B',
      secondary: '#475569',
      accent: '#CBD5E1',
      glow: '#64748B'
    },
    isDark: true 
  },
  { 
    id: 'ember-glass', 
    name: 'Ember', 
    colors: {
      primary: '#EA580C',
      secondary: '#C2410C',
      accent: '#FB923C',
      glow: '#EA580C'
    },
    isDark: true 
  },
  { 
    id: 'midnight-navy', 
    name: 'Midnight', 
    colors: {
      primary: '#1E40AF',
      secondary: '#1D4ED8',
      accent: '#60A5FA',
      glow: '#1E40AF'
    },
    isDark: true 
  },
  { 
    id: 'verdant-jade', 
    name: 'Verdant', 
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#34D399',
      glow: '#059669'
    },
    isDark: true 
  },
  { 
    id: 'obsidian-black', 
    name: 'Obsidian', 
    colors: {
      primary: '#374151',
      secondary: '#1F2937',
      accent: '#6B7280',
      glow: '#374151'
    },
    isDark: true 
  },
  { 
    id: 'marble-white', 
    name: 'Marble', 
    colors: {
      primary: '#F3F4F6',
      secondary: '#E5E7EB',
      accent: '#FFFFFF',
      glow: '#F3F4F6'
    },
    isDark: true 
  },
  { 
    id: 'crimson-ember', 
    name: 'Crimson', 
    colors: {
      primary: '#DC2626',
      secondary: '#B91C1C',
      accent: '#F87171',
      glow: '#DC2626'
    },
    isDark: true 
  },
  { 
    id: 'sapphire-steel', 
    name: 'Sapphire', 
    colors: {
      primary: '#0284C7',
      secondary: '#0369A1',
      accent: '#38BDF8',
      glow: '#0284C7'
    },
    isDark: true 
  },
  { 
    id: 'onyx-frost', 
    name: 'Onyx', 
    colors: {
      primary: '#4B5563',
      secondary: '#374151',
      accent: '#9CA3AF',
      glow: '#4B5563'
    },
    isDark: true 
  },
  
  // Light Themes (10) - With Specified Colors
  { 
    id: 'royal-gold-light', 
    name: 'Aurora', 
    colors: {
      primary: '#F59E0B',
      secondary: '#FFFBF0',
      accent: '#FEF3C7',
      glow: '#F59E0B'
    },
    isDark: false 
  },
  { 
    id: 'arctic-silver-light', 
    name: 'Celeste', 
    colors: {
      primary: '#FFFFFF',
      secondary: '#DBEAFE',
      accent: '#BFDBFE',
      glow: '#3B82F6'
    },
    isDark: false 
  },
  { 
    id: 'ember-glass-light', 
    name: 'Ivory', 
    colors: {
      primary: '#FFF7ED',
      secondary: '#FFEDD5',
      accent: '#FED7AA',
      glow: '#FB923C'
    },
    isDark: false 
  },
  { 
    id: 'midnight-navy-light', 
    name: 'Solstice', 
    colors: {
      primary: '#DBEAFE',
      secondary: '#BFDBFE',
      accent: '#93C5FD',
      glow: '#3B82F6'
    },
    isDark: false 
  },
  { 
    id: 'verdant-jade-light', 
    name: 'Glacier', 
    colors: {
      primary: '#ECFDF5',
      secondary: '#D1FAE5',
      accent: '#A7F3D0',
      glow: '#10B981'
    },
    isDark: false 
  },
  { 
    id: 'obsidian-black-light', 
    name: 'Velour', 
    colors: {
      primary: '#F3F4F6',
      secondary: '#E5E7EB',
      accent: '#D1D5DB',
      glow: '#6B7280'
    },
    isDark: false 
  },
  { 
    id: 'marble-white-light', 
    name: 'Amberlight', 
    colors: {
      primary: '#FAFAFA',
      secondary: '#F5F5F5',
      accent: '#E5E5E5',
      glow: '#F59E0B'
    },
    isDark: false 
  },
  { 
    id: 'crimson-ember-light', 
    name: 'Titanium', 
    colors: {
      primary: '#FEF2F2',
      secondary: '#FEE2E2',
      accent: '#FECACA',
      glow: '#EF4444'
    },
    isDark: false 
  },
  { 
    id: 'sapphire-steel-light', 
    name: 'Coral', 
    colors: {
      primary: '#F0F9FF',
      secondary: '#E0F2FE',
      accent: '#BAE6FD',
      glow: '#0EA5E9'
    },
    isDark: false 
  },
  { 
    id: 'onyx-frost-light', 
    name: 'Eclipse', 
    colors: {
      primary: '#F9FAFB',
      secondary: '#F3F4F6',
      accent: '#E5E7EB',
      glow: '#374151'
    },
    isDark: false 
  }
] as const;

// 3D Textured Planet-like Orb Component
function AegisThemeOrb({ 
  themeConfig, 
  isActive, 
  isHovered,
  className = ''
}: { 
  themeConfig: typeof AEGIS_THEME_ORBS[0]; 
  isActive?: boolean; 
  isHovered?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div 
        className={`rounded-full transition-all duration-200 ${
          isActive 
            ? 'ring-2 ring-offset-2 ring-offset-background shadow-2xl scale-110' 
            : 'shadow-lg hover:shadow-xl'
        }`}
        style={{ 
          width: '32px',
          height: '32px',
          // Optimized 3D Background - Reduced Complexity
          backgroundColor: themeConfig.colors.primary,
          backgroundImage: `
            radial-gradient(circle at 30% 30%, ${themeConfig.colors.accent}, ${themeConfig.colors.primary}),
            radial-gradient(circle at 75% 75%, rgba(0,0,0,0.2) 0%, transparent 50%),
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 40%)
          `,
          backgroundSize: '100% 100%, 60% 60%, 50% 50%',
          backgroundPosition: 'center, center, center',
          backgroundRepeat: 'no-repeat',
          // Simplified Shadow Effects
          boxShadow: isActive 
            ? `0 0 16px ${themeConfig.colors.glow}, inset 0 1px 2px rgba(255,255,255,0.3), 0 6px 12px rgba(0,0,0,0.4), 0 0 0 2px ${themeConfig.colors.glow}`
            : isHovered 
              ? `0 0 12px ${themeConfig.colors.glow}60, inset 0 1px 2px rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.3)`
              : `inset 0 1px 2px rgba(255,255,255,0.2), 0 2px 6px rgba(0,0,0,0.3)`,
          // Optimized Filter Effects
          filter: isActive 
            ? `drop-shadow(0 0 8px ${themeConfig.colors.glow}) saturate(1.1)` 
            : isHovered 
              ? `drop-shadow(0 0 4px ${themeConfig.colors.glow}80) saturate(1.05)` 
              : 'saturate(1.0)',
          // Remove continuous animation - only on hover/active state changes
          transform: isActive ? 'rotate(0deg)' : 'rotate(0deg)',
          opacity: 1,
          isolation: 'isolate',
          // Simplified border
          border: `1px solid ${themeConfig.colors.glow}30`,
          // Hardware acceleration
          willChange: isActive || isHovered ? 'transform, filter, box-shadow' : 'auto'
        }}
      />
      
      {/* Active Ring Indicator */}
      {isActive && (
        <div 
          className="absolute inset-0 w-10 h-10 rounded-full transition-all duration-300"
          style={{ 
            background: `radial-gradient(circle at 30% 30%, ${themeConfig.colors.glow}40, ${themeConfig.colors.glow}20 40%, transparent 70%)`,
            opacity: 0.6,
            zIndex: -1,
            boxShadow: `0 0 20px ${themeConfig.colors.glow}60`,
            filter: 'blur(4px)',
            animation: 'aegis-pulse 2s ease-in-out infinite'
          }}
        />
      )}
    </div>
  );
}

export function VerticalThemeSelector({ className }: VerticalThemeSelectorProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('royal-gold');
  const [themeScope, setLocalThemeScope] = useState<'global' | 'page'>('global');
  const [isOpen, setIsOpen] = useState(false);
  const [showDarkThemes, setShowDarkThemes] = useState(true);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const theme = getCurrentTheme();
      setCurrentTheme(theme);
      setLocalThemeScope(getThemeScope());
      setShowDarkThemes(!theme.includes('light'));
      applyTheme(theme);
    } catch (error) {
      console.error('Error initializing AEGIS theme selector:', error);
      setCurrentTheme('royal-gold');
      setLocalThemeScope('global');
    }
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      const themesToShow = AEGIS_THEME_ORBS.filter(t => showDarkThemes ? t.isDark : !t.isDark);
      const currentIndex = themesToShow.findIndex(t => t.id === currentTheme);
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % themesToShow.length;
        handleThemeChange(themesToShow[nextIndex].id as ThemeId);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? themesToShow.length - 1 : currentIndex - 1;
        handleThemeChange(themesToShow[prevIndex].id as ThemeId);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentTheme, showDarkThemes]);

  const handleThemeChange = (themeId: ThemeId) => {
    try {
      console.log('🎨 Theme selector requesting theme change to:', themeId);
      const result = applyTheme(themeId);
      setThemeScope(themeScope);
      setCurrentTheme(themeId);
      setShowDarkThemes(!themeId.includes('light'));
      console.log('✅ Theme selector change completed:', result?.name);
      // Don't close dropdown immediately for better UX
    } catch (error) {
      console.error('❌ Error changing AEGIS theme from selector:', error);
    }
  };

  const currentThemeConfig = AEGIS_THEME_ORBS.find(t => t.id === currentTheme) || AEGIS_THEME_ORBS[0];
  const themesToShow = AEGIS_THEME_ORBS.filter(t => showDarkThemes ? t.isDark : !t.isDark);
  const isDarkMode = showDarkThemes;

  return (
    <div className="fixed top-4 left-4 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="h-7 px-2 rounded-lg transition-all duration-200 border"
            style={{
              background: 'transparent',
              borderColor: isDarkMode 
                ? 'rgba(212, 175, 55, 0.3)' 
                : 'rgba(156, 163, 175, 0.4)',
              boxShadow: `0 0 0 0 ${currentThemeConfig.colors.glow}40`,
              backdropFilter: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 20px ${currentThemeConfig.colors.glow}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 0 ${currentThemeConfig.colors.glow}40`;
            }}
            aria-label="AEGIS Theme Selector"
            title="Select AEGIS Theme"
          >
            <AegisThemeOrb themeConfig={currentThemeConfig} isActive={true} className="mr-1" />
            <span 
              className="text-xs font-medium"
              style={{ 
                color: isDarkMode ? '#E7E9EC' : '#0C0F13' 
              }}
            >
              {currentThemeConfig.name}
            </span>
          </Button>
        </DropdownMenuTrigger>
      
        <DropdownMenuContent 
          align="end" 
          className="w-12 max-h-[400px] border-0 p-0 overflow-hidden"
          style={{
            background: isDarkMode 
              ? 'rgba(12, 15, 19, 0.95)' 
              : 'rgba(255, 255, 255, 0.95)',
            border: isDarkMode 
              ? '1px solid rgba(212, 175, 55, 0.3)' 
              : '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px',
            boxShadow: isDarkMode
              ? '0 0 30px rgba(212, 175, 55, 0.2)'
              : '0 0 30px rgba(59, 130, 246, 0.15)',
            backdropFilter: 'none',
            animation: 'dropdown-fade-in 200ms ease-out'
          }}
          sideOffset={8}
        >
          {/* Header with Theme Mode Toggle */}
          <div 
            className="p-1 border-b"
            style={{
              borderColor: isDarkMode 
                ? 'rgba(212, 175, 55, 0.2)' 
                : 'rgba(59, 130, 246, 0.2)',
              background: isDarkMode 
                ? 'rgba(18, 22, 28, 0.5)' 
                : 'rgba(248, 250, 252, 0.8)',
              width: '48px',
              minWidth: '48px',
              maxWidth: '48px'
            }}
          >
            <div className="flex flex-col items-start justify-center gap-1 px-[5px] py-[0px]">
              <button
                onClick={() => setShowDarkThemes(true)}
                className={`w-8 h-8 rounded-md transition-all flex items-center justify-center ${
                  showDarkThemes 
                    ? 'bg-opacity-80' 
                    : 'hover:bg-opacity-20'
                }`}
                style={{
                  backgroundColor: showDarkThemes 
                    ? 'rgba(212, 175, 55, 0.8)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  backgroundImage: `url(${moonIcon})`,
                  backgroundSize: '32px 32px',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
                title="Dark Themes"
              />
              <button
                onClick={() => setShowDarkThemes(false)}
                className={`w-8 h-8 rounded-md transition-all flex items-center justify-center ${
                  !showDarkThemes 
                    ? 'bg-opacity-80' 
                    : 'hover:bg-opacity-20'
                }`}
                style={{
                  backgroundColor: !showDarkThemes 
                    ? 'rgba(212, 175, 55, 0.8)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  backgroundImage: `url(${sunIcon})`,
                  backgroundSize: '32px 32px',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
                title="Light Themes"
              />
            </div>
          </div>

          {/* Theme Options with Vertical Scroll */}
          <div className="p-2" ref={scrollContainerRef}>
            <div 
              className="max-h-[320px] overflow-y-auto space-y-2 pr-1 institutional-scroll"
              style={{
                background: 'transparent',
                backdropFilter: 'none',
                width: '60px',
                minWidth: '60px',
                maxWidth: '60px',
                scrollbarWidth: 'thin',
                scrollbarColor: isDarkMode 
                  ? 'rgba(212, 175, 55, 0.3) transparent'
                  : 'rgba(156, 163, 175, 0.4) transparent'
              }}
            >
              {themesToShow.map((themeConfig) => {
                const isActive = currentTheme === themeConfig.id;
                const isHovered = hoveredTheme === themeConfig.id;
                
                return (
                  <button
                    key={themeConfig.id}
                    onClick={() => handleThemeChange(themeConfig.id as ThemeId)}
                    onMouseEnter={() => setHoveredTheme(themeConfig.id)}
                    onMouseLeave={() => setHoveredTheme(null)}
                    className={`
                      flex items-center justify-center p-0.5 rounded cursor-pointer transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-offset-2
                    `}
                    style={{
                      background: 'transparent',
                      border: isActive 
                        ? '1px solid rgba(212, 175, 55, 0.4)' 
                        : '1px solid transparent',
                      focusRingColor: 'rgba(212, 175, 55, 0.5)',
                      transform: isHovered ? 'translateX(1px)' : 'translateX(0)',
                      width: '48px',
                      minWidth: '48px',
                      maxWidth: '48px',
                      height: '48px'
                    }}
                    aria-label={`Apply ${themeConfig.name} theme`}
                    title={`Apply ${themeConfig.name} theme`}
                  >
                    <AegisThemeOrb 
                      themeConfig={themeConfig} 
                      isActive={isActive} 
                      isHovered={isHovered}
                      className="flex-shrink-0 w-10 h-10"
                    />
                  </button>
                );
              })}
            </div>
          </div>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}