import { cn } from "../ui/utils";

interface RAGIndicatorProps {
  status: "red" | "amber" | "green";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RAGIndicator({ status, size = "md", className }: RAGIndicatorProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  };

  const colorClasses = {
    red: "bg-red-600",
    amber: "bg-amber-500",
    green: "bg-green-600"
  };

  return (
    <div 
      className={cn(
        "rounded-full",
        sizeClasses[size],
        colorClasses[status],
        className
      )}
      title={`Status: ${status.toUpperCase()}`}
    />
  );
}