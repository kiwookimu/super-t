import React from 'react';
// import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ListRowProps {
    left?: React.ReactNode;
    contents: React.ReactNode;
    right?: React.ReactNode;
    onClick?: () => void;
    as?: 'div' | 'button' | 'li';
    className?: string;
    style?: React.CSSProperties;
}

export const ListRow: React.FC<ListRowProps> = ({
    left,
    contents,
    right,
    onClick,
    as = 'div',
    className = '',
    style
}) => {
    const Component = as === 'button' ? motion.button : (as as any);
    const isClickable = !!onClick || as === 'button';

    return (
        <Component
            onClick={onClick}
            className={`flex items-center justify-between w-full bg-white ${isClickable ? 'active:bg-gray-50' : ''} ${className}`}
            style={style}
            whileTap={isClickable && as === 'button' ? { scale: 0.98 } : undefined}
        >
            <div className="flex items-center gap-3 w-full">
                {left && <div className="flex-shrink-0">{left}</div>}
                <div className="flex-grow text-left">
                    {contents}
                </div>
                {right && <div className="flex-shrink-0">{right}</div>}
            </div>
        </Component>
    );
};
