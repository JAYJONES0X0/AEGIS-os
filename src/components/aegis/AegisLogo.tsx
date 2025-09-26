import React, { useState, useEffect, useMemo } from 'react';
import { getCurrentTheme, type ThemeId } from '../../lib/theme-system';

// Import all logo variant assets
import goldenInfinityBackground from 'figma:asset/84f9bbba063a068a05f4226ec41db1c74ab17300.png';

type AegisLogoVariant = 
  | 'royal-dark' | 'royal-light'
  | 'arctic-dark' | 'arctic-light'
  | 'ember-dark' | 'ember-light'
  | 'midnight-dark' | 'midnight-light'
  | 'verdant-dark' | 'verdant-light'
  | 'obsidian-dark' | 'obsidian-light'
  | 'marble-dark' | 'marble-light'
  | 'crimson-dark' | 'crimson-light'
  | 'sapphire-dark' | 'sapphire-light'
  | 'onyx-dark' | 'onyx-light';

interface AegisLogoProps {
  variant?: AegisLogoVariant;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'central';
  showBackground?: boolean;
  enableAnimation?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// Theme mapping for automatic variant detection
const THEME_TO_VARIANT_MAP: Record<ThemeId, { dark: AegisLogoVariant; light: AegisLogoVariant }> = {
  'royal-gold': { dark: 'royal-dark', light: 'royal-light' },
  'arctic-silver': { dark: 'arctic-dark', light: 'arctic-light' },
  'ember-glass': { dark: 'ember-dark', light: 'ember-light' },
  'midnight-navy': { dark: 'midnight-dark', light: 'midnight-light' },
  'verdant-jade': { dark: 'verdant-dark', light: 'verdant-light' },
  'obsidian-black': { dark: 'obsidian-dark', light: 'obsidian-light' },
  'marble-white': { dark: 'marble-dark', light: 'marble-light' },
  'crimson-ember': { dark: 'crimson-dark', light: 'crimson-light' },
  'sapphire-steel': { dark: 'sapphire-dark', light: 'sapphire-light' },
  'onyx-frost': { dark: 'onyx-dark', light: 'onyx-light' }
};

// Size configurations
const SIZE_CONFIGS = {
  sm: {
    logoSize: '3rem',
    outerGlow: '3rem',
    innerGlow: '2.5rem',
    glowBlur: '8px',
    innerBlur: '4px'
  },
  md: {
    logoSize: '5rem',
    outerGlow: '5rem',
    innerGlow: '4rem',
    glowBlur: '12px',
    innerBlur: '6px'
  },
  lg: {
    logoSize: '8rem',
    outerGlow: '8rem',
    innerGlow: '6rem',
    glowBlur: '16px',
    innerBlur: '8px'
  },
  xl: {
    logoSize: '12rem',
    outerGlow: '12rem',
    innerGlow: '10rem',
    glowBlur: '24px',
    innerBlur: '12px'
  },
  central: {
    logoSize: '25vw',
    outerGlow: '25vw',
    innerGlow: '25vw',
    glowBlur: '20px',
    innerBlur: '10px'
  }
};

// Theme-specific logo styling configurations
const LOGO_THEME_STYLES = {
  // Dark variants
  'royal-dark': {
    filter: 'drop-shadow(0 0 40px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 80px rgba(212, 175, 55, 0.3)) saturate(1.3) brightness(1.2) contrast(1.1)',
    pulseFilter: 'drop-shadow(0 0 55px rgba(212, 175, 55, 0.9)) drop-shadow(0 0 100px rgba(212, 175, 55, 0.5)) saturate(1.4) brightness(1.3) contrast(1.15)',
    outerGlow: 'rgba(212, 175, 55, 0.15)',
    innerGlow: 'rgba(212, 175, 55, 0.20)',
    hue: 0
  },
  'arctic-dark': {
    filter: 'drop-shadow(0 0 30px rgba(148, 163, 184, 0.4)) saturate(1.1) brightness(1.1) contrast(1.05)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(148, 163, 184, 0.7)) saturate(1.2) brightness(1.2) contrast(1.1)',
    outerGlow: 'rgba(148, 163, 184, 0.15)',
    innerGlow: 'rgba(148, 163, 184, 0.20)',
    hue: 215
  },
  'ember-dark': {
    filter: 'drop-shadow(0 0 30px rgba(251, 146, 60, 0.4)) saturate(1.1) brightness(1.1) contrast(1.05)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(251, 146, 60, 0.7)) saturate(1.2) brightness(1.2) contrast(1.1)',
    outerGlow: 'rgba(251, 146, 60, 0.15)',
    innerGlow: 'rgba(251, 146, 60, 0.20)',
    hue: 25
  },
  'midnight-dark': {
    filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.4)) saturate(1.1) brightness(1.1) contrast(1.05)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(59, 130, 246, 0.7)) saturate(1.2) brightness(1.2) contrast(1.1)',
    outerGlow: 'rgba(59, 130, 246, 0.15)',
    innerGlow: 'rgba(59, 130, 246, 0.20)',
    hue: 220
  },
  'verdant-dark': {
    filter: 'drop-shadow(0 0 30px rgba(16, 185, 129, 0.4)) saturate(1.1) brightness(1.1) contrast(1.05)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(16, 185, 129, 0.7)) saturate(1.2) brightness(1.2) contrast(1.1)',
    outerGlow: 'rgba(16, 185, 129, 0.15)',
    innerGlow: 'rgba(16, 185, 129, 0.20)',
    hue: 160
  },
  'obsidian-dark': {
    filter: 'drop-shadow(0 0 30px rgba(107, 114, 128, 0.4)) saturate(1.1) brightness(1.1) contrast(1.05)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(107, 114, 128, 0.7)) saturate(1.2) brightness(1.2) contrast(1.1)',
    outerGlow: 'rgba(107, 114, 128, 0.15)',
    innerGlow: 'rgba(107, 114, 128, 0.20)',
    hue: 210
  },
  'marble-dark': {
    filter: 'drop-shadow(0 0 30px rgba(229, 231, 235, 0.4)) saturate(1.1) brightness(1.1) contrast(1.05)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(229, 231, 235, 0.7)) saturate(1.2) brightness(1.2) contrast(1.1)',
    outerGlow: 'rgba(229, 231, 235, 0.15)',
    innerGlow: 'rgba(229, 231, 235, 0.20)',
    hue: 0
  },
  'crimson-dark': {
    filter: 'drop-shadow(0 0 30px rgba(239, 68, 68, 0.4)) saturate(1.1) brightness(1.1) contrast(1.05)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(239, 68, 68, 0.7)) saturate(1.2) brightness(1.2) contrast(1.1)',
    outerGlow: 'rgba(239, 68, 68, 0.15)',
    innerGlow: 'rgba(239, 68, 68, 0.20)',
    hue: 0
  },
  'sapphire-dark': {
    filter: 'drop-shadow(0 0 30px rgba(14, 165, 233, 0.4)) saturate(1.1) brightness(1.1) contrast(1.05)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(14, 165, 233, 0.7)) saturate(1.2) brightness(1.2) contrast(1.1)',
    outerGlow: 'rgba(14, 165, 233, 0.15)',
    innerGlow: 'rgba(14, 165, 233, 0.20)',
    hue: 200
  },
  'onyx-dark': {
    filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.4)) saturate(1.1) brightness(1.1) contrast(1.05)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(139, 92, 246, 0.7)) saturate(1.2) brightness(1.2) contrast(1.1)',
    outerGlow: 'rgba(139, 92, 246, 0.15)',
    innerGlow: 'rgba(139, 92, 246, 0.20)',
    hue: 260
  },
  
  // Light variants - Enhanced for dark textured backgrounds
  'royal-light': {
    filter: 'drop-shadow(0 0 45px rgba(217, 119, 6, 0.7)) drop-shadow(0 0 90px rgba(217, 119, 6, 0.4)) saturate(1.4) brightness(1.3) contrast(1.2)',
    pulseFilter: 'drop-shadow(0 0 60px rgba(217, 119, 6, 1.0)) drop-shadow(0 0 110px rgba(217, 119, 6, 0.6)) saturate(1.5) brightness(1.4) contrast(1.25)',
    outerGlow: 'rgba(217, 119, 6, 0.15)',
    innerGlow: 'rgba(217, 119, 6, 0.20)',
    hue: 35
  },
  'arctic-light': {
    filter: 'drop-shadow(0 0 30px rgba(100, 116, 139, 0.4)) saturate(1.1) brightness(1.2) contrast(1.1)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(100, 116, 139, 0.7)) saturate(1.2) brightness(1.3) contrast(1.15)',
    outerGlow: 'rgba(100, 116, 139, 0.15)',
    innerGlow: 'rgba(100, 116, 139, 0.20)',
    hue: 215
  },
  'ember-light': {
    filter: 'drop-shadow(0 0 30px rgba(234, 88, 12, 0.4)) saturate(1.1) brightness(1.2) contrast(1.1)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(234, 88, 12, 0.7)) saturate(1.2) brightness(1.3) contrast(1.15)',
    outerGlow: 'rgba(234, 88, 12, 0.15)',
    innerGlow: 'rgba(234, 88, 12, 0.20)',
    hue: 25
  },
  'midnight-light': {
    filter: 'drop-shadow(0 0 30px rgba(37, 99, 235, 0.4)) saturate(1.1) brightness(1.2) contrast(1.1)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(37, 99, 235, 0.7)) saturate(1.2) brightness(1.3) contrast(1.15)',
    outerGlow: 'rgba(37, 99, 235, 0.15)',
    innerGlow: 'rgba(37, 99, 235, 0.20)',
    hue: 220
  },
  'verdant-light': {
    filter: 'drop-shadow(0 0 30px rgba(5, 150, 105, 0.4)) saturate(1.1) brightness(1.2) contrast(1.1)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(5, 150, 105, 0.7)) saturate(1.2) brightness(1.3) contrast(1.15)',
    outerGlow: 'rgba(5, 150, 105, 0.15)',
    innerGlow: 'rgba(5, 150, 105, 0.20)',
    hue: 160
  },
  'obsidian-light': {
    filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.4)) saturate(1.1) brightness(1.2) contrast(1.1)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(139, 92, 246, 0.7)) saturate(1.2) brightness(1.3) contrast(1.15)',
    outerGlow: 'rgba(139, 92, 246, 0.15)',
    innerGlow: 'rgba(139, 92, 246, 0.20)',
    hue: 260
  },
  'marble-light': {
    filter: 'drop-shadow(0 0 30px rgba(113, 113, 122, 0.4)) saturate(1.1) brightness(1.2) contrast(1.1)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(113, 113, 122, 0.7)) saturate(1.2) brightness(1.3) contrast(1.15)',
    outerGlow: 'rgba(113, 113, 122, 0.15)',
    innerGlow: 'rgba(113, 113, 122, 0.20)',
    hue: 0
  },
  'crimson-light': {
    filter: 'drop-shadow(0 0 30px rgba(220, 38, 38, 0.4)) saturate(1.1) brightness(1.2) contrast(1.1)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(220, 38, 38, 0.7)) saturate(1.2) brightness(1.3) contrast(1.15)',
    outerGlow: 'rgba(220, 38, 38, 0.15)',
    innerGlow: 'rgba(220, 38, 38, 0.20)',
    hue: 0
  },
  'sapphire-light': {
    filter: 'drop-shadow(0 0 30px rgba(2, 132, 199, 0.4)) saturate(1.1) brightness(1.2) contrast(1.1)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(2, 132, 199, 0.7)) saturate(1.2) brightness(1.3) contrast(1.15)',
    outerGlow: 'rgba(2, 132, 199, 0.15)',
    innerGlow: 'rgba(2, 132, 199, 0.20)',
    hue: 200
  },
  'onyx-light': {
    filter: 'drop-shadow(0 0 30px rgba(16, 185, 129, 0.4)) saturate(1.1) brightness(1.2) contrast(1.1)',
    pulseFilter: 'drop-shadow(0 0 45px rgba(16, 185, 129, 0.7)) saturate(1.2) brightness(1.3) contrast(1.15)',
    outerGlow: 'rgba(16, 185, 129, 0.15)',
    innerGlow: 'rgba(16, 185, 129, 0.20)',
    hue: 160
  }
};

export function AegisLogo({
  variant,
  size = 'md',
  showBackground = true,
  enableAnimation = true,
  className = '',
  style = {},
  onClick
}: AegisLogoProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('royal-gold');
  const [isLightMode, setIsLightMode] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  // Monitor theme and light mode changes
  useEffect(() => {
    const updateTheme = () => {
      const theme = getCurrentTheme();
      const isLight = document.documentElement.classList.contains('light');
      setCurrentTheme(theme);
      setIsLightMode(isLight);
    };

    // Initial update
    updateTheme();

    // Monitor theme changes
    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Determine active variant
  const activeVariant = useMemo(() => {
    if (variant) return variant;
    
    const themeMapping = THEME_TO_VARIANT_MAP[currentTheme];
    if (!themeMapping) return 'royal-dark';
    
    return isLightMode ? themeMapping.light : themeMapping.dark;
  }, [variant, currentTheme, isLightMode]);

  // Get theme style configuration
  const themeStyle = LOGO_THEME_STYLES[activeVariant];
  const sizeConfig = SIZE_CONFIGS[size];

  // Handle pulse animation trigger
  useEffect(() => {
    if (!enableAnimation) return;

    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 2000);
    }, 8000);

    return () => clearInterval(pulseInterval);
  }, [enableAnimation]);

  return (
    <div 
      className={`aegis-logo-container relative ${className}`}
      style={{
        width: sizeConfig.logoSize,
        height: sizeConfig.logoSize,
        ...style
      }}
      onClick={onClick}
    >
      {/* Background Glow Layers */}
      {showBackground && (
        <>
          {/* Outer Radial Vignette */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${themeStyle.outerGlow} 0%, ${themeStyle.outerGlow.replace('0.15', '0.08')} 30%, ${themeStyle.outerGlow.replace('0.15', '0.03')} 60%, transparent 100%)`,
              filter: sizeConfig.glowBlur,
              transition: 'all 400ms cubic-bezier(0.19, 1, 0.22, 1)'
            }}
          />
          
          {/* Inner Glow */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${themeStyle.innerGlow} 0%, ${themeStyle.innerGlow.replace('0.20', '0.10')} 40%, transparent 70%)`,
              filter: sizeConfig.innerBlur,
              transition: 'all 400ms cubic-bezier(0.19, 1, 0.22, 1)'
            }}
          />
        </>
      )}

      {/* Main Logo */}
      <img 
        src={goldenInfinityBackground} 
        alt="AEGIS Logo" 
        className="absolute inset-0 w-full h-full select-none"
        style={{
          filter: isPulsing && enableAnimation ? themeStyle.pulseFilter : themeStyle.filter,
          transform: isPulsing && enableAnimation ? 'scale(1.02)' : 'scale(1)',
          transition: enableAnimation ? 'all 400ms cubic-bezier(0.19, 1, 0.22, 1)' : 'filter 400ms cubic-bezier(0.19, 1, 0.22, 1)',
          imageRendering: 'crisp-edges',
          zIndex: 5
        }}
      />

      {/* Animation overlay for pulse effects */}
      {enableAnimation && isPulsing && (
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${themeStyle.innerGlow.replace('0.20', '0.05')} 0%, transparent 60%)`,
            animation: 'aegis-logo-pulse-overlay 2s ease-out',
            zIndex: 6
          }}
        />
      )}
    </div>
  );
}

// Export utilities for 4K PNG generation and JSON token mapping
export const exportAegisLogoVariants = () => {
  const variants: Record<string, any> = {};
  
  Object.keys(LOGO_THEME_STYLES).forEach(variant => {
    variants[`aegis-logo-${variant}.png`] = {
      variant,
      size: 'xl',
      resolution: '4K',
      format: 'PNG',
      transparent: true,
      config: LOGO_THEME_STYLES[variant as AegisLogoVariant]
    };
  });

  return {
    variants,
    mapping: THEME_TO_VARIANT_MAP,
    sizeConfigs: SIZE_CONFIGS,
    themeStyles: LOGO_THEME_STYLES
  };
};

// JSON token mapping for developers
export const aegisLogoTokens = {
  variants: Object.keys(LOGO_THEME_STYLES),
  sizes: Object.keys(SIZE_CONFIGS),
  themeMapping: THEME_TO_VARIANT_MAP,
  exportFormats: ['PNG', 'SVG', 'WebP'],
  resolutions: ['1K', '2K', '4K', '8K'],
  features: [
    'theme-aware',
    'animated-pulse',
    'responsive-sizing',
    'background-toggle',
    'click-handler',
    'export-ready'
  ]
};

export default AegisLogo;