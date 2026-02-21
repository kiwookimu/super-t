import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, User, Mail, Phone, Shield, Edit3,
    ChevronRight, Crown, Calendar, MapPin
} from 'lucide-react';

interface ProfilePageProps {
    onBack: () => void;
    onNavigate?: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, onNavigate }) => {
    const userInfo = {
        name: '기우',
        phone: '010-1234-5678',
        email: 'kiwoo@example.com',
        birthDate: '1990.01.15',
        address: '서울특별시 강남구',
        membershipTier: 'VIP',
        joinDate: '2020.03.01',
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">회원 정보</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-xl font-bold text-gray-900">{userInfo.name}님</h2>
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1">
                                    <Crown className="w-3 h-3" />
                                    {userInfo.membershipTier}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">가입일: {userInfo.joinDate}</p>
                        </div>
                        <button
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                            onClick={() => onNavigate?.('/my/profile/edit')}
                        >
                            <Edit3 className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">연락처 정보</h3>
                    </div>

                    <InfoRow icon={<Phone className="w-5 h-5" />} label="휴대폰" value={userInfo.phone} />
                    <InfoRow icon={<Mail className="w-5 h-5" />} label="이메일" value={userInfo.email} />
                    <InfoRow icon={<Calendar className="w-5 h-5" />} label="생년월일" value={userInfo.birthDate} />
                    <InfoRow icon={<MapPin className="w-5 h-5" />} label="주소" value={userInfo.address} isLast />
                </motion.div>

                {/* Security */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">보안 설정</h3>
                    </div>

                    <button
                        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50"
                        onClick={() => onNavigate?.('/my/profile/password')}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-medium text-gray-900">비밀번호 변경</p>
                                <p className="text-xs text-gray-500">마지막 변경: 30일 전</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                    </button>
                </motion.div>

                {/* Danger Zone */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-5 shadow-sm"
                >
                    <button className="w-full text-center text-sm text-red-500 font-medium">
                        회원 탈퇴
                    </button>
                </motion.div>
            </main>
        </div>
    );
};

const InfoRow: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    isLast?: boolean;
}> = ({ icon, label, value, isLast }) => (
    <div className={`flex items-center gap-4 px-5 py-4 ${!isLast ? 'border-b border-gray-50' : ''}`}>
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
            {icon}
        </div>
        <div className="flex-1">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium text-gray-900">{value}</p>
        </div>
    </div>
);

export default ProfilePage;
