import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Crown, Star, Gift,
    Percent, Truck, Headphones, Film, Coffee
} from 'lucide-react';

interface TierBenefitsPageProps {
    onBack: () => void;
}

const TierBenefitsPage: React.FC<TierBenefitsPageProps> = ({ onBack }) => {
    const currentTier = 'VIP';

    const tiers = [
        { id: 'basic', name: 'Basic', minPoints: 0, icon: Star, color: 'from-gray-400 to-gray-500' },
        { id: 'silver', name: 'Silver', minPoints: 5000, icon: Star, color: 'from-slate-400 to-slate-500' },
        { id: 'gold', name: 'Gold', minPoints: 15000, icon: Crown, color: 'from-amber-400 to-amber-500' },
        { id: 'vip', name: 'VIP', minPoints: 30000, icon: Crown, color: 'from-amber-500 to-orange-500', current: true },
        { id: 'vvip', name: 'VVIP', minPoints: 50000, icon: Crown, color: 'from-purple-500 to-blue-500' },
    ];

    const benefits = [
        { tier: 'basic', items: ['기본 포인트 적립 1%'] },
        { tier: 'silver', items: ['포인트 적립 1.5%', '생일 쿠폰'] },
        { tier: 'gold', items: ['포인트 적립 2%', '생일 쿠폰', '무료 배송 월 2회'] },
        { tier: 'vip', items: ['포인트 적립 3%', '생일 쿠폰', '무료 배송 무제한', 'CGV 할인', '스타벅스 할인'] },
        { tier: 'vvip', items: ['포인트 적립 5%', '생일 쿠폰', '무료 배송 무제한', 'CGV 무료', '스타벅스 무료', '전담 상담사', '라운지 이용'] },
    ];

    const benefitIcons: Record<string, typeof Gift> = {
        '포인트': Percent,
        '쿠폰': Gift,
        '배송': Truck,
        '상담': Headphones,
        'CGV': Film,
        '스타벅스': Coffee,
    };

    const getBenefitIcon = (item: string) => {
        const key = Object.keys(benefitIcons).find(k => item.includes(k));
        return key ? benefitIcons[key] : Gift;
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">등급별 혜택</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Current Tier */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Crown className="w-8 h-8" />
                        <span className="text-2xl font-bold">{currentTier}</span>
                    </div>
                    <p className="text-sm opacity-80">현재 등급입니다</p>
                </motion.div>

                {/* Tier Ladder */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm"
                >
                    <h3 className="font-bold text-gray-900 mb-4">등급 기준</h3>
                    <div className="space-y-3">
                        {tiers.map((tier) => {
                            const TierIcon = tier.icon;
                            return (
                                <div
                                    key={tier.id}
                                    className={`flex items-center gap-3 p-3 rounded-xl ${tier.current ? 'bg-amber-50 border-2 border-amber-200' : ''
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                                        <TierIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-bold ${tier.current ? 'text-amber-700' : 'text-gray-900'}`}>
                                            {tier.name}
                                            {tier.current && <span className="ml-2 text-xs">(현재)</span>}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {tier.minPoints.toLocaleString()}P 이상
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Benefits Comparison */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">등급별 혜택 비교</h3>
                    </div>

                    {benefits.map((tierBenefits, index) => {
                        const tier = tiers.find(t => t.id === tierBenefits.tier);
                        if (!tier) return null;
                        const TierIcon = tier.icon;

                        return (
                            <div
                                key={tierBenefits.tier}
                                className={`px-5 py-4 ${index < benefits.length - 1 ? 'border-b border-gray-50' : ''} ${tier.current ? 'bg-amber-50' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                                        <TierIcon className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="font-bold text-sm">{tier.name}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {tierBenefits.items.map((item) => {
                                        const IconComponent = getBenefitIcon(item);
                                        return (
                                            <span
                                                key={item}
                                                className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600 flex items-center gap-1"
                                            >
                                                <IconComponent className="w-3 h-3" />
                                                {item}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </main>
        </div>
    );
};

export default TierBenefitsPage;
