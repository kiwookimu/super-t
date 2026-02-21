import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, Search, HelpCircle } from 'lucide-react';

/**
 * INT-009: 전환 온보딩/변경 안내
 * 기존 사용자에게 "어디로 이동했는지/어떻게 바뀌었는지" 안내
 */

interface OnboardingBannerProps {
    onDismiss?: () => void;
}

const OnboardingBanner: React.FC<OnboardingBannerProps> = ({ onDismiss }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    if (!isVisible) return null;

    const handleDismiss = () => {
        setIsVisible(false);
        onDismiss?.();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleDismiss}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-sm bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-2xl overflow-hidden"
                    >
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

                        {/* Close button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20 shadow-sm">
                                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                                    새로워진 Super T
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                SK텔레콤을<br />하나로 모았습니다!
                            </h3>
                            <p className="text-white/80 mb-6 leading-relaxed">
                                T 월드, T 멤버십, T 다이렉트, T 우주가<br />
                                <span className="text-white font-semibold">Super T 앱 하나로 통합</span>되었습니다.
                            </p>

                            {/* Toggle details */}
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="w-full flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/15 transition-colors border border-white/10 group"
                            >
                                <span className="font-semibold text-white">어떻게 바뀌었나요?</span>
                                <ArrowRight className={`w-5 h-5 text-white transition-transform duration-300 ${showDetails ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                            </button>

                            {/* Details */}
                            <AnimatePresence>
                                {showDetails && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-2">
                                            <ChangeItem
                                                icon={<Search className="w-4 h-4" />}
                                                title="통합 검색"
                                                description="모든 서비스를 한 번에 검색하세요"
                                            />
                                            <ChangeItem
                                                icon={<HelpCircle className="w-4 h-4" />}
                                                title="AI 컨시어지"
                                                description="궁금한 점은 무엇이든 물어보세요"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const ChangeItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
}> = ({ icon, title, description }) => (
    <div className="flex items-center gap-3 p-2 bg-white/10 rounded-xl">
        <div className="p-2 bg-white/20 rounded-lg text-white">
            {icon}
        </div>
        <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="text-xs text-white/70">{description}</p>
        </div>
    </div>
);

export default OnboardingBanner;
