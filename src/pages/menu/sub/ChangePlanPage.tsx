import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, Wifi, Phone, MessageSquare, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '../../../components/tds';
import { mockStore, ALL_PLANS } from '../../../data/mockStore';
import type { Plan } from '../../../data/mockStore';

interface ChangePlanPageProps {
    onBack: () => void;
}

type Step = 'select' | 'confirm' | 'success';

const ChangePlanPage: React.FC<ChangePlanPageProps> = ({ onBack }) => {
    const [step, setStep] = useState<Step>('select');
    const [selectedPlanId, setSelectedPlanId] = useState<string>('');
    const [currentPlan] = useState<Plan>(mockStore.getCurrentPlan());

    useEffect(() => {
        setSelectedPlanId(currentPlan.id);
    }, [currentPlan]);

    const plans = Object.values(ALL_PLANS) as Plan[];
    const selectedPlan = ALL_PLANS[selectedPlanId];

    const handlePlanChange = () => {
        setStep('confirm');
    };

    const handleConfirm = () => {
        mockStore.updatePlan(selectedPlanId);
        setStep('success');
    };

    const handleFinish = () => {
        onBack();
    };

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-white">
                <main className="px-5 pt-20 flex flex-col items-center text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 15 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
                    >
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">요금제 변경 완료!</h2>
                        <p className="text-gray-500">
                            성공적으로 요금제가 변경되었습니다.<br />
                            변경 사항은 다음 결제일부터 적용됩니다.
                        </p>
                    </div>

                    <div className="w-full bg-gray-50 rounded-2xl p-6 space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">변경 전</span>
                            <span className="text-gray-900 line-through">{currentPlan.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm">변경 후</span>
                            <span className="text-lg font-bold text-blue-600">{selectedPlan?.name}</span>
                        </div>
                        <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                            <span className="text-gray-500 text-sm">월 납부액</span>
                            <span className="text-lg font-bold text-gray-900">₩{selectedPlan?.price.toLocaleString()}/월</span>
                        </div>
                    </div>

                    <Button
                        size="large"
                        variant="fill"
                        onClick={handleFinish}
                        className="w-full mt-8"
                    >
                        확인
                    </Button>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">요금제 변경</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Current Plan Note */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 rounded-2xl p-4"
                >
                    <p className="text-sm text-blue-700">
                        현재 요금제: <span className="font-bold">{currentPlan.name}</span>
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                        변경 시 다음 결제일부터 적용됩니다
                    </p>
                </motion.div>

                {/* Plan Cards */}
                {plans.map((plan: Plan, index: number) => (
                    <motion.button
                        key={plan.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`w-full text-left relative rounded-2xl p-5 transition-all ${selectedPlanId === plan.id
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-white shadow-sm'
                            }`}
                    >
                        {/* Status Badge */}
                        {plan.id === currentPlan.id && (
                            <span className={`absolute -top-2 left-4 px-2 py-0.5 rounded-full text-[10px] font-bold ${selectedPlanId === plan.id ? 'bg-amber-400 text-amber-900' : 'bg-amber-100 text-amber-600'
                                }`}>
                                현재 이용 중
                            </span>
                        )}

                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold">{plan.name}</h3>
                                <p className={`text-2xl font-bold mt-1 ${selectedPlanId === plan.id ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    ₩{plan.price.toLocaleString()}
                                    <span className={`text-sm font-normal ${selectedPlanId === plan.id ? 'text-white/70' : 'text-gray-500'
                                        }`}>/월</span>
                                </p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlanId === plan.id
                                ? 'border-white bg-white'
                                : 'border-gray-300'
                                }`}>
                                {selectedPlanId === plan.id && <Check className="w-4 h-4 text-blue-600" />}
                            </div>
                        </div>

                        {/* Specs */}
                        <div className="flex gap-4 mb-3">
                            <div className="flex items-center gap-1">
                                <Wifi className={`w-4 h-4 ${selectedPlanId === plan.id ? 'text-white/70' : 'text-gray-400'}`} />
                                <span className={`text-sm ${selectedPlanId === plan.id ? 'text-white/90' : 'text-gray-600'}`}>
                                    {plan.data}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Phone className={`w-4 h-4 ${selectedPlanId === plan.id ? 'text-white/70' : 'text-gray-400'}`} />
                                <span className={`text-sm ${selectedPlanId === plan.id ? 'text-white/90' : 'text-gray-600'}`}>
                                    {plan.voice}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageSquare className={`w-4 h-4 ${selectedPlanId === plan.id ? 'text-white/70' : 'text-gray-400'}`} />
                                <span className={`text-sm ${selectedPlanId === plan.id ? 'text-white/90' : 'text-gray-600'}`}>
                                    {plan.sms}
                                </span>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                            {plan.features.map((feature: string) => (
                                <span
                                    key={feature}
                                    className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1 ${selectedPlanId === plan.id
                                        ? 'bg-white/20 text-white'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    <Sparkles className="w-3 h-3" />
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </motion.button>
                ))}
            </main>

            {/* Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 px-5 pt-4 pb-24 lg:pb-8 z-40">
                <Button
                    size="large"
                    variant="fill"
                    disabled={selectedPlanId === currentPlan.id}
                    onClick={handlePlanChange}
                    className="w-full shadow-lg"
                >
                    {selectedPlanId === currentPlan.id ? '이미 이용 중인 요금제입니다' : '요금제 변경하기'}
                </Button>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {step === 'confirm' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-5"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl w-full max-w-sm overflow-hidden"
                        >
                            <div className="p-6 text-center space-y-4">
                                <h3 className="text-xl font-bold text-gray-900">요금제를 변경하시겠습니까?</h3>
                                <div className="bg-gray-50 rounded-2xl p-4 space-y-3 text-left">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">대상이 되는 번호</span>
                                        <span className="font-medium text-gray-900">010-3882-7729</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">변경될 요금제</span>
                                        <span className="font-bold text-blue-600">{selectedPlan?.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">변경 후 월 납부액</span>
                                        <span className="font-bold text-gray-900">₩{selectedPlan?.price.toLocaleString()}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    변경 내용은 다음 정기 결제일부터 적용되며, 이번 달은 기존 요금제가 유지됩니다.
                                </p>
                            </div>
                            <div className="flex gap-3 p-4 border-t border-gray-100">
                                <div className="flex-1">
                                    <Button
                                        size="medium"
                                        variant="weak"
                                        onClick={() => setStep('select')}
                                        className="w-full"
                                    >
                                        취소
                                    </Button>
                                </div>
                                <div className="flex-1">
                                    <Button
                                        size="medium"
                                        variant="fill"
                                        onClick={handleConfirm}
                                        className="w-full"
                                    >
                                        확인
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChangePlanPage;
