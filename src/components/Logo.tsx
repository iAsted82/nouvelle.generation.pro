import React from 'react';

interface LogoProps {
  variant?: 'default' | 'monochrome' | 'white' | 'small';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  clickable?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  size = 'md', 
  className = '', 
  clickable = false 
}) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const handleClick = () => {
    if (clickable) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const LogoSVG = () => (
    <svg 
      viewBox="0 0 200 200" 
      className={`${sizeClasses[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient Definitions */}
      <defs>
        <radialGradient id="earthGradient" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="50%" stopColor="#4682B4" />
          <stop offset="100%" stopColor="#2F4F4F" />
        </radialGradient>
        <linearGradient id="blueOrbit" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={variant === 'monochrome' ? '#4B5563' : '#1E3A8A'} />
          <stop offset="100%" stopColor={variant === 'monochrome' ? '#6B7280' : '#3B82F6'} />
        </linearGradient>
        <linearGradient id="redOrbit" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={variant === 'monochrome' ? '#6B7280' : '#DC2626'} />
          <stop offset="100%" stopColor={variant === 'monochrome' ? '#9CA3AF' : '#EF4444'} />
        </linearGradient>
      </defs>

      {/* Earth Globe */}
      <circle 
        cx="100" 
        cy="100" 
        r="35" 
        fill={variant === 'monochrome' ? '#9CA3AF' : 'url(#earthGradient)'} 
        stroke={variant === 'white' ? '#fff' : '#E5E7EB'} 
        strokeWidth="1"
      />
      
      {/* Continents on Earth */}
      <g fill={variant === 'monochrome' ? '#6B7280' : variant === 'white' ? '#E5E7EB' : '#F3F4F6'}>
        {/* Africa */}
        <path d="M95 85 C105 85, 110 95, 108 105 C106 115, 100 120, 95 118 C90 116, 88 106, 90 96 C92 86, 95 85, 95 85 Z" />
        {/* Europe */}
        <path d="M92 80 C98 78, 105 80, 107 85 C105 87, 100 85, 95 85 C90 85, 88 82, 92 80 Z" />
        {/* Part of Asia */}
        <path d="M110 82 C118 84, 125 88, 122 95 C120 92, 115 88, 110 85 C108 83, 110 82, 110 82 Z" />
      </g>

      {/* Blue Orbital Ring */}
      <ellipse 
        cx="100" 
        cy="100" 
        rx="80" 
        ry="25" 
        fill="none" 
        stroke="url(#blueOrbit)" 
        strokeWidth="8" 
        transform="rotate(-20 100 100)"
        opacity="0.9"
      />

      {/* Red Orbital Ring */}
      <ellipse 
        cx="100" 
        cy="100" 
        rx="80" 
        ry="25" 
        fill="none" 
        stroke="url(#redOrbit)" 
        strokeWidth="8" 
        transform="rotate(20 100 100)"
        opacity="0.9"
      />

      {/* Educational Stars/Sparkles */}
      <g fill={variant === 'monochrome' ? '#9CA3AF' : variant === 'white' ? '#FFF' : '#FBBF24'}>
        <circle cx="150" cy="60" r="2" />
        <circle cx="50" cy="140" r="2" />
        <circle cx="160" cy="150" r="1.5" />
        <circle cx="40" cy="50" r="1.5" />
      </g>
    </svg>
  );

  if (clickable) {
    return (
      <button 
        onClick={handleClick}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-transform hover:scale-105"
        aria-label="Retour à l'accueil"
      >
        <LogoSVG />
      </button>
    );
  }

  return <LogoSVG />;
};

export default Logo;