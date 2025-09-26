interface Tab {
  key: string;
  label: string;
  theme: 'royal-gold' | 'arctic-silver' | 'ember-glass' | 'teal-variant' | 'industrial-grey';
}

interface MainNavProps {
  active: string;
  onChange: (tab: string) => void;
  className?: string;
}

export function MainNav({ active, onChange, className = "" }: MainNavProps) {
  const tabs: Tab[] = [
    { key: "command-centre", label: "Command Centre", theme: "royal-gold" },
    { key: "healthcare", label: "Healthcare", theme: "arctic-silver" },
    { key: "care-support", label: "Care & Support", theme: "teal-variant" },
    { key: "workforce", label: "Workforce", theme: "industrial-grey" },
    { key: "quality-compliance", label: "Quality & Compliance", theme: "royal-gold" },
    { key: "finance-operations", label: "Finance & Operations", theme: "ember-glass" },
    { key: "analytics-insights", label: "Analytics & Insights", theme: "ember-glass" },
    { key: "administration", label: "Administration", theme: "arctic-silver" },
    { key: "community-family", label: "Community & Family", theme: "arctic-silver" },
    { key: "aegis-ai-hub", label: "AEGIS AI Hub", theme: "royal-gold" }
  ];

  return (
    <nav className={`${className}`}>
      <div className="px-6 py-4">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`
                px-4 py-2.5 rounded-xl text-sm font-medium
                whitespace-nowrap border aegis-ceremonial-hover
                transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]
                ${active === tab.key 
                  ? 'bg-primary/10 text-primary border-primary/40 shadow-[inset_0_1px_0_rgba(212,175,55,0.08)] font-bold' 
                  : 'text-foreground/70 border-transparent hover:text-foreground hover:bg-card/40 hover:border-border/30'
                }
              `}
              style={{
                background: active === tab.key 
                  ? 'linear-gradient(180deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.04) 100%)'
                  : undefined
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}