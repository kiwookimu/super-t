import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard, Wallet, Building2, ChevronRight, Plus,
    Check, Shield, Calendar
} from 'lucide-react';

/**
 * PAY (결제) 요구사항 구현
 * - PAY-001: 결제수단 관리
 * - PAY-005: 자동결제 설정
 * - PAY-010: 결제 내역 조회
 * - PAY-015: 간편결제 등록
 */

interface PaymentMethod {
    id: string;
    type: 'card' | 'bank' | 'easy';
    name: string;
    number: string;
    isDefault: boolean;
    lastUsed?: string;
}

interface PaymentHistory {
    id: string;
    date: string;
    description: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    method: string;
}

const PaymentManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'methods' | 'history'>('methods');

    const paymentMethods: PaymentMethod[] = [
        { id: '1', type: 'card', name: '신한카드', number: '**** 1234', isDefault: true },
        { id: '2', type: 'bank', name: '국민은행', number: '**** 5678', isDefault: false },
        { id: '3', type: 'easy', name: '네이버페이', number: 'ki***@naver.com', isDefault: false, lastUsed: '2024.02.01' },
    ];

    const paymentHistory: PaymentHistory[] = [
        { id: '1', date: '2024.02.05', description: '2월 통신요금', amount: 59000, status: 'completed', method: '신한카드' },
        { id: '2', date: '2024.01.05', description: '1월 통신요금', amount: 62000, status: 'completed', method: '신한카드' },
        { id: '3', date: '2023.12.05', description: '12월 통신요금', amount: 58000, status: 'completed', method: '국민은행' },
    ];

    const typeIcons = {
        card: <CreditCard className="w-5 h-5" />,
        bank: <Building2 className="w-5 h-5" />,
        easy: <Wallet className="w-5 h-5" />,
    };

    const statusColors = {
        completed: 'text-green-600',
        pending: 'text-yellow-600',
        failed: 'text-red-600',
    };

    return (
        <div className="space-y-5 pb-28">
            {/* Header */}
            <header className="pt-2">
                <h1 className="text-xl font-bold text-gray-900">결제 관리</h1>
            </header>

            {/* Tabs */}
            <div className="flex gap-2">
                <button
                    onClick={() => setActiveTab('methods')}
                    className={`flex-1 py-3 rounded-xl font-medium ${activeTab === 'methods' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                >
                    결제수단
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 py-3 rounded-xl font-medium ${activeTab === 'history' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                >
                    결제내역
                </button>
            </div>

            {activeTab === 'methods' && (
                <>
                    {/* Auto Payment Status */}
                    <section className="toss-card p-5 bg-gradient-to-br from-blue-50 to-indigo-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900">자동결제 설정됨</p>
                                <p className="text-sm text-gray-500">매월 5일 신한카드로 결제</p>
                            </div>
                            <motion.button
                                className="px-3 py-1.5 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-200"
                                whileTap={{ scale: 0.95 }}
                            >
                                변경
                            </motion.button>
                        </div>
                    </section>

                    {/* Payment Methods List */}
                    <section className="space-y-2">
                        <h2 className="text-sm font-semibold text-gray-400 px-1">등록된 결제수단</h2>
                        <div className="toss-card divide-y divide-gray-100">
                            {paymentMethods.map(method => (
                                <motion.div
                                    key={method.id}
                                    className="flex items-center justify-between p-4 cursor-pointer"
                                    whileTap={{ backgroundColor: '#f8f9fa' }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                                            {typeIcons[method.type]}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-gray-900">{method.name}</p>
                                                {method.isDefault && (
                                                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">기본</span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500">{method.number}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-300" />
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Add Payment Method */}
                    <motion.button
                        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:border-gray-300 hover:text-gray-500"
                        whileTap={{ scale: 0.99 }}
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">결제수단 추가</span>
                    </motion.button>

                    {/* Security Notice */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 px-1">
                        <Shield className="w-4 h-4" />
                        <span>결제 정보는 암호화되어 안전하게 보관됩니다</span>
                    </div>
                </>
            )}

            {activeTab === 'history' && (
                <section className="toss-card divide-y divide-gray-100">
                    {paymentHistory.map(item => (
                        <motion.div
                            key={item.id}
                            className="flex items-center justify-between p-4"
                            whileTap={{ backgroundColor: '#f8f9fa' }}
                        >
                            <div>
                                <p className="font-medium text-gray-900">{item.description}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-gray-400">{item.date}</span>
                                    <span className="text-xs text-gray-300">•</span>
                                    <span className="text-xs text-gray-400">{item.method}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">{item.amount.toLocaleString()}원</p>
                                <p className={`text-xs ${statusColors[item.status]}`}>
                                    {item.status === 'completed' && '결제완료'}
                                    {item.status === 'pending' && '처리중'}
                                    {item.status === 'failed' && '실패'}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </section>
            )}
        </div>
    );
};

// ========================================
// PAY-020: Payment Checkout Component
// ========================================
export const PaymentCheckout: React.FC<{
    amount: number;
    description: string;
    onComplete?: () => void;
}> = ({ amount, description, onComplete }) => {
    const [selectedMethod, setSelectedMethod] = useState('card');

    const methods = [
        { id: 'card', label: '신용/체크카드', icon: <CreditCard className="w-5 h-5" /> },
        { id: 'bank', label: '계좌이체', icon: <Building2 className="w-5 h-5" /> },
        { id: 'easy', label: '간편결제', icon: <Wallet className="w-5 h-5" /> },
    ];

    return (
        <div className="space-y-5">
            <header className="pt-2">
                <h1 className="text-xl font-bold text-gray-900">결제하기</h1>
            </header>

            {/* Amount Summary */}
            <section className="toss-card p-5">
                <p className="text-sm text-gray-500">{description}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                    {amount.toLocaleString()}
                    <span className="text-lg font-normal text-gray-500">원</span>
                </p>
            </section>

            {/* Payment Method Selection */}
            <section className="space-y-2">
                <h2 className="text-sm font-semibold text-gray-400 px-1">결제수단 선택</h2>
                <div className="toss-card divide-y divide-gray-100">
                    {methods.map(method => (
                        <button
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className="w-full flex items-center justify-between p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-gray-400">{method.icon}</div>
                                <span className="font-medium text-gray-900">{method.label}</span>
                            </div>
                            {selectedMethod === method.id ? (
                                <Check className="w-5 h-5 text-blue-500" />
                            ) : (
                                <div className="w-5 h-5 border-2 border-gray-200 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Pay Button */}
            <motion.button
                onClick={onComplete}
                className="w-full py-4 bg-blue-500 text-white font-bold rounded-xl"
                whileTap={{ scale: 0.98 }}
            >
                {amount.toLocaleString()}원 결제하기
            </motion.button>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>SSL 암호화로 안전하게 결제됩니다</span>
            </div>
        </div>
    );
};

export default PaymentManagement;
