import React, { useState, useEffect, useMemo } from 'react';
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

// Optimized theme configuration
const THEME_CONFIGS = [
  { id: 'royal-gold', name: 'Royal', primary: '#D4AF37', glow: '#D4AF37', isDark: true },
  { id: 'arctic-silver', name: 'Arctic', primary: '#64748B', glow: '#64748B', isDark: true },
  { id: 'ember-glass', name: 'Ember', primary: '#EA580C', glow: '#EA580C', isDark: true },
  { id: 'midnight-navy', name: 'Midnight', primary: '#1E40AF', glow: '#1E40AF', isDark: true },
  { id: 'verdant-jade', name: 'Verdant', primary: '#059669', glow: '#059669', isDark: true },
  { id: 'royal-gold-light', name: 'Aurora', primary: '#F59E0B', glow: '#F59E0B', isDark: false },
  { id: 'arctic-silver-light', name: 'Celeste', primary: '#3B82F6', glow: '#3B82F6', isDark: false },
] as const;

// Simplified orb component
function SimpleThemeOrb({ config, isActive }: { config: typeof THEME_CONFIGS[0]; isActive?: boolean }) {
  return (
    <div 
      className={`w-6 h-6 rounded-full transition-all duration-200 ${isActive ? 'ring-1 ring-offset-1 scale-110' : ''}`}
      style={{ 
        backgroundColor: config.primary,
        boxShadow: isActive ? `0 0 8px ${config.glow}80` : 'none'
      }}
    />
  );
}

export function VerticalThemeSelector({ className }: VerticalThemeSelectorProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('royal-gold');
  const [themeScope, setLocalThemeScope] = useState<'global' | 'page'>('global');
  const [isOpen, setIsOpen] = useState(false);
  const [showDarkThemes, setShowDarkThemes] = useState(true);

  useEffect(() => {
    try {
      const theme = getCurrentTheme();
      setCurrentTheme(theme);
      setLocalThemeScope(getThemeScope());
      setShowDarkThemes(!theme.includes('light'));
    } catch (error) {
      console.error('Error initializing theme selector:', error);
    }
  }, []);

  const handleThemeChange = (themeId: ThemeId) => {
    try {
      applyTheme(themeId);
      setCurrentTheme(themeId);
      setShowDarkThemes(!themeId.includes('light'));
    } catch (error) {
      console.error('Error changing theme:', error);
    }
  };

  const currentConfig = useMemo(() => 
    THEME_CONFIGS.find(t => t.id === currentTheme) || THEME_CONFIGS[0], 
    [currentTheme]
  );
  
  const themesToShow = useMemo(() => 
    THEME_CONFIGS.filter(t => showDarkThemes ? t.isDark : !t.isDark), 
    [showDarkThemes]
  );

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="h-6 px-2 rounded-md transition-all border"
            style={{
              background: 'transparent',
              borderColor: 'rgba(212, 175, 55, 0.3)',
              backdropFilter: 'none'
            }}
          >
            <SimpleThemeOrb config={currentConfig} isActive />
            <span className="text-xs ml-1">{currentConfig.name}</span>
          </Button>
        </DropdownMenuTrigger>
      
        <DropdownMenuContent 
          align="end" 
          className="w-10 max-h-80 border-0 p-1"
          style={{
            background: 'rgba(18, 22, 28, 0.95)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '8px'
          }}
        >
          {/* Theme Mode Toggle */}
          <div className="flex flex-col gap-1 mb-2">
            <button
              onClick={() => setShowDarkThemes(true)}
              className="w-8 h-6 rounded flex items-center justify-center"
              style={{
                backgroundColor: showDarkThemes ? 'rgba(212, 175, 55, 0.8)' : 'transparent',
                backgroundImage: `url(${moonIcon})`,
                backgroundSize: '14px 14px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            <button
              onClick={() => setShowDarkThemes(false)}
              className="w-8 h-6 rounded flex items-center justify-center"
              style={{
                backgroundColor: !showDarkThemes ? 'rgba(212, 175, 55, 0.8)' : 'transparent',
                backgroundImage: `url(${sunIcon})`,
                backgroundSize: '14px 14px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>

          {/* Theme Options */}
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {themesToShow.map((config) => (
              <button
                key={config.id}
                onClick={() => handleThemeChange(config.id as ThemeId)}
                className="w-8 h-8 flex items-center justify-center rounded transition-all"
                style={{
                  border: currentTheme === config.id ? '1px solid rgba(212, 175, 55, 0.5)' : '1px solid transparent'
                }}
              >
                <SimpleThemeOrb config={config} isActive={currentTheme === config.id} />
              </button>
            ))}
          </div>
          
          {/* Scope Selector */}
          <div className="border-t border-gray-600 pt-2 mt-2">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => {
                  setThemeScope('page');
                  setLocalThemeScope('page');
                }}
                className="w-8 h-6 rounded flex items-center justify-center"
                style={{ 
                  backgroundColor: themeScope === 'page' ? 'rgba(212, 175, 55, 0.8)' : 'transparent',
                  backgroundImage: `url(${pageIcon})`,
                  backgroundSize: '12px 12px',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <button
                onClick={() => {
                  setThemeScope('global');
                  setLocalThemeScope('global');
                }}
                className="w-8 h-6 rounded flex items-center justify-center"
                style={{ 
                  backgroundColor: themeScope === 'global' ? 'rgba(212, 175, 55, 0.8)' : 'transparent',
                  backgroundImage: `url(${globalIcon})`,
                  backgroundSize: '12px 12px',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}