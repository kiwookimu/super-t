import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Wifi, Zap, Check, Sparkles
} from 'lucide-react';

interface DataRechargePageProps {
    onBack: () => void;
}

const DataRechargePage: React.FC<DataRechargePageProps> = ({ onBack }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const currentData = {
        used: 12.5,
        total: 100,
        remaining: 87.5,
    };

    const rechargeOptions = [
        { id: '1gb', amount: '1GB', price: 5000, popular: false },
        { id: '3gb', amount: '3GB', price: 12000, popular: false },
        { id: '5gb', amount: '5GB', price: 18000, popular: true },
        { id: '10gb', amount: '10GB', price: 30000, popular: false },
        { id: 'unlimited', amount: '무제한', price: 55000, popular: false, duration: '30일' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">데이터 충전</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Current Data Status */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Wifi className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">남은 데이터</p>
                            <p className="text-2xl font-bold text-gray-900">{currentData.remaining}GB</p>
                        </div>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentData.remaining / currentData.total) * 100}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                    </div>
                    <p className="text-sm mt-2 text-gray-500">
                        {currentData.used}GB 사용 / {currentData.total}GB
                    </p>
                </motion.div>

                {/* Recharge Options */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                >
                    <h3 className="font-bold text-gray-900 px-1">충전 옵션 선택</h3>
                    {rechargeOptions.map((option) => (
                        <motion.button
                            key={option.id}
                            onClick={() => setSelectedOption(option.id)}
                            className={`w-full bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between transition-all ${selectedOption === option.id
                                ? 'ring-2 ring-blue-500 bg-blue-50'
                                : 'hover:bg-gray-50'
                                }`}
                            whileTap={{ scale: 0.99 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedOption === option.id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-blue-50 text-blue-500'
                                    }`}>
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg font-bold text-gray-900">{option.amount}</p>
                                        {option.popular && (
                                            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" />
                                                인기
                                            </span>
                                        )}
                                    </div>
                                    {option.duration && (
                                        <p className="text-sm text-gray-500">{option.duration} 이용</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-lg font-bold text-blue-600">
                                    {option.price.toLocaleString()}원
                                </p>
                                {selectedOption === option.id && (
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Recharge Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pt-4"
                >
                    <button
                        disabled={!selectedOption}
                        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${selectedOption
                            ? 'bg-blue-600 text-white active:scale-[0.99]'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {selectedOption
                            ? `${rechargeOptions.find(o => o.id === selectedOption)?.price.toLocaleString()}원 충전하기`
                            : '옵션을 선택해주세요'
                        }
                    </button>
                </motion.div>
            </main>
        </div >
    );
};

export default DataRechargePage;
