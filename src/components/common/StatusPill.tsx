interface StatusPillProps {
  label: string;
  tone: 'ok' | 'warn' | 'bad' | 'neutral';
  className?: string;
}

export function StatusPill({ label, tone, className = "" }: StatusPillProps) {
  const toneStyles = {
    ok: "text-[#16A34A] border-[#16A34A]/20",
    warn: "text-[#F59E0B] border-[#F59E0B]/20", 
    bad: "text-[#DC2626] border-[#DC2626]/20",
    neutral: "text-white/70 border-white/8"
  };

  return (
    <span 
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        border ${toneStyles[tone]}
        ${className}
      `}
    >
      {label}
    </span>
  );
}