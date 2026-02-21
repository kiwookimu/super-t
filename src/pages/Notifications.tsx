import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, Bell, Gift, Smartphone, ShoppingBag,
    Trash2, Clock, ChevronRight, Sparkles, Megaphone
} from 'lucide-react';

interface NotificationItem {
    id: string;
    category: 'benefit' | 'service' | 'shopping' | 'system';
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
    link?: string;
}

interface NotificationsProps {
    onBack: () => void;
    onNavigate?: (page: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onBack, onNavigate }) => {
    const [activeTab, setActiveTab] = useState<'all' | 'benefit' | 'service' | 'shopping'>('all');

    // Initial mock data with Date objects for grouping
    const [notifications, setNotifications] = useState<NotificationItem[]>([
        {
            id: '1',
            category: 'benefit',
            title: 'T Day 혜택 안내',
            message: '도미노피자 50% 할인 쿠폰이 발급되었습니다. 지금 바로 확인해보세요!',
            timestamp: new Date(), // Today
            isRead: false,
            link: 'benefits'
        },
        {
            id: '2',
            category: 'service',
            title: '요금 결제 완료',
            message: '2월분 모바일 요금 59,000원이 정상적으로 결제되었습니다.',
            timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
            isRead: false,
            link: 'my'
        },
        {
            id: '3',
            category: 'shopping',
            title: '배송 시작 안내',
            message: '주문하신 [Galaxy Watch 7] 상품의 배송이 시작되었습니다.',
            timestamp: new Date(Date.now() - 86400000), // Yesterday
            isRead: true,
            link: 'shop'
        },
        {
            id: '4',
            category: 'benefit',
            title: 'VIP 혜택 리마인드',
            message: '이번 달 VIP Pick 무료 영화 예매 혜택이 아직 남아있습니다.',
            timestamp: new Date(Date.now() - 86400000 - 3600000 * 5), // Yesterday
            isRead: true,
            link: 'benefits'
        },
        {
            id: '5',
            category: 'system',
            title: '앱 업데이트 안내',
            message: '더 빠르고 편리해진 Super T v1.1 업데이트가 준비되었습니다.',
            timestamp: new Date(Date.now() - 86400000 * 3), // 3 days ago
            isRead: true
        }
    ]);

    // Grouping logic
    const groupedNotifications = useMemo(() => {
        const filtered = activeTab === 'all'
            ? notifications
            : notifications.filter(n => n.category === activeTab);

        const groups: { [key: string]: NotificationItem[] } = {
            '오늘': [],
            '어제': [],
            '이전 알림': []
        };

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        filtered.forEach(notif => {
            const d = new Date(notif.timestamp);
            const notifDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());

            if (notifDate.getTime() === today.getTime()) {
                groups['오늘'].push(notif);
            } else if (notifDate.getTime() === yesterday.getTime()) {
                groups['어제'].push(notif);
            } else {
                groups['이전 알림'].push(notif);
            }
        });

        // Remove empty groups
        return Object.entries(groups).filter(([_, items]) => items.length > 0);
    }, [notifications, activeTab]);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHrs = Math.floor(diffMins / 60);

        if (diffMins < 1) return '방금 전';
        if (diffMins < 60) return `${diffMins}분 전`;
        if (diffHrs < 24) return `${diffHrs}시간 전`;
        return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center">
            {/* Premium Header */}
            <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl z-50 border-b border-gray-50 flex justify-center">
                <div className="w-full max-w-md flex items-center justify-between h-16 px-4">
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">알림</h1>
                    <button
                        onClick={markAllAsRead}
                        className="text-[13px] font-bold text-blue-600 hover:text-blue-700 px-2 py-1"
                    >
                        모두 읽음
                    </button>
                </div>
            </header>

            <div className="pt-16 pb-24 w-full max-w-md flex flex-col">
                {/* Modern Tabs */}
                <div className="sticky top-16 bg-white/95 backdrop-blur-md z-40 px-4 py-2 border-b border-gray-100 flex justify-center">
                    <div className="w-full flex bg-gray-100/80 p-1 rounded-xl">
                        <ModernTabButton label="전체" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
                        <ModernTabButton label="혜택" active={activeTab === 'benefit'} onClick={() => setActiveTab('benefit')} />
                        <ModernTabButton label="서비스" active={activeTab === 'service'} onClick={() => setActiveTab('service')} />
                        <ModernTabButton label="쇼핑" active={activeTab === 'shopping'} onClick={() => setActiveTab('shopping')} />
                    </div>
                </div>

                {/* Date-Grouped List */}
                <div className="px-4 py-6 space-y-8">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {groupedNotifications.map(([groupName, items]) => (
                            <motion.div
                                key={groupName}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                <h2 className="text-[13px] font-bold text-gray-400 px-1">{groupName}</h2>
                                <div className="space-y-3">
                                    {items.map((notif) => (
                                        <NotificationCard
                                            key={notif.id}
                                            notif={notif}
                                            formatTime={formatTime}
                                            onDelete={deleteNotification}
                                            onNavigate={onNavigate}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {groupedNotifications.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-32 text-center"
                        >
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                <Bell size={32} strokeWidth={1.5} className="text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">새로운 알림이 없어요</h3>
                            <p className="text-sm text-gray-500">나중에 다시 확인해 보세요</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Sub-components ---

const NotificationCard = ({ notif, formatTime, onDelete, onNavigate }: any) => {
    const categoryStyles = {
        benefit: { bg: 'bg-rose-50', iconBg: 'bg-rose-100', icon: <Gift className="text-rose-500 w-5 h-5" />, label: '혜택' },
        service: { bg: 'bg-blue-50', iconBg: 'bg-blue-100', icon: <Smartphone className="text-blue-500 w-5 h-5" />, label: '서비스' },
        shopping: { bg: 'bg-indigo-50', iconBg: 'bg-indigo-100', icon: <ShoppingBag className="text-indigo-500 w-5 h-5" />, label: '쇼핑' },
        system: { bg: 'bg-amber-50', iconBg: 'bg-amber-100', icon: <Megaphone className="text-amber-500 w-5 h-5" />, label: '공지' },
    };

    const style = categoryStyles[notif.category as keyof typeof categoryStyles] || categoryStyles.system;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -2 }}
            className={`relative group rounded-2xl p-4 transition-all duration-300 ${notif.isRead ? 'bg-white shadow-sm' : 'bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] ring-1 ring-blue-500/5'
                }`}
            onClick={() => notif.link && onNavigate?.(notif.link)}
        >
            {!notif.isRead && (
                <div className="absolute top-4 right-10 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            )}

            <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center flex-shrink-0 ${style.iconBg} shadow-inner`}>
                    {style.icon}
                </div>

                <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded-md ${style.bg} ${notif.category === 'benefit' ? 'text-rose-600' : notif.category === 'service' ? 'text-blue-600' : notif.category === 'shopping' ? 'text-indigo-600' : 'text-amber-600'}`}>
                            {style.label}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                            <Clock size={10} />
                            {formatTime(notif.timestamp)}
                        </span>
                    </div>
                    <h3 className={`text-[15px] font-bold text-gray-900 mb-1 leading-tight ${notif.isRead ? 'opacity-80' : ''}`}>
                        {notif.title}
                    </h3>
                    <p className={`text-[14px] text-gray-600 leading-snug ${notif.isRead ? 'opacity-70' : ''}`}>
                        {notif.message}
                    </p>
                </div>

                <button
                    onClick={(e) => onDelete(notif.id, e)}
                    className="absolute right-3 top-4 p-2 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-rose-500 transition-all active:scale-90"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {notif.link && (
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <Sparkles size={12} className="text-blue-500" />
                        <span className="text-[12px] font-bold text-blue-500">지금 바로 확인하기</span>
                    </div>
                    <ChevronRight size={14} className="text-blue-200" />
                </div>
            )}
        </motion.div>
    );
};

const ModernTabButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className="relative flex-1 py-1.5 text-sm font-bold transition-all duration-300 z-10"
    >
        <span className={active ? 'text-gray-900' : 'text-gray-500'}>{label}</span>
        {active && (
            <motion.div
                layoutId="modernActiveTab"
                className="absolute inset-0 bg-white rounded-[10px] shadow-sm -z-10"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            />
        )}
    </button>
);

export default Notifications;
