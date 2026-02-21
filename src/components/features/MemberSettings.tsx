import React from 'react';
import { motion } from 'framer-motion';
import {
    Bell, Shield, FileText, Lock, Mail,
    ChevronRight, Check, ToggleLeft, ToggleRight, Smartphone
} from 'lucide-react';

/**
 * MEM (회원/약관/알림) 요구사항 구현
 * - MEM-001: 알림 설정 관리
 * - MEM-003: 개인정보 동의 내역
 * - MEM-007: 본인인증 상태
 * - MEM-015: 마케팅 수신 동의
 */

interface NotificationSettingsProps {
    onBack?: () => void;
}

interface NotificationItem {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    category: string;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onBack }) => {
    const [notifications, setNotifications] = React.useState<NotificationItem[]>([
        { id: '1', title: '요금 알림', description: '청구서 발행, 납부 안내', enabled: true, category: 'essential' },
        { id: '2', title: '데이터 사용량', description: '데이터 80%, 100% 도달 알림', enabled: true, category: 'essential' },
        { id: '3', title: '약정/계약', description: '약정 만료, 계약 변경 안내', enabled: true, category: 'essential' },
        { id: '4', title: '이벤트/혜택', description: '신규 이벤트, 맞춤 혜택 안내', enabled: true, category: 'marketing' },
        { id: '5', title: '신상품 안내', description: '새로운 요금제, 상품 출시 정보', enabled: false, category: 'marketing' },
        { id: '6', title: '제휴 쿠폰', description: '파트너사 할인 쿠폰', enabled: false, category: 'marketing' },
    ]);

    const toggleNotification = (id: string) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, enabled: !n.enabled } : n
        ));
    };

    const essentialItems = notifications.filter(n => n.category === 'essential');
    const marketingItems = notifications.filter(n => n.category === 'marketing');

    return (
        <div className="space-y-5">
            {/* Header */}
            <header className="flex items-center gap-4 pt-2">
                {onBack && (
                    <button onClick={onBack} className="p-2 -ml-2">
                        <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                )}
                <h1 className="text-xl font-bold text-gray-900">알림 설정</h1>
            </header>

            {/* Push Notification Master Toggle */}
            <section className="toss-card p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">푸시 알림</p>
                            <p className="text-sm text-gray-500">모든 푸시 알림 수신</p>
                        </div>
                    </div>
                    <ToggleRight className="w-10 h-10 text-blue-500" />
                </div>
            </section>

            {/* Essential Notifications */}
            <section className="space-y-2">
                <h2 className="text-sm font-semibold text-gray-400 px-1">필수 알림</h2>
                <div className="toss-card divide-y divide-gray-100">
                    {essentialItems.map(item => (
                        <NotificationRow
                            key={item.id}
                            item={item}
                            onToggle={() => toggleNotification(item.id)}
                        />
                    ))}
                </div>
            </section>

            {/* Marketing Notifications */}
            <section className="space-y-2">
                <h2 className="text-sm font-semibold text-gray-400 px-1">마케팅 알림</h2>
                <div className="toss-card divide-y divide-gray-100">
                    {marketingItems.map(item => (
                        <NotificationRow
                            key={item.id}
                            item={item}
                            onToggle={() => toggleNotification(item.id)}
                        />
                    ))}
                </div>
                <p className="text-xs text-gray-400 px-1">
                    마케팅 알림을 끄면 맞춤 혜택 정보를 받을 수 없습니다
                </p>
            </section>
        </div>
    );
};

const NotificationRow: React.FC<{
    item: NotificationItem;
    onToggle: () => void;
}> = ({ item, onToggle }) => (
    <div className="flex items-center justify-between p-4">
        <div>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-sm text-gray-500">{item.description}</p>
        </div>
        <button onClick={onToggle}>
            {item.enabled ? (
                <ToggleRight className="w-8 h-8 text-blue-500" />
            ) : (
                <ToggleLeft className="w-8 h-8 text-gray-300" />
            )}
        </button>
    </div>
);

// ========================================
// MEM-003: Privacy Settings Component
// ========================================
export const PrivacySettings: React.FC = () => {
    const consentItems = [
        { id: '1', title: '필수 개인정보 수집·이용', date: '2024.01.15', required: true },
        { id: '2', title: '서비스 이용약관', date: '2024.01.15', required: true },
        { id: '3', title: '위치정보 이용약관', date: '2024.01.15', required: false },
        { id: '4', title: '마케팅 정보 수신', date: '2024.02.01', required: false },
    ];

    return (
        <div className="space-y-5">
            <header className="pt-2">
                <h1 className="text-xl font-bold text-gray-900">개인정보 동의 내역</h1>
            </header>

            {/* Verification Status */}
            <section className="toss-card p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">본인인증 완료</p>
                            <p className="text-sm text-gray-500">2024.01.15 인증</p>
                        </div>
                    </div>
                    <Check className="w-6 h-6 text-green-500" />
                </div>
            </section>

            {/* Consent Items */}
            <section className="toss-card divide-y divide-gray-100">
                {consentItems.map(item => (
                    <motion.div
                        key={item.id}
                        className="flex items-center justify-between p-4"
                        whileTap={{ backgroundColor: '#f8f9fa' }}
                    >
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-gray-900">{item.title}</p>
                                    {item.required && (
                                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded">필수</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-400">동의일: {item.date}</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                    </motion.div>
                ))}
            </section>
        </div>
    );
};

// ========================================
// MEM-007: Security Settings Component
// ========================================
export const SecuritySettings: React.FC = () => {
    const securityItems = [
        { id: '1', icon: <Lock className="w-5 h-5" />, title: '비밀번호 변경', description: '마지막 변경: 30일 전' },
        { id: '2', icon: <Smartphone className="w-5 h-5" />, title: '등록 기기 관리', description: '현재 1개 기기 등록' },
        { id: '3', icon: <Shield className="w-5 h-5" />, title: '2단계 인증', description: '활성화됨' },
        { id: '4', icon: <Mail className="w-5 h-5" />, title: '이메일 인증', description: 'k***@gmail.com' },
    ];

    return (
        <div className="space-y-5">
            <header className="pt-2">
                <h1 className="text-xl font-bold text-gray-900">보안 설정</h1>
            </header>

            <section className="toss-card divide-y divide-gray-100">
                {securityItems.map(item => (
                    <motion.div
                        key={item.id}
                        className="flex items-center justify-between p-4 cursor-pointer"
                        whileTap={{ backgroundColor: '#f8f9fa' }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                                {item.icon}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{item.title}</p>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                    </motion.div>
                ))}
            </section>
        </div>
    );
};

export default NotificationSettings;
