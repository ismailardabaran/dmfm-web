import React from 'react';

interface CountryFlagProps {
  code: string; // 'pt' | 'tr' | 'pl' | 'ro' | 'gb' | 'en' (case-insensitive)
  className?: string;
  width?: number;
  height?: number;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ 
  code, 
  className = '', 
  width = 36, 
  height = 24 
}) => {
  const c = code.toLowerCase();

  // Unified visual wrapper: rounded corners, subtle shadow, and a light border.
  const baseClass = `${className} rounded-[2px] shadow-sm border border-black/5 inline-block align-middle flex-shrink-0 overflow-hidden`;

  const style = {
    width: `${width}px`,
    height: `${height}px`
  };

  switch (c) {
    case 'pt':
      return (
        <svg viewBox="0 0 600 400" className={baseClass} style={style}>
          {/* Green 40% and Red 60% background */}
          <rect width="240" height="400" fill="#00662f" />
          <rect x="240" width="360" height="400" fill="#ff0000" />
          {/* Yellow Armillary sphere - scaled up slightly for sub-pixel visibility */}
          <circle cx="240" cy="200" r="110" fill="#ffd700" />
          {/* Red shield with curved bottom - proportioned for crisp small-scale rendering */}
          <path d="M 192 130 H 288 V 220 C 288 270 192 270 192 220 Z" fill="#c10612" />
          {/* White inner shield */}
          <path d="M 208 142 H 272 V 210 C 272 245 208 245 208 210 Z" fill="#ffffff" />
          {/* Blue quinas (dots representing the shields) - sized to stay sharp at 36x24px */}
          <circle cx="240" cy="185" r="8.5" fill="#002b7f" />
          <circle cx="222" cy="185" r="8.5" fill="#002b7f" />
          <circle cx="258" cy="185" r="8.5" fill="#002b7f" />
          <circle cx="240" cy="167" r="8.5" fill="#002b7f" />
          <circle cx="240" cy="203" r="8.5" fill="#002b7f" />
        </svg>
      );
    case 'tr':
      return (
        <svg viewBox="0 0 1200 800" className={baseClass} style={style}>
          <rect width="1200" height="800" fill="#e30a17" />
          {/* Outer circle of the crescent */}
          <circle cx="450" cy="400" r="200" fill="#ffffff" />
          {/* Inner circle to cut the crescent, matching official ratio */}
          <circle cx="512.5" cy="400" r="160" fill="#e30a17" />
          {/* Star - mathematically perfect 10-pointed star pointing directly to the left */}
          <polygon 
            points="600,400 669.1,377.5 669.1,304.9 711.8,363.7 780.9,341.2 738.2,400 780.9,458.8 711.8,436.3 669.1,495.1 669.1,422.5" 
            fill="#ffffff" 
          />
        </svg>
      );
    case 'pl':
      return (
        <svg viewBox="0 0 300 200" className={baseClass} style={style}>
          <rect width="300" height="100" fill="#ffffff" />
          <rect y="100" width="300" height="100" fill="#dc143c" />
        </svg>
      );
    case 'ro':
      return (
        <svg viewBox="0 0 300 200" className={baseClass} style={style}>
          <rect width="100" height="200" fill="#002b7f" />
          <rect x="100" width="100" height="200" fill="#fcd116" />
          <rect x="200" width="100" height="200" fill="#ce1126" />
        </svg>
      );
    case 'gb':
    case 'en':
      return (
        <svg viewBox="0 0 600 400" className={baseClass} style={style}>
          <rect width="600" height="400" fill="#00247d" />
          {/* White diagonal saltire */}
          <path d="M0,0 L600,400 M600,0 L0,400" stroke="#ffffff" strokeWidth="60" />
          {/* Red diagonal saltire */}
          <path d="M0,0 L600,400 M600,0 L0,400" stroke="#cf142b" strokeWidth="24" />
          {/* White cross */}
          <path d="M300,0 L300,400 M0,200 L600,200" stroke="#ffffff" strokeWidth="100" />
          {/* Red cross */}
          <path d="M300,0 L300,400 M0,200 L600,200" stroke="#cf142b" strokeWidth="60" />
        </svg>
      );
    default:
      // EU Flag fallback
      return (
        <svg viewBox="0 0 300 200" className={baseClass} style={style}>
          <rect width="300" height="200" fill="#003399" />
          <circle cx="150" cy="100" r="60" fill="none" stroke="#ffcc00" strokeWidth="5" strokeDasharray="1 25" />
        </svg>
      );
  }
};
