import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AegisLogo } from '../aegis/AegisLogo';
import { Palette, Play, Pause, RotateCcw, Layers } from 'lucide-react';

const logoVariants = [
  { id: 'royal-dark', name: 'Royal Gold Dark', color: '#D4AF37' },
  { id: 'arctic-dark', name: 'Arctic Silver Dark', color: '#94A3B8' },
  { id: 'ember-dark', name: 'Ember Glass Dark', color: '#FB923C' },
  { id: 'midnight-dark', name: 'Midnight Navy Dark', color: '#3B82F6' },
  { id: 'verdant-dark', name: 'Verdant Jade Dark', color: '#10B981' },
  { id: 'royal-light', name: 'Royal Gold Light', color: '#D97706' },
  { id: 'arctic-light', name: 'Arctic Silver Light', color: '#64748B' },
  { id: 'ember-light', name: 'Ember Glass Light', color: '#EA580C' },
  { id: 'midnight-light', name: 'Midnight Navy Light', color: '#2563EB' },
  { id: 'verdant-light', name: 'Verdant Jade Light', color: '#059669' }
];

const sizes = [
  { id: 'sm', name: 'Small', description: '3rem / 48px' },
  { id: 'md', name: 'Medium', description: '5rem / 80px' },
  { id: 'lg', name: 'Large', description: '8rem / 128px' },
  { id: 'xl', name: 'Extra Large', description: '12rem / 192px' }
];

export function AegisLogoDemo() {
  const [selectedVariant, setSelectedVariant] = useState<string>('royal-dark');
  const [selectedSize, setSelectedSize] = useState<string>('md');
  const [showBackground, setShowBackground] = useState(true);
  const [enableAnimation, setEnableAnimation] = useState(true);

  return (
    <div className="space-y-6 p-6">
      <Card className="p-6 aegis-card-glass">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Palette className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">AEGIS Logo System Demo</h2>
            <p className="text-sm text-muted-foreground">
              Interactive demonstration of the theme-aware logo component system
            </p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            20 Variants
          </Badge>
        </div>

        <Tabs defaultValue="interactive" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="interactive">Interactive Demo</TabsTrigger>
            <TabsTrigger value="gallery">Variant Gallery</TabsTrigger>
            <TabsTrigger value="sizes">Size Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="interactive" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Controls */}
              <Card className="p-6 aegis-card-metal">
                <h3 className="font-semibold mb-4">Logo Configuration</h3>
                
                <div className="space-y-4">
                  {/* Variant Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Variant</label>
                    <div className="grid grid-cols-2 gap-2">
                      {logoVariants.slice(0, 6).map((variant) => (
                        <Button
                          key={variant.id}
                          variant={selectedVariant === variant.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedVariant(variant.id)}
                          className="justify-start"
                        >
                          <div 
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: variant.color }}
                          />
                          {variant.name.split(' ')[0]}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Size</label>
                    <div className="grid grid-cols-2 gap-2">
                      {sizes.map((size) => (
                        <Button
                          key={size.id}
                          variant={selectedSize === size.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedSize(size.id)}
                        >
                          {size.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Show Background</label>
                      <Button
                        variant={showBackground ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setShowBackground(!showBackground)}
                      >
                        <Layers className="w-4 h-4 mr-2" />
                        {showBackground ? 'On' : 'Off'}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Animation</label>
                      <Button
                        variant={enableAnimation ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setEnableAnimation(!enableAnimation)}
                      >
                        {enableAnimation ? (
                          <Pause className="w-4 h-4 mr-2" />
                        ) : (
                          <Play className="w-4 h-4 mr-2" />
                        )}
                        {enableAnimation ? 'On' : 'Off'}
                      </Button>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedVariant('royal-dark');
                      setSelectedSize('md');
                      setShowBackground(true);
                      setEnableAnimation(true);
                    }}
                    className="w-full"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                  </Button>
                </div>
              </Card>

              {/* Preview */}
              <Card className="p-6 aegis-card-metal">
                <h3 className="font-semibold mb-4">Live Preview</h3>
                
                <div className="flex items-center justify-center min-h-[300px] bg-black/10 rounded-lg border border-border/20">
                  <AegisLogo
                    variant={selectedVariant as any}
                    size={selectedSize as any}
                    showBackground={showBackground}
                    enableAnimation={enableAnimation}
                  />
                </div>

                <div className="mt-4 p-3 bg-black/5 rounded border">
                  <code className="text-sm">
                    {`<AegisLogo 
  variant="${selectedVariant}"
  size="${selectedSize}"
  showBackground={${showBackground}}
  enableAnimation={${enableAnimation}}
/>`}
                  </code>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {logoVariants.map((variant) => (
                <Card key={variant.id} className="p-4 aegis-card-metal">
                  <div className="aspect-square bg-black/10 rounded-lg flex items-center justify-center mb-3">
                    <AegisLogo
                      variant={variant.id as any}
                      size="sm"
                      showBackground={true}
                      enableAnimation={false}
                    />
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: variant.color }}
                      />
                      <p className="text-xs font-medium">{variant.name}</p>
                    </div>
                    <Badge variant="outline" size="sm">
                      {variant.id}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sizes" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sizes.map((size) => (
                <Card key={size.id} className="p-6 aegis-card-metal">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center min-h-[120px]">
                      <AegisLogo
                        variant="royal-dark"
                        size={size.id as any}
                        showBackground={true}
                        enableAnimation={true}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{size.name}</h4>
                      <p className="text-xs text-muted-foreground">{size.description}</p>
                      <Badge variant="secondary" className="mt-2">
                        {size.id}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default AegisLogoDemo;