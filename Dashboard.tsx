import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/Logotipo.png.jpeg" 
        alt="Grupo DDM" 
        className="max-h-full max-w-full object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.classList.remove('hidden');
        }}
      />
      <div className="hidden font-black text-2xl tracking-tighter">
        <span className="text-gray-600">GRUPO</span> <span className="text-red-600">DDM</span>
      </div>
    </div>
  );
};

export default Logo;
