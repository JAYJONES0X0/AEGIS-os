import { CardGlass } from "../common/CardGlass";
import { useState } from "react";

interface CopilotPanelProps {
  prompt?: string;
  className?: string;
}

export function CopilotPanel({ prompt = "", className = "" }: CopilotPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const sampleResponse = `Based on current system analysis:

• 23 residents require medication review by clinical lead
• Quality audit for Unit B is overdue by 3 days  
• Staff vacancy rate at 12% - recommend immediate recruitment
• Financial variance of +£2,300 against budget this quarter

Recommended actions:
1. Schedule medication reviews for tomorrow morning
2. Initiate Unit B audit process immediately
3. Contact approved agency for temporary cover
4. Review budget allocation for Q4`;

  return (
    <CardGlass title="AEGIS Co-pilot" className={className}>
      <div className="space-y-4">
        <div className="p-3 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
            <span className="text-sm font-medium text-[#D4AF37]">
              Policy-Aware AI Assistant Active
            </span>
          </div>
          
          {prompt && (
            <div className="text-sm text-white/70 mb-3 p-2 bg-white/5 rounded border border-white/10">
              <span className="text-white/50">You:</span> {prompt}
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="text-sm text-white/60">
            <span className="text-[#D4AF37]">AEGIS:</span> Good morning. I've reviewed overnight reports and identified key priorities for your attention.
          </div>
          
          <div 
            className={`text-sm text-white/80 leading-relaxed font-mono transition-all duration-300 ${
              isExpanded ? 'max-h-none' : 'max-h-24 overflow-hidden'
            }`}
          >
            {sampleResponse}
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        </div>
        
        <div className="pt-3 border-t border-white/8">
          <div className="text-xs text-white/50">
            Last updated: {new Date().toLocaleTimeString()} • Policy database: Current
          </div>
        </div>
      </div>
    </CardGlass>
  );
}