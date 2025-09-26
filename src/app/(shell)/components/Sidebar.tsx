'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { modules, type ModuleKey } from '@/lib/navigation.model';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './Icon';

interface SidebarProps {
  activeModule: ModuleKey;
  setActiveModule: (module: ModuleKey) => void;
}

export function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  const pathname = usePathname();
  const [expandedModules, setExpandedModules] = useState<Set<ModuleKey>>(
    new Set([activeModule])
  );

  const toggleModule = (moduleKey: ModuleKey) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleKey)) {
      newExpanded.delete(moduleKey);
    } else {
      newExpanded.add(moduleKey);
    }
    setExpandedModules(newExpanded);
  };

  return (
    <motion.aside 
      className="h-full flex flex-col aegis-surface border-r border-[var(--surface-3)]"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-[var(--surface-3)]">
        <h2 className="font-semibold text-lg">Navigation</h2>
        <p className="text-sm text-[var(--surface-7)] mt-1">
          {modules.length} modules available
        </p>
      </div>

      {/* Navigation Tree */}
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {modules.map((module) => {
            const isExpanded = expandedModules.has(module.key);
            const isActive = activeModule === module.key;
            
            return (
              <motion.div
                key={module.key}
                layout
                className="space-y-1"
              >
                {/* Module Header */}
                <button
                  onClick={() => {
                    toggleModule(module.key);
                    setActiveModule(module.key);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all group ${
                    isActive 
                      ? 'bg-[var(--surface-2)] border border-[var(--accent)] text-[var(--accent)]' 
                      : 'hover:bg-[var(--surface-1)] text-[var(--surface-8)]'
                  }`}
                >
                  <Icon name={module.icon} size={18} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{module.label}</div>
                    <div className="text-xs text-[var(--surface-6)] truncate">
                      {module.description}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`transition-colors ${isActive ? 'text-[var(--accent)]' : 'text-[var(--surface-6)]'}`}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>

                {/* Module Children */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 space-y-1 border-l border-[var(--surface-3)] pl-4">
                        {module.children.map((child) => {
                          const childPath = child.route;
                          const isChildActive = pathname === childPath;
                          
                          return (
                            <Link
                              key={child.key}
                              href={childPath}
                              className={`flex items-center gap-3 p-2 rounded-md text-sm transition-all group ${
                                isChildActive
                                  ? 'bg-[var(--accent)] text-[var(--bg)] font-medium'
                                  : 'hover:bg-[var(--surface-1)] text-[var(--surface-7)] hover:text-[var(--text)]'
                              }`}
                            >
                              {child.icon && (
                                <Icon 
                                  name={child.icon} 
                                  size={14} 
                                  className={isChildActive ? 'text-[var(--bg)]' : ''} 
                                />
                              )}
                              <span className="flex-1">{child.label}</span>
                              {child.badge && (
                                <span 
                                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                    isChildActive 
                                      ? 'bg-[var(--bg)] text-[var(--accent)]'
                                      : 'bg-[var(--surface-3)] text-[var(--surface-8)]'
                                  }`}
                                >
                                  {child.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-[var(--surface-3)]">
        <div className="text-xs text-[var(--surface-6)] text-center">
          AEGIS v2024.1 • {new Date().getFullYear()}
        </div>
      </div>
    </motion.aside>
  );
}