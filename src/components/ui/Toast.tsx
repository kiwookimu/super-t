import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

/**
 * UXP-016: 토스트/팝업/모달 사용 원칙 및 표준 문구
 * - 성공/실패/확인/경고 상황별로 토스트 사용 기준과 표준 문구 정의
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
    onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
    id,
    type,
    message,
    duration = 3000,
    onClose,
}) => {
    const typeConfig = {
        success: {
            icon: Check,
            bgColor: 'bg-[var(--uxp-color-success)]',
            iconBg: 'bg-white/20',
        },
        error: {
            icon: AlertCircle,
            bgColor: 'bg-[var(--uxp-color-error)]',
            iconBg: 'bg-white/20',
        },
        warning: {
            icon: AlertTriangle,
            bgColor: 'bg-[var(--uxp-color-warning)]',
            iconBg: 'bg-white/20',
        },
        info: {
            icon: Info,
            bgColor: 'bg-[var(--uxp-color-primary)]',
            iconBg: 'bg-white/20',
        },
    };

    const config = typeConfig[type];
    const IconComponent = config.icon;

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => onClose(id), duration);
            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`
        flex items-center gap-3 px-4 py-3
        ${config.bgColor} text-white
        rounded-xl shadow-lg
        min-w-[280px] max-w-[90vw]
      `}
        >
            <div className={`p-1.5 rounded-full ${config.iconBg}`}>
                <IconComponent className="w-4 h-4" />
            </div>
            <span className="flex-1 text-sm font-medium">{message}</span>
            <button
                onClick={() => onClose(id)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

/**
 * Toast Container Component
 * Manages multiple toasts
 */
export interface ToastContainerProps {
    toasts: Array<{
        id: string;
        type: ToastType;
        message: string;
        duration?: number;
    }>;
    onClose: (id: string) => void;
    position?: 'top' | 'bottom';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
    toasts,
    onClose,
    position = 'top',
}) => {
    const positionStyles = {
        top: 'top-4 left-0 right-0 flex flex-col items-center',
        bottom: 'bottom-4 left-0 right-0 flex flex-col-reverse items-center',
    };

    return (
        <div className={`fixed z-50 pointer-events-none ${positionStyles[position]} px-4`}>
            <AnimatePresence>
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto mb-2">
                        <Toast {...toast} onClose={onClose} />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
};

/**
 * useToast Hook
 * For managing toast state
 */
export interface ToastItem {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

export const useToast = () => {
    const [toasts, setToasts] = React.useState<ToastItem[]>([]);

    const addToast = React.useCallback((
        type: ToastType,
        message: string,
        duration?: number
    ) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, type, message, duration }]);
        return id;
    }, []);

    const removeToast = React.useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const success = React.useCallback((message: string, duration?: number) => {
        return addToast('success', message, duration);
    }, [addToast]);

    const error = React.useCallback((message: string, duration?: number) => {
        return addToast('error', message, duration);
    }, [addToast]);

    const warning = React.useCallback((message: string, duration?: number) => {
        return addToast('warning', message, duration);
    }, [addToast]);

    const info = React.useCallback((message: string, duration?: number) => {
        return addToast('info', message, duration);
    }, [addToast]);

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
    };
};

export default Toast;
