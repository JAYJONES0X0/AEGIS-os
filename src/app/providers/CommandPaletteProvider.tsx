'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'lucide-react';
import { modules } from '@/lib/navigation.model';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@/app/(shell)/components/Icon';

interface CommandPaletteContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(undefined);

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (context === undefined) {
    throw new Error('useCommandPalette must be used within a CommandPaletteProvider');
  }
  return context;
}

interface CommandPaletteProviderProps {
  children: ReactNode;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  route?: string;
  action?: () => void;
  icon?: string;
  category: string;
}

export function CommandPaletteProvider({ children }: CommandPaletteProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Generate command items from navigation
  const allCommands: CommandItem[] = [
    // Navigation commands
    ...modules.flatMap(module => [
      {
        id: `nav-${module.key}`,
        title: module.label,
        subtitle: module.description,
        route: module.children[0]?.route,
        icon: module.icon,
        category: 'Navigation'
      },
      ...module.children.map(child => ({
        id: `nav-${module.key}-${child.key}`,
        title: `${module.label} → ${child.label}`,
        subtitle: child.description,
        route: child.route,
        icon: child.icon || module.icon,
        category: 'Navigation'
      }))
    ]),
    // System commands
    {
      id: 'theme-toggle',
      title: 'Change Theme',
      subtitle: 'Switch between AEGIS themes',
      icon: 'Palette',
      category: 'System',
      action: () => {
        // Theme switching logic would go here
        console.log('Theme switching');
      }
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'Get help with AEGIS',
      icon: 'FileText',
      category: 'System',
      action: () => console.log('Help')
    }
  ];

  const filteredCommands = search
    ? allCommands.filter(
        cmd =>
          cmd.title.toLowerCase().includes(search.toLowerCase()) ||
          cmd.subtitle?.toLowerCase().includes(search.toLowerCase())
      )
    : allCommands;

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setSearch('');
    setSelectedIndex(0);
  };
  const toggle = () => setIsOpen(!isOpen);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to open/close
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
        return;
      }

      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          close();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(i => (i + 1) % filteredCommands.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(i => (i - 1 + filteredCommands.length) % filteredCommands.length);
          break;
        case 'Enter':
          e.preventDefault();
          const selectedCommand = filteredCommands[selectedIndex];
          if (selectedCommand) {
            if (selectedCommand.route) {
              router.push(selectedCommand.route);
            } else if (selectedCommand.action) {
              selectedCommand.action();
            }
            close();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, router, toggle]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
      
      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={close}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="fixed top-[20%] left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4 z-50"
            >
              <div className="aegis-glass border border-[var(--surface-4)] rounded-xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-[var(--surface-3)]">
                  <Command size={20} className="text-[var(--accent)]" />
                  <input
                    type="text"
                    placeholder="Search AEGIS..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-lg placeholder-[var(--surface-6)]"
                    autoFocus
                  />
                  <div className="text-xs text-[var(--surface-6)] bg-[var(--surface-2)] px-2 py-1 rounded">
                    ESC
                  </div>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto">
                  {filteredCommands.length === 0 ? (
                    <div className="p-8 text-center text-[var(--surface-6)]">
                      No results found for "{search}"
                    </div>
                  ) : (
                    <div className="p-2">
                      {/* Group by category */}
                      {['Navigation', 'System'].map((category) => {
                        const categoryCommands = filteredCommands.filter(
                          cmd => cmd.category === category
                        );
                        
                        if (categoryCommands.length === 0) return null;
                        
                        return (
                          <div key={category} className="mb-4">
                            <div className="px-3 py-2 text-xs font-medium text-[var(--surface-7)] uppercase tracking-wide">
                              {category}
                            </div>
                            <div className="space-y-1">
                              {categoryCommands.map((command, index) => {
                                const globalIndex = filteredCommands.indexOf(command);
                                const isSelected = globalIndex === selectedIndex;
                                
                                return (
                                  <button
                                    key={command.id}
                                    onClick={() => {
                                      if (command.route) {
                                        router.push(command.route);
                                      } else if (command.action) {
                                        command.action();
                                      }
                                      close();
                                    }}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                                      isSelected
                                        ? 'bg-[var(--accent)] text-[var(--bg)]'
                                        : 'hover:bg-[var(--surface-2)]'
                                    }`}
                                  >
                                    {command.icon && (
                                      <Icon
                                        name={command.icon}
                                        size={18}
                                        className={isSelected ? 'text-[var(--bg)]' : 'text-[var(--surface-6)]'}
                                      />
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-sm truncate">
                                        {command.title}
                                      </div>
                                      {command.subtitle && (
                                        <div 
                                          className={`text-xs truncate mt-0.5 ${
                                            isSelected ? 'text-[var(--bg)]/70' : 'text-[var(--surface-6)]'
                                          }`}
                                        >
                                          {command.subtitle}
                                        </div>
                                      )}
                                    </div>
                                    {isSelected && (
                                      <div className="text-xs text-[var(--bg)]/70 bg-[var(--bg)]/20 px-2 py-1 rounded">
                                        ⏎
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-3 border-t border-[var(--surface-3)] text-xs text-[var(--surface-6)]">
                  <div>Navigate with ↑↓ • Select with ⏎</div>
                  <div>Powered by AEGIS</div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </CommandPaletteContext.Provider>
  );
}