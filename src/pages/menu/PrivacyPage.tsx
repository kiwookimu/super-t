import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Shield, Eye, Download, Trash2,
    ChevronRight, Lock, FileText, AlertCircle
} from 'lucide-react';

interface PrivacyPageProps {
    onBack: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
    const [settings, setSettings] = useState({
        adPersonalization: true,
        dataAnalytics: false,
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">개인정보</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Privacy Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">개인정보 설정</h3>
                    </div>

                    <PrivacyToggle
                        icon={<Eye className="w-5 h-5" />}
                        label="맞춤형 광고"
                        description="관심사 기반 광고 수신"
                        checked={settings.adPersonalization}
                        onChange={() => setSettings(prev => ({ ...prev, adPersonalization: !prev.adPersonalization }))}
                    />
                    <PrivacyToggle
                        icon={<Shield className="w-5 h-5" />}
                        label="데이터 분석 동의"
                        description="서비스 개선을 위한 사용 데이터 수집"
                        checked={settings.dataAnalytics}
                        onChange={() => setSettings(prev => ({ ...prev, dataAnalytics: !prev.dataAnalytics }))}
                        isLast
                    />
                </motion.div>

                {/* Data Management */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">내 데이터 관리</h3>
                    </div>

                    <PrivacyLink
                        icon={<Download className="w-5 h-5" />}
                        label="내 데이터 다운로드"
                        description="Super T에 저장된 내 정보 내보내기"
                    />
                    <PrivacyLink
                        icon={<FileText className="w-5 h-5" />}
                        label="개인정보 이용내역"
                        description="최근 3개월 이용 내역 확인"
                    />
                    <PrivacyLink
                        icon={<Lock className="w-5 h-5" />}
                        label="접근 권한 관리"
                        description="앱에서 사용하는 권한 설정"
                        isLast
                    />
                </motion.div>

                {/* Danger Zone */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-red-500">데이터 삭제</h3>
                    </div>

                    <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-red-50">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                <Trash2 className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-medium text-red-500">모든 개인정보 삭제 요청</p>
                                <p className="text-xs text-gray-500">서비스 이용 데이터가 모두 삭제됩니다</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-red-300" />
                    </button>
                </motion.div>

                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-amber-50 rounded-2xl p-4 flex items-start gap-3"
                >
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 leading-relaxed">
                        개인정보 보호법에 따라 수집된 정보는 안전하게 관리되며,
                        명시된 목적 외에는 사용되지 않습니다.
                    </p>
                </motion.div>
            </main>
        </div>
    );
};

const PrivacyToggle: React.FC<{
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

const PrivacyLink: React.FC<{
    icon: React.ReactNode;
    label: string;
    description: string;
    isLast?: boolean;
}> = ({ icon, label, description, isLast }) => (
    <button className={`w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 ${!isLast ? 'border-b border-gray-50' : ''}`}>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                {icon}
            </div>
            <div className="text-left">
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
    </button>
);

export default PrivacyPage;
