import React from 'react';

const ResponsiveBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <svg 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1920 1080" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a2235"/>
            <stop offset="50%" stopColor="#1d2942"/>
            <stop offset="100%" stopColor="#223253"/>
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background Rectangle */}
        <rect width="1920" height="1080" fill="url(#bgGradient)"/>
        
        {/* Improved Quiz-themed stickers */}
        <g opacity="0.1" fill="none" stroke="#ffffff" filter="url(#glow)">
          {/* Question Mark Sticker */}
          <g transform="translate(120, 120)">
            <path d="M80 20 Q120 0 140 40 Q160 80 120 100 Q100 110 100 120 L100 140" 
                  strokeWidth="20" 
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
            <circle cx="100" cy="165" r="10" fill="#ffffff"/>
          </g>

          {/* New Leaderboard Sticker (replacing trophy) */}
          <g transform="translate(1640, 820)">
            {/* Main bars with curved tops */}
            <path d="M70 140 L70 100 Q70 90 80 90 L100 90 Q110 90 110 100 L110 140" 
                  strokeWidth="10" 
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M120 140 L120 60 Q120 50 130 50 L150 50 Q160 50 160 60 L160 140" 
                  strokeWidth="10" 
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M170 140 L170 80 Q170 70 180 70 L200 70 Q210 70 210 80 L210 140" 
                  strokeWidth="10" 
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
            
            {/* Base line */}
            <path d="M60 140 L220 140" 
                  strokeWidth="20" 
                  strokeLinecap="round"/>
            
            {/* Decorative elements */}
            <circle cx="90" cy="115" r="3" fill="#ffffff"/>
            <circle cx="140" cy="75" r="3" fill="#ffffff"/>
            <circle cx="190" cy="95" r="3" fill="#ffffff"/>
            
            {/* Connecting lines */}
            <path d="M90 115 L140 75 L190 95" 
                  strokeWidth="1" 
                  strokeDasharray="4 2"/>
          </g>

          {/* Improved Light Bulb Sticker */}
          <g transform="translate(1520, 120)">
            {/* Main bulb shape */}
            <path d="M100 140 Q80 140 80 120 Q80 90 100 70 Q120 50 140 70 Q160 90 160 120 Q160 140 140 140" 
                  strokeWidth="10" 
                  strokeLinecap="round"/>
            
            {/* Filament details */}
            <path d="M100 80 C110 75 130 85 140 80 M100 95 C110 90 130 100 140 95" 
                  strokeWidth="8" 
                  opacity="0.7"/>
            
            {/* Center glow */}
            <circle cx="120" cy="90" r="12" 
                    strokeWidth="6" 
                    opacity="0.5"/>
            
            {/* Base */}
            <path d="M95 140 L145 140" strokeWidth="10" strokeLinecap="round"/>
            <path d="M100 140 L105 155 L135 155 L140 140" strokeWidth="10"/>
            <path d="M105 155 L135 155" strokeWidth="10"/>
            
            {/* Light rays */}
            <path d="M120 60 V40 M140 75 L155 60 M100 75 L85 60" 
                  strokeWidth="10" 
                  strokeLinecap="round" 
                  opacity="0.5"/>
          </g>

          {/* Medals Sticker */}
          <g transform="translate(220, 720)">
            {/* Gold Medal */}
            <circle cx="80" cy="100" r="25" strokeWidth="4"/>
            <circle cx="80" cy="100" r="18" strokeWidth="2"/>
            <path d="M80 75 L80 45 Q80 35 90 35 L110 35" 
                  strokeWidth="10" 
                  strokeLinecap="round"/>
            
            {/* Silver Medal */}
            <circle cx="140" cy="110" r="22" strokeWidth="4"/>
            <circle cx="140" cy="110" r="15" strokeWidth="2"/>
            <path d="M140 88 L140 60 Q140 50 150 50 L170 50" 
                  strokeWidth="10" 
                  strokeLinecap="round"/>
            
            {/* Bronze Medal */}
            <circle cx="195" cy="120" r="20" strokeWidth="4"/>
            <circle cx="195" cy="120" r="13" strokeWidth="2"/>
            <path d="M195 100 L195 75 Q195 65 205 65 L225 65" 
                  strokeWidth="10" 
                  strokeLinecap="round"/>
            
            {/* Decorative stars */}
            <path d="M75 95 L85 95 L80 105 L75 95" strokeWidth="1"/>
            <path d="M135 105 L145 105 L140 115 L135 105" strokeWidth="1"/>
            <path d="M190 115 L200 115 L195 125 L190 115" strokeWidth="1"/>
          </g>
        </g>
        
        {/* Rest of the SVG remains unchanged */}
        <g opacity="0.1" stroke="#ffffff" fill="none">
          <path d="M0 100 Q480 300 960 100 Q1440 300 1920 100" strokeWidth="2"/>
          <path d="M0 980 Q480 780 960 980 Q1440 780 1920 980" strokeWidth="2"/>
          <path d="M0 400 Q480 600 960 400 Q1440 600 1920 400" strokeWidth="1"/>
          <path d="M0 700 Q480 500 960 700 Q1440 500 1920 700" strokeWidth="1"/>
        </g>
        
        <g opacity="0.6" fill="#ffffff">
          {[...Array(15)].map((_, i) => (
            <circle
              key={i}
              cx={300 + (i * 100)}
              cy={200 + (i * 40)}
              r={2 + (i % 3)}
            />
          ))}
        </g>
        
        <g opacity="0.15" fill="#ffd700">
          <circle cx="100" cy="500" r="30"/>
          <circle cx="1820" cy="400" r="25"/>
          <circle cx="960" cy="200" r="20"/>
          <circle cx="960" cy="900" r="20"/>
          {[...Array(6)].map((_, i) => (
            <circle
              key={i}
              cx={400 + (i * 200)}
              cy={300 + (i * 100)}
              r={3 + (i % 3)}
            />
          ))}
        </g>
        
        <g opacity="0.05" stroke="#ffffff">
          {[...Array(5)].map((_, i) => (
            <path
              key={i}
              d={`M${-480 + (i * 480)} 0 L${1440 + (i * 480)} 1080`}
              strokeWidth="3"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default ResponsiveBackground;