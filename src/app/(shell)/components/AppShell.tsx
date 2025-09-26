'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { modules, moduleThemes, type ModuleKey } from '@/lib/navigation.model';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { Tabs } from './Tabs';
import { AEBackground } from './scene/AEBackground';
import { motion, AnimatePresence } from 'motion/react';

interface AppShellProps {
  children: ReactNode;
  pathname: string;
}

export function AppShell({ children, pathname }: AppShellProps) {
  const { theme, setTheme } = useTheme();
  const [activeModule, setActiveModule] = useState<ModuleKey>('command-centre');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Parse pathname to determine active module and tab
  useEffect(() => {
    const pathParts = pathname.split('/').filter(Boolean);
    const moduleKey = pathParts[0] as ModuleKey;
    
    if (moduleKey && modules.find(m => m.key === moduleKey)) {
      setActiveModule(moduleKey);
      
      // Auto-apply module theme
      const moduleTheme = moduleThemes[moduleKey];
      if (moduleTheme && moduleTheme !== theme) {
        setTheme(moduleTheme);
      }
    }
  }, [pathname, theme, setTheme]);

  const currentModule = modules.find(m => m.key === activeModule);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] relative overflow-hidden">
      {/* 3D Background Scene */}
      <AEBackground />
      
      {/* Glass Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--glass-1)] to-transparent" />
      </div>

      {/* App Shell */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Topbar */}
        <Topbar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ x: -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -320, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                className="w-80 border-r border-[var(--surface-3)] aegis-surface"
              >
                <Sidebar 
                  activeModule={activeModule}
                  setActiveModule={setActiveModule}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Module Tabs */}
            {currentModule && (
              <Tabs 
                module={currentModule}
                pathname={pathname}
              />
            )}

            {/* Content */}
            <main className="flex-1 overflow-auto aegis-surface">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
                className="h-full"
              >
                {children}
              </motion.div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}