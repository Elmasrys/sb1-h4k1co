import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor = '#72f68e',
  children,
  className = '',
  onClick
}) => {
  return (
    <div
      className={`
        bg-[#040707]/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 
        hover:bg-[#040707]/40 transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {(title || Icon) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
            {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
          </div>
          {Icon && (
            <div className="rounded-lg bg-[#72f68e]/20 p-2">
              <Icon className="h-6 w-6" style={{ color: iconColor }} />
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}