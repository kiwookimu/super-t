import React from 'react';

interface BrandLogoProps {
    className?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'white';
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 'medium', variant = 'default' }) => {
    const sizeClasses = {
        small: 'text-lg',
        medium: 'text-2xl',
        large: 'text-3xl',
    };

    return (
        <div className={`font-black tracking-tight flex items-center gap-1 ${sizeClasses[size]} ${className}`}>
            <span className={variant === 'white' ? 'text-white' : 'text-gray-900'}>Super</span>
            <span className={variant === 'white' ? 'text-white/80' : 'bg-gradient-to-tr from-blue-600 to-indigo-600 bg-clip-text text-transparent'}>T</span>
        </div>
    );
};

export default BrandLogo;
