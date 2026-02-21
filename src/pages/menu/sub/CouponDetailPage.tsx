import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Clock, MapPin, AlertCircle
} from 'lucide-react';

interface CouponDetailPageProps {
    onBack: () => void;
}

const CouponDetailPage: React.FC<CouponDetailPageProps> = ({ onBack }) => {
    const coupon = {
        brand: '스타벅스',
        discount: '아메리카노 50% 할인',
        expiry: '2026년 2월 28일',
        code: 'SUPER-STBX-2026',
        conditions: [
            '일 1회 사용 가능',
            '아메리카노 톨 사이즈에만 적용',
            '다른 쿠폰과 중복 사용 불가',
            '일부 매장 제외',
        ],
        usableStores: '전국 스타벅스 매장 (드라이브스루 제외)',
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">쿠폰 상세</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Coupon Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                    {/* Coupon Header */}
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white text-center">
                        <p className="text-sm opacity-80 mb-1">{coupon.brand}</p>
                        <h2 className="text-2xl font-bold">{coupon.discount}</h2>
                    </div>

                    {/* Barcode Area */}
                    <div className="p-6 border-b border-dashed border-gray-200">
                        <div className="bg-gray-100 rounded-xl p-4 text-center">
                            <div className="h-16 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 rounded-lg mb-3 flex items-center justify-center">
                                {/* Barcode Pattern */}
                                <div className="flex items-end gap-0.5 h-12">
                                    {[2, 4, 1, 3, 2, 4, 1, 2, 3, 4, 2, 1, 3, 2, 4, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2].map((h, i) => (
                                        <div
                                            key={i}
                                            className="bg-white"
                                            style={{ width: '3px', height: `${h * 10}px` }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm font-mono text-gray-600">{coupon.code}</p>
                        </div>
                    </div>

                    {/* Expiry Info */}
                    <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">유효기간</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{coupon.expiry}까지</span>
                    </div>

                    {/* Usable Stores */}
                    <div className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">사용 가능 매장</span>
                        </div>
                        <span className="text-sm text-gray-600">{coupon.usableStores}</span>
                    </div>
                </motion.div>

                {/* Conditions */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <h3 className="font-bold text-gray-900">유의사항</h3>
                    </div>
                    <ul className="space-y-2">
                        {coupon.conditions.map((condition, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>{condition}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Use Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pt-4"
                >
                    <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-lg active:scale-[0.99] transition-transform">
                        쿠폰 사용하기
                    </button>
                </motion.div>
            </main>
        </div>
    );
};

export default CouponDetailPage;
