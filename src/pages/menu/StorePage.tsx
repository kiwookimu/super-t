import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, MapPin, Clock, Phone,
    Navigation, Star, ChevronRight
} from 'lucide-react';

interface StorePageProps {
    onBack: () => void;
}

const StorePage: React.FC<StorePageProps> = ({ onBack }) => {
    const stores = [
        { id: '1', name: 'T월드 강남직영점', address: '서울 강남구 테헤란로 123', distance: '0.5km', hours: '09:00 - 21:00', rating: 4.8, isOpen: true },
        { id: '2', name: 'T월드 역삼점', address: '서울 강남구 역삼로 45', distance: '1.2km', hours: '10:00 - 20:00', rating: 4.5, isOpen: true },
        { id: '3', name: 'T월드 삼성점', address: '서울 강남구 삼성로 78', distance: '2.1km', hours: '09:00 - 20:00', rating: 4.7, isOpen: false },
        { id: '4', name: 'T월드 선릉점', address: '서울 강남구 선릉로 90', distance: '2.8km', hours: '10:00 - 21:00', rating: 4.6, isOpen: true },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">매장 찾기</h1>
            </header>

            <main className="space-y-4">
                {/* Map Placeholder */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center"
                >
                    <div className="text-center">
                        <MapPin className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">지도 영역</p>
                    </div>
                </motion.div>

                {/* Current Location */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-5 bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3"
                >
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                        <Navigation className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">현재 위치 기준</p>
                        <p className="text-xs text-gray-500">서울 강남구 테헤란로</p>
                    </div>
                    <button className="px-3 py-1.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                        재검색
                    </button>
                </motion.div>

                {/* Store List */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mx-5 bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">주변 매장 ({stores.length})</h3>
                    </div>

                    {stores.map((store, index) => (
                        <button
                            key={store.id}
                            className={`w-full flex items-start justify-between px-5 py-4 hover:bg-gray-50 text-left ${index < stores.length - 1 ? 'border-b border-gray-50' : ''
                                }`}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm font-bold text-gray-900">{store.name}</p>
                                    <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${store.isOpen
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {store.isOpen ? '영업 중' : '영업 종료'}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">{store.address}</p>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {store.distance}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {store.hours}
                                    </span>
                                    <span className="flex items-center gap-1 text-amber-500">
                                        <Star className="w-3 h-3 fill-amber-500" />
                                        {store.rating}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <button className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-green-600" />
                                </button>
                                <ChevronRight className="w-5 h-5 text-gray-300" />
                            </div>
                        </button>
                    ))}
                </motion.div>
            </main>
        </div>
    );
};

export default StorePage;
