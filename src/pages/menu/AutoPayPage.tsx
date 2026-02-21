import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, CreditCard, Building2, Plus,
    Check, ChevronRight, Trash2, Star
} from 'lucide-react';

interface AutoPayPageProps {
    onBack: () => void;
    onNavigate?: (page: string) => void;
}

const AutoPayPage: React.FC<AutoPayPageProps> = ({ onBack, onNavigate }) => {
    const [autoPayEnabled, setAutoPayEnabled] = useState(true);

    const paymentMethods = [
        { id: '1', type: 'card', name: '신한카드', number: '****-****-****-1234', isDefault: true },
        { id: '2', type: 'bank', name: '국민은행', number: '****-**-***456', isDefault: false },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">자동납부</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Auto Pay Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-5 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-gray-900">자동납부 설정</h3>
                            <p className="text-sm text-gray-500 mt-1">매월 25일 자동으로 결제됩니다</p>
                        </div>
                        <button
                            onClick={() => setAutoPayEnabled(!autoPayEnabled)}
                            className={`w-14 h-8 rounded-full transition-colors ${autoPayEnabled ? 'bg-blue-500' : 'bg-gray-200'
                                }`}
                        >
                            <motion.div
                                className="w-6 h-6 bg-white rounded-full shadow-sm"
                                animate={{ x: autoPayEnabled ? 30 : 4 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        </button>
                    </div>

                    {autoPayEnabled && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 pt-4 border-t border-gray-100"
                        >
                            <div className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-green-500" />
                                <span className="text-sm text-green-600 font-medium">자동납부가 활성화되어 있습니다</span>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Payment Methods */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">등록된 결제수단</h3>
                    </div>

                    {paymentMethods.map((method, index) => (
                        <div
                            key={method.id}
                            className={`flex items-center justify-between px-5 py-4 ${index < paymentMethods.length - 1 ? 'border-b border-gray-50' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.type === 'card' ? 'bg-blue-50' : 'bg-green-50'
                                    }`}>
                                    {method.type === 'card' ? (
                                        <CreditCard className="w-6 h-6 text-blue-500" />
                                    ) : (
                                        <Building2 className="w-6 h-6 text-green-500" />
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-gray-900">{method.name}</p>
                                        {method.isDefault && (
                                            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded flex items-center gap-0.5">
                                                <Star className="w-2.5 h-2.5" />
                                                기본
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">{method.number}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-red-50 rounded-full">
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                </button>
                                <ChevronRight className="w-5 h-5 text-gray-300" />
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Add Payment Method */}
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full bg-white rounded-2xl p-5 shadow-sm flex items-center justify-center gap-2 text-blue-600 font-medium hover:bg-blue-50"
                    onClick={() => onNavigate?.('/payment/auto/add')}
                >
                    <Plus className="w-5 h-5" />
                    <span>결제수단 추가하기</span>
                </motion.button>
            </main>
        </div>
    );
};

export default AutoPayPage;
