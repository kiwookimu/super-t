import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Smartphone, Wifi, Tv, Phone, Plus,
    MoreVertical, Signal
} from 'lucide-react';

interface LinesPageProps {
    onBack: () => void;
}

const LinesPage: React.FC<LinesPageProps> = ({ onBack }) => {
    const lines = [
        { id: '1', type: 'mobile', name: '내 휴대폰', number: '010-1234-5678', plan: '5G 프라임', isPrimary: true, status: 'active' },
        { id: '2', type: 'mobile', name: '가족1', number: '010-2345-6789', plan: '5G 스탠다드', isPrimary: false, status: 'active' },
        { id: '3', type: 'internet', name: '집 인터넷', number: 'GIGA 500M', plan: '기가 인터넷', isPrimary: false, status: 'active' },
        { id: '4', type: 'tv', name: '집 TV', number: 'IPTV 베이직', plan: 'TV 스탠다드', isPrimary: false, status: 'active' },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'mobile': return <Smartphone className="w-5 h-5" />;
            case 'internet': return <Wifi className="w-5 h-5" />;
            case 'tv': return <Tv className="w-5 h-5" />;
            case 'phone': return <Phone className="w-5 h-5" />;
            default: return <Signal className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between z-10">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">회선 관리</h1>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Plus className="w-5 h-5 text-gray-600" />
                </button>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                    <p className="text-sm text-gray-500 mb-1">총 이용 회선</p>
                    <p className="text-3xl font-bold text-gray-900">{lines.length}개</p>
                    <div className="flex gap-4 mt-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Smartphone className="w-4 h-4" />
                            <span className="text-sm">모바일 2</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Wifi className="w-4 h-4" />
                            <span className="text-sm">인터넷 1</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Tv className="w-4 h-4" />
                            <span className="text-sm">TV 1</span>
                        </div>
                    </div>
                </motion.div>

                {/* Lines List */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">내 회선</h3>
                    </div>

                    {lines.map((line, index) => (
                        <button
                            key={line.id}
                            className={`w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 ${index < lines.length - 1 ? 'border-b border-gray-50' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${line.type === 'mobile' ? 'bg-blue-50 text-blue-500' :
                                    line.type === 'internet' ? 'bg-green-50 text-green-500' :
                                        'bg-purple-50 text-purple-500'
                                    }`}>
                                    {getIcon(line.type)}
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-gray-900">{line.name}</p>
                                        {line.isPrimary && (
                                            <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">
                                                대표
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">{line.number}</p>
                                    <p className="text-xs text-gray-400">{line.plan}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                                    이용 중
                                </span>
                                <MoreVertical className="w-5 h-5 text-gray-300" />
                            </div>
                        </button>
                    ))}
                </motion.div>

                {/* Add Line */}
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full bg-white rounded-2xl p-5 shadow-sm flex items-center justify-center gap-2 text-blue-600 font-medium hover:bg-blue-50"
                >
                    <Plus className="w-5 h-5" />
                    <span>회선 추가하기</span>
                </motion.button>
            </main>
        </div>
    );
};

export default LinesPage;
