import React from 'react';
import { CeremonialOrbs } from './CeremonialOrbs';
import orbBackgroundImage from 'figma:asset/4fbcb919aa8c278c55e19b656d92c4050dfcafbe.png';

import { type ThemeId } from '../../lib/theme-system';

interface DomainBackgroundsProps {
  theme: ThemeId | 'finance' | 'healthcare' | 'workforce' | 'quality' | 'inventory' | 'command';
  className?: string;
}

export function DomainBackgrounds({ theme, className = '' }: DomainBackgroundsProps) {
  
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

  // Simplified golden background detection
  const shouldShowOrbBackground = normalizedTheme === 'royal-gold' || 
                                  normalizedTheme === 'royal-gold-light' || 
                                  normalizedTheme === 'ember-glass' || 
                                  normalizedTheme === 'ember-glass-light';

  // Simplified opacity calculation
  const backgroundOpacity = shouldShowOrbBackground ? 
    (normalizedTheme.includes('-light') ? 0.10 : 0.18) : 0.15;

  try {
    return (
      <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
        {/* Background Orbs Layer - Always behind content */}
        <div className="absolute inset-0 z-[1]" style={{ clipPath: 'none' }}>
          {/* Beautiful Golden Orb Background Image */}
          {shouldShowOrbBackground && (
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${orbBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: backgroundOpacity,
                mixBlendMode: 'normal'
              }}
            />
          )}

          {/* AEGIS 3D Ceremonial Orb System - Properly layered */}
          <CeremonialOrbs 
            key={`orbs-${normalizedTheme}`}
            theme={normalizedTheme} 
          />
        </div>
        
        {/* NO atmospheric overlay - prevents white haze */}
      </div>
    );
  } catch (error) {
    console.warn('DomainBackgrounds error:', error);
    return (
      <div className={`fixed inset-0 pointer-events-none z-0 bg-background ${className}`}>
        {/* Minimal fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-background to-card"></div>
      </div>
    );
  }
}