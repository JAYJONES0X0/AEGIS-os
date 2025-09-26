import React from 'react';
import { type ThemeId, AEGIS_THEMES } from '../../lib/theme-system';

interface CeremonialOrbsProps {
  theme: ThemeId | 'finance' | 'healthcare' | 'workforce' | 'quality' | 'inventory' | 'command';
  className?: string;
}

/**
 * AEGIS 3D Textured Orbs - Divine Design Language v1.1 (Performance Optimized)
 * 
 * Creates stunning 3D textured spheres with theme-reactive behaviors.
 * Features optimized rendering and reduced computational overhead.
 * Integrates seamlessly with DomainBackgrounds golden orb system.
 */
export function CeremonialOrbs({ theme, className = '' }: CeremonialOrbsProps) {
  // Performance guard - only render on client
  const shouldRenderOrbs = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    // Reduced processing check
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Normalize legacy theme names to new system
  const normalizedTheme = React.useMemo(() => {
    switch (theme) {
      case 'finance': return 'ember-glass';
      case 'healthcare': return 'arctic-silver';
      case 'workforce': return 'verdant-jade';
      case 'quality': return 'royal-gold';
      case 'inventory': return 'sapphire-steel';
      case 'command': return 'royal-gold';
      default: return theme as ThemeId;
    }
  }, [theme]);

  // Check if we're using a theme with golden background
  const hasGoldenBackground = React.useMemo(() => {
    const goldenThemes = ['royal-gold', 'royal-gold-light', 'ember-glass', 'ember-glass-light'];
    return goldenThemes.includes(normalizedTheme);
  }, [normalizedTheme]);

  // Get inverse theme colors - optimized without debug logging
  const getInverseColors = React.useMemo(() => {
    const currentTheme = AEGIS_THEMES[normalizedTheme];
    if (!currentTheme) {
      return {
        primary: '#FFFFFF',
        secondary: '#E5E7EB', 
        tertiary: '#9CA3AF'
      };
    }

    // Simple light/dark detection
    const isLightTheme = normalizedTheme.includes('-light') || 
                        currentTheme.tokens.bg.startsWith('#F') || 
                        currentTheme.tokens.bg.startsWith('#E') ||
                        currentTheme.tokens.bg === '#FFFFFF';

    if (isLightTheme) {
      // For light themes, get dark counterpart
      const baseName = normalizedTheme.replace('-light', '') as ThemeId;
      const darkTheme = AEGIS_THEMES[baseName];
      
      if (darkTheme) {
        return {
          primary: darkTheme.tokens.accent,
          secondary: darkTheme.tokens.text,
          tertiary: darkTheme.tokens.textMuted
        };
      }
      
      return {
        primary: '#1F2937',
        secondary: '#374151', 
        tertiary: '#6B7280'
      };
    } else {
      // For dark themes, get light counterpart
      const lightName = `${normalizedTheme}-light` as ThemeId;
      const lightTheme = AEGIS_THEMES[lightName];
      
      if (lightTheme) {
        return {
          primary: lightTheme.tokens.accent,
          secondary: lightTheme.tokens.text,
          tertiary: lightTheme.tokens.textMuted
        };
      }
      
      return {
        primary: '#F9FAFB',
        secondary: '#F3F4F6',
        tertiary: '#E5E7EB'
      };
    }
  }, [normalizedTheme]);

  // Simplified theme reactions for better performance
  const getThemeReactions = React.useMemo(() => {
    // Reduced complexity - only essential theme mappings
    const isLight = normalizedTheme.includes('-light');
    const baseTheme = normalizedTheme.replace('-light', '');
    
    const baseReactions = {
      'royal-gold': { energy: 'vibrant', movement: 'flowing' },
      'ember-glass': { energy: 'intense', movement: 'dynamic' },
      'arctic-silver': { energy: 'calm', movement: 'gentle' },
      'verdant-jade': { energy: 'vibrant', movement: 'flowing' },
      'sapphire-steel': { energy: 'intense', movement: 'dynamic' },
      'midnight-navy': { energy: 'mystical', movement: 'transcendent' },
      'obsidian-black': { energy: 'intense', movement: 'aggressive' },
      'crimson-ember': { energy: 'urgent', movement: 'aggressive' },
      'onyx-frost': { energy: 'mystical', movement: 'transcendent' },
      'marble-white': { energy: 'calm', movement: 'gentle' }
    };
    
    const reaction = baseReactions[baseTheme] || { energy: 'vibrant', movement: 'flowing' };
    return {
      ...reaction,
      glow: isLight ? 'subtle' : 'moderate',
      rhythm: reaction.energy === 'urgent' ? 'chaos' : 'normal'
    };
  }, [normalizedTheme]);

  // Get domain context for smart orb distribution
  const getDomainContext = React.useMemo(() => {
    const domains: Record<string, string> = {
      'royal-gold': 'command',
      'royal-gold-light': 'command',
      'ember-glass': 'finance', 
      'ember-glass-light': 'finance',
      'arctic-silver': 'healthcare',
      'arctic-silver-light': 'healthcare',
      'verdant-jade': 'workforce',
      'verdant-jade-light': 'workforce',
      'sapphire-steel': 'inventory',
      'sapphire-steel-light': 'inventory',
      'midnight-navy': 'general',
      'midnight-navy-light': 'general',
      'obsidian-black': 'executive',
      'obsidian-black-light': 'executive',
      'crimson-ember': 'alerts',
      'crimson-ember-light': 'alerts',
      'onyx-frost': 'analytics',
      'onyx-frost-light': 'analytics',
      'marble-white': 'clinical',
      'marble-white-light': 'clinical'
    };
    return domains[normalizedTheme] || 'general';
  }, [normalizedTheme]);
  
  // Create CSS-based 3D textured orbs with enhanced texture visibility and theme reactions
  const Orb = ({ 
    size, 
    color, 
    position, 
    texture = 'metallic',
    intensity = 'medium',
    opacity = 0.75,
    animationClass = ''
  }: {
    size: number;
    color: string;
    position: { top?: string; bottom?: string; left?: string; right?: string };
    texture?: 'metallic' | 'iridescent' | 'crystalline' | 'plasma' | 'ethereal' | 'holographic';
    intensity?: 'low' | 'medium' | 'high';
    opacity?: number;
    animationClass?: string;
  }) => {
    const getTextureStyle = () => {
      const baseStyle = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        position: 'absolute' as const,
        ...position
      };

      // Adjust texture rendering based on golden background
      const bgAdjust = hasGoldenBackground ? 1.1 : 1.0;
      const contrastAdjust = hasGoldenBackground ? 0.9 : 1.0;

      if (texture === 'metallic') {
        return {
          ...baseStyle,
          background: `
            radial-gradient(ellipse at 25% 25%, rgba(255,255,255,${0.9 * bgAdjust}) 0%, rgba(255,255,255,${0.5 * bgAdjust}) 8%, transparent 20%),
            radial-gradient(ellipse at 75% 25%, rgba(255,255,255,${0.4 * contrastAdjust}) 0%, transparent 25%),
            radial-gradient(ellipse at 25% 75%, rgba(0,0,0,${0.5 * contrastAdjust}) 0%, rgba(0,0,0,${0.3 * contrastAdjust}) 20%, transparent 40%),
            radial-gradient(ellipse at 75% 75%, rgba(0,0,0,${0.3 * contrastAdjust}) 0%, transparent 30%),
            linear-gradient(45deg, rgba(255,255,255,${0.2 * bgAdjust}) 0%, transparent 30%, transparent 70%, rgba(0,0,0,${0.25 * contrastAdjust}) 100%),
            radial-gradient(circle at 50% 50%, ${color}ff 0%, ${color}dd 25%, ${color}aa 50%, ${color}66 75%, ${color}33 90%, transparent 100%)
          `,
          boxShadow: `
            inset 0 0 ${size * 0.12}px rgba(255,255,255,${0.8 * bgAdjust}),
            inset 0 0 ${size * 0.3}px rgba(0,0,0,${0.2 * contrastAdjust}),
            inset ${size * 0.04}px ${size * 0.04}px ${size * 0.08}px rgba(255,255,255,${0.9 * bgAdjust}),
            inset -${size * 0.04}px -${size * 0.04}px ${size * 0.08}px rgba(0,0,0,${0.5 * contrastAdjust}),
            0 0 ${size * 0.06}px ${color}${hasGoldenBackground ? '20' : '25'},
            0 ${size * 0.02}px ${size * 0.08}px rgba(0,0,0,${0.25 * contrastAdjust})
          `,
          filter: `saturate(1.2) contrast(1.15) brightness(${1.05 * bgAdjust})` // Removed blur for clear textures
        };
      } else if (texture === 'iridescent') {
        return {
          ...baseStyle,
          background: `
            radial-gradient(ellipse at 30% 25%, rgba(255,255,255,${0.8 * bgAdjust}) 0%, rgba(255,255,255,${0.45 * bgAdjust}) 12%, transparent 25%),
            radial-gradient(ellipse at 70% 30%, rgba(255,255,255,${0.3 * contrastAdjust}) 0%, transparent 20%),
            radial-gradient(ellipse at 25% 75%, rgba(0,0,0,${0.35 * contrastAdjust}) 0%, transparent 35%),
            conic-gradient(from 0deg at 50% 50%, 
              hsl(240, ${65 * bgAdjust}%, ${70 * bgAdjust}%) 0deg,
              hsl(280, ${65 * bgAdjust}%, ${75 * bgAdjust}%) 60deg,
              hsl(320, ${65 * bgAdjust}%, ${80 * bgAdjust}%) 120deg,
              hsl(0, ${65 * bgAdjust}%, ${75 * bgAdjust}%) 180deg,
              hsl(40, ${65 * bgAdjust}%, ${70 * bgAdjust}%) 240deg,
              hsl(80, ${65 * bgAdjust}%, ${75 * bgAdjust}%) 300deg,
              hsl(240, ${65 * bgAdjust}%, ${70 * bgAdjust}%) 360deg
            ),
            radial-gradient(circle at 50% 50%, ${color}ee 0%, ${color}bb 30%, ${color}77 60%, ${color}44 85%, transparent 100%)
          `,
          backgroundBlendMode: 'normal, normal, normal, multiply, normal',
          boxShadow: `
            inset 0 0 ${size * 0.15}px rgba(255,255,255,${0.6 * bgAdjust}),
            inset 0 0 ${size * 0.3}px rgba(0,0,0,${0.12 * contrastAdjust}),
            inset ${size * 0.04}px ${size * 0.04}px ${size * 0.08}px rgba(255,255,255,${0.7 * bgAdjust}),
            inset -${size * 0.04}px -${size * 0.04}px ${size * 0.08}px rgba(0,0,0,${0.3 * contrastAdjust}),
            0 0 ${size * 0.08}px ${color}${hasGoldenBackground ? '18' : '22'},
            0 ${size * 0.02}px ${size * 0.06}px rgba(0,0,0,${0.2 * contrastAdjust})
          `,
          filter: `hue-rotate(5deg) saturate(1.3) contrast(1.2) brightness(${1.08 * bgAdjust})` // Clear iridescent texture
        };
      } else if (texture === 'crystalline') {
        return {
          ...baseStyle,
          background: `
            radial-gradient(ellipse at 35% 20%, rgba(255,255,255,${1.0 * bgAdjust}) 0%, rgba(255,255,255,${0.7 * bgAdjust}) 6%, rgba(255,255,255,${0.4 * contrastAdjust}) 15%, transparent 25%),
            radial-gradient(ellipse at 65% 35%, rgba(255,255,255,${0.5 * contrastAdjust}) 0%, rgba(255,255,255,${0.2 * contrastAdjust}) 15%, transparent 30%),
            radial-gradient(ellipse at 20% 80%, rgba(0,0,0,${0.35 * contrastAdjust}) 0%, rgba(0,0,0,${0.15 * contrastAdjust}) 25%, transparent 45%),
            linear-gradient(135deg, rgba(255,255,255,${0.45 * bgAdjust}) 0%, transparent 25%, transparent 75%, rgba(0,0,0,${0.2 * contrastAdjust}) 100%),
            linear-gradient(45deg, transparent 0%, rgba(255,255,255,${0.25 * bgAdjust}) 50%, transparent 100%),
            radial-gradient(circle at 50% 50%, ${color}ff 0%, ${color}ee 20%, ${color}dd 40%, ${color}99 65%, ${color}55 85%, transparent 100%)
          `,
          boxShadow: `
            inset 0 0 ${size * 0.08}px rgba(255,255,255,${0.9 * bgAdjust}),
            inset 0 0 ${size * 0.2}px rgba(0,0,0,${0.08 * contrastAdjust}),
            inset ${size * 0.06}px ${size * 0.06}px ${size * 0.12}px rgba(255,255,255,${1.0 * bgAdjust}),
            inset -${size * 0.03}px -${size * 0.03}px ${size * 0.08}px rgba(0,0,0,${0.2 * contrastAdjust}),
            0 0 ${size * 0.06}px ${color}${hasGoldenBackground ? '25' : '30'},
            0 ${size * 0.03}px ${size * 0.1}px rgba(0,0,0,${0.2 * contrastAdjust})
          `,
          filter: `saturate(1.25) contrast(1.3) brightness(${1.15 * bgAdjust})` // Crystal clear texture
        };
      } else if (texture === 'plasma') {
        return {
          ...baseStyle,
          background: `
            radial-gradient(ellipse at 25% 25%, rgba(255,100,200,${0.6 * bgAdjust}) 0%, transparent 40%),
            linear-gradient(45deg, rgba(255,0,255,${0.3 * bgAdjust}) 0%, rgba(0,255,255,${0.2 * contrastAdjust}) 100%),
            radial-gradient(circle at 50% 50%, ${color}ff 0%, ${color}88 50%, transparent 100%)
          `,
          boxShadow: `
            inset 0 0 ${size * 0.08}px rgba(255,100,255,${0.6 * bgAdjust}),
            0 0 ${size * 0.06}px ${color}${hasGoldenBackground ? '30' : '35'}
          `,
          filter: `saturate(1.3) contrast(1.2) brightness(${1.05 * bgAdjust})` // Clear plasma texture
        };
      } else if (texture === 'ethereal') {
        return {
          ...baseStyle,
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(255,255,255,${0.8 * bgAdjust}) 0%, transparent 30%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,${0.1 * bgAdjust}) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, ${color}ee 0%, ${color}99 40%, transparent 100%)
          `,
          boxShadow: `
            inset 0 0 ${size * 0.1}px rgba(255,255,255,${0.6 * bgAdjust}),
            0 0 ${size * 0.08}px ${color}${hasGoldenBackground ? '20' : '25'}
          `,
          filter: `saturate(0.9) brightness(${1.15 * bgAdjust})` // Removed blur for clear ethereal texture
        };
      } else { // holographic
        return {
          ...baseStyle,
          background: `
            conic-gradient(from 45deg, 
              hsl(0, 70%, 60%) 0deg,
              hsl(120, 70%, 70%) 120deg,
              hsl(240, 70%, 60%) 240deg,
              hsl(0, 70%, 60%) 360deg
            ),
            radial-gradient(ellipse at 70% 20%, rgba(255,255,255,${0.7 * bgAdjust}) 0%, transparent 25%),
            radial-gradient(circle at 50% 50%, ${color}dd 0%, ${color}77 60%, transparent 100%)
          `,
          boxShadow: `
            inset 0 0 ${size * 0.08}px rgba(255,255,255,${0.7 * bgAdjust}),
            0 0 ${size * 0.06}px ${color}${hasGoldenBackground ? '28' : '33'}
          `,
          filter: `saturate(1.4) contrast(1.3) brightness(${1.02 * bgAdjust})` // Clear holographic texture
        };
      }
    };

    // Intensity and opacity variations - adjusted for golden background
    const finalOpacity = hasGoldenBackground ? opacity * 0.9 : opacity;
    const intensityStyle = intensity === 'high' 
      ? { 
          opacity: finalOpacity * 1.0,
          transform: 'scale(1.01)'
        }
      : intensity === 'low' 
      ? { 
          opacity: finalOpacity * 0.8,
          transform: 'scale(0.99)' 
        }
      : { 
          opacity: finalOpacity * 0.9
        };

    // Get theme-specific animation class based on reactions
    const getAnimationClass = () => {
      const reactions = getThemeReactions;
      if (animationClass) return animationClass;
      
      // Theme-specific animation mappings for enhanced orb behaviors
      switch (normalizedTheme) {
        case 'crimson-ember':
        case 'crimson-ember-light':
          return 'aegis-crimson-chaos';
        case 'midnight-navy':
        case 'midnight-navy-light':
        case 'onyx-frost':
        case 'onyx-frost-light':
          return 'aegis-mystical-transcendence';
        case 'arctic-silver':
        case 'arctic-silver-light':
        case 'marble-white':
        case 'marble-white-light':
          return 'aegis-arctic-serenity';
        case 'ember-glass':
        case 'ember-glass-light':
        case 'sapphire-steel':
        case 'sapphire-steel-light':
          return 'aegis-ember-intensity';
        case 'verdant-jade':
        case 'verdant-jade-light':
          return 'aegis-verdant-growth';
        default:
          // Fallback to reaction-based animations
          switch (reactions.movement) {
            case 'gentle': return 'aegis-floaty-slow';
            case 'flowing': return 'aegis-floaty';
            case 'dynamic': return 'aegis-floaty-delayed';
            case 'aggressive': return reactions.rhythm === 'chaos' ? 'aegis-crimson-chaos' : 'aegis-floaty';
            case 'transcendent': return 'aegis-mystical-transcendence';
            default: return 'aegis-floaty';
          }
      }
    };

    // Determine proper blend mode for theme
    const getBlendMode = () => {
      const isLightTheme = normalizedTheme.includes('-light');
      
      // Use Multiply for light themes to add color/shading without chalky white
      // Use Screen for dark themes to keep glow without greying out  
      return isLightTheme ? 'multiply' : 'screen';
    };

    return (
      <div
        className={`will-change-transform ${getAnimationClass()}`}
        style={{
          ...getTextureStyle(),
          ...intensityStyle,
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
          mixBlendMode: getBlendMode()
        }}
      />
    );
  };

  // Get domain-specific orb configurations with inverse colors and theme reactions
  const getOrbConfig = () => {
    const inverseColors = getInverseColors;
    const reactions = getThemeReactions;
    const baseOpacity = hasGoldenBackground ? 0.8 : 0.85;
    
    // Adjust opacity and intensity based on theme reactions
    const reactionOpacity = reactions.glow === 'fierce' ? baseOpacity * 1.2 : 
                           reactions.glow === 'bright' ? baseOpacity * 1.1 :
                           reactions.glow === 'ethereal' ? baseOpacity * 0.9 :
                           reactions.glow === 'subtle' ? baseOpacity * 0.8 : baseOpacity;
    
    const reactionIntensity = reactions.energy === 'urgent' ? 'high' as const :
                             reactions.energy === 'intense' ? 'high' as const :
                             reactions.energy === 'mystical' ? 'medium' as const :
                             reactions.energy === 'calm' ? 'low' as const : 'medium' as const;
    
    // Simplified orb configurations - 3 orbs per theme for better performance
    switch (getDomainContext) {
      case 'command':
        return [
          { color: inverseColors.primary, size: 320, position: { top: '8%', right: '10%' }, texture: 'metallic' as const, intensity: reactionIntensity, opacity: reactionOpacity },
          { color: inverseColors.secondary, size: 200, position: { bottom: '15%', left: '8%' }, texture: 'crystalline' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.8 },
          { color: inverseColors.tertiary, size: 160, position: { top: '45%', right: '6%' }, texture: 'iridescent' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.7 }
        ];
      
      case 'finance':
        return [
          { color: inverseColors.primary, size: 310, position: { top: '10%', right: '12%' }, texture: 'metallic' as const, intensity: reactionIntensity, opacity: reactionOpacity },
          { color: inverseColors.secondary, size: 200, position: { bottom: '20%', left: '10%' }, texture: 'crystalline' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.8 },
          { color: inverseColors.tertiary, size: 160, position: { top: '50%', right: '8%' }, texture: 'iridescent' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.7 }
        ];
      
      case 'healthcare':
        return [
          { color: inverseColors.primary, size: 300, position: { top: '6%', right: '11%' }, texture: 'ethereal' as const, intensity: reactionIntensity, opacity: reactionOpacity },
          { color: inverseColors.secondary, size: 210, position: { bottom: '18%', left: '7%' }, texture: 'crystalline' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.8 },
          { color: inverseColors.tertiary, size: 170, position: { top: '48%', right: '9%' }, texture: 'metallic' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.7 }
        ];
      
      case 'workforce':
        return [
          { color: inverseColors.primary, size: 290, position: { top: '9%', right: '9%' }, texture: 'iridescent' as const, intensity: reactionIntensity, opacity: reactionOpacity },
          { color: inverseColors.secondary, size: 200, position: { bottom: '22%', left: '9%' }, texture: 'crystalline' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.8 },
          { color: inverseColors.tertiary, size: 150, position: { top: '52%', right: '7%' }, texture: 'metallic' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.7 }
        ];
      
      case 'inventory':
        return [
          { color: inverseColors.primary, size: 280, position: { top: '12%', right: '13%' }, texture: 'crystalline' as const, intensity: reactionIntensity, opacity: reactionOpacity },
          { color: inverseColors.secondary, size: 190, position: { bottom: '25%', left: '11%' }, texture: 'metallic' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.8 },
          { color: inverseColors.tertiary, size: 140, position: { top: '55%', right: '9%' }, texture: 'iridescent' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.7 }
        ];
      
      case 'analytics':
        return [
          { color: inverseColors.primary, size: 310, position: { top: '7%', right: '8%' }, texture: 'holographic' as const, intensity: reactionIntensity, opacity: reactionOpacity },
          { color: inverseColors.secondary, size: 200, position: { bottom: '19%', left: '6%' }, texture: 'iridescent' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.8 },
          { color: inverseColors.tertiary, size: 160, position: { top: '49%', right: '5%' }, texture: 'metallic' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.7 }
        ];

      case 'alerts':
        return [
          { color: inverseColors.primary, size: 330, position: { top: '5%', right: '8%' }, texture: 'plasma' as const, intensity: reactionIntensity, opacity: reactionOpacity },
          { color: inverseColors.secondary, size: 220, position: { bottom: '12%', left: '5%' }, texture: 'metallic' as const, intensity: 'high' as const, opacity: reactionOpacity * 0.9 },
          { color: inverseColors.tertiary, size: 180, position: { top: '42%', right: '4%' }, texture: 'crystalline' as const, intensity: 'high' as const, opacity: reactionOpacity * 0.8 }
        ];

      case 'clinical':
        return [
          { color: inverseColors.primary, size: 285, position: { top: '11%', right: '14%' }, texture: 'ethereal' as const, intensity: reactionIntensity, opacity: reactionOpacity },
          { color: inverseColors.secondary, size: 195, position: { bottom: '23%', left: '12%' }, texture: 'crystalline' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.8 },
          { color: inverseColors.tertiary, size: 155, position: { top: '53%', right: '11%' }, texture: 'metallic' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.7 }
        ];

      case 'executive':
        return [
          { color: inverseColors.primary, size: 340, position: { top: '4%', right: '6%' }, texture: 'holographic' as const, intensity: reactionIntensity, opacity: reactionOpacity },
          { color: inverseColors.secondary, size: 230, position: { bottom: '10%', left: '4%' }, texture: 'plasma' as const, intensity: 'high' as const, opacity: reactionOpacity * 0.9 },
          { color: inverseColors.tertiary, size: 190, position: { top: '38%', right: '3%' }, texture: 'crystalline' as const, intensity: 'high' as const, opacity: reactionOpacity * 0.8 }
        ];
      
      default:
        return [
          { color: inverseColors.primary, size: 290, position: { top: '10%', right: '10%' }, texture: 'metallic' as const, intensity: reactionIntensity, opacity: reactionOpacity },
          { color: inverseColors.secondary, size: 180, position: { bottom: '20%', left: '8%' }, texture: 'crystalline' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.8 },
          { color: inverseColors.tertiary, size: 150, position: { top: '50%', right: '6%' }, texture: 'iridescent' as const, intensity: 'medium' as const, opacity: reactionOpacity * 0.7 }
        ];
    }
  };

  const orbConfig = getOrbConfig();

  if (!shouldRenderOrbs) {
    return <div className={`fixed inset-0 z-[5] pointer-events-none ${className}`}></div>;
  }

  return (
    <div className={`fixed inset-0 z-[5] pointer-events-none overflow-hidden ${className}`}>
      {/* Render optimized theme-reactive orbs */}
      {orbConfig.map((config, index) => {
        // Simple animation assignment for better performance
        const animationClass = index === 0 ? '' : 
                              index === 1 ? 'aegis-floaty-delayed' : 
                              'aegis-floaty-slow';
        
        return (
          <Orb
            key={`orb-${index}-${normalizedTheme}`}
            size={config.size}
            color={config.color}
            position={config.position}
            texture={config.texture}
            intensity={config.intensity}
            opacity={config.opacity}
            animationClass={animationClass}
          />
        );
      })}
    </div>
  );
}