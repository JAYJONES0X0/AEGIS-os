import React from 'react';
import orbImage from 'figma:asset/ba5e11074abb3dc918179dec130f6e52d4331d5a.png';

interface OrbBackgroundsProps {
  theme?: string;
  intensity?: 'low' | 'medium' | 'high';
  variant?: 'version1' | 'version2';
}

// Realistic Textured Orb Component using actual orb image
function TexturedOrb({ 
  size, 
  color, 
  position, 
  animation, 
  zIndex = 0,
  delay = 0 
}: {
  size: number;
  color: string;
  position: { top: string; left: string };
  animation: string;
  zIndex?: number;
  delay?: number;
}) {
  return (
    <div
      className={`fixed pointer-events-none ${animation}`}
      style={{
        top: position.top,
        left: position.left,
        width: `${size}px`,
        height: `${size}px`,
        zIndex,
        animationDelay: `${delay}s`,
        backgroundImage: `url(${orbImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '50%',
        filter: `
          hue-rotate(${getHueRotation(color)}deg) 
          saturate(1.2) 
          brightness(0.9) 
          contrast(1.1)
          drop-shadow(0 4px 12px rgba(0,0,0,0.6))
        `,
        opacity: 0.6,
        isolation: 'isolate'
      }}
    />
  );
}

// Helper function to get hue rotation based on color
function getHueRotation(color: string): number {
  const colorMap: { [key: string]: number } = {
    '#D4AF37': 0,    // Royal Gold - no rotation
    '#E2E8F0': 200,  // Arctic Silver
    '#F97316': 20,   // Ember Glass
    '#1E40AF': 240,  // Midnight Navy
    '#059669': 120,  // Verdant Jade
    '#DC2626': 0,    // Crimson Ember
    '#1F2937': 0,    // Obsidian Black
    '#F8FAFC': 180,  // Marble White
    '#0284C7': 200,  // Sapphire Steel
    '#4B5563': 180   // Onyx Frost
  };
  return colorMap[color] || 0;
}

// Memoized theme settings for performance
const themeSettingsMap: { [key: string]: { color: string; animation: string } } = {
  'royal-gold': { color: '#D4AF37', animation: 'aegis-floaty' },
  'royal-gold-light': { color: '#D4AF37', animation: 'aegis-floaty' },
  'command-centre': { color: '#D4AF37', animation: 'aegis-floaty' },
  'arctic-silver': { color: '#E2E8F0', animation: 'aegis-arctic-serenity' },
  'arctic-silver-light': { color: '#E2E8F0', animation: 'aegis-arctic-serenity' },
  'healthcare': { color: '#E2E8F0', animation: 'aegis-arctic-serenity' },
  'ember-glass': { color: '#F97316', animation: 'aegis-ember-intensity' },
  'ember-glass-light': { color: '#F97316', animation: 'aegis-ember-intensity' },
  'finance-operations': { color: '#F97316', animation: 'aegis-ember-intensity' },
  'midnight-navy': { color: '#1E40AF', animation: 'aegis-mystical-transcendence' },
  'midnight-navy-light': { color: '#1E40AF', animation: 'aegis-mystical-transcendence' },
  'admin': { color: '#1E40AF', animation: 'aegis-mystical-transcendence' },
  'ai-hub': { color: '#1E40AF', animation: 'aegis-mystical-transcendence' },
  'verdant-jade': { color: '#059669', animation: 'aegis-verdant-growth' },
  'verdant-jade-light': { color: '#059669', animation: 'aegis-verdant-growth' },
  'workforce': { color: '#059669', animation: 'aegis-verdant-growth' },
  'crimson-ember': { color: '#DC2626', animation: 'aegis-crimson-chaos' },
  'crimson-ember-light': { color: '#DC2626', animation: 'aegis-crimson-chaos' },
  'obsidian-black': { color: '#1F2937', animation: 'aegis-mystical-transcendence' },
  'obsidian-black-light': { color: '#1F2937', animation: 'aegis-mystical-transcendence' },
  'marble-white': { color: '#F8FAFC', animation: 'aegis-arctic-serenity' },
  'marble-white-light': { color: '#F8FAFC', animation: 'aegis-arctic-serenity' },
  'sapphire-steel': { color: '#0284C7', animation: 'aegis-ember-intensity' },
  'sapphire-steel-light': { color: '#0284C7', animation: 'aegis-ember-intensity' },
  'onyx-frost': { color: '#4B5563', animation: 'aegis-verdant-growth' },
  'onyx-frost-light': { color: '#4B5563', animation: 'aegis-verdant-growth' }
};

export const OrbBackgrounds = React.memo(function OrbBackgrounds({ 
  theme = 'royal-gold', 
  intensity = 'medium',
  variant = 'version1' 
}: OrbBackgroundsProps) {
  
  const settings = themeSettingsMap[theme] || { color: '#D4AF37', animation: 'aegis-floaty' };
  
  // Intensity size multipliers
  const sizeMultipliers = {
    low: 0.8,
    medium: 1.0,
    high: 1.3
  };

  const sizeMultiplier = sizeMultipliers[intensity];

  // Seamless corner orb configurations - minimal and elegant
  const orbConfigurations = variant === 'version1' ? [
    // Large bottom-left corner
    {
      size: 280 * sizeMultiplier,
      position: { top: '70%', left: '0%' },
      animation: settings.animation,
      delay: 0
    },
    // Medium top-right corner
    {
      size: 220 * sizeMultiplier,
      position: { top: '10%', left: '85%' },
      animation: 'aegis-floaty-delayed',
      delay: 2
    },
    // Small top-left accent
    {
      size: 150 * sizeMultiplier,
      position: { top: '5%', left: '5%' },
      animation: 'aegis-floaty-slow',
      delay: 4
    }
  ] : [
    // Alternative corner configuration
    // Large top-left corner
    {
      size: 300 * sizeMultiplier,
      position: { top: '0%', left: '0%' },
      animation: settings.animation,
      delay: 0
    },
    // Medium bottom-right corner
    {
      size: 240 * sizeMultiplier,
      position: { top: '75%', left: '80%' },
      animation: 'aegis-floaty-delayed',
      delay: 1
    },
    // Small accent orb
    {
      size: 160 * sizeMultiplier,
      position: { top: '40%', left: '85%' },
      animation: 'aegis-floaty-slow',
      delay: 3
    }
  ];

  return (
    <>
      {/* Black background overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
          opacity: 0.4
        }}
      />
      
      {/* Render textured orbs using actual orb image */}
      {orbConfigurations.map((orb, index) => (
        <TexturedOrb
          key={`${theme}-${variant}-${index}`}
          size={orb.size}
          color={settings.color}
          position={orb.position}
          animation={orb.animation}
          zIndex={index}
          delay={orb.delay}
        />
      ))}
    </>
  );
});