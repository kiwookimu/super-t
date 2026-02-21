import React from 'react';
import { motion } from 'framer-motion';

/**
 * UXP-005: 여정 연속성 (상태 유지)
 * - 로딩 상태(스켈레톤 등) 제공
 * - 사용자가 진행 상태를 인지할 수 있도록 함
 */

export interface SkeletonProps {
    variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
    width?: string | number;
    height?: string | number;
    className?: string;
    animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
    variant = 'text',
    width,
    height,
    className = '',
    animation = 'pulse',
}) => {
    const variantStyles = {
        text: 'rounded h-4',
        circular: 'rounded-full',
        rectangular: 'rounded-none',
        rounded: 'rounded-lg',
    };

    const animationStyles = {
        pulse: 'animate-pulse',
        wave: '', // Custom animation
        none: '',
    };

    const getSize = () => {
        const style: React.CSSProperties = {};
        if (width) style.width = typeof width === 'number' ? `${width}px` : width;
        if (height) style.height = typeof height === 'number' ? `${height}px` : height;
        if (variant === 'circular' && width && !height) style.height = style.width;
        return style;
    };

    if (animation === 'wave') {
        return (
            <div
                className={`
          relative overflow-hidden bg-gray-200
          ${variantStyles[variant]}
          ${className}
        `}
                style={getSize()}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    animate={{ x: ['0%', '100%'] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    style={{ width: '100%' }}
                />
            </div>
        );
    }

    return (
        <div
            className={`
        bg-gray-200
        ${variantStyles[variant]}
        ${animationStyles[animation]}
        ${className}
      `}
            style={getSize()}
        />
    );
};

/**
 * Card Skeleton
 * Pre-built skeleton for card-like content
 */
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`bg-white rounded-[var(--uxp-card-radius)] p-[var(--uxp-card-padding)] ${className}`}>
            <div className="flex gap-4">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="flex-1 space-y-2">
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="80%" />
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="70%" />
            </div>
        </div>
    );
};

/**
 * List Skeleton
 * Pre-built skeleton for list items
 */
export const ListSkeleton: React.FC<{
    count?: number;
    className?: string;
}> = ({
    count = 3,
    className = ''
}) => {
        return (
            <div className={`space-y-3 ${className}`}>
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg">
                        <Skeleton variant="circular" width={40} height={40} />
                        <div className="flex-1 space-y-2">
                            <Skeleton variant="text" width="50%" />
                            <Skeleton variant="text" width="80%" height={12} />
                        </div>
                        <Skeleton variant="rounded" width={60} height={32} />
                    </div>
                ))}
            </div>
        );
    };

/**
 * Page Skeleton
 * Full page loading skeleton
 */
export const PageSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`space-y-4 p-4 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <Skeleton variant="text" width={120} height={24} />
                <Skeleton variant="circular" width={32} height={32} />
            </div>

            {/* Banner */}
            <Skeleton variant="rounded" width="100%" height={120} />

            {/* Cards */}
            <div className="grid grid-cols-2 gap-3">
                <Skeleton variant="rounded" width="100%" height={80} />
                <Skeleton variant="rounded" width="100%" height={80} />
            </div>

            {/* List */}
            <ListSkeleton count={3} />
        </div>
    );
};

export default Skeleton;
