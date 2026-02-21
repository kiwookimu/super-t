import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, AlertCircle, X, ExternalLink } from 'lucide-react';

/**
 * INT-016: 통합 공지/장애 대응 단일 체계
 * 시스템 공지 배너 컴포넌트
 */

interface SystemNotice {
    id: string;
    type: 'maintenance' | 'incident' | 'policy' | 'migration';
    severity: 'info' | 'warning' | 'critical';
    title: string;
    message: string;
    startAt?: Date;
    endAt?: Date;
    affectedServices?: string[];
    actionUrl?: string;
    actionLabel?: string;
}

interface SystemNoticeBannerProps {
    notice: SystemNotice;
    onDismiss?: () => void;
}

const SystemNoticeBanner: React.FC<SystemNoticeBannerProps> = ({ notice, onDismiss }) => {
    const severityStyles = {
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            icon: <Info className="w-5 h-5 text-blue-500" />,
            text: 'text-blue-800',
        },
        warning: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
            text: 'text-yellow-800',
        },
        critical: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            icon: <AlertCircle className="w-5 h-5 text-red-500" />,
            text: 'text-red-800',
        },
    };

    const styles = severityStyles[notice.severity];

    const typeLabels: Record<SystemNotice['type'], string> = {
        maintenance: '점검 안내',
        incident: '장애 안내',
        policy: '정책 변경',
        migration: '서비스 전환',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`${styles.bg} ${styles.border} border rounded-xl p-4 mb-4 relative`}
        >
            {onDismiss && notice.severity !== 'critical' && (
                <button
                    onClick={onDismiss}
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-black/5"
                >
                    <X className="w-4 h-4 text-gray-400" />
                </button>
            )}

            <div className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
                <div className="flex-1 pr-6">
                    <span className={`inline-block text-xs font-semibold ${styles.text} mb-1`}>
                        [{typeLabels[notice.type]}]
                    </span>
                    <h4 className={`font-semibold ${styles.text} mb-1`}>{notice.title}</h4>
                    <p className={`text-sm ${styles.text} opacity-80`}>{notice.message}</p>
                    {notice.actionUrl && (
                        <a
                            href={notice.actionUrl}
                            className={`inline-flex items-center gap-1 text-sm font-semibold ${styles.text} mt-2 hover:underline`}
                        >
                            {notice.actionLabel || '자세히 보기'}
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SystemNoticeBanner;
export type { SystemNotice };
