// AEGIS Divine Design Language v1.1 - 10 Institutional Theme System
// Exact implementation per delivery specification - Performance Optimized

export type ThemeId = 
  | 'royal-gold' | 'royal-gold-light'
  | 'arctic-silver' | 'arctic-silver-light'
  | 'ember-glass' | 'ember-glass-light'
  | 'midnight-navy' | 'midnight-navy-light'
  | 'verdant-jade' | 'verdant-jade-light'
  | 'obsidian-black' | 'obsidian-black-light'
  | 'marble-white' | 'marble-white-light'
  | 'crimson-ember' | 'crimson-ember-light'
  | 'sapphire-steel' | 'sapphire-steel-light'
  | 'onyx-frost' | 'onyx-frost-light';

export interface ThemeTokens {
  id: ThemeId;
  name: string;
  description: string;
  domains: string[];
  tokens: {
    bg: string;
    bg2: string;
    text: string;
    textMuted: string;
    accent: string;
    glassFill: string;
    glassBorder: string;
    shadowDeep: string;
    shadowSoft: string;
    financeGreen: string;
    financeRed: string;
  };
}

export const AEGIS_THEMES: Record<ThemeId, ThemeTokens> = {
  'royal-gold': {
    id: 'royal-gold',
    name: 'Royal Gold',
    description: 'Command & Quality Authority',
    domains: ['Command Centre', 'Quality & Compliance'],
    tokens: {
      bg: '#0C0F13',
      bg2: '#11151B',
      text: '#ECECEC',
      textMuted: '#B8BFC9',
      accent: '#D4AF37',
      glassFill: 'rgba(255,255,255,0.06)',
      glassBorder: 'rgba(255,255,255,0.16)',
      shadowDeep: '0 40px 80px rgba(0,0,0,.55)',
      shadowSoft: '0 8px 24px rgba(0,0,0,.25)',
      financeGreen: '#16A34A',
      financeRed: '#DC2626'
    }
  },
  'arctic-silver': {
    id: 'arctic-silver',
    name: 'Arctic Silver',
    description: 'Healthcare & Workforce Clarity',
    domains: ['Healthcare', 'Workforce & HR', 'Community & Family'],
    tokens: {
      bg: '#EEF2F6',
      bg2: '#FFFFFF',
      text: '#101318',
      textMuted: '#515866',
      accent: '#64748B',
      glassFill: 'rgba(255,255,255,0.55)',
      glassBorder: 'rgba(255,255,255,0.16)',
      shadowDeep: '0 40px 80px rgba(0,0,0,.15)',
      shadowSoft: '0 8px 24px rgba(0,0,0,.08)',
      financeGreen: '#16A34A',
      financeRed: '#DC2626'
    }
  },
  'ember-glass': {
    id: 'ember-glass',
    name: 'Ember Glass',
    description: 'Finance & Analytics Power',
    domains: ['Finance & Operations', 'Analytics & Intelligence'],
    tokens: {
      bg: '#1F1611',
      bg2: '#2D1B0A',
      text: '#FEF3C7',
      textMuted: '#FCD34D',
      accent: '#F59E0B',
      glassFill: 'rgba(245,158,11,0.12)',
      glassBorder: 'rgba(245,158,11,0.25)',
      shadowDeep: '0 40px 80px rgba(245,158,11,.35)',
      shadowSoft: '0 8px 24px rgba(245,158,11,.15)',
      financeGreen: '#10B981',
      financeRed: '#EF4444'
    }
  },
  'midnight-navy': {
    id: 'midnight-navy',
    name: 'Midnight Navy',
    description: 'Professional Authority',
    domains: ['General Purpose'],
    tokens: {
      bg: '#0A1628',
      bg2: '#1E3A8A',
      text: '#DBEAFE',
      textMuted: '#93C5FD',
      accent: '#3B82F6',
      glassFill: 'rgba(59,130,246,0.12)',
      glassBorder: 'rgba(59,130,246,0.25)',
      shadowDeep: '0 40px 80px rgba(59,130,246,.35)',
      shadowSoft: '0 8px 24px rgba(59,130,246,.15)',
      financeGreen: '#10B981',
      financeRed: '#EF4444'
    }
  },
  'verdant-jade': {
    id: 'verdant-jade',
    name: 'Verdant Jade',
    description: 'Growth & Wellness',
    domains: ['General Purpose'],
    tokens: {
      bg: '#064E3B',
      bg2: '#047857',
      text: '#ECFDF5',
      textMuted: '#A7F3D0',
      accent: '#10B981',
      glassFill: 'rgba(16,185,129,0.15)',
      glassBorder: 'rgba(16,185,129,0.30)',
      shadowDeep: '0 40px 80px rgba(16,185,129,.25)',
      shadowSoft: '0 8px 24px rgba(16,185,129,.12)',
      financeGreen: '#34D399',
      financeRed: '#F87171'
    }
  },
  'obsidian-black': {
    id: 'obsidian-black',
    name: 'Obsidian Black',
    description: 'Executive Stealth',
    domains: ['General Purpose'],
    tokens: {
      bg: '#030712',
      bg2: '#111827',
      text: '#F9FAFB',
      textMuted: '#D1D5DB',
      accent: '#A78BFA',
      glassFill: 'rgba(167,139,250,0.08)',
      glassBorder: 'rgba(167,139,250,0.20)',
      shadowDeep: '0 40px 80px rgba(0,0,0,.75)',
      shadowSoft: '0 8px 24px rgba(0,0,0,.45)',
      financeGreen: '#22C55E',
      financeRed: '#EF4444'
    }
  },
  'marble-white': {
    id: 'marble-white',
    name: 'Marble White',
    description: 'Clinical Precision',
    domains: ['General Purpose'],
    tokens: {
      bg: '#F7F7FA',
      bg2: '#FFFFFF',
      text: '#0F1115',
      textMuted: '#616A78',
      accent: '#E5E7EB',
      glassFill: 'rgba(255,255,255,0.55)',
      glassBorder: 'rgba(255,255,255,0.16)',
      shadowDeep: '0 40px 80px rgba(0,0,0,.15)',
      shadowSoft: '0 8px 24px rgba(0,0,0,.08)',
      financeGreen: '#16A34A',
      financeRed: '#DC2626'
    }
  },
  'crimson-ember': {
    id: 'crimson-ember',
    name: 'Crimson Ember',
    description: 'Alert Authority',
    domains: ['General Purpose'],
    tokens: {
      bg: '#7F1D1D',
      bg2: '#991B1B',
      text: '#FEF2F2',
      textMuted: '#FECACA',
      accent: '#DC2626',
      glassFill: 'rgba(220,38,38,0.15)',
      glassBorder: 'rgba(220,38,38,0.30)',
      shadowDeep: '0 40px 80px rgba(220,38,38,.35)',
      shadowSoft: '0 8px 24px rgba(220,38,38,.20)',
      financeGreen: '#10B981',
      financeRed: '#F87171'
    }
  },
  'sapphire-steel': {
    id: 'sapphire-steel',
    name: 'Sapphire Steel',
    description: 'Technical Excellence',
    domains: ['General Purpose'],
    tokens: {
      bg: '#0C4A6E',
      bg2: '#0369A1',
      text: '#E0F2FE',
      textMuted: '#BAE6FD',
      accent: '#0EA5E9',
      glassFill: 'rgba(14,165,233,0.12)',
      glassBorder: 'rgba(14,165,233,0.25)',
      shadowDeep: '0 40px 80px rgba(14,165,233,.30)',
      shadowSoft: '0 8px 24px rgba(14,165,233,.15)',
      financeGreen: '#22C55E',
      financeRed: '#F87171'
    }
  },
  'onyx-frost': {
    id: 'onyx-frost',
    name: 'Onyx Frost',
    description: 'Subtle Authority',
    domains: ['General Purpose'],
    tokens: {
      bg: '#374151',
      bg2: '#4B5563',
      text: '#F9FAFB',
      textMuted: '#D1D5DB',
      accent: '#6EE7B7',
      glassFill: 'rgba(110,231,183,0.12)',
      glassBorder: 'rgba(110,231,183,0.25)',
      shadowDeep: '0 40px 80px rgba(0,0,0,.45)',
      shadowSoft: '0 8px 24px rgba(0,0,0,.20)',
      financeGreen: '#34D399',
      financeRed: '#F87171'
    }
  },

  // Light Theme Variants
  'royal-gold-light': {
    id: 'royal-gold-light',
    name: 'Royal Gold Light',
    description: 'Command & Quality Authority - Light Mode',
    domains: ['Command Centre', 'Quality & Compliance'],
    tokens: {
      bg: '#FFFBF0',
      bg2: '#FFFFFF',
      text: '#92400E',
      textMuted: '#A16207',
      accent: '#D97706',
      glassFill: 'rgba(217,119,6,0.08)',
      glassBorder: 'rgba(217,119,6,0.20)',
      shadowDeep: '0 40px 80px rgba(217,119,6,.25)',
      shadowSoft: '0 8px 24px rgba(217,119,6,.12)',
      financeGreen: '#059669',
      financeRed: '#DC2626'
    }
  },
  'arctic-silver-light': {
    id: 'arctic-silver-light',
    name: 'Arctic Silver Light',
    description: 'Healthcare & Workforce Clarity - Enhanced',
    domains: ['Healthcare', 'Workforce & HR', 'Community & Family'],
    tokens: {
      bg: '#F8FAFC',
      bg2: '#FFFFFF',
      text: '#1E293B',
      textMuted: '#475569',
      accent: '#64748B',
      glassFill: 'rgba(100,116,139,0.08)',
      glassBorder: 'rgba(100,116,139,0.20)',
      shadowDeep: '0 40px 80px rgba(100,116,139,.20)',
      shadowSoft: '0 8px 24px rgba(100,116,139,.10)',
      financeGreen: '#059669',
      financeRed: '#DC2626'
    }
  },
  'ember-glass-light': {
    id: 'ember-glass-light',
    name: 'Ember Glass Light',
    description: 'Finance & Analytics Power - Bright Mode',
    domains: ['Finance & Operations', 'Analytics & Intelligence'],
    tokens: {
      bg: '#FFF7ED',
      bg2: '#FFFFFF',
      text: '#9A3412',
      textMuted: '#C2410C',
      accent: '#EA580C',
      glassFill: 'rgba(234,88,12,0.08)',
      glassBorder: 'rgba(234,88,12,0.20)',
      shadowDeep: '0 40px 80px rgba(234,88,12,.25)',
      shadowSoft: '0 8px 24px rgba(234,88,12,.12)',
      financeGreen: '#059669',
      financeRed: '#DC2626'
    }
  },
  'midnight-navy-light': {
    id: 'midnight-navy-light',
    name: 'Midnight Navy Light',
    description: 'Professional Authority - Day Mode',
    domains: ['General Purpose'],
    tokens: {
      bg: '#EFF6FF',
      bg2: '#FFFFFF',
      text: '#1E3A8A',
      textMuted: '#3730A3',
      accent: '#2563EB',
      glassFill: 'rgba(37,99,235,0.08)',
      glassBorder: 'rgba(37,99,235,0.20)',
      shadowDeep: '0 40px 80px rgba(37,99,235,.25)',
      shadowSoft: '0 8px 24px rgba(37,99,235,.12)',
      financeGreen: '#059669',
      financeRed: '#DC2626'
    }
  },
  'verdant-jade-light': {
    id: 'verdant-jade-light',
    name: 'Verdant Jade Light',
    description: 'Growth & Wellness - Bright Mode',
    domains: ['General Purpose'],
    tokens: {
      bg: '#ECFDF5',
      bg2: '#FFFFFF',
      text: '#14532D',
      textMuted: '#166534',
      accent: '#059669',
      glassFill: 'rgba(5,150,105,0.08)',
      glassBorder: 'rgba(5,150,105,0.20)',
      shadowDeep: '0 40px 80px rgba(5,150,105,.25)',
      shadowSoft: '0 8px 24px rgba(5,150,105,.12)',
      financeGreen: '#22C55E',
      financeRed: '#EF4444'
    }
  },
  'obsidian-black-light': {
    id: 'obsidian-black-light',
    name: 'Obsidian Black Light',
    description: 'Executive Stealth - Refined Mode',
    domains: ['General Purpose'],
    tokens: {
      bg: '#FAF5FF',
      bg2: '#FFFFFF',
      text: '#6B21A8',
      textMuted: '#7C3AED',
      accent: '#8B5CF6',
      glassFill: 'rgba(139,92,246,0.08)',
      glassBorder: 'rgba(139,92,246,0.20)',
      shadowDeep: '0 40px 80px rgba(139,92,246,.25)',
      shadowSoft: '0 8px 24px rgba(139,92,246,.12)',
      financeGreen: '#059669',
      financeRed: '#EF4444'
    }
  },
  'marble-white-light': {
    id: 'marble-white-light',
    name: 'Marble White Light',
    description: 'Clinical Precision - Enhanced Brightness',
    domains: ['General Purpose'],
    tokens: {
      bg: '#FAFAFA',
      bg2: '#FFFFFF',
      text: '#18181B',
      textMuted: '#52525B',
      accent: '#71717A',
      glassFill: 'rgba(113,113,122,0.08)',
      glassBorder: 'rgba(113,113,122,0.20)',
      shadowDeep: '0 40px 80px rgba(113,113,122,.20)',
      shadowSoft: '0 8px 24px rgba(113,113,122,.10)',
      financeGreen: '#059669',
      financeRed: '#EF4444'
    }
  },
  'crimson-ember-light': {
    id: 'crimson-ember-light',
    name: 'Crimson Ember Light',
    description: 'Alert Authority - Bright Mode',
    domains: ['General Purpose'],
    tokens: {
      bg: '#FEF2F2',
      bg2: '#FFFFFF',
      text: '#991B1B',
      textMuted: '#B91C1C',
      accent: '#DC2626',
      glassFill: 'rgba(220,38,38,0.08)',
      glassBorder: 'rgba(220,38,38,0.20)',
      shadowDeep: '0 40px 80px rgba(220,38,38,.25)',
      shadowSoft: '0 8px 24px rgba(220,38,38,.12)',
      financeGreen: '#059669',
      financeRed: '#F87171'
    }
  },
  'sapphire-steel-light': {
    id: 'sapphire-steel-light',
    name: 'Sapphire Steel Light',
    description: 'Technical Excellence - Day Mode',
    domains: ['General Purpose'],
    tokens: {
      bg: '#F0F9FF',
      bg2: '#FFFFFF',
      text: '#0C4A6E',
      textMuted: '#0369A1',
      accent: '#0284C7',
      glassFill: 'rgba(2,132,199,0.08)',
      glassBorder: 'rgba(2,132,199,0.20)',
      shadowDeep: '0 40px 80px rgba(2,132,199,.25)',
      shadowSoft: '0 8px 24px rgba(2,132,199,.12)',
      financeGreen: '#059669',
      financeRed: '#EF4444'
    }
  },
  'onyx-frost-light': {
    id: 'onyx-frost-light',
    name: 'Onyx Frost Light',
    description: 'Subtle Authority - Bright Mode',
    domains: ['General Purpose'],
    tokens: {
      bg: '#ECFDF5',
      bg2: '#FFFFFF',
      text: '#065F46',
      textMuted: '#047857',
      accent: '#10B981',
      glassFill: 'rgba(16,185,129,0.08)',
      glassBorder: 'rgba(16,185,129,0.20)',
      shadowDeep: '0 40px 80px rgba(16,185,129,.20)',
      shadowSoft: '0 8px 24px rgba(16,185,129,.10)',
      financeGreen: '#059669',
      financeRed: '#EF4444'
    }
  }
};

// Theme persistence management
let currentAppliedTheme: ThemeId | null = null;
let themeScope: 'global' | 'page' = 'global';

// Performance throttling for theme changes
let themeChangeTimeout: NodeJS.Timeout | null = null;

export function applyTheme(themeId: ThemeId, saveToStorage = true) {
  try {
    const theme = AEGIS_THEMES[themeId];
    if (!theme) {
      console.warn('Theme not found:', themeId, 'falling back to royal-gold');
      return AEGIS_THEMES['royal-gold'];
    }
    
    // Immediate application for better performance
    const root = document.documentElement;
    if (!root) {
      console.warn('Document root not available');
      return theme;
    }
    
    // Determine if this is a light theme
    const isLightTheme = themeId.includes('-light');
    console.log(`Applying theme: ${themeId}, isLight: ${isLightTheme}`);
    
    // Define orbital glow colors for each theme
    const getOrbitalGlowColors = (themeId: ThemeId) => {
      const baseTheme = themeId.replace('-light', '');
      switch (baseTheme) {
        case 'royal-gold':
          return {
            primary: '#D4AF37',
            secondary: '#B8941F', 
            accent: '#F4E197',
            deep: '#8B7020'
          };
        case 'arctic-silver':
          return {
            primary: '#94A3B8',
            secondary: '#64748B',
            accent: '#CBD5E1',
            deep: '#475569'
          };
        case 'ember-glass':
          return {
            primary: '#FB923C',
            secondary: '#EA580C',
            accent: '#FED7AA',
            deep: '#C2410C'
          };
        case 'midnight-navy':
          return {
            primary: '#3B82F6',
            secondary: '#1D4ED8',
            accent: '#93C5FD',
            deep: '#1E40AF'
          };
        case 'verdant-jade':
          return {
            primary: '#10B981',
            secondary: '#059669',
            accent: '#6EE7B7',
            deep: '#047857'
          };
        case 'obsidian-black':
          return {
            primary: '#6B7280',
            secondary: '#4B5563',
            accent: '#9CA3AF',
            deep: '#374151'
          };
        case 'marble-white':
          return {
            primary: '#E5E7EB',
            secondary: '#D1D5DB',
            accent: '#F3F4F6',
            deep: '#9CA3AF'
          };
        case 'crimson-ember':
          return {
            primary: '#EF4444',
            secondary: '#DC2626',
            accent: '#FCA5A5',
            deep: '#B91C1C'
          };
        case 'sapphire-steel':
          return {
            primary: '#0EA5E9',
            secondary: '#0284C7',
            accent: '#7DD3FC',
            deep: '#0369A1'
          };
        case 'onyx-frost':
          return {
            primary: '#8B5CF6',
            secondary: '#7C3AED',
            accent: '#C4B5FD',
            deep: '#6D28D9'
          };
        default:
          return {
            primary: '#D4AF37',
            secondary: '#B8941F',
            accent: '#F4E197',
            deep: '#8B7020'
          };
      }
    };

    const orbitalColors = getOrbitalGlowColors(themeId);

    // Batch DOM updates with theme-specific tokens
    const updates = new Map([
      ['--background', theme.tokens.bg],
      ['--foreground', theme.tokens.text],
      ['--primary', theme.tokens.accent],
      ['--primary-foreground', isLightTheme ? '#FFFFFF' : theme.tokens.bg],
      ['--card', isLightTheme ? 'rgba(255, 255, 255, 0.95)' : theme.tokens.glassFill],
      ['--card-foreground', theme.tokens.text],
      ['--popover', isLightTheme ? 'rgba(255, 255, 255, 0.95)' : theme.tokens.glassFill],
      ['--popover-foreground', theme.tokens.text],
      ['--secondary', isLightTheme ? 'rgba(241, 245, 249, 0.8)' : theme.tokens.glassBorder],
      ['--secondary-foreground', theme.tokens.textMuted],
      ['--muted', isLightTheme ? 'rgba(248, 250, 252, 0.8)' : theme.tokens.glassBorder],
      ['--muted-foreground', theme.tokens.textMuted],
      ['--accent', theme.tokens.accent],
      ['--accent-foreground', isLightTheme ? theme.tokens.text : theme.tokens.bg],
      ['--border', theme.tokens.glassBorder],
      ['--input', theme.tokens.bg2],
      ['--input-background', theme.tokens.bg],
      ['--switch-background', theme.tokens.bg2],
      ['--ring', theme.tokens.glassBorder],
      ['--core-glass-fill', theme.tokens.glassFill],
      ['--core-border-translucent', theme.tokens.glassBorder],
      ['--shadow-deep', theme.tokens.shadowDeep],
      ['--shadow-soft', theme.tokens.shadowSoft],
      // Orbital Glow Colors - Dynamic Theme Update
      ['--orbital-glow-primary', orbitalColors.primary],
      ['--orbital-glow-secondary', orbitalColors.secondary],
      ['--orbital-glow-accent', orbitalColors.accent],
      ['--orbital-glow-deep', orbitalColors.deep],
      // Additional tokens for proper theming
      ['--destructive', isLightTheme ? '#DC2626' : theme.tokens.financeRed],
      ['--destructive-foreground', '#FFFFFF'],
      ['--success', isLightTheme ? '#16A34A' : theme.tokens.financeGreen],
      ['--success-foreground', '#FFFFFF'],
      ['--warning', '#F59E0B'],
      ['--warning-foreground', isLightTheme ? '#FFFFFF' : theme.tokens.bg]
    ]);

    // Apply all updates in a single synchronous batch
    for (const [prop, value] of updates) {
      root.style.setProperty(prop, value);
    }
    
    // Force immediate repaint and theme propagation
    root.style.setProperty('--theme-change-trigger', Date.now().toString());
    
    // Update both html and body classes for maximum compatibility
    const applyClassesToElement = (element: Element) => {
      if (!element) return;
      
      const currentClasses = element.classList;
      
      // Remove existing theme classes first
      const themeClassesToRemove = Array.from(currentClasses).filter(cls => 
        cls.startsWith('theme-') || cls === 'light' || cls === 'dark'
      );
      themeClassesToRemove.forEach(cls => currentClasses.remove(cls));
      
      // Add new classes - order matters for CSS specificity
      currentClasses.add(isLightTheme ? 'light' : 'dark');
      currentClasses.add(`theme-${themeId}`);
    };
    
    // Apply to both html and body for maximum browser compatibility
    if (document.documentElement) {
      applyClassesToElement(document.documentElement);
    }
    
    if (document.body) {
      applyClassesToElement(document.body);
    }
    
    console.log(`✅ Theme classes applied to html and body: ${isLightTheme ? 'light' : 'dark'}, theme-${themeId}`);
    
    // Update cache immediately
    currentAppliedTheme = themeId;
    
    // Save to storage asynchronously with debouncing
    if (saveToStorage) {
      setTimeout(() => {
        try {
          localStorage.setItem('aegis-theme', themeId);
        } catch (error) {
          // Silently fail
        }
      }, 100);
    }
    
    return theme;
  } catch (error) {
    console.warn('Theme application error:', error);
    return AEGIS_THEMES['royal-gold'];
  }
}

export function getCurrentTheme(): ThemeId {
  try {
    // Check localStorage first for persistence
    let stored: ThemeId | null = null;
    try {
      stored = localStorage.getItem('aegis-theme') as ThemeId;
    } catch (e) {
      console.warn('LocalStorage not accessible:', e);
    }
    
    // Return stored theme if valid
    if (stored && AEGIS_THEMES[stored]) {
      currentAppliedTheme = stored;
      return stored;
    }
    
    // Return cached theme if available
    if (currentAppliedTheme && AEGIS_THEMES[currentAppliedTheme]) {
      return currentAppliedTheme;
    }
    
    return 'royal-gold';
  } catch (error) {
    console.error('Error getting current theme:', error);
    return 'royal-gold';
  }
}

export function setThemeScope(scope: 'global' | 'page') {
  try {
    themeScope = scope;
    localStorage.setItem('aegis-theme-scope', scope);
    console.log('Theme scope set to:', scope);
  } catch (error) {
    console.error('Error setting theme scope:', error);
  }
}

export function getThemeScope(): 'global' | 'page' {
  try {
    const stored = localStorage.getItem('aegis-theme-scope') as 'global' | 'page';
    themeScope = stored || 'global';
    return themeScope;
  } catch (error) {
    console.error('Error getting theme scope:', error);
    return 'global';
  }
}

export function shouldUseGlobalTheme(): boolean {
  return getThemeScope() === 'global';
}

export function getThemeForDomain(domain: string): ThemeId {
  try {
    switch (domain) {
      case 'command-centre':
      case 'quality-compliance':
        return 'royal-gold';
      case 'healthcare':
      case 'workforce':
      case 'community-family':
        return 'arctic-silver';
      case 'finance-operations':
      case 'analytics-insights':
        return 'ember-glass';
      default:
        return getCurrentTheme();
    }
  } catch (error) {
    console.error('Error getting domain theme:', error);
    return 'royal-gold';
  }
}