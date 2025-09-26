import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Download, FileImage, Palette } from 'lucide-react';
import { AegisLogo, exportAegisLogoVariants, aegisLogoTokens } from './AegisLogo';

type ExportFormat = 'PNG' | 'SVG' | 'WebP';
type ExportResolution = '1K' | '2K' | '4K' | '8K';

const RESOLUTION_SIZES = {
  '1K': { width: 1024, height: 1024 },
  '2K': { width: 2048, height: 2048 },
  '4K': { width: 4096, height: 4096 },
  '8K': { width: 8192, height: 8192 }
};

export function AegisLogoExporter() {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('PNG');
  const [selectedResolution, setSelectedResolution] = useState<ExportResolution>('4K');
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const logoVariants = exportAegisLogoVariants();

  const exportLogo = async (variant: string, transparent: boolean = true) => {
    if (!canvasRef.current) return;

    setIsExporting(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resolution = RESOLUTION_SIZES[selectedResolution];
    canvas.width = resolution.width;
    canvas.height = resolution.height;

    // Clear canvas
    if (!transparent) {
      ctx.fillStyle = '#0C0F13';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    try {
      // Create a temporary logo element for export
      const logoElement = document.createElement('div');
      logoElement.style.position = 'absolute';
      logoElement.style.top = '-9999px';
      logoElement.style.width = `${resolution.width}px`;
      logoElement.style.height = `${resolution.height}px`;
      document.body.appendChild(logoElement);

      // Generate download
      const dataURL = canvas.toDataURL(`image/${selectedFormat.toLowerCase()}`, 1.0);
      const link = document.createElement('a');
      link.download = `aegis-logo-${variant}-${selectedResolution}.${selectedFormat.toLowerCase()}`;
      link.href = dataURL;
      link.click();

      // Cleanup
      document.body.removeChild(logoElement);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAllVariants = async () => {
    setIsExporting(true);
    const variants = Object.keys(logoVariants.variants);
    
    for (const variant of variants) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between exports
      await exportLogo(variant.replace('aegis-logo-', '').replace('.png', ''));
    }
    
    setIsExporting(false);
  };

  const downloadTokensJSON = () => {
    const dataStr = JSON.stringify(aegisLogoTokens, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'aegis-logo-tokens.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6 p-6">
      {/* Hidden canvas for export */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Export Controls */}
      <Card className="p-6 aegis-card-glass">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileImage className="w-5 h-5" />
            <h3 className="font-semibold">AEGIS Logo Export System</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Format Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Export Format</label>
              <div className="flex gap-2">
                {['PNG', 'SVG', 'WebP'].map((format) => (
                  <Button
                    key={format}
                    variant={selectedFormat === format ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFormat(format as ExportFormat)}
                  >
                    {format}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Resolution Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Resolution</label>
              <div className="grid grid-cols-2 gap-2">
                {['1K', '2K', '4K', '8K'].map((res) => (
                  <Button
                    key={res}
                    variant={selectedResolution === res ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedResolution(res as ExportResolution)}
                  >
                    {res}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Export Actions */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <div className="space-y-2">
                <Button
                  onClick={exportAllVariants}
                  disabled={isExporting}
                  className="w-full"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting ? 'Exporting...' : 'Export All Variants'}
                </Button>
                <Button
                  onClick={downloadTokensJSON}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <FileImage className="w-4 h-4 mr-2" />
                  Download Tokens JSON
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Logo Variants Preview */}
      <Card className="p-6 aegis-card-glass">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            <h3 className="font-semibold">Logo Variants Preview</h3>
            <Badge variant="secondary">{Object.keys(logoVariants.variants).length} variants</Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Object.entries(logoVariants.variants).map(([filename, config]) => (
              <div key={filename} className="space-y-2">
                <div className="aspect-square bg-black/20 rounded-lg flex items-center justify-center p-4">
                  <AegisLogo
                    variant={config.variant}
                    size="sm"
                    enableAnimation={false}
                    showBackground={true}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{config.variant}</p>
                  <Button
                    onClick={() => exportLogo(config.variant)}
                    disabled={isExporting}
                    variant="outline"
                    size="sm"
                    className="mt-1 w-full"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Component Usage Examples */}
      <Card className="p-6 aegis-card-glass">
        <div className="space-y-4">
          <h3 className="font-semibold">Usage Examples</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Automatic Theme Detection</h4>
              <div className="bg-black/10 p-4 rounded-lg">
                <code className="text-sm">
                  {`<AegisLogo size="md" enableAnimation={true} />`}
                </code>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Specific Variant</h4>
              <div className="bg-black/10 p-4 rounded-lg">
                <code className="text-sm">
                  {`<AegisLogo variant="royal-dark" size="lg" showBackground={false} />`}
                </code>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Clickable Logo</h4>
              <div className="bg-black/10 p-4 rounded-lg">
                <code className="text-sm">
                  {`<AegisLogo size="central" onClick={() => navigateHome()} />`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AegisLogoExporter;