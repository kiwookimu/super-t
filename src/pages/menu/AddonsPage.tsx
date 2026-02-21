import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Plus, Check, X, Music, Video,
    Shield, Gamepad2, Cloud
} from 'lucide-react';

interface AddonsPageProps {
    onBack: () => void;
}

const AddonsPage: React.FC<AddonsPageProps> = ({ onBack }) => {
    const activeAddons = [
        { id: '1', name: '스팸 차단 플러스', price: 1100, icon: Shield },
        { id: '2', name: '클라우드 100GB', price: 3300, icon: Cloud },
    ];

    const availableAddons = [
        { id: '3', name: '멜론 스트리밍', price: 10900, icon: Music, description: '음악 무제한 스트리밍' },
        { id: '4', name: '유튜브 프리미엄', price: 14900, icon: Video, description: '광고 없는 유튜브' },
        { id: '5', name: '게임패스 얼티밋', price: 17900, icon: Gamepad2, description: 'Xbox 게임 무제한' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">부가서비스</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-5 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">이용 중인 부가서비스</p>
                            <p className="text-2xl font-bold text-gray-900">{activeAddons.length}개</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">월 이용료</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {activeAddons.reduce((sum, a) => sum + a.price, 0).toLocaleString()}원
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Active Addons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">이용 중</h3>
                        <span className="text-xs text-blue-600 font-medium">{activeAddons.length}개</span>
                    </div>

                    {activeAddons.map((addon, index) => {
                        const IconComponent = addon.icon;
                        return (
                            <div
                                key={addon.id}
                                className={`flex items-center justify-between px-5 py-4 ${index < activeAddons.length - 1 ? 'border-b border-gray-50' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                        <IconComponent className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{addon.name}</p>
                                        <p className="text-xs text-gray-500">{addon.price.toLocaleString()}원/월</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full flex items-center gap-1">
                                        <Check className="w-3 h-3" />
                                        이용 중
                                    </span>
                                    <button className="p-2 hover:bg-red-50 rounded-full">
                                        <X className="w-4 h-4 text-red-400" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Available Addons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">추천 부가서비스</h3>
                    </div>

                    {availableAddons.map((addon, index) => {
                        const IconComponent = addon.icon;
                        return (
                            <button
                                key={addon.id}
                                className={`w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 ${index < availableAddons.length - 1 ? 'border-b border-gray-50' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                        <IconComponent className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-gray-900">{addon.name}</p>
                                        <p className="text-xs text-gray-500">{addon.description}</p>
                                        <p className="text-xs text-blue-600 font-medium mt-1">{addon.price.toLocaleString()}원/월</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Plus className="w-5 h-5 text-blue-500" />
                                </div>
                            </button>
                        );
                    })}
                </motion.div>
            </main>
        </div>
    );
};

export default AddonsPage;
