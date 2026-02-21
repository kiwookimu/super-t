import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, Sparkles, ShoppingBag, Gift, Smartphone, CreditCard, Tag, Star, Ticket, Users } from 'lucide-react';

/**
 * 홈 화면 모드 선택 페이지
 * 3가지 관심사 중 하나를 선택하면 홈 화면 구성이 변경됨
 */

export type HomeMode = 'manage' | 'discover' | 'benefits';

interface HomeModeSelectProps {
    currentMode: HomeMode;
    onSelect: (mode: HomeMode) => void;
    onBack: () => void;
}

const HomeModeSelect: React.FC<HomeModeSelectProps> = ({ currentMode, onSelect, onBack }) => {
    const [selectedMode, setSelectedMode] = useState<HomeMode>(currentMode);

    const modes: { id: HomeMode; title: string; description: string; preview: React.ReactNode }[] = [
        {
            id: 'manage',
            title: '이용중인 상품/서비스 관리',
            description: '현재 사용 중인 요금제, 부가서비스, 데이터 사용량을 한눈에',
            preview: (
                <div className="space-y-2">
                    <PreviewCard icon={<Smartphone className="w-4 h-4" />} title="내 요금제" sub="슈퍼 5G 프라임" />
                    <PreviewCard icon={<CreditCard className="w-4 h-4" />} title="이번 달 요금" sub="59,000원" />
                    <PreviewCard icon={<Tag className="w-4 h-4" />} title="데이터 사용량" sub="12.5GB / 100GB" />
                </div>
            ),
        },
        {
            id: 'discover',
            title: '새로운 상품/서비스 발견',
            description: '맞춤 추천 요금제, 신규 서비스, 할인 상품 탐색',
            preview: (
                <div className="space-y-2">
                    <PreviewCard icon={<Sparkles className="w-4 h-4" />} title="맞춤 추천" sub="나에게 딱 맞는 요금제" />
                    <PreviewCard icon={<ShoppingBag className="w-4 h-4" />} title="신규 상품" sub="갤럭시 Z 시리즈" />
                    <PreviewCard icon={<Star className="w-4 h-4" />} title="인기 서비스" sub="TOP 10 부가서비스" />
                </div>
            ),
        },
        {
            id: 'benefits',
            title: '멤버십 혜택 이용',
            description: '쿠폰, 멤버십 할인, 포인트 적립 등 혜택 중심',
            preview: (
                <div className="space-y-2">
                    <PreviewCard icon={<Ticket className="w-4 h-4" />} title="사용 가능 쿠폰" sub="5장" />
                    <PreviewCard icon={<Gift className="w-4 h-4" />} title="이달의 혜택" sub="스타벅스 50% 할인" />
                    <PreviewCard icon={<Users className="w-4 h-4" />} title="멤버십 등급" sub="VIP · 3,200P" />
                </div>
            ),
        },
    ];

    const handleConfirm = () => {
        onSelect(selectedMode);
        onBack();
    };

    return (
        <div className="pb-28 px-5">
            {/* Header */}
            <header className="flex items-center gap-3 py-4">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">홈 화면 설정</h1>
            </header>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-6">
                관심사를 선택하면 홈 화면이 맞춤 구성됩니다.
            </p>

            {/* Mode Options */}
            <div className="space-y-4">
                {modes.map((mode) => (
                    <motion.button
                        key={mode.id}
                        onClick={() => setSelectedMode(mode.id)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-colors ${selectedMode === mode.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white'
                            }`}
                        whileTap={{ scale: 0.99 }}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">{mode.title}</h3>
                                <p className="text-xs text-gray-500">{mode.description}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedMode === mode.id ? 'bg-blue-500' : 'bg-gray-200'
                                }`}>
                                {selectedMode === mode.id && <Check className="w-4 h-4 text-white" />}
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="bg-gray-50 rounded-xl p-3 mt-3">
                            <p className="text-[10px] text-gray-400 mb-2 font-medium">미리보기</p>
                            {mode.preview}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Confirm Button */}
            <div className="fixed bottom-24 left-0 right-0 px-4">
                <motion.button
                    onClick={handleConfirm}
                    className="w-full max-w-md mx-auto block py-4 bg-blue-500 text-white font-semibold rounded-xl shadow-lg"
                    whileTap={{ scale: 0.98 }}
                >
                    적용하기
                </motion.button>
            </div>
        </div>
    );
};

// Preview Card Component
const PreviewCard: React.FC<{ icon: React.ReactNode; title: string; sub: string }> = ({ icon, title, sub }) => (
    <div className="flex items-center gap-2 bg-white rounded-lg p-2">
        <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-gray-500">
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400">{title}</p>
            <p className="text-xs font-medium text-gray-700 truncate">{sub}</p>
        </div>
    </div>
);

export default HomeModeSelect;
