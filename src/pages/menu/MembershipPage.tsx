import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Crown, Star, Gift, Coffee,
    Film, ShoppingBag, Plane, ChevronRight
} from 'lucide-react';

interface MembershipPageProps {
    onBack: () => void;
    onNavigate?: (page: string) => void;
}

const MembershipPage: React.FC<MembershipPageProps> = ({ onBack, onNavigate }) => {
    const membership = {
        tier: 'VIP',
        points: 12500,
        nextTier: 'VVIP',
        pointsToNext: 7500,
    };

    const benefits = [
        { id: '1', icon: Coffee, name: '스타벅스', discount: '아메리카노 무료', color: 'bg-green-50 text-green-600' },
        { id: '2', icon: Film, name: 'CGV', discount: '영화 2,000원 할인', color: 'bg-red-50 text-red-600' },
        { id: '3', icon: ShoppingBag, name: '11번가', discount: '5% 추가 적립', color: 'bg-orange-50 text-orange-600' },
        { id: '4', icon: Plane, name: '대한항공', discount: '마일리지 20% 추가', color: 'bg-blue-50 text-blue-600' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">멤버십</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Membership Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="relative">
                        <div className="flex items-center gap-2 mb-4">
                            <Crown className="w-8 h-8" />
                            <span className="text-2xl font-bold">{membership.tier}</span>
                        </div>

                        <div className="mb-6">
                            <p className="text-sm opacity-80 mb-1">보유 포인트</p>
                            <p className="text-3xl font-bold">{membership.points.toLocaleString()}P</p>
                        </div>

                        <div className="bg-white/20 rounded-xl p-3">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="opacity-80">{membership.nextTier}까지</span>
                                <span className="font-bold">{membership.pointsToNext.toLocaleString()}P</span>
                            </div>
                            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: '62%' }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-3 gap-3"
                >
                    <button className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center gap-2">
                        <Gift className="w-6 h-6 text-blue-500" />
                        <span className="text-xs font-medium text-gray-700">포인트 선물</span>
                    </button>
                    <button
                        className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center gap-2"
                        onClick={() => onNavigate?.('/benefits/membership/tier')}
                    >
                        <Star className="w-6 h-6 text-amber-500" />
                        <span className="text-xs font-medium text-gray-700">등급 혜택</span>
                    </button>
                    <button className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-blue-500" />
                        <span className="text-xs font-medium text-gray-700">포인트몰</span>
                    </button>
                </motion.div>

                {/* Partner Benefits */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">제휴 혜택</h3>
                    </div>

                    {benefits.map((benefit, index) => {
                        const IconComponent = benefit.icon;
                        return (
                            <button
                                key={benefit.id}
                                className={`w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 ${index < benefits.length - 1 ? 'border-b border-gray-50' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${benefit.color}`}>
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-gray-900">{benefit.name}</p>
                                        <p className="text-xs text-gray-500">{benefit.discount}</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300" />
                            </button>
                        );
                    })}
                </motion.div>
            </main>
        </div>
    );
};

export default MembershipPage;
