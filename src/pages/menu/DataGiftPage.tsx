import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, Check, Wifi, Heart,
    MessageCircle, CheckCircle, X
} from 'lucide-react';

interface DataGiftPageProps {
    onBack: () => void;
}

type GiftStep = 'select' | 'verify' | 'complete';

const DataGiftPage: React.FC<DataGiftPageProps> = ({ onBack }) => {
    const [recipientPhone, setRecipientPhone] = useState('');
    const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
    const [giftStep, setGiftStep] = useState<GiftStep>('select');
    const [verificationCode, setVerificationCode] = useState('');
    const [countdown, setCountdown] = useState(180);

    const myData = {
        available: 87.5,
        total: 100,
    };

    const giftLimits = {
        monthlyMax: 3, // GB
        monthlyUsed: 1.5, // GB (already gifted this month)
        timesMax: 3,
        timesUsed: 2, // times gifted this month
    };

    const giftAmounts = [
        { id: '500mb', label: '500MB', value: 0.5 },
        { id: '1gb', label: '1GB', value: 1, popular: true },
        { id: '2gb', label: '2GB', value: 2 },
        { id: '5gb', label: '5GB', value: 5 },
    ];

    const recentGifts = [
        { id: '1', name: '엄마', phone: '010-1234-5678', amount: '1GB', amountId: '1gb', date: '2026.02.05', avatar: '👩' },
        { id: '2', name: '동생', phone: '010-3456-7890', amount: '500MB', amountId: '500mb', date: '2026.01.28', avatar: '👧' },
    ];

    const selectedAmountInfo = giftAmounts.find(a => a.id === selectedAmount);
    const isValidPhone = recipientPhone.length >= 13;
    const canGift = isValidPhone && selectedAmount;

    // Countdown timer
    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (giftStep === 'verify' && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [giftStep, countdown]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleGiftClick = () => {
        setGiftStep('verify');
        setCountdown(180);
    };

    const handleCodeChange = (value: string) => {
        const code = value.replace(/[^0-9]/g, '').slice(0, 4);
        setVerificationCode(code);
        // Auto-submit when 4 digits entered
        if (code.length === 4 && countdown > 0) {
            setTimeout(() => setGiftStep('complete'), 300);
        }
    };

    const handleResendCode = () => {
        setCountdown(180);
        setVerificationCode('');
    };

    const handleComplete = () => {
        // Reset state and go back to selection screen
        setGiftStep('select');
        setRecipientPhone('');
        setSelectedAmount(null);
        setVerificationCode('');
    };

    // Verification Modal
    const renderVerificationModal = () => (
        <AnimatePresence>
            {giftStep !== 'select' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
                >
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="w-full max-w-md bg-white rounded-t-3xl pb-20"
                    >
                        {giftStep === 'verify' && (
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-900">SMS 인증</h2>
                                    <button
                                        onClick={() => setGiftStep('select')}
                                        className="p-2 hover:bg-gray-100 rounded-full"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3">
                                        <MessageCircle className="w-10 h-10 text-blue-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">인증번호 전송 완료</p>
                                            <p className="font-bold text-gray-900">{recipientPhone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">인증번호 4자리</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            maxLength={4}
                                            value={verificationCode}
                                            onChange={(e) => handleCodeChange(e.target.value)}
                                            placeholder="0000"
                                            className="w-full text-center text-2xl font-bold tracking-[0.5em] py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                                        />
                                        <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium ${countdown < 30 ? 'text-red-500' : 'text-gray-500'}`}>
                                            {formatTime(countdown)}
                                        </span>
                                    </div>
                                    {countdown === 0 && (
                                        <p className="text-sm text-red-500">인증 시간이 만료되었습니다</p>
                                    )}
                                </div>

                                <div className="text-center">
                                    <button
                                        onClick={handleResendCode}
                                        className="text-sm text-gray-500 hover:text-blue-500"
                                    >
                                        인증번호 재전송
                                    </button>
                                </div>
                            </div>
                        )}

                        {giftStep === 'complete' && (
                            <div className="p-6 space-y-6 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', damping: 15 }}
                                    className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"
                                >
                                    <CheckCircle className="w-10 h-10 text-green-500" />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">선물 완료! 🎉</h2>
                                    <p className="text-gray-500">
                                        {recipientPhone}님에게<br />
                                        <span className="font-bold text-blue-500">{selectedAmountInfo?.label}</span> 데이터를 선물했습니다
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="bg-gray-50 rounded-xl p-4 space-y-2 text-left"
                                >
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">전화번호</span>
                                        <span className="font-medium text-gray-900">{recipientPhone}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">선물 데이터</span>
                                        <span className="font-bold text-blue-500">{selectedAmountInfo?.label}</span>
                                    </div>
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 }}
                                    onClick={handleComplete}
                                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold"
                                >
                                    확인
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">데이터 선물하기</h1>
            </header>

            <main className="px-5 pt-6 space-y-5">
                {/* Gift Limits */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                    {/* Data Usage - First */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Wifi className="w-5 h-5 text-blue-500" />
                                <span className="text-sm font-medium text-gray-700">내 데이터</span>
                            </div>
                            <span className="text-sm text-gray-500">{myData.total}GB 중</span>
                        </div>
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-2xl font-bold text-gray-900">{myData.available}</span>
                            <span className="text-lg text-gray-500">GB 남음</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                                style={{ width: `${(myData.available / myData.total) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Gift Limits - Second */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-500 mb-1">이번 달 선물 가능 횟수</p>
                            <p className="text-lg font-bold text-gray-900">
                                <span className="text-blue-500">{giftLimits.timesMax - giftLimits.timesUsed}회</span>
                                <span className="text-sm font-normal text-gray-400"> / {giftLimits.timesMax}회</span>
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-500 mb-1">이번 달 선물 가능 용량</p>
                            <p className="text-lg font-bold text-gray-900">
                                <span className="text-blue-500">{giftLimits.monthlyMax - giftLimits.monthlyUsed}GB</span>
                                <span className="text-sm font-normal text-gray-400"> / {giftLimits.monthlyMax}GB</span>
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500">
                        💡 한 달 최대 {giftLimits.timesMax}회, {giftLimits.monthlyMax}GB까지 선물할 수 있어요
                    </p>
                </motion.div>

                {/* Recent Gift History */}
                {recentGifts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="space-y-3"
                    >
                        <h3 className="font-bold text-gray-900 px-1">최근 선물 내역</h3>
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                            {recentGifts.map((gift, index) => (
                                <div
                                    key={gift.id}
                                    className={`p-4 ${index !== recentGifts.length - 1 ? 'border-b border-gray-100' : ''}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center text-xl">
                                                {gift.avatar}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{gift.name}</p>
                                                <p className="text-xs text-gray-500">{gift.date} · {gift.amount}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setRecipientPhone(gift.phone);
                                                setSelectedAmount(gift.amountId);
                                            }}
                                            className="text-sm text-blue-500 font-medium hover:text-blue-600 whitespace-nowrap"
                                        >
                                            한번 더 선물하기
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Select Recipient */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                >
                    <h3 className="font-bold text-gray-900 px-1">받는 분 전화번호</h3>

                    {/* Phone Input */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <input
                            type="tel"
                            placeholder="010-0000-0000"
                            value={recipientPhone}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9-]/g, '');
                                setRecipientPhone(value);
                            }}
                            className="w-full text-lg py-2 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                        {recipientPhone.length > 0 && recipientPhone.length < 13 && (
                            <p className="text-xs text-gray-400 mt-2">예: 010-1234-5678</p>
                        )}
                        {recipientPhone.length >= 13 && (
                            <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
                                <Check className="w-3 h-3" /> 전화번호 형식 확인
                            </p>
                        )}
                    </div>

                    {/* Contact List */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                        {[
                            { id: '1', name: '엄마', phone: '010-1234-5678', avatar: '👩', isFavorite: true },
                            { id: '2', name: '아빠', phone: '010-2345-6789', avatar: '👨', isFavorite: true },
                            { id: '3', name: '동생', phone: '010-3456-7890', avatar: '👧', isFavorite: false },
                        ].map((contact, index, arr) => (
                            <button
                                key={contact.id}
                                onClick={() => setRecipientPhone(contact.phone)}
                                className={`w-full flex items-center justify-between p-4 ${index !== arr.length - 1 ? 'border-b border-gray-100' : ''
                                    } ${recipientPhone === contact.phone ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center text-2xl">
                                        {contact.avatar}
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-gray-900">{contact.name}</p>
                                            {contact.isFavorite && (
                                                <span className="text-amber-400">⭐</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">{contact.phone}</p>
                                    </div>
                                </div>
                                {recipientPhone === contact.phone ? (
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                ) : (
                                    <span className="text-gray-300">›</span>
                                )}
                            </button>
                        ))}

                        {/* Add from Address Book */}
                        <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 border-t border-gray-100">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                                📒
                            </div>
                            <p className="font-medium text-gray-600">연락처에서 추가</p>
                        </button>
                    </div>
                </motion.div>

                {/* Select Amount */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                >
                    <h3 className="font-bold text-gray-900 px-1">선물할 데이터</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {giftAmounts.map((amount) => (
                            <button
                                key={amount.id}
                                onClick={() => setSelectedAmount(amount.id)}
                                className={`relative p-4 rounded-2xl border-2 transition-all ${selectedAmount === amount.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                            >
                                {amount.popular && (
                                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full">
                                        인기
                                    </span>
                                )}
                                <div className="flex items-center justify-center gap-2">
                                    <Wifi className={`w-5 h-5 ${selectedAmount === amount.id ? 'text-blue-500' : 'text-gray-400'}`} />
                                    <span className={`text-lg font-bold ${selectedAmount === amount.id ? 'text-blue-600' : 'text-gray-900'}`}>
                                        {amount.label}
                                    </span>
                                </div>
                                {selectedAmount === amount.id && (
                                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Gift Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4"
                >
                    <button
                        disabled={!canGift}
                        onClick={handleGiftClick}
                        className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${canGift
                            ? 'bg-blue-500 text-white active:scale-[0.99]'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <Heart className="w-5 h-5" />
                        {canGift ? '데이터 선물하기' : '받는 분과 데이터를 선택하세요'}
                    </button>
                </motion.div>

                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-gray-100 rounded-xl p-4"
                >
                    <p className="text-xs text-gray-500 leading-relaxed">
                        • 데이터 선물은 Super T 고객 간에만 가능합니다<br />
                        • 선물한 데이터는 당월 말까지 사용 가능합니다<br />
                        • 월 최대 5GB까지 선물할 수 있습니다
                    </p>
                </motion.div>
            </main>

            {/* Verification Modal */}
            {renderVerificationModal()}
        </div >
    );
};

export default DataGiftPage;
