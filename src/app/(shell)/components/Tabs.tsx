'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationModule } from '@/lib/navigation.model';
import { motion } from 'motion/react';
import { Icon } from './Icon';

interface TabsProps {
  module: NavigationModule;
  pathname: string;
}

export function Tabs({ module, pathname }: TabsProps) {
  return (
    <motion.div 
      className="border-b border-[var(--surface-3)] bg-[var(--surface-1)] px-4"
      initial={{ y: -4, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.15 }}
    >
      {/* Module Header */}
      <div className="flex items-center gap-3 py-3 border-b border-[var(--surface-2)]">
        <Icon name={module.icon} size={20} className="text-[var(--accent)]" />
        <div>
          <h1 className="font-bold text-lg">{module.label}</h1>
          <p className="text-sm text-[var(--surface-7)]">{module.description}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 py-3">
          {module.children.map((tab) => {
            const isActive = pathname === tab.route;
            
            return (
              <Link
                key={tab.key}
                href={tab.route}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[var(--accent)] text-[var(--bg)]'
                    : 'text-[var(--surface-8)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                }`}
              >
                {tab.icon && (
                  <Icon 
                    name={tab.icon} 
                    size={16} 
                    className={isActive ? 'text-[var(--bg)]' : ''} 
                  />
                )}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span 
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      isActive 
                        ? 'bg-[var(--bg)] text-[var(--accent)]'
                        : 'bg-[var(--surface-3)] text-[var(--surface-7)]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[var(--accent)] rounded-lg -z-10"
                    transition={{ type: 'spring', duration: 0.4 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}