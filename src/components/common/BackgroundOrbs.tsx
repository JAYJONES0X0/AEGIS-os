interface BackgroundOrbsProps {
  theme: 'royal-gold' | 'arctic-silver' | 'ember-glass' | 'teal-variant' | 'industrial-grey';
  className?: string;
}

export function BackgroundOrbs({ theme, className = "" }: BackgroundOrbsProps) {
  const orbConfigs = {
    'royal-gold': [
      { color: '#D4AF37', opacity: 0.30, size: '600px', position: 'top-right', blur: '120px' },
      { color: '#8B5CF6', opacity: 0.20, size: '500px', position: 'bottom-left', blur: '100px' }
    ],
    'arctic-silver': [
      { color: '#C0C6CE', opacity: 0.24, size: '550px', position: 'top-left', blur: '110px' },
      { color: '#9FB4C8', opacity: 0.18, size: '480px', position: 'bottom-right', blur: '90px' }
    ],
    'ember-glass': [
      { color: '#FFB86B', opacity: 0.28, size: '580px', position: 'top-left', blur: '115px' },
      { color: '#6A5ACD', opacity: 0.18, size: '460px', position: 'bottom-right', blur: '85px' }
    ],
    'teal-variant': [
      { color: '#C0C6CE', opacity: 0.24, size: '550px', position: 'top-left', blur: '110px' },
      { color: '#9FB4C8', opacity: 0.18, size: '480px', position: 'bottom-right', blur: '90px' },
      { color: '#2E888F', opacity: 0.22, size: '520px', position: 'center-right', blur: '105px' }
    ],
    'industrial-grey': [
      { color: '#3AAED8', opacity: 0.15, size: '500px', position: 'top-center', blur: '95px' },
      { color: '#4A5568', opacity: 0.12, size: '450px', position: 'bottom-left', blur: '80px' }
    ]
  };

  const positionClasses = {
    'top-left': '-top-48 -left-48',
    'top-right': '-top-48 -right-48', 
    'top-center': '-top-48 left-1/2 -translate-x-1/2',
    'bottom-left': '-bottom-48 -left-48',
    'bottom-right': '-bottom-48 -right-48',
    'center-right': 'top-1/2 -right-48 -translate-y-1/2'
  };

  const contextualElements = {
    'royal-gold': (
      <>
        {/* Command Centre: Three soft bokeh spheres + faint geometric grid */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(255, 255, 0, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }} />
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(255, 255, 0, 0.08) 0%, transparent 70%)',
          filter: 'blur(30px)'
        }} />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(255, 200, 0, 0.06) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }} />
        <div className="absolute inset-0" style={{ 
          opacity: 0.06,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </>
    )
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {/* Background Noise Layer */}
      <div className="absolute inset-0 bg-noise" />
      
      {/* Orbs */}
      <div className="absolute inset-0">
        {orbConfigs[theme]?.map((orb, index) => (
          <div
            key={index}
            className={`absolute rounded-full ${positionClasses[orb.position as keyof typeof positionClasses]} aegis-float-${index}`}
            style={{
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              opacity: orb.opacity,
              filter: `blur(${orb.blur})`,
              animationDelay: `${index * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Contextual Elements */}
      {contextualElements[theme] && (
        <div className="absolute inset-0">
          {contextualElements[theme]}
        </div>
      )}
    </div>
  );
}