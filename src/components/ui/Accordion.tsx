import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * UXP-006: 정책 단순화 UI (요약+상세)
 * - 복잡한 정책은 "1줄 요약 + 상세(펼침)" 패턴으로 제공
 * - 사용자가 핵심을 즉시 이해하도록 함
 */

export interface AccordionItem {
    id: string;
    title: string;
    summary?: string; // 1줄 요약
    content: React.ReactNode; // 상세 내용
    defaultOpen?: boolean;
}

export interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    variant?: 'default' | 'card' | 'minimal';
    className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
    items,
    allowMultiple = false,
    variant = 'default',
    className = '',
}) => {
    const [openItems, setOpenItems] = useState<string[]>(
        items.filter(item => item.defaultOpen).map(item => item.id)
    );

    const toggleItem = (id: string) => {
        if (allowMultiple) {
            setOpenItems(prev =>
                prev.includes(id)
                    ? prev.filter(itemId => itemId !== id)
                    : [...prev, id]
            );
        } else {
            setOpenItems(prev =>
                prev.includes(id) ? [] : [id]
            );
        }
    };

    const variantStyles = {
        default: {
            container: 'border border-[var(--uxp-color-border)] rounded-[var(--uxp-card-radius)] overflow-hidden',
            item: 'border-b border-[var(--uxp-color-border)] last:border-b-0',
            header: 'bg-white hover:bg-gray-50',
            content: 'bg-gray-50',
        },
        card: {
            container: 'space-y-3',
            item: 'bg-white rounded-[var(--uxp-card-radius)] shadow-sm overflow-hidden',
            header: 'hover:bg-gray-50',
            content: 'bg-gray-50',
        },
        minimal: {
            container: 'divide-y divide-[var(--uxp-color-border)]',
            item: '',
            header: 'hover:bg-gray-50',
            content: '',
        },
    };

    const styles = variantStyles[variant];

    return (
        <div className={`${styles.container} ${className}`}>
            {items.map((item) => {
                const isOpen = openItems.includes(item.id);

                return (
                    <div key={item.id} className={styles.item}>
                        {/* Header - 요약 표시 (UXP-006) */}
                        <button
                            onClick={() => toggleItem(item.id)}
                            className={`
                w-full flex items-center justify-between
                p-4 text-left transition-colors
                ${styles.header}
              `}
                        >
                            <div className="flex-1 pr-4">
                                {/* Title */}
                                <div className="font-semibold text-[var(--uxp-color-text)]">
                                    {item.title}
                                </div>

                                {/* Summary - 1줄 요약 (UXP-006) */}
                                {item.summary && !isOpen && (
                                    <div className="mt-1 text-sm text-[var(--uxp-color-text-muted)] line-clamp-1">
                                        {item.summary}
                                    </div>
                                )}
                            </div>

                            {/* Chevron */}
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex-shrink-0"
                            >
                                <ChevronDown className="w-5 h-5 text-[var(--uxp-color-text-muted)]" />
                            </motion.div>
                        </button>

                        {/* Content - 상세 (펼침) */}
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className={`p-4 pt-0 ${styles.content}`}>
                                        <div className="pt-2 border-t border-[var(--uxp-color-border)] text-sm text-[var(--uxp-color-text-secondary)]">
                                            {item.content}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};

/**
 * Single Accordion Item Component
 * For use when only one collapsible section is needed
 */
export interface SingleAccordionProps {
    title: string;
    summary?: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
}

export const SingleAccordion: React.FC<SingleAccordionProps> = ({
    title,
    summary,
    children,
    defaultOpen = false,
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`bg-white rounded-[var(--uxp-card-radius)] overflow-hidden ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
                <div className="flex-1 pr-4">
                    <div className="font-semibold text-[var(--uxp-color-text)]">{title}</div>
                    {summary && !isOpen && (
                        <div className="mt-1 text-sm text-[var(--uxp-color-text-muted)] line-clamp-1">
                            {summary}
                        </div>
                    )}
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-5 h-5 text-[var(--uxp-color-text-muted)]" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4">
                            <div className="pt-3 border-t border-[var(--uxp-color-border)] text-sm text-[var(--uxp-color-text-secondary)]">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Accordion;
