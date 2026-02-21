import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Ticket, Clock,
    ChevronRight, Tag, Percent
} from 'lucide-react';

interface CouponsPageProps {
    onBack: () => void;
    onNavigate?: (page: string) => void;
}

const CouponsPage: React.FC<CouponsPageProps> = ({ onBack, onNavigate }) => {
    const coupons = [
        { id: '1', name: '신규 가입 할인', discount: '10%', description: '첫 결제 시 사용 가능', expiry: '2026.03.31', isUsed: false },
        { id: '2', name: '생일 축하 쿠폰', discount: '5,000원', description: '액세서리 구매 시 사용', expiry: '2026.02.28', isUsed: false },
        { id: '3', name: '앱 설치 혜택', discount: '3,000원', description: '무선이어폰 구매 시', expiry: '2026.04.15', isUsed: false },
        { id: '4', name: '친구 추천 리워드', discount: '20%', description: '요금제 변경 시', expiry: '2025.12.31', isUsed: true },
    ];

    const activeCoupons = coupons.filter(c => !c.isUsed);
    const usedCoupons = coupons.filter(c => c.isUsed);

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">쿠폰함</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                            <Ticket className="w-6 h-6 text-orange-500" />
                        </div>
                        <span className="text-sm text-gray-500">사용 가능한 쿠폰</span>
                    </div>
                    <p className="text-4xl font-bold text-gray-900">{activeCoupons.length}장</p>
                </motion.div>

                {/* Coupon Input */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-4 shadow-sm flex gap-2"
                >
                    <input
                        type="text"
                        placeholder="쿠폰 코드 입력"
                        className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium text-sm">
                        등록
                    </button>
                </motion.div>

                {/* Active Coupons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                >
                    <h3 className="font-bold text-gray-900 px-1">사용 가능</h3>
                    {activeCoupons.map((coupon) => (
                        <CouponCard key={coupon.id} coupon={coupon} onClick={() => onNavigate?.('/benefits/coupons/detail')} />
                    ))}
                </motion.div>

                {/* Used Coupons */}
                {usedCoupons.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                    >
                        <h3 className="font-bold text-gray-400 px-1">사용 완료</h3>
                        {usedCoupons.map((coupon) => (
                            <CouponCard key={coupon.id} coupon={coupon} isUsed />
                        ))}
                    </motion.div>
                )}
            </main>
        </div>
    );
};

const CouponCard: React.FC<{
    coupon: { name: string; discount: string; description: string; expiry: string };
    isUsed?: boolean;
    onClick?: () => void;
}> = ({ coupon, isUsed, onClick }) => (
    <div
        className={`bg-white rounded-2xl overflow-hidden shadow-sm ${isUsed ? 'opacity-50' : 'cursor-pointer hover:bg-gray-50'}`}
        onClick={!isUsed ? onClick : undefined}
    >
        <div className="flex">
            <div className={`w-24 flex flex-col items-center justify-center p-4 ${isUsed ? 'bg-gray-100' : 'bg-gradient-to-b from-blue-500 to-indigo-600'
                }`}>
                {coupon.discount.includes('%') ? (
                    <Percent className={`w-6 h-6 ${isUsed ? 'text-gray-400' : 'text-white'}`} />
                ) : (
                    <Tag className={`w-6 h-6 ${isUsed ? 'text-gray-400' : 'text-white'}`} />
                )}
                <span className={`text-lg font-bold mt-1 ${isUsed ? 'text-gray-500' : 'text-white'}`}>
                    {coupon.discount}
                </span>
            </div>
            <div className="flex-1 p-4">
                <p className="font-bold text-gray-900">{coupon.name}</p>
                <p className="text-xs text-gray-500 mt-1">{coupon.description}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{coupon.expiry}까지</span>
                </div>
            </div>
            {!isUsed && (
                <button className="px-4 flex items-center">
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
            )}
        </div>
    </div>
);

export default CouponsPage;
