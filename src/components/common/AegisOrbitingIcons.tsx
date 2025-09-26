import React from 'react';
import goldenIconsGrid1 from 'figma:asset/62a1e43c0a143fb160cbf3d3dabec8ab7ff26815.png';
import goldenIconsGrid2 from 'figma:asset/c15dacb5f8f18ed8b66bf68527a40345fd1c2b08.png';
import goldenIconsGrid3 from 'figma:asset/ef1619fbc388699637d65c15ef956c9717a4183c.png';

export const AegisOrbitingIcons: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-1">
      
      {/* STANDARD ORBITAL RINGS - FROM GRID 1 */}
      
      {/* Inner Ring - Security & Operations */}
      
      {/* Shield - Top Left */}
      <div className="aegis-orbit-shield">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid1})`,
            backgroundPosition: '10% 18%', // Shield top-left
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.7)) brightness(1.05) saturate(1.1)'
          }}
          aria-label="Security Excellence - Shield"
        />
      </div>

      {/* Chart - Top Right */}
      <div className="aegis-orbit-chart-1">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid1})`,
            backgroundPosition: '90% 18%', // Chart top-right
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 11px rgba(212, 175, 55, 0.75)) brightness(1.08) saturate(1.15)'
          }}
          aria-label="Analytics Excellence - Chart"
        />
      </div>

      {/* Oil Pump - Center Left */}
      <div className="aegis-orbit-oil-pump">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid1})`,
            backgroundPosition: '25% 42%', // Oil pump center-left
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 9px rgba(212, 175, 55, 0.65)) brightness(1.06) saturate(1.1)'
          }}
          aria-label="Resource Management - Oil Pump"
        />
      </div>

      {/* Filing Cabinet - Center Right */}
      <div className="aegis-orbit-filing">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid1})`,
            backgroundPosition: '75% 42%', // Filing cabinet center-right
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.8)) brightness(1.1) saturate(1.2)'
          }}
          aria-label="Records Management - Filing"
        />
      </div>

      {/* Middle Ring - Communications & Infrastructure */}
      
      {/* Funnel - Middle Left */}
      <div className="aegis-orbit-funnel">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid1})`,
            backgroundPosition: '10% 66%', // Funnel middle-left
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6)) brightness(1.04) saturate(1.05)'
          }}
          aria-label="Process Management - Funnel"
        />
      </div>

      {/* Phone - Middle Center */}
      <div className="aegis-orbit-phone">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid1})`,
            backgroundPosition: '90% 66%', // Phone middle-right
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 13px rgba(212, 175, 55, 0.85)) brightness(1.12) saturate(1.25)'
          }}
          aria-label="Communications - Phone"
        />
      </div>

      {/* Briefcase - Bottom Left */}
      <div className="aegis-orbit-briefcase-1">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid1})`,
            backgroundPosition: '25% 85%', // Briefcase bottom-left
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.7)) brightness(1.07) saturate(1.18)'
          }}
          aria-label="Executive Operations - Briefcase"
        />
      </div>

      {/* Case/Box - Bottom Center */}
      <div className="aegis-orbit-case">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid1})`,
            backgroundPosition: '50% 85%', // Case bottom-center
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 14px rgba(212, 175, 55, 0.9)) brightness(1.15) saturate(1.3)'
          }}
          aria-label="Storage Management - Case"
        />
      </div>

      {/* Filter Bars - Bottom Right */}
      <div className="aegis-orbit-filter">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid1})`,
            backgroundPosition: '90% 85%', // Filter bottom-right
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.95)) brightness(1.18) saturate(1.35)'
          }}
          aria-label="Quality Control - Filter"
        />
      </div>

      {/* EXTENDED ORBITAL RINGS - FROM GRID 2 */}
      
      {/* Outer Ring - Strategic & Financial */}
      
      {/* Growth Chart - Top Left */}
      <div className="aegis-orbit-growth-chart">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid2})`,
            backgroundPosition: '12% 18%', // Growth chart top-left
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 11px rgba(212, 175, 55, 0.75)) brightness(1.08) saturate(1.15)'
          }}
          aria-label="Growth Analytics - Chart"
        />
      </div>

      {/* Arrow - Top Center */}
      <div className="aegis-orbit-arrow">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid2})`,
            backgroundPosition: '37% 18%', // Arrow top-center
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 9px rgba(212, 175, 55, 0.65)) brightness(1.06) saturate(1.1)'
          }}
          aria-label="Direction Excellence - Arrow"
        />
      </div>

      {/* Chess King - Top Right */}
      <div className="aegis-orbit-king">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid2})`,
            backgroundPosition: '62% 18%', // Chess King top-right
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 16px rgba(212, 175, 55, 1.0)) brightness(1.2) saturate(1.4)'
          }}
          aria-label="Strategic Authority - King"
        />
      </div>

      {/* Target - Far Top Right */}
      <div className="aegis-orbit-target">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid2})`,
            backgroundPosition: '87% 18%', // Target far top-right
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.8)) brightness(1.1) saturate(1.2)'
          }}
          aria-label="Precision Excellence - Target"
        />
      </div>

      {/* Shield 2 - Middle Left */}
      <div className="aegis-orbit-shield-2">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid2})`,
            backgroundPosition: '12% 45%', // Shield 2 middle-left
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.7)) brightness(1.05) saturate(1.1)'
          }}
          aria-label="Protection Authority - Shield"
        />
      </div>

      {/* Drop - Middle Center Left */}
      <div className="aegis-orbit-drop">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid2})`,
            backgroundPosition: '37% 45%', // Drop middle-center-left
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6)) brightness(1.04) saturate(1.05)'
          }}
          aria-label="Resource Efficiency - Drop"
        />
      </div>

      {/* Chess Piece - Middle Center Right */}
      <div className="aegis-orbit-chess-piece">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid2})`,
            backgroundPosition: '62% 45%', // Chess piece middle-center-right
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 13px rgba(212, 175, 55, 0.85)) brightness(1.12) saturate(1.25)'
          }}
          aria-label="Strategic Planning - Chess"
        />
      </div>

      {/* Dollar - Middle Right */}
      <div className="aegis-orbit-dollar">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid2})`,
            backgroundPosition: '87% 45%', // Dollar middle-right
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 14px rgba(212, 175, 55, 0.9)) brightness(1.15) saturate(1.3)'
          }}
          aria-label="Financial Excellence - Dollar"
        />
      </div>

      {/* COMPREHENSIVE ORBITAL RINGS - FROM GRID 3 */}
      
      {/* Ultimate Ring - Healthcare & Education */}
      
      {/* Microphone - Top Left */}
      <div className="aegis-orbit-microphone">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid3})`,
            backgroundPosition: '12% 12%', // Microphone top-left
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 18px rgba(212, 175, 55, 1.2)) brightness(1.25) saturate(1.5)'
          }}
          aria-label="Communication Excellence - Microphone"
        />
      </div>

      {/* Graduation Cap - Top Center */}
      <div className="aegis-orbit-graduation">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid3})`,
            backgroundPosition: '50% 12%', // Graduation cap top-center
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 1.4)) brightness(1.3) saturate(1.6)'
          }}
          aria-label="Education Authority - Graduation"
        />
      </div>

      {/* Cross - Top Right */}
      <div className="aegis-orbit-cross">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid3})`,
            backgroundPosition: '88% 12%', // Cross top-right
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 14px rgba(212, 175, 55, 0.9)) brightness(1.15) saturate(1.3)'
          }}
          aria-label="Healthcare Excellence - Cross"
        />
      </div>

      {/* Globe - Left */}
      <div className="aegis-orbit-globe">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid3})`,
            backgroundPosition: '12% 35%', // Globe left
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 22px rgba(212, 175, 55, 1.6)) brightness(1.35) saturate(1.7)'
          }}
          aria-label="Global Operations - Globe"
        />
      </div>

      {/* Cross 2 - Center */}
      <div className="aegis-orbit-cross-2">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid3})`,
            backgroundPosition: '50% 35%', // Cross 2 center
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 25px rgba(212, 175, 55, 1.8)) brightness(1.4) saturate(1.8)'
          }}
          aria-label="Medical Authority - Cross"
        />
      </div>

      {/* Microscope - Center Right */}
      <div className="aegis-orbit-microscope">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid3})`,
            backgroundPosition: '50% 58%', // Microscope center-right
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 17px rgba(212, 175, 55, 1.1)) brightness(1.22) saturate(1.45)'
          }}
          aria-label="Research Excellence - Microscope"
        />
      </div>

      {/* Atom - Right */}
      <div className="aegis-orbit-atom">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid3})`,
            backgroundPosition: '88% 58%', // Atom right
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 16px rgba(212, 175, 55, 1.0)) brightness(1.2) saturate(1.4)'
          }}
          aria-label="Scientific Authority - Atom"
        />
      </div>

      {/* TESSERACT MOTION - Icons that pass through center */}
      
      {/* Heart - Tesseract Path 1 */}
      <div className="aegis-tesseract-heart">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid3})`,
            backgroundPosition: '12% 85%', // Heart bottom-left
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 2.0)) brightness(1.5) saturate(2.0)'
          }}
          aria-label="Patient Care - Heart"
        />
      </div>

      {/* Chart 2 - Tesseract Path 2 */}
      <div className="aegis-tesseract-chart">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid3})`,
            backgroundPosition: '50% 85%', // Chart bottom-center
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 28px rgba(212, 175, 55, 1.9)) brightness(1.45) saturate(1.9)'
          }}
          aria-label="Performance Analytics - Chart"
        />
      </div>

      {/* Heart 2 - Tesseract Path 3 */}
      <div className="aegis-tesseract-heart-2">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid3})`,
            backgroundPosition: '88% 85%', // Heart 2 bottom-right
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 32px rgba(212, 175, 55, 2.1)) brightness(1.55) saturate(2.1)'
          }}
          aria-label="Compassionate Care - Heart"
        />
      </div>

      {/* Rocket - Tesseract Path 4 */}
      <div className="aegis-tesseract-rocket">
        <div 
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenIconsGrid2})`,
            backgroundPosition: '87% 85%', // Rocket from grid 2
            backgroundSize: '400% 400%',
            filter: 'drop-shadow(0 0 35px rgba(212, 175, 55, 2.2)) brightness(1.6) saturate(2.2)'
          }}
          aria-label="Innovation Drive - Rocket"
        />
      </div>

    </div>
  );
};