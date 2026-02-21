import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Coins, TrendingUp, TrendingDown,
    AlertCircle, ChevronRight, Calendar
} from 'lucide-react';

interface PointsPageProps {
    onBack: () => void;
}

const PointsPage: React.FC<PointsPageProps> = ({ onBack }) => {
    const pointsBalance = 12500;
    const expiringPoints = 2000;
    const expiryDate = '2026.02.28';

    const history = [
        { id: '1', type: 'earn', description: '요금 납부 적립', amount: 1250, date: '2026.01.25' },
        { id: '2', type: 'use', description: '스타벅스 사용', amount: -5000, date: '2026.01.20' },
        { id: '3', type: 'earn', description: '친구 추천 보너스', amount: 5000, date: '2026.01.15' },
        { id: '4', type: 'earn', description: '요금 납부 적립', amount: 1180, date: '2025.12.25' },
        { id: '5', type: 'use', description: 'CGV 영화 할인', amount: -2000, date: '2025.12.20' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">포인트</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Points Balance */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Coins className="w-6 h-6" />
                        <span className="text-sm opacity-80">사용 가능 포인트</span>
                    </div>
                    <p className="text-4xl font-bold">{pointsBalance.toLocaleString()}P</p>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <button className="py-3 bg-white/20 rounded-xl text-sm font-medium hover:bg-white/30">
                            포인트 사용
                        </button>
                        <button className="py-3 bg-white/20 rounded-xl text-sm font-medium hover:bg-white/30">
                            포인트 선물
                        </button>
                    </div>
                </motion.div>

                {/* Expiring Alert */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-red-50 rounded-2xl p-4 flex items-center gap-3"
                >
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-red-700">소멸 예정 포인트</p>
                        <p className="text-xs text-red-600">{expiryDate}까지 {expiringPoints.toLocaleString()}P 소멸 예정</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-red-300" />
                </motion.div>

                {/* History */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">적립/사용 내역</h3>
                        <button className="text-sm text-blue-600 font-medium flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            전체
                        </button>
                    </div>

                    {history.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between px-5 py-4 ${index < history.length - 1 ? 'border-b border-gray-50' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'earn' ? 'bg-green-50' : 'bg-red-50'
                                    }`}>
                                    {item.type === 'earn' ? (
                                        <TrendingUp className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <TrendingDown className="w-5 h-5 text-red-500" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{item.description}</p>
                                    <p className="text-xs text-gray-500">{item.date}</p>
                                </div>
                            </div>
                            <span className={`text-sm font-bold ${item.type === 'earn' ? 'text-green-600' : 'text-red-500'
                                }`}>
                                {item.type === 'earn' ? '+' : ''}{item.amount.toLocaleString()}P
                            </span>
                        </div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
};

export default PointsPage;
