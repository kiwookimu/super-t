import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, CreditCard, Building2, Plus } from 'lucide-react';

interface AddPaymentMethodPageProps {
    onBack: () => void;
}

const AddPaymentMethodPage: React.FC<AddPaymentMethodPageProps> = ({ onBack }) => {
    const [type, setType] = useState<'card' | 'bank'>('card');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [selectedBank, setSelectedBank] = useState('');

    const banks = ['국민은행', '신한은행', '우리은행', '하나은행', '농협', 'SC제일은행', '카카오뱅크', '토스뱅크'];

    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        const groups = cleaned.match(/.{1,4}/g);
        return groups ? groups.join(' ').slice(0, 19) : '';
    };

    const formatExpiry = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
        }
        return cleaned;
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">결제수단 등록</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Type Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 gap-3"
                >
                    <button
                        onClick={() => setType('card')}
                        className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${type === 'card'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-600 shadow-sm'
                            }`}
                    >
                        <CreditCard className="w-8 h-8" />
                        <span className="font-medium">신용/체크카드</span>
                    </button>
                    <button
                        onClick={() => setType('bank')}
                        className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${type === 'bank'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-600 shadow-sm'
                            }`}
                    >
                        <Building2 className="w-8 h-8" />
                        <span className="font-medium">계좌이체</span>
                    </button>
                </motion.div>

                {/* Card Form */}
                {type === 'card' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-5 shadow-sm space-y-5"
                    >
                        <div>
                            <label className="text-sm text-gray-500 mb-2 block">카드 번호</label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                placeholder="0000 0000 0000 0000"
                                maxLength={19}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-500 mb-2 block">유효기간</label>
                                <input
                                    type="text"
                                    value={expiry}
                                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-500 mb-2 block">CVC</label>
                                <input
                                    type="password"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                    placeholder="***"
                                    maxLength={3}
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Bank Form */}
                {type === 'bank' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-5 shadow-sm space-y-5"
                    >
                        <div>
                            <label className="text-sm text-gray-500 mb-2 block">은행 선택</label>
                            <div className="grid grid-cols-4 gap-2">
                                {banks.map((bank) => (
                                    <button
                                        key={bank}
                                        onClick={() => setSelectedBank(bank)}
                                        className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${selectedBank === bank
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {bank}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-gray-500 mb-2 block">계좌 번호</label>
                            <input
                                type="text"
                                value={bankAccount}
                                onChange={(e) => setBankAccount(e.target.value.replace(/\D/g, ''))}
                                placeholder="계좌번호 입력 ('-' 없이)"
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                            />
                        </div>
                    </motion.div>
                )}

                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-blue-50 rounded-2xl p-4"
                >
                    <p className="text-xs text-blue-700 leading-relaxed">
                        • 등록된 결제수단은 자동납부에 사용됩니다<br />
                        • 카드 정보는 암호화되어 안전하게 저장됩니다
                    </p>
                </motion.div>
            </main>

            {/* Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4 pb-8">
                <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" />
                    결제수단 등록
                </button>
            </div>
        </div>
    );
};

export default AddPaymentMethodPage;
