interface SubNavProps {
  items: string[];
  active: string;
  onChange: (item: string) => void;
  className?: string;
}

export function SubNav({ items, active, onChange, className = "" }: SubNavProps) {
  return (
    <div className={`border-b border-white/8 bg-black/10 ${className}`}>
      <div className="px-6 py-3">
        <div className="flex items-center gap-1 overflow-x-auto">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => onChange(item)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
                whitespace-nowrap
                ${active === item 
                  ? 'bg-white/6 text-white border border-white/12' 
                  : 'text-white/60 hover:text-white/80 hover:bg-white/3'
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}