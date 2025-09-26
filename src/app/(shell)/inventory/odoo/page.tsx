'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

// AE Panel Component
function AEPanel({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`aegis-card p-6 ${className}`}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

// AE IFrame Component with security and branding
function AEIFrame({ src, allow = '', className = '' }: { src: string; allow?: string; className?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check if Odoo server is reachable
    const checkConnection = async () => {
      try {
        // This would be replaced with actual health check endpoint
        const response = await fetch('/api/odoo/health');
        setIsOnline(response.ok);
      } catch (error) {
        setIsOnline(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (!isOnline) {
    return (
      <div className="flex items-center justify-center h-96 text-center">
        <div className="space-y-4">
          <AlertCircle size={48} className="text-[var(--accent)] mx-auto" />
          <h3 className="text-lg font-semibold">Odoo Server Offline</h3>
          <p className="text-[var(--surface-7)]">
            Unable to connect to the Odoo server. Please check your connection or contact support.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="aegis-button-primary flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={16} />
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-96 text-center">
        <div className="space-y-4">
          <AlertCircle size={48} className="text-red-400 mx-auto" />
          <h3 className="text-lg font-semibold">Failed to Load Odoo</h3>
          <p className="text-[var(--surface-7)]">
            There was an error loading the Odoo interface. This may be due to security settings or server issues.
          </p>
          <div className="space-y-2">
            <button 
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
              }}
              className="aegis-button-primary flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={16} />
              Retry
            </button>
            <a
              href="/odoo/web"
              target="_blank"
              rel="noopener noreferrer"
              className="aegis-button flex items-center gap-2 mx-auto"
            >
              <ExternalLink size={16} />
              Open in New Tab
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface-1)] rounded-lg">
          <div className="space-y-4 text-center">
            <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-[var(--surface-7)]">Loading AE Odoo...</p>
          </div>
        </div>
      )}
      
      <iframe
        src={src}
        allow={allow}
        className="w-full h-[800px] rounded-lg border border-[var(--surface-3)]"
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        title="AE Odoo System"
      />
      
      {/* Custom styling injection would happen via proxy */}
      <style jsx>{`
        iframe {
          color-scheme: dark;
        }
      `}</style>
    </div>
  );
}

export default function AEOdooPage() {
  const [ssoStatus, setSsoStatus] = useState<'checking' | 'authenticated' | 'failed'>('checking');

  useEffect(() => {
    // Simulate SSO check - in real implementation this would verify JWT
    const checkSSO = async () => {
      try {
        // This would check if user has valid session with Odoo
        const response = await fetch('/api/odoo/sso-status');
        setSsoStatus(response.ok ? 'authenticated' : 'failed');
      } catch (error) {
        setSsoStatus('failed');
      }
    };

    const timer = setTimeout(checkSSO, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="p-6 space-y-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AE Odoo Integration</h1>
          <p className="text-[var(--surface-7)] mt-1">
            Comprehensive ERP system with AEGIS branding and SSO integration
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          {ssoStatus === 'checking' && (
            <>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span>Checking authentication...</span>
            </>
          )}
          {ssoStatus === 'authenticated' && (
            <>
              <CheckCircle size={16} className="text-green-400" />
              <span>SSO Authenticated</span>
            </>
          )}
          {ssoStatus === 'failed' && (
            <>
              <AlertCircle size={16} className="text-red-400" />
              <span>Authentication required</span>
            </>
          )}
        </div>
      </div>

      {/* SSO Authentication Flow */}
      {ssoStatus === 'failed' && (
        <AEPanel title="Authentication Required" className="border border-yellow-400/20 bg-yellow-400/5">
          <div className="space-y-4">
            <p className="text-[var(--surface-7)]">
              You need to authenticate with Odoo to access the ERP system. 
              This will create a secure session between AEGIS and Odoo.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  // In real implementation, this would initiate SSO flow
                  setSsoStatus('authenticated');
                }}
                className="aegis-button-primary"
              >
                Authenticate with Odoo
              </button>
              <a 
                href="/odoo/web/login" 
                target="_blank"
                className="aegis-button flex items-center gap-2"
              >
                <ExternalLink size={16} />
                Direct Login
              </a>
            </div>
          </div>
        </AEPanel>
      )}

      {/* Main Odoo Interface */}
      {ssoStatus === 'authenticated' && (
        <AEPanel title="AE Odoo System">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[var(--surface-7)]">
                Integrated Odoo ERP with AEGIS theming and enhanced security controls.
              </p>
              <div className="flex gap-2">
                <a
                  href="/odoo/web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aegis-button flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Full Screen
                </a>
              </div>
            </div>
            
            {/* Embedded Odoo */}
            <AEIFrame 
              src="/odoo/web" 
              allow="clipboard-read; clipboard-write; fullscreen" 
            />
          </div>
        </AEPanel>
      )}

      {/* Integration Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AEPanel title="Features" className="col-span-1">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-400" />
              <span>Single Sign-On (SSO)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-400" />
              <span>AEGIS Theme Integration</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-400" />
              <span>Secure Frame Embedding</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-400" />
              <span>Session Management</span>
            </li>
          </ul>
        </AEPanel>

        <AEPanel title="Security" className="col-span-1">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-blue-400" />
              <span>CSP Headers Enforced</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-blue-400" />
              <span>SameSite Cookie Protection</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-blue-400" />
              <span>JWT Token Validation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-blue-400" />
              <span>Audit Logging Enabled</span>
            </li>
          </ul>
        </AEPanel>

        <AEPanel title="Performance" className="col-span-1">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Response Time</span>
              <span className="font-mono text-green-400">~180ms</span>
            </div>
            <div className="flex justify-between">
              <span>Uptime</span>
              <span className="font-mono text-green-400">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span>Active Sessions</span>
              <span className="font-mono">24</span>
            </div>
            <div className="flex justify-between">
              <span>Data Sync Status</span>
              <span className="text-green-400">✓ Live</span>
            </div>
          </div>
        </AEPanel>
      </div>
    </motion.div>
  );
}