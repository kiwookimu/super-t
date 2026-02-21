import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, MessageCircle, Home, ChevronRight } from 'lucide-react';
import Button from './Button';

/**
 * UXP-007: 차단/실패 표준 템플릿
 * - ①사유(한 문장) ②해결 방법 ③대체 CTA(조건변경/재인증/CS)로 구성
 * - 사유 코드를 로그로 남겨 개선에 활용
 */

export interface ErrorStateProps {
    type?: 'error' | 'warning' | 'info' | 'empty';
    title: string;
    reason: string; // ① 사유
    solution?: string; // ② 해결 방법
    errorCode?: string; // 사유 코드
    primaryAction?: {
        label: string;
        onClick: () => void;
        icon?: React.ReactNode;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
        icon?: React.ReactNode;
    };
    csAction?: {
        label?: string;
        onClick: () => void;
    };
    className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
    type = 'error',
    title,
    reason,
    solution,
    errorCode,
    primaryAction,
    secondaryAction,
    csAction,
    className = '',
}) => {
    const typeConfig = {
        error: {
            icon: AlertCircle,
            bgColor: 'bg-[var(--uxp-color-error-light)]',
            iconColor: 'text-[var(--uxp-color-error)]',
        },
        warning: {
            icon: AlertCircle,
            bgColor: 'bg-[var(--uxp-color-warning-light)]',
            iconColor: 'text-[var(--uxp-color-warning)]',
        },
        info: {
            icon: AlertCircle,
            bgColor: 'bg-[var(--uxp-color-primary-light)]',
            iconColor: 'text-[var(--uxp-color-primary)]',
        },
        empty: {
            icon: Home,
            bgColor: 'bg-gray-100',
            iconColor: 'text-[var(--uxp-color-text-muted)]',
        },
    };

    const config = typeConfig[type];
    const IconComponent = config.icon;

    // 사유 코드 로깅 (UXP-007)
    React.useEffect(() => {
        if (errorCode) {
            console.log(`[UXP-007] Error displayed: ${errorCode}`, { title, reason, type });
        }
    }, [errorCode, title, reason, type]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
        flex flex-col items-center text-center p-6
        bg-white rounded-[var(--uxp-card-radius)]
        ${className}
      `}
        >
            {/* Icon */}
            <div className={`
        w-16 h-16 rounded-full flex items-center justify-center mb-4
        ${config.bgColor}
      `}>
                <IconComponent className={`w-8 h-8 ${config.iconColor}`} />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-[var(--uxp-color-text)] mb-2">
                {title}
            </h3>

            {/* ① 사유 (한 문장) */}
            <p className="text-sm text-[var(--uxp-color-text-secondary)] mb-4">
                {reason}
            </p>

            {/* ② 해결 방법 */}
            {solution && (
                <div className="w-full p-3 bg-gray-50 rounded-lg mb-4">
                    <p className="text-sm text-[var(--uxp-color-text-secondary)]">
                        💡 {solution}
                    </p>
                </div>
            )}

            {/* ③ 대체 CTA */}
            <div className="flex flex-col w-full gap-2 mt-2">
                {/* Primary Action (재시도 등) */}
                {primaryAction && (
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={primaryAction.onClick}
                        leftIcon={primaryAction.icon || <RefreshCw className="w-4 h-4" />}
                    >
                        {primaryAction.label}
                    </Button>
                )}

                {/* Secondary Action (대체 경로) */}
                {secondaryAction && (
                    <Button
                        variant="secondary"
                        fullWidth
                        onClick={secondaryAction.onClick}
                        leftIcon={secondaryAction.icon}
                    >
                        {secondaryAction.label}
                    </Button>
                )}

                {/* CS 연결 (UXP-018) */}
                {csAction && (
                    <button
                        onClick={csAction.onClick}
                        className="flex items-center justify-center gap-2 py-3 text-sm text-[var(--uxp-color-text-muted)] hover:text-[var(--uxp-color-primary)] transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span>{csAction.label || '고객센터 문의하기'}</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* 에러 코드 (디버깅용) */}
            {errorCode && (
                <p className="mt-4 text-xs text-[var(--uxp-color-text-disabled)]">
                    오류 코드: {errorCode}
                </p>
            )}
        </motion.div>
    );
};

/**
 * Empty State Component
 * For UXP-007: 빈 화면 가이드
 */
export interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    action,
    className = '',
}) => {
    return (
        <div className={`flex flex-col items-center text-center py-12 px-6 ${className}`}>
            {icon && (
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    {icon}
                </div>
            )}
            <h3 className="text-lg font-semibold text-[var(--uxp-color-text)] mb-2">
                {title}
            </h3>
            {description && (
                <p className="text-sm text-[var(--uxp-color-text-muted)] mb-4">
                    {description}
                </p>
            )}
            {action && (
                <Button variant="primary" onClick={action.onClick}>
                    {action.label}
                </Button>
            )}
        </div>
    );
};

export default ErrorState;
