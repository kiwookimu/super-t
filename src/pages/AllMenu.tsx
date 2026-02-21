import React from 'react';
import { motion } from 'framer-motion';
import {
    User, Smartphone, CreditCard, Gift, Headphones, Settings,
    ChevronRight, Bell, LogOut, HelpCircle, FileText, Shield
} from 'lucide-react';
import { MENU_STRUCTURE } from '../constants/intTerms';

/**
 * INT-004: 단일 IA/메뉴 체계 재구성
 * 4개 서비스 IA를 단일 메뉴 구조로 재구성
 */

interface AllMenuProps {
    onNavigate?: (path: string) => void;
}

const AllMenu: React.FC<AllMenuProps> = ({ onNavigate }) => {
    const iconMap: Record<string, React.ReactNode> = {
        User: <User className="w-5 h-5" />,
        Smartphone: <Smartphone className="w-5 h-5" />,
        CreditCard: <CreditCard className="w-5 h-5" />,
        Gift: <Gift className="w-5 h-5" />,
        Headphones: <Headphones className="w-5 h-5" />,
        Settings: <Settings className="w-5 h-5" />,
    };

    const handleNavigate = (path: string) => {
        onNavigate?.(path);
    };

    return (
        <div className="pb-24 px-5 py-2 max-w-md md:max-w-full xl:max-w-7xl mx-auto transition-all duration-300">
            {/* Header */}
            <header className="flex justify-between items-center py-4">
                <h1 className="text-xl font-bold text-gray-900">전체</h1>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleNavigate('notifications')}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <Bell className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        <Settings className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </header>

            <div className="flex flex-col xl:grid xl:grid-cols-12 xl:gap-8">
                {/* Right Column: Profile & Utilities (Sidebar on Desktop, Top on Mobile) */}
                <div className="xl:col-span-4 space-y-4 order-first xl:order-last">
                    {/* User Profile Card */}
                    <motion.div
                        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleNavigate('/my/profile')}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <User className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-bold text-gray-900">기우님</h2>
                                <p className="text-sm text-gray-500">010-1234-5678</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300" />
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
                        <QuickLink icon={<FileText className="w-5 h-5" />} label="청구서" onClick={() => handleNavigate('/payment/bill')} />
                        <QuickLink icon={<Gift className="w-5 h-5" />} label="쿠폰함" onClick={() => handleNavigate('/benefits/coupons')} />
                        <QuickLink icon={<HelpCircle className="w-5 h-5" />} label="1:1문의" onClick={() => handleNavigate('/support/inquiry')} />
                        <QuickLink icon={<Shield className="w-5 h-5" />} label="보안" onClick={() => handleNavigate('/settings/privacy')} />
                    </div>

                    {/* Desktop Logout (Hidden on Mobile) */}
                    <div className="hidden md:block pt-4">
                        <button className="w-full flex items-center justify-center gap-2 p-4 bg-white rounded-xl text-gray-500 hover:bg-gray-50 border border-gray-200 transaction-colors">
                            <LogOut className="w-5 h-5" />
                            <span className="text-sm font-medium">로그아웃</span>
                        </button>
                        <p className="text-center text-xs text-gray-300 mt-4">
                            Super T v1.0.0
                        </p>
                    </div>
                </div>

                {/* Left Column: Menu Sections */}
                <div className="xl:col-span-8 space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                    {Object.values(MENU_STRUCTURE).map((section) => (
                        <MenuSection
                            key={section.id}
                            title={section.label}
                            icon={iconMap[section.icon]}
                            items={section.items}
                            onNavigate={handleNavigate}
                        />
                    ))}
                </div>

                {/* Mobile Logout (Visible on Mobile) */}
                <div className="md:hidden mt-6 space-y-2">
                    <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl text-gray-500 hover:bg-gray-50">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">로그아웃</span>
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-6">
                        Super T v1.0.0
                    </p>
                </div>
            </div>
        </div>
    );
};

// Quick Link Component
const QuickLink: React.FC<{
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}> = ({ icon, label, onClick }) => (
    <motion.button
        className="flex flex-col items-center justify-center p-3 bg-white rounded-xl hover:bg-gray-50"
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
    >
        <span className="text-gray-600 mb-1">{icon}</span>
        <span className="text-xs text-gray-600 font-medium">{label}</span>
    </motion.button>
);

// Menu Section Component
const MenuSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    items: readonly { readonly id: string; readonly label: string; readonly path: string }[];
    onNavigate: (path: string) => void;
}> = ({ title, icon, items, onNavigate }) => (
    <div className="bg-white rounded-2xl overflow-hidden">
        {/* Section Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <span className="text-blue-500">{icon}</span>
            <span className="font-semibold text-gray-900">{title}</span>
        </div>

        {/* Section Items */}
        <div>
            {items.map((item, index) => (
                <motion.button
                    key={item.id}
                    className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 ${index < items.length - 1 ? 'border-b border-gray-50' : ''
                        }`}
                    whileTap={{ backgroundColor: '#f9fafb' }}
                    onClick={() => onNavigate(item.path)}
                >
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                </motion.button>
            ))}
        </div>
    </div>
);

export default AllMenu;
