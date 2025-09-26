import { KPI } from "../common/KPI";

interface KpiData {
  label: string;
  value: number | string;
  onDrill?: () => void;
  onExport?: () => void;
  onClick?: () => void;
}

interface KpiGridProps {
  kpis: KpiData[];
  className?: string;
}

export function KpiGrid({ kpis, className = "" }: KpiGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ${className}`}>
      {kpis.map((kpi, index) => (
        <KPI
          key={index}
          label={kpi.label}
          value={kpi.value}
          onDrill={kpi.onDrill}
          onExport={kpi.onExport}
          onClick={kpi.onClick}
        />
      ))}
    </div>
  );
}