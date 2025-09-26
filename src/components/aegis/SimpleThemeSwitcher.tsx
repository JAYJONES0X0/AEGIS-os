import React, { useState, useEffect } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { ThemeId, applyTheme, getCurrentTheme } from '../../lib/theme-system';

// Complete AEGIS Theme Configuration - All 20 Themes Restored
const THEME_PALETTES = [
  // Dark Themes
  { id: 'royal-gold', name: 'Royal', color: '#D4AF37', isDark: true },
  { id: 'arctic-silver', name: 'Arctic', color: '#64748B', isDark: true },
  { id: 'ember-glass', name: 'Ember', color: '#EA580C', isDark: true },
  { id: 'midnight-navy', name: 'Midnight', color: '#1E40AF', isDark: true },
  { id: 'verdant-jade', name: 'Verdant', color: '#059669', isDark: true },
  { id: 'obsidian-black', name: 'Obsidian', color: '#374151', isDark: true },
  { id: 'marble-white', name: 'Marble', color: '#F3F4F6', isDark: true },
  { id: 'crimson-ember', name: 'Crimson', color: '#DC2626', isDark: true },
  { id: 'sapphire-steel', name: 'Sapphire', color: '#0284C7', isDark: true },
  { id: 'onyx-frost', name: 'Onyx', color: '#4B5563', isDark: true },
  
  // Light Themes
  { id: 'royal-gold-light', name: 'Aurora', color: '#F59E0B', isDark: false },
  { id: 'arctic-silver-light', name: 'Celeste', color: '#3B82F6', isDark: false },
  { id: 'ember-glass-light', name: 'Ivory', color: '#FB923C', isDark: false },
  { id: 'midnight-navy-light', name: 'Solstice', color: '#3B82F6', isDark: false },
  { id: 'verdant-jade-light', name: 'Glacier', color: '#10B981', isDark: false },
  { id: 'obsidian-black-light', name: 'Velour', color: '#6B7280', isDark: false },
  { id: 'marble-white-light', name: 'Amberlight', color: '#F59E0B', isDark: false },
  { id: 'crimson-ember-light', name: 'Titanium', color: '#EF4444', isDark: false },
  { id: 'sapphire-steel-light', name: 'Coral', color: '#0EA5E9', isDark: false },
  { id: 'onyx-frost-light', name: 'Eclipse', color: '#374151', isDark: false }
] as const;

export const SimpleThemeSwitcher = React.memo(function SimpleThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('royal-gold');
  const [isOpen, setIsOpen] = useState(false);
  const [showDarkThemes, setShowDarkThemes] = useState(true);

  useEffect(() => {
    // Lightweight initialization only
    try {
      const theme = getCurrentTheme();
      setCurrentTheme(theme);
      setShowDarkThemes(!theme.includes('light'));
    } catch (error) {
      // Silent fallback to prevent blocking
      setCurrentTheme('royal-gold');
    }
  }, []);

  const handleThemeChange = (themeId: ThemeId) => {
    try {
      // Force theme application with animations
      applyTheme(themeId, true);
      setCurrentTheme(themeId);
      setShowDarkThemes(!themeId.includes('light'));
      setIsOpen(false);
      
      // Force a small delay to ensure CSS variables are applied
      setTimeout(() => {
        document.documentElement.style.setProperty('--force-rerender', Math.random().toString());
      }, 50);
    } catch (error) {
      console.error('Theme change failed:', error);
    }
  };

  const currentPalette = THEME_PALETTES.find(p => p.id === currentTheme) || THEME_PALETTES[0];
  const palettesToShow = THEME_PALETTES.filter(p => showDarkThemes ? p.isDark : !p.isDark);

  return (
    <div className="simple-theme-switcher-fixed">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button 
            className="theme-switcher-button rounded-full transition-all duration-200 hover:scale-105 flex items-center justify-center"
            style={{
              width: '20px',
              height: '20px',
              background: currentPalette.color,
              color: currentPalette.color,
              transform: 'translateY(10px)'
            }}
            title={`Theme: ${currentPalette.name}`}
          />
        </DropdownMenuTrigger>
      
        <DropdownMenuContent 
          align="end" 
          className="border-0 p-1"
          style={{
            background: 'rgba(0,0,0,0.8)',
            borderRadius: '8px',
            width: 'fit-content',
            minWidth: '28px'
          }}
          sideOffset={4}
        >
          {/* Mode Toggle */}
          <div className="flex flex-col gap-px mb-1 p-1">
            <button
              onClick={() => setShowDarkThemes(true)}
              className={`w-5 h-5 rounded text-xs transition-all ${
                showDarkThemes ? 'bg-white/20 text-white' : 'text-white/60'
              }`}
            >
              🌙
            </button>
            <button
              onClick={() => setShowDarkThemes(false)}  
              className={`w-5 h-5 rounded text-xs transition-all ${
                !showDarkThemes ? 'bg-white/20 text-white' : 'text-white/60'
              }`}
            >
              ☀️
            </button>
          </div>

          {/* Simplified Theme Grid */}
          <div className="grid grid-cols-1 gap-1">
            {palettesToShow.map((palette) => (
              <button
                key={palette.id}
                onClick={() => handleThemeChange(palette.id as ThemeId)}
                className="rounded-full transition-all duration-200 hover:scale-110"
                style={{ 
                  width: '20px',
                  height: '20px',
                  background: palette.color,
                  border: currentTheme === palette.id ? `2px solid ${palette.color}` : '1px solid rgba(255,255,255,0.1)'
                }}
                title={palette.name}
              />
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});