import React, { useState, useEffect, Suspense, lazy } from "react";
import { SessionBarSimple as SessionBar } from "./components/aegis/SessionBarSimple";
import { SimpleThemeSwitcher } from "./components/aegis/SimpleThemeSwitcher";
import { PalaceGateNav } from "./components/nav/PalaceGateNav";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
// Removed PerformanceMonitor to prevent timeouts

// Lazy load heavy domain components for better performance
const CommandCentreDomain = lazy(() => import("./components/domains/CommandCentreDomain").then(module => ({ default: module.CommandCentreDomain })));
const HealthcareDomain = lazy(() => import("./components/domains/HealthcareDomain").then(module => ({ default: module.HealthcareDomain })));
const CareSupportDomain = lazy(() => import("./components/domains/CareSupportDomain").then(module => ({ default: module.CareSupportDomain })));
const WorkforceDomain = lazy(() => import("./components/domains/WorkforceDomain").then(module => ({ default: module.WorkforceDomain })));
const QualityComplianceDomain = lazy(() => import("./components/domains/QualityComplianceDomain").then(module => ({ default: module.QualityComplianceDomain })));
const FinanceOperationsDomain = lazy(() => import("./components/domains/FinanceOperationsDomain").then(module => ({ default: module.FinanceOperationsDomain })));
const AEInventoryDomain = lazy(() => import("./components/domains/AEInventoryDomain").then(module => ({ default: module.AEInventoryDomain })));
const AegisAIHubDomain = lazy(() => import("./components/domains/AegisAIHubDomainUpdated").then(module => ({ default: module.AegisAIHubDomain })));
const AdminDomain = lazy(() => import("./components/domains/AdminDomain").then(module => ({ default: module.AdminDomain })));
const RotaScheduler = lazy(() => import("./components/scheduling/RotaScheduler").then(module => ({ default: module.RotaScheduler })));

import { mockUser } from "./lib/mock-data";
import { PALACE_GATES } from "./lib/palace-gate-structure";
import goldenInfinityBackground from 'figma:asset/84f9bbba063a068a05f4226ec41db1c74ab17300.png';
import { AegisLogo } from "./components/aegis/AegisLogo";
import newBackgroundTexture from 'figma:asset/cbabb729c454d3e9a0c29b6d9cf1275a4b998d3a.png';
import {
  getCurrentTheme,
  applyTheme,
  shouldUseGlobalTheme,
  type ThemeId,
} from "./lib/theme-system";

// Update title function
const updateTitle = () => {
  if (typeof document !== 'undefined') {
    document.title = "AEGIS — Health & Social Care Management";
  }
};

// Simplified loading components
const LoadingFallback = () => (
  <div className="p-6 min-h-screen bg-background">
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 bg-primary/20 rounded-lg animate-pulse"></div>
    </div>
  </div>
);

const DomainLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-6 h-6 bg-primary rounded animate-spin"></div>
  </div>
);

export default function App() {
  const [activeGate, setActiveGate] = useState("command-centre");
  const [activeSubTab, setActiveSubTab] = useState("dashboard");
  const [currentTheme, setCurrentTheme] = useState<ThemeId>("royal-gold");
  const [isReady, setIsReady] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  // Ultra-minimal initialization
  useEffect(() => {
    setIsReady(true);
    updateTitle();
    
    // Apply initial theme properly
    requestAnimationFrame(() => {
      try {
        const savedTheme = getCurrentTheme();
        applyTheme(savedTheme, false); // Apply theme immediately
        setCurrentTheme(savedTheme);
        const isLight = document.documentElement.classList.contains('light');
        setIsLightMode(isLight);
      } catch (error) {
        setCurrentTheme('royal-gold');
        applyTheme('royal-gold', false);
      }
    });
  }, []);

  // Theme change monitoring
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isLight = document.documentElement.classList.contains('light');
      if (isLight !== isLightMode) {
        setIsLightMode(isLight);
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, [isLightMode]);

  // Remove unnecessary logging effect

  const handleGateChange = React.useCallback((gateId: string, subTabId?: string) => {
    setActiveGate(gateId);
    const gate = PALACE_GATES.find(g => g.id === gateId);
    const defaultSubTab = subTabId || gate?.subTabs[0]?.id || "dashboard";
    setActiveSubTab(defaultSubTab);
  }, []);

  const renderContent = React.useMemo(() => {
    const getContent = () => {
      switch (activeGate) {
        case "ai-hub":
          return <AegisAIHubDomain activeTab={activeSubTab} />;
        case "command-centre":
          return <CommandCentreDomain activeTab={activeSubTab} onNavigate={handleGateChange} />;
        case "healthcare":
          return activeSubTab === "care-support" ? 
            <CareSupportDomain activeTab="overview" /> : 
            <HealthcareDomain activeTab={activeSubTab} />;
        case "workforce":
          return activeSubTab === "rota" ? 
            <RotaScheduler /> : 
            <WorkforceDomain activeTab={activeSubTab} />;
        case "finance-operations":
          return activeSubTab === "ae-inventory" ? 
            <AEInventoryDomain activeTab="overview" /> : 
            <FinanceOperationsDomain activeTab={activeSubTab} />;
        case "quality-intelligence":
          return <QualityComplianceDomain activeTab={activeSubTab} />;
        case "admin":
          return <AdminDomain activeTab={activeSubTab} />;
        default:
          return <DomainLoadingFallback />;
      }
    };

    return (
      <Suspense fallback={<DomainLoadingFallback />}>
        <ErrorBoundary fallback={<LoadingFallback />}>
          {getContent()}
        </ErrorBoundary>
      </Suspense>
    );
  }, [activeGate, activeSubTab, handleGateChange]);

  // Minimal loading state
  if (!isReady) {
    return <div className="min-h-screen bg-black"></div>;
  }

  return (
    <div className={`min-h-screen relative aegis-app-background theme-${currentTheme}`}>
      {/* Optimized Background Layer */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url(${newBackgroundTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: isLightMode ? 'contrast(1.1) brightness(0.98)' : 'contrast(1.05) brightness(1.05)',
          opacity: 0.9
        }}
      />
      
      {/* Light Mode Pattern Overlay */}
      {isLightMode && (
        <div 
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle at 30% 40%, var(--orbital-glow-primary, #D4AF37) 0%, transparent 3%), 
                        radial-gradient(circle at 70% 60%, var(--orbital-glow-secondary, #B8941F) 0%, transparent 2.5%)`,
            opacity: 0.08
          }}
        />
      )}

      {/* Central AEGIS Logo - Conditionally rendered */}
      {isReady && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-1">
          <AegisLogo
            size="central"
            showBackground={false}
            enableAnimation={false}
            className="aegis-central-logo opacity-80"
          />
        </div>
      )}



      {/* Session Bar */}
      <div className="relative z-10 session-bar-bg">
        <SessionBar user={mockUser} notifications={7} />
      </div>

      {/* Navigation */}
      <div className="relative z-10 navigation-bg">
        <PalaceGateNav
          activeGate={activeGate}
          activeSubTab={activeSubTab}
          onGateChange={handleGateChange}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-[calc(100vh-160px)] main-content-bg">
        <div className="relative z-20">
          {renderContent}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/20 px-6 py-3 footer-bg">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.02] to-transparent"></div>
          <div className="relative text-sm text-muted-foreground text-center font-medium tracking-wide">
            © 2024 AEGIS - Health & Social Care Management System
          </div>
        </div>
      </footer>

      {/* Simple Theme Switcher - Conditional Render */}
      {isReady && <SimpleThemeSwitcher />}

      {/* Performance Monitor removed to prevent timeouts */}
    </div>
  );
}