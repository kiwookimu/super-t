import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Wifi, Zap, Gift, ChevronRight,
    Clock, Check
} from 'lucide-react';
import { ListRow } from '../../components/tds';
import { mockStore } from '../../data/mockStore';

interface PlanPageProps {
    onBack: () => void;
    onNavigate?: (page: string) => void;
}

const PlanPage: React.FC<PlanPageProps> = ({ onBack, onNavigate }) => {
    const [currentPlan, setCurrentPlan] = useState(mockStore.getCurrentPlan());
    const dataUsage = mockStore.getState().dataUsage;

    useEffect(() => {
        const handleUpdate = () => {
            setCurrentPlan(mockStore.getCurrentPlan());
        };

        window.addEventListener('mockStorageUpdate', handleUpdate);
        return () => window.removeEventListener('mockStorageUpdate', handleUpdate);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">요금제</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Current Plan Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={currentPlan.id}
                    className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white"
                >
                    <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                            현재 요금제
                        </span>
                        <div className="flex items-center gap-1 text-sm opacity-80">
                            <Clock className="w-4 h-4" />
                            <span>갱신일 {currentPlan.renewalDate}</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-2">{currentPlan.name}</h2>
                    <p className="text-3xl font-bold">
                        ₩{currentPlan.price.toLocaleString()}
                        <span className="text-lg font-normal">원/월</span>
                    </p>

                    <div className="flex gap-4 mt-6">
                        <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
                            <Wifi className="w-5 h-5 mx-auto mb-1" />
                            <p className="text-xs opacity-80">데이터</p>
                            <p className="font-bold">{currentPlan.data}</p>
                        </div>
                        <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
                            <Zap className="w-5 h-5 mx-auto mb-1" />
                            <p className="text-xs opacity-80">통화</p>
                            <p className="font-bold">{currentPlan.voice}</p>
                        </div>
                        <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
                            <Gift className="w-5 h-5 mx-auto mb-1" />
                            <p className="text-xs opacity-80">혜택</p>
                            <p className="font-bold">{currentPlan.features.length}개</p>
                        </div>
                    </div>
                </motion.div>

                {/* Data Usage */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">이번 달 데이터 사용량</h3>
                        <span className="text-sm text-blue-600 font-medium">{Math.round((dataUsage.used / dataUsage.total) * 100)}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <motion.div
                            className="h-full bg-blue-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(dataUsage.used / dataUsage.total) * 100}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                    </div>
                    <p className="text-sm text-gray-500">
                        <span className="font-bold text-gray-900">{dataUsage.used}GB</span> / {dataUsage.total}GB 사용
                    </p>
                </motion.div>

                {/* Included Benefits */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">포함 혜택</h3>
                    </div>
                    {currentPlan.features.map((benefit) => (
                        <ListRow
                            key={benefit}
                            as="div"
                            left={
                                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-green-500" />
                                </div>
                            }
                            contents={
                                <span className="text-sm font-medium text-gray-900">{benefit}</span>
                            }
                            style={{ padding: '16px 20px' }}
                            className="border-b border-gray-50 last:border-0"
                        />
                    ))}
                </motion.div>

                {/* Change Plan Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <ListRow
                        as="button"
                        onClick={() => onNavigate?.('/subscription/plan/change')}
                        className="w-full bg-white rounded-2xl shadow-sm hover:bg-gray-50"
                        style={{ padding: '20px' }}
                        left={
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-blue-500" />
                            </div>
                        }
                        contents={
                            <div className="text-left">
                                <p className="text-sm font-bold text-gray-900">요금제 변경</p>
                                <p className="text-xs text-gray-500">더 나은 요금제를 찾아보세요</p>
                            </div>
                        }
                        right={
                            <ChevronRight className="w-5 h-5 text-gray-300" />
                        }
                    />
                </motion.div>
            </main>
        </div>
    );
};

export default PlanPage;
