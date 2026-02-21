import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Globe, Plane, Wifi, Phone,
    ChevronRight, AlertCircle
} from 'lucide-react';

interface RoamingPageProps {
    onBack: () => void;
}

const RoamingPage: React.FC<RoamingPageProps> = ({ onBack }) => {
    const roamingPackages = [
        { id: '1', name: '아시아 데이터 로밍', countries: '일본, 중국, 태국 등 15개국', data: '1GB/일', price: 11000, duration: '1일' },
        { id: '2', name: '미주 데이터 로밍', countries: '미국, 캐나다, 멕시코', data: '2GB/일', price: 15000, duration: '1일' },
        { id: '3', name: '유럽 데이터 로밍', countries: '영국, 프랑스, 독일 등 30개국', data: '1GB/일', price: 13000, duration: '1일' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">로밍</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Current Status */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                            <Globe className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">현재 로밍 상태</p>
                            <p className="text-xl font-bold text-gray-900">국내 이용 중</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 rounded-xl p-3">
                        <Plane className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-blue-700">해외 여행 시 로밍 요금제를 미리 신청하세요</span>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 gap-3"
                >
                    <button className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center gap-2 hover:bg-gray-50">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Wifi className="w-6 h-6 text-blue-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">데이터 로밍</span>
                    </button>
                    <button className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center gap-2 hover:bg-gray-50">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                            <Phone className="w-6 h-6 text-purple-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">음성 로밍</span>
                    </button>
                </motion.div>

                {/* Roaming Packages */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">인기 로밍 요금제</h3>
                    </div>

                    {roamingPackages.map((pkg, index) => (
                        <button
                            key={pkg.id}
                            className={`w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 ${index < roamingPackages.length - 1 ? 'border-b border-gray-50' : ''
                                }`}
                        >
                            <div className="flex-1 text-left">
                                <p className="text-sm font-bold text-gray-900">{pkg.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{pkg.countries}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                                        {pkg.data}
                                    </span>
                                    <span className="text-xs text-gray-400">{pkg.duration}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-blue-600">{pkg.price.toLocaleString()}원</p>
                                <ChevronRight className="w-5 h-5 text-gray-300 ml-auto mt-1" />
                            </div>
                        </button>
                    ))}
                </motion.div>

                {/* Info Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-amber-50 rounded-2xl p-4 flex items-start gap-3"
                >
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-amber-800">로밍 이용 전 확인하세요</p>
                        <p className="text-xs text-amber-700 mt-1">
                            로밍 요금제는 출국 전 미리 신청하시면 더욱 편리합니다.
                            현지 도착 후에도 신청 가능합니다.
                        </p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default RoamingPage;
