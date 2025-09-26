'use client';

import { useState } from 'react';
import { Menu, Search, Bell, Settings, User, Palette, Command } from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { motion } from 'motion/react';

interface TopbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Topbar({ sidebarOpen, setSidebarOpen }: TopbarProps) {
  const { theme, setTheme, themes } = useTheme();
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Command Palette shortcut (⌘K)
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      // TODO: Open command palette
      console.log('Open command palette');
    }
  };

  return (
    <motion.header 
      className="h-16 border-b border-[var(--surface-3)] aegis-glass flex items-center justify-between px-4"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="aegis-button p-2"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/60 rounded-lg flex items-center justify-center font-bold text-sm">
            AE
          </div>
          <div>
            <h1 className="font-bold text-lg aegis-text-gradient">AEGIS</h1>
            <p className="text-xs text-[var(--surface-7)] font-mono">Open Health OS</p>
          </div>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--surface-6)] w-4 h-4" />
          <input
            type="text"
            placeholder="Search AEGIS... (⌘K)"
            className="w-full aegis-surface border border-[var(--surface-4)] rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
            onKeyDown={handleKeyDown}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-[var(--surface-6)]">
            <Command size={12} />
            <span className="text-xs">K</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Theme Selector */}
        <div className="relative">
          <button
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            className="aegis-button p-2 relative"
            aria-label="Change theme"
          >
            <Palette size={20} />
          </button>
          
          {themeDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              className="absolute top-full right-0 mt-2 w-64 aegis-glass border border-[var(--surface-4)] rounded-lg shadow-lg z-50"
            >
              <div className="p-3">
                <h3 className="font-medium mb-3 text-sm">AEGIS Themes</h3>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`flex items-center gap-3 p-2 rounded-lg text-left text-sm transition-colors ${
                        theme === t.id
                          ? 'bg-[var(--surface-3)] border border-[var(--accent)]'
                          : 'hover:bg-[var(--surface-2)]'
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          theme === t.id ? 'ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--bg)]' : ''
                        }`}
                        style={{ backgroundColor: t.primary }}
                      />
                      <span className="flex-1">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Notifications */}
        <button className="aegis-button p-2 relative" aria-label="Notifications">
          <Bell size={20} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--accent)] rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-[var(--bg)]">3</span>
          </div>
        </button>

        {/* Settings */}
        <button className="aegis-button p-2" aria-label="Settings">
          <Settings size={20} />
        </button>

        {/* User */}
        <button className="aegis-button p-2" aria-label="User menu">
          <User size={20} />
        </button>
      </div>

      {/* Click outside to close theme dropdown */}
      {themeDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setThemeDropdownOpen(false)}
        />
      )}
    </motion.header>
  );
}