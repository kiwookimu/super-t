import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'fill' | 'weak';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'fill',
    size = 'medium',
    fullWidth = false,
    className = '',
    children,
    ...props
}) => {
    const baseStyles = "font-bold rounded-2xl transition-colors flex items-center justify-center active:scale-95 transition-transform";

    const variants = {
        fill: "bg-blue-500 text-white hover:bg-blue-600 border border-transparent",
        weak: "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-transparent"
    };

    const sizes = {
        small: "px-3 py-1.5 text-xs rounded-lg",
        medium: "px-4 py-3 text-sm rounded-xl",
        large: "px-5 py-4 text-base rounded-2xl"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.96 }}
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? 'w-full' : ''}
                ${props.disabled ? 'opacity-50 cursor-not-allowed active:scale-100' : ''}
                ${className}
            `}
            {...props}
        >
            {children}
        </motion.button>
    );
};
