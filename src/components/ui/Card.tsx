import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/**
 * UXP-002: Value First (가치 우선)
 * - 사용자가 얻는 가치(혜택/절감/결과)를 먼저 제시
 * - 비용/제약은 결정 직전에 숨김 없이 제공
 */

export interface CardProps {
    variant?: 'default' | 'highlight' | 'outline' | 'elevated';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    clickable?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({
    variant = 'default',
    padding = 'md',
    clickable = false,
    onClick,
    children,
    className = '',
}) => {
    const baseStyles = `
    bg-[var(--uxp-color-bg-card)]
    rounded-[var(--uxp-card-radius)]
    transition-all duration-200
  `;

    const variantStyles = {
        default: 'shadow-sm',
        highlight: 'shadow-md border-l-4 border-l-[var(--uxp-color-primary)]',
        outline: 'border border-[var(--uxp-color-border)]',
        elevated: 'shadow-lg',
    };

    const paddingStyles = {
        none: '',
        sm: 'p-3',
        md: 'p-[var(--uxp-card-padding)]',
        lg: 'p-6',
    };

    const clickableStyles = clickable
        ? 'cursor-pointer hover:shadow-md active:scale-[0.99]'
        : '';

    const Component = clickable ? motion.div : 'div';
    const motionProps = clickable
        ? {
            whileTap: { scale: 0.99 },
            whileHover: { y: -2 },
        }
        : {};

    return (
        <Component
            onClick={onClick}
            className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${clickableStyles}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
            {...motionProps}
        >
            {children}
        </Component>
    );
};

/**
 * Value-First Card Layout
 * 상단에 혜택/가치, 하단에 상세/조건
 */
export interface ValueCardProps {
    title: string;
    value: string | React.ReactNode;
    valueColor?: 'primary' | 'success' | 'warning' | 'error';
    subtitle?: string;
    details?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    badge?: string;
    className?: string;
}

export const ValueCard: React.FC<ValueCardProps> = ({
    title,
    value,
    valueColor = 'primary',
    subtitle,
    details,
    action,
    badge,
    className = '',
}) => {
    const colorMap = {
        primary: 'text-[var(--uxp-color-primary)]',
        success: 'text-[var(--uxp-color-success)]',
        warning: 'text-[var(--uxp-color-warning)]',
        error: 'text-[var(--uxp-color-error)]',
    };

    return (
        <Card
            clickable={!!action}
            onClick={action?.onClick}
            className={className}
        >
            <div className="flex flex-col gap-3">
                {/* Badge */}
                {badge && (
                    <span className="inline-flex self-start px-2 py-1 bg-[var(--uxp-color-primary-light)] text-[var(--uxp-color-primary)] text-xs font-medium rounded-md">
                        {badge}
                    </span>
                )}

                {/* Value First (UXP-002) */}
                <div className={`text-2xl font-bold ${colorMap[valueColor]}`}>
                    {value}
                </div>

                {/* Title */}
                <div className="text-base font-semibold text-[var(--uxp-color-text)]">
                    {title}
                </div>

                {/* Subtitle */}
                {subtitle && (
                    <div className="text-sm text-[var(--uxp-color-text-muted)]">
                        {subtitle}
                    </div>
                )}

                {/* Details (조건/제약 - 결정 직전에 제공) */}
                {details && (
                    <div className="pt-3 mt-1 border-t border-[var(--uxp-color-border)] text-xs text-[var(--uxp-color-text-muted)]">
                        {details}
                    </div>
                )}

                {/* Action */}
                {action && (
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-[var(--uxp-color-primary)] font-medium">
                            {action.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[var(--uxp-color-primary)]" />
                    </div>
                )}
            </div>
        </Card>
    );
};

export default Card;
