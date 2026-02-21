import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Check, X, Calendar, Filter,
    CreditCard, Download
} from 'lucide-react';

interface PaymentHistoryPageProps {
    onBack: () => void;
}

const PaymentHistoryPage: React.FC<PaymentHistoryPageProps> = ({ onBack }) => {
    const payments = [
        { id: '1', date: '2026.01.25', amount: 118500, method: '신한카드 ****1234', status: 'success' },
        { id: '2', date: '2025.12.25', amount: 115200, method: '신한카드 ****1234', status: 'success' },
        { id: '3', date: '2025.11.25', amount: 112800, method: '신한카드 ****1234', status: 'success' },
        { id: '4', date: '2025.10.25', amount: 89000, method: '국민카드 ****5678', status: 'success' },
        { id: '5', date: '2025.09.25', amount: 89000, method: '국민카드 ****5678', status: 'failed' },
    ];

    const totalPaid = payments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between z-10">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">결제 내역</h1>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Filter className="w-5 h-5 text-gray-600" />
                </button>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white"
                >
                    <p className="text-sm opacity-80 mb-1">최근 6개월 총 결제 금액</p>
                    <p className="text-3xl font-bold">{totalPaid.toLocaleString()}원</p>
                    <div className="flex items-center gap-2 mt-4">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm opacity-80">2025.09 - 2026.02</span>
                    </div>
                </motion.div>

                {/* Payment List */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">결제 내역</h3>
                        <button className="text-sm text-blue-600 font-medium flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            내보내기
                        </button>
                    </div>

                    {payments.map((payment, index) => (
                        <div
                            key={payment.id}
                            className={`flex items-center justify-between px-5 py-4 ${index < payments.length - 1 ? 'border-b border-gray-50' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${payment.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                                    }`}>
                                    {payment.status === 'success' ? (
                                        <Check className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <X className="w-5 h-5 text-red-500" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{payment.date}</p>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <CreditCard className="w-3 h-3" />
                                        <span>{payment.method}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-bold ${payment.status === 'success' ? 'text-gray-900' : 'text-red-500'
                                    }`}>
                                    {payment.amount.toLocaleString()}원
                                </p>
                                <p className={`text-xs ${payment.status === 'success' ? 'text-green-600' : 'text-red-500'
                                    }`}>
                                    {payment.status === 'success' ? '결제 완료' : '결제 실패'}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
};

export default PaymentHistoryPage;
