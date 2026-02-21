import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './Button';

/**
 * UXP-016: 토스트/팝업/모달 사용 원칙 및 표준 문구
 * - 확인/경고 상황별 모달 사용 기준 정의
 * - 중복, 남발 방지
 */

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'full';
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    footer?: React.ReactNode;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnOverlayClick = true,
    footer,
    className = '',
}) => {
    // ESC 키로 닫기
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const sizeStyles = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        full: 'max-w-full mx-4',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeOnOverlayClick ? onClose : undefined}
                        className="absolute inset-0 bg-black/50"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', duration: 0.3 }}
                        className={`
              relative w-full ${sizeStyles[size]}
              bg-white rounded-[var(--uxp-card-radius-lg)]
              shadow-xl overflow-hidden
              ${className}
            `}
                    >
                        {/* Header */}
                        {(title || showCloseButton) && (
                            <div className="flex items-center justify-between p-4 border-b border-[var(--uxp-color-border)]">
                                {title && (
                                    <h2 className="text-lg font-bold text-[var(--uxp-color-text)]">
                                        {title}
                                    </h2>
                                )}
                                {showCloseButton && (
                                    <button
                                        onClick={onClose}
                                        className="p-2 -mr-2 text-[var(--uxp-color-text-muted)] hover:text-[var(--uxp-color-text)] hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Body */}
                        <div className="p-4 max-h-[60vh] overflow-y-auto">
                            {children}
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div className="p-4 border-t border-[var(--uxp-color-border)] bg-gray-50">
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

/**
 * Confirm Modal
 * Standard confirmation dialog
 */
export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'primary' | 'danger';
    loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = '확인',
    cancelLabel = '취소',
    variant = 'primary',
    loading = false,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            closeOnOverlayClick={!loading}
            showCloseButton={!loading}
            footer={
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        fullWidth
                        onClick={onClose}
                        disabled={loading}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        variant={variant === 'danger' ? 'danger' : 'primary'}
                        fullWidth
                        onClick={onConfirm}
                        loading={loading}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            }
        >
            <p className="text-[var(--uxp-color-text-secondary)]">{message}</p>
        </Modal>
    );
};

/**
 * Alert Modal
 * Simple alert dialog
 */
export interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    buttonLabel?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    title,
    message,
    buttonLabel = '확인',
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            footer={
                <Button variant="primary" fullWidth onClick={onClose}>
                    {buttonLabel}
                </Button>
            }
        >
            <p className="text-[var(--uxp-color-text-secondary)]">{message}</p>
        </Modal>
    );
};

export default Modal;
