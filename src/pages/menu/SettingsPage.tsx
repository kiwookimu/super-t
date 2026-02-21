import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Bell, Moon, Globe, Lock, Smartphone,
    ChevronRight, Shield, HelpCircle, Info
} from 'lucide-react';

interface SettingsPageProps {
    onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [biometric, setBiometric] = useState(true);

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">설정</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* App Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">앱 설정</h3>
                    </div>

                    <SettingToggle
                        icon={<Moon className="w-5 h-5" />}
                        label="다크 모드"
                        description="어두운 테마 사용"
                        checked={darkMode}
                        onChange={setDarkMode}
                    />
                    <SettingToggle
                        icon={<Lock className="w-5 h-5" />}
                        label="생체 인증"
                        description="Face ID / 지문으로 로그인"
                        checked={biometric}
                        onChange={setBiometric}
                        isLast
                    />
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">알림</h3>
                    </div>

                    <SettingLink
                        icon={<Bell className="w-5 h-5" />}
                        label="알림 설정"
                        value="켜짐"
                    />
                    <SettingLink
                        icon={<Smartphone className="w-5 h-5" />}
                        label="기기 관리"
                        value="iPhone 15 Pro"
                        isLast
                    />
                </motion.div>

                {/* Language & Region */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">언어 및 지역</h3>
                    </div>

                    <SettingLink
                        icon={<Globe className="w-5 h-5" />}
                        label="언어"
                        value="한국어"
                        isLast
                    />
                </motion.div>

                {/* Support */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">지원</h3>
                    </div>

                    <SettingLink icon={<HelpCircle className="w-5 h-5" />} label="도움말" />
                    <SettingLink icon={<Shield className="w-5 h-5" />} label="개인정보 처리방침" />
                    <SettingLink icon={<Info className="w-5 h-5" />} label="앱 정보" value="v1.0.0" isLast />
                </motion.div>
            </main>
        </div>
    );
};

const SettingToggle: React.FC<{
    icon: React.ReactNode;
    label: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    isLast?: boolean;
}> = ({ icon, label, description, checked, onChange, isLast }) => (
    <div className={`flex items-center justify-between px-5 py-4 ${!isLast ? 'border-b border-gray-50' : ''}`}>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                {description && <p className="text-xs text-gray-500">{description}</p>}
            </div>
        </div>
        <button
            onClick={() => onChange(!checked)}
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

const SettingLink: React.FC<{
    icon: React.ReactNode;
    label: string;
    value?: string;
    isLast?: boolean;
}> = ({ icon, label, value, isLast }) => (
    <button className={`w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 ${!isLast ? 'border-b border-gray-50' : ''}`}>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                {icon}
            </div>
            <p className="text-sm font-medium text-gray-900">{label}</p>
        </div>
        <div className="flex items-center gap-2">
            {value && <span className="text-sm text-gray-500">{value}</span>}
            <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>
    </button>
);

export default SettingsPage;
