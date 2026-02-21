import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Bell, Mail, MessageSquare,
    Megaphone, Clock, Info
} from 'lucide-react';

interface NotificationSettingsPageProps {
    onBack: () => void;
}

const NotificationSettingsPage: React.FC<NotificationSettingsPageProps> = ({ onBack }) => {
    const [settings, setSettings] = useState({
        push: true,
        sms: true,
        email: false,
        marketing: false,
        nightMode: true,
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">알림 설정</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Service Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">서비스 알림</h3>
                        <p className="text-xs text-gray-500 mt-1">중요 안내 및 서비스 관련 알림</p>
                    </div>

                    <NotificationToggle
                        icon={<Bell className="w-5 h-5" />}
                        label="푸시 알림"
                        description="앱 푸시 알림 받기"
                        checked={settings.push}
                        onChange={() => toggleSetting('push')}
                    />
                    <NotificationToggle
                        icon={<MessageSquare className="w-5 h-5" />}
                        label="SMS 알림"
                        description="문자 메시지로 알림 받기"
                        checked={settings.sms}
                        onChange={() => toggleSetting('sms')}
                    />
                    <NotificationToggle
                        icon={<Mail className="w-5 h-5" />}
                        label="이메일 알림"
                        description="이메일로 알림 받기"
                        checked={settings.email}
                        onChange={() => toggleSetting('email')}
                        isLast
                    />
                </motion.div>

                {/* Marketing */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">마케팅 알림</h3>
                        <p className="text-xs text-gray-500 mt-1">이벤트, 혜택 등 마케팅 정보</p>
                    </div>

                    <NotificationToggle
                        icon={<Megaphone className="w-5 h-5" />}
                        label="마케팅 수신 동의"
                        description="프로모션 및 이벤트 알림"
                        checked={settings.marketing}
                        onChange={() => toggleSetting('marketing')}
                        isLast
                    />
                </motion.div>

                {/* Night Mode */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">방해 금지</h3>
                    </div>

                    <NotificationToggle
                        icon={<Clock className="w-5 h-5" />}
                        label="야간 알림 차단"
                        description="22:00 - 08:00 알림 받지 않기"
                        checked={settings.nightMode}
                        onChange={() => toggleSetting('nightMode')}
                        isLast
                    />
                </motion.div>

                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3"
                >
                    <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700 leading-relaxed">
                        서비스 이용에 필수적인 알림(청구서, 결제 등)은 설정과 관계없이 발송됩니다.
                    </p>
                </motion.div>
            </main>
        </div>
    );
};

const NotificationToggle: React.FC<{
    icon: React.ReactNode;
    label: string;
    description: string;
    checked: boolean;
    onChange: () => void;
    isLast?: boolean;
}> = ({ icon, label, description, checked, onChange, isLast }) => (
    <div className={`flex items-center justify-between px-5 py-4 ${!isLast ? 'border-b border-gray-50' : ''}`}>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </div>
        <button
            onClick={onChange}
            className={`w-12 h-7 rounded-full transition-colors ${checked ? 'bg-blue-500' : 'bg-gray-200'}`}
        >
            <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-sm"
                animate={{ x: checked ? 26 : 4 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
        </button>
    </div>
);

export default NotificationSettingsPage;
