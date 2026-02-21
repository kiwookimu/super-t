import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, ChevronRight, Smartphone, Layers, Plane, Headphones, Users, Star, Gift, Ticket, Settings, RefreshCw, Receipt, ShoppingBag, Sparkles, Tag, Percent, MessageCircle, ScanBarcode, Wifi, Mic } from 'lucide-react';
import { Button } from '../components/tds';
import BrandLogo from '../components/ui/BrandLogo';
import ChatOverlay from '../components/features/ChatOverlay';
import OnboardingBanner from '../components/features/OnboardingBanner';
import BannerCarousel from '../components/features/BannerCarousel';
import BarcodeExpansion from '../components/features/BarcodeExpansion';
import type { HomeMode } from './HomeModeSelect';
import { mockStore } from '../data/mockStore';

interface HomeProps {
    onNavigate: (page: string) => void;
    homeMode?: HomeMode;
}

// ... (Rest of code remains same until Home component)

const Home: React.FC<HomeProps> = ({ onNavigate, homeMode = 'manage' }) => {
    const [showChat, setShowChat] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [isBarcodeExpanded, setIsBarcodeExpanded] = useState(false);

    return (
        <div className="liquid-background min-h-screen pb-24">
            {/* Hero Banner Area - Full Bleed */}
            <div className="relative -mt-2">
                <BannerCarousel />
                {/* Header Overlay on Banner */}
                <header className="absolute top-0 left-0 right-0 flex justify-between items-center pt-4 px-5 h-14 z-30">
                    <div className="md:hidden">
                        <BrandLogo size="medium" variant="white" />
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setIsBarcodeExpanded(!isBarcodeExpanded)}
                            className={`p-2 rounded-full transition-colors ${isBarcodeExpanded ? 'bg-white/30 text-white' : 'hover:bg-white/20 text-white/90'}`}
                        >
                            <ScanBarcode className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onNavigate('search')}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <Search className="w-5 h-5 text-white/90" />
                        </button>
                        <button
                            onClick={() => onNavigate('notifications')}
                            className="relative p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <Bell className="w-5 h-5 text-white/90" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-sm" />
                        </button>
                    </div>
                </header>
            </div>

            <div className="space-y-4 px-5 pt-4 pb-2 max-w-md md:max-w-full xl:max-w-7xl mx-auto transition-all duration-300">
                {/* Inline Barcode Expansion */}
                <BarcodeExpansion isOpen={isBarcodeExpanded} onClose={() => setIsBarcodeExpanded(false)} />

                {/* INT-009: 전환 온보딩 배너 */}
                {showOnboarding && <OnboardingBanner onDismiss={() => setShowOnboarding(false)} />}

                {/* AI Concierge Banner */}
                <motion.div
                    className="glass-panel p-3 flex items-center justify-between cursor-pointer group !border-blue-600 !border-2 !shadow-[0_0_20px_rgba(59,130,246,0.4)] !rounded-full"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowChat(true)}
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">무엇이든 물어보세요</p>
                            <p className="text-xs text-gray-500 mt-0.5">T AI가 도와드려요</p>
                        </div>
                    </div>
                    <div className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                        <Mic className="w-5 h-5 text-blue-500" />
                    </div>
                </motion.div>

                {/* Quick Menu */}
                <section className="overflow-x-auto -mx-5 px-5 scrollbar-hide">
                    <div className="flex gap-2 min-w-max">
                        <QuickMenuItem icon={<Smartphone className="w-6 h-6" />} label="휴대폰" onClick={() => onNavigate('shop-phone')} />
                        <QuickMenuItem icon={<Layers className="w-6 h-6" />} label="구독" onClick={() => onNavigate('shop-subscription')} />
                        <QuickMenuItem icon={<Plane className="w-6 h-6" />} label="로밍" onClick={() => onNavigate('/subscription/roaming')} />
                        <QuickMenuItem icon={<Headphones className="w-6 h-6" />} label="고객센터" onClick={() => onNavigate('/support/faq')} />
                        <QuickMenuItem icon={<Tag className="w-6 h-6" />} label="요금제" onClick={() => onNavigate('/plans')} />
                        <QuickMenuItem icon={<Wifi className="w-6 h-6" />} label="인터넷" onClick={() => onNavigate('/internet')} />
                        <QuickMenuItem icon={<Sparkles className="w-6 h-6" />} label="부가서비스" onClick={() => onNavigate('/add-on')} />
                        <QuickMenuItem icon={<Ticket className="w-6 h-6" />} label="이벤트" onClick={() => onNavigate('/events')} />
                    </div>
                </section>

                {/* Mode-based Content */}
                {homeMode === 'manage' && <ManageSection onNavigate={onNavigate} />}
                {homeMode === 'discover' && <DiscoverSection onNavigate={onNavigate} />}
                {homeMode === 'benefits' && <BenefitsSection onNavigate={onNavigate} />}



                {/* Home Screen Settings */}
                <div className="flex justify-center py-6">
                    <button
                        onClick={() => onNavigate('home-settings')}
                        className="glass-button flex items-center gap-2 px-5 py-2.5 rounded-full"
                    >
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-600">홈 화면 설정</span>
                    </button>
                </div>

                {/* Chat Overlay */}
                {showChat && <ChatOverlay onClose={() => setShowChat(false)} />}
            </div>
        </div>
    );
};
const ManageSection: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
    const [currentPlan, setCurrentPlan] = useState(mockStore.getCurrentPlan());
    const dataUsage = mockStore.getState().dataUsage;

    useEffect(() => {
        const handleUpdate = () => {
            setCurrentPlan(mockStore.getCurrentPlan());
        };
        window.addEventListener('mockStorageUpdate', handleUpdate);
        return () => window.removeEventListener('mockStorageUpdate', handleUpdate);
    }, []);

    return (
        <div className="flex flex-col gap-4 xl:grid xl:grid-cols-12 xl:gap-6">
            {/* Left Column: Banner & Content */}
            <div className="xl:col-span-8 space-y-4">

                {/* Shop Highlights */}
                <section className="glass-panel p-5 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">추천 상품</span>
                        <Button
                            size="small"
                            variant="weak"
                            onClick={() => onNavigate('shop')}
                            className="bg-white/50 hover:bg-white/80 border-0"
                        >
                            더보기
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {[
                            { title: 'Galaxy S24', desc: 'AI 폰의 시작', tag: 'HOT', color: 'from-violet-500 to-purple-600', icon: Smartphone },
                            { title: 'Z Flip6', desc: '콤팩트한 혁신', tag: 'NEW', color: 'from-blue-400 to-cyan-500', icon: Smartphone },
                            { title: 'Watch7', desc: '더 스마트하게', tag: 'SALE', color: 'from-emerald-400 to-teal-500', icon: RefreshCw },
                            { title: 'Buds3 Pro', desc: '압도적 사운드', tag: 'BEST', color: 'from-orange-400 to-red-500', icon: Headphones },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="relative h-[200px] rounded-2xl overflow-hidden cursor-pointer shadow-sm group"
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onNavigate('/shop/recommended')}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                                <div className="absolute inset-0 backdrop-blur-3xl bg-white/30" />

                                <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/50 text-gray-700 backdrop-blur-md`}>
                                            {item.tag}
                                        </span>
                                        <div className="p-1.5 bg-white/40 rounded-lg backdrop-blur-sm">
                                            <item.icon className="w-4 h-4 text-gray-700" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 leading-tight">{item.title}</h4>
                                        <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right Column: Personal Info & Menu (First on Mobile) */}
            <div className="xl:col-span-4 space-y-4 order-first xl:order-none">
                {/* My Current Plan */}
                <section className="glass-panel p-5 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">내 요금제</span>
                        <Button
                            size="small"
                            variant="weak"
                            onClick={() => onNavigate('/subscription/plan/change')}
                            className="bg-white/50 hover:bg-white/80 border-0"
                        >
                            더보기
                        </Button>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                            <Wifi className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-base font-bold text-gray-900">{currentPlan.name}</p>
                            <p className="text-sm text-gray-600">
                                {currentPlan.data} 무제한 · {currentPlan.features[0]} 포함
                            </p>
                        </div>
                    </div>
                    <div className="bg-white/40 rounded-xl p-4 space-y-2 border border-white/20">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">데이터 사용량</span>
                            <span className="text-sm font-bold text-gray-900">
                                {dataUsage?.used} GB <span className="text-gray-500 font-normal">/ {dataUsage?.total} GB</span>
                            </span>
                        </div>
                        <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                style={{ width: `${(dataUsage?.used / dataUsage?.total) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200/50">
                        <button onClick={() => onNavigate('/data/recharge')} className="flex flex-col items-center justify-center py-2 rounded-lg hover:bg-black/5 transition-colors group">
                            <div className="p-2 rounded-full bg-blue-50 text-blue-600 mb-1 group-active:scale-95 transition-transform">
                                <RefreshCw size={18} />
                            </div>
                            <span className="text-xs font-semibold text-gray-600">데이터 충전</span>
                        </button>
                        <button onClick={() => onNavigate('/payment/bill')} className="flex flex-col items-center justify-center py-2 rounded-lg hover:bg-black/5 transition-colors group">
                            <div className="p-2 rounded-full bg-purple-50 text-purple-600 mb-1 group-active:scale-95 transition-transform">
                                <Receipt size={18} />
                            </div>
                            <span className="text-xs font-semibold text-gray-600">요금 조회</span>
                        </button>
                        <button onClick={() => onNavigate('/data/gift')} className="flex flex-col items-center justify-center py-2 rounded-lg hover:bg-black/5 transition-colors group">
                            <div className="p-2 rounded-full bg-pink-50 text-pink-600 mb-1 group-active:scale-95 transition-transform">
                                <Gift size={18} />
                            </div>
                            <span className="text-xs font-semibold text-gray-600">데이터 선물</span>
                        </button>
                    </div>
                </section>

                {/* My Benefits */}
                <section className="glass-panel p-5 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">내 혜택</span>
                        <Button
                            size="small"
                            variant="weak"
                            onClick={() => onNavigate('/benefits/membership')}
                            className="bg-white/50 hover:bg-white/80 border-0"
                        >
                            더보기
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/50 flex justify-between items-center">
                            <span className="text-sm text-gray-700">T 멤버십 VIP</span>
                            <button onClick={() => onNavigate('/benefits/monthly')} className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1">
                                누적 할인 2,100원
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/50 flex justify-between items-center">
                            <span className="text-sm text-gray-700">VIP Pick</span>
                            <button onClick={() => onNavigate('/benefits/vip-pick')} className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1">
                                2월 PICK 혜택 선택
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/50 flex justify-between items-center">
                            <span className="text-sm text-gray-700">T day</span>
                            <button onClick={() => onNavigate('/benefits/tday')} className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1">
                                2월 혜택 보기
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/50 flex justify-between items-center">
                            <span className="text-sm text-gray-700">넷플릭스 베이식</span>
                            <button onClick={() => onNavigate('/benefits/netflix')} className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1">
                                이용하기
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Frequently Visited */}
                <section className="glass-panel p-5 space-y-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-base font-bold text-gray-900">자주 찾는 화면</h3>
                        <Button
                            size="small"
                            variant="weak"
                            onClick={() => { }}
                            className="bg-white/50 hover:bg-white/80 border-0"
                        >
                            편집
                        </Button>
                    </div>

                    <div className="divide-y divide-gray-100/50 -mx-5 pt-1">
                        <button onClick={() => onNavigate('/apple-hub')} className="w-full flex items-center justify-between py-1.5 px-5 hover:bg-black/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <Smartphone className="w-6 h-6 text-blue-500" />
                                <span className="text-sm text-gray-700 font-medium">기기 할부 정보</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                        <button onClick={() => onNavigate('/my/loan')} className="w-full flex items-center justify-between py-1.5 px-5 hover:bg-black/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <Receipt className="w-6 h-6 text-blue-500" />
                                <span className="text-sm text-gray-700 font-medium">실시간 이용 요금</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                        <button onClick={() => onNavigate('/benefits/coupons')} className="w-full flex items-center justify-between py-1.5 px-5 hover:bg-black/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-6 h-6 flex items-center justify-center bg-blue-500 rounded-full text-white">
                                    <Percent className="w-3.5 h-3.5 font-bold" />
                                </div>
                                <span className="text-sm text-gray-700 font-medium">할인·적립 쿠폰</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </section>

                {/* 이벤트 카드 */}
                <section className="glass-panel p-5 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">이벤트</span>
                        <Button
                            size="small"
                            variant="weak"
                            onClick={() => onNavigate('/benefits/events')}
                            className="bg-white/50 hover:bg-white/80 border-0"
                        >
                            전체보기
                        </Button>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-4 border border-pink-100/50 cursor-pointer hover:shadow-md transition-all"
                            onClick={() => onNavigate('/benefits/events')}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md">
                                    <Ticket className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">2월 특별 이벤트</p>
                                    <p className="text-xs text-gray-500">참여하고 경품 받기</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <button onClick={(e) => { e.stopPropagation(); onNavigate('/benefits/events'); }} className="w-full bg-white/60 rounded-lg p-3 flex justify-between items-center hover:bg-white/80 transition-colors">
                                    <span className="text-sm text-gray-700">🎁 Galaxy S24 증정 이벤트</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); onNavigate('/benefits/events'); }} className="w-full bg-white/60 rounded-lg p-3 flex justify-between items-center hover:bg-white/80 transition-colors">
                                    <span className="text-sm text-gray-700">🎉 T멤버십 더블 적립</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 로밍 카드 */}
                <section className="glass-panel p-5 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">로밍</span>
                        <Button
                            size="small"
                            variant="weak"
                            onClick={() => onNavigate('/subscription/roaming')}
                            className="bg-white/50 hover:bg-white/80 border-0"
                        >
                            더보기
                        </Button>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
                            <Plane className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-base font-bold text-gray-900">해외에서도 편하게</p>
                            <p className="text-sm text-gray-600">나에게 맞는 로밍 상품 찾기</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <button onClick={() => onNavigate('/subscription/roaming')} className="w-full bg-blue-50/50 rounded-xl p-4 border border-blue-100/50 flex justify-between items-center hover:bg-blue-50 transition-colors">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-700">🌏 baro 로밍</span>
                                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full font-medium">인기</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button onClick={() => onNavigate('/subscription/roaming')} className="w-full bg-blue-50/50 rounded-xl p-4 border border-blue-100/50 flex justify-between items-center hover:bg-blue-50 transition-colors">
                            <span className="text-sm text-gray-700">✈️ T 로밍 onepass</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button onClick={() => onNavigate('/subscription/roaming')} className="w-full bg-blue-50/50 rounded-xl p-4 border border-blue-100/50 flex justify-between items-center hover:bg-blue-50 transition-colors">
                            <span className="text-sm text-gray-700">📱 로밍 요금 안심 설정</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </section>

                {/* 구독 카드 */}
                <section className="glass-panel p-5 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">구독</span>
                        <Button
                            size="small"
                            variant="weak"
                            onClick={() => onNavigate('shop-subscription')}
                            className="bg-white/50 hover:bg-white/80 border-0"
                        >
                            전체보기
                        </Button>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
                            <Layers className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-base font-bold text-gray-900">T 우주 패스</p>
                            <p className="text-sm text-gray-600">하나로 누리는 구독 혜택</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <button onClick={() => onNavigate('shop-subscription')} className="w-full bg-purple-50/50 rounded-xl p-4 border border-purple-100/50 flex justify-between items-center hover:bg-purple-50 transition-colors">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-700">🎬 T 우주 패스 life</span>
                                <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full font-medium">추천</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button onClick={() => onNavigate('shop-subscription')} className="w-full bg-purple-50/50 rounded-xl p-4 border border-purple-100/50 flex justify-between items-center hover:bg-purple-50 transition-colors">
                            <span className="text-sm text-gray-700">🎵 FLO 앤 데이터</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button onClick={() => onNavigate('shop-subscription')} className="w-full bg-purple-50/50 rounded-xl p-4 border border-purple-100/50 flex justify-between items-center hover:bg-purple-50 transition-colors">
                            <span className="text-sm text-gray-700">📺 Wavve 앤 데이터</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </section>

                {/* 이동전화 문제 해결 카드 */}
                <section className="glass-panel p-5 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">이동전화 도움</span>
                        <Button
                            size="small"
                            variant="weak"
                            onClick={() => onNavigate('/support/faq')}
                            className="bg-white/50 hover:bg-white/80 border-0"
                        >
                            더보기
                        </Button>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
                            <Headphones className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-base font-bold text-gray-900">빠르게 문제 해결</p>
                            <p className="text-sm text-gray-600">자주 묻는 질문과 상담</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <button onClick={() => onNavigate('/support/faq')} className="w-full bg-emerald-50/50 rounded-xl p-4 border border-emerald-100/50 flex justify-between items-center hover:bg-emerald-50 transition-colors">
                            <span className="text-sm text-gray-700">📶 통화 품질 / 데이터 문제</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button onClick={() => onNavigate('/support/faq')} className="w-full bg-emerald-50/50 rounded-xl p-4 border border-emerald-100/50 flex justify-between items-center hover:bg-emerald-50 transition-colors">
                            <span className="text-sm text-gray-700">🔧 기기 설정 / 초기화 가이드</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button onClick={() => onNavigate('/support/faq')} className="w-full bg-emerald-50/50 rounded-xl p-4 border border-emerald-100/50 flex justify-between items-center hover:bg-emerald-50 transition-colors">
                            <span className="text-sm text-gray-700">💳 요금·청구 관련 문의</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button onClick={() => onNavigate('/support/faq')} className="w-full bg-emerald-50/50 rounded-xl p-4 border border-emerald-100/50 flex justify-between items-center hover:bg-emerald-50 transition-colors">
                            <span className="text-sm text-gray-700">💬 1:1 상담 연결</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
};

// ========================================
// MODE 2: 새로운 상품/서비스 발견
// ========================================
const DiscoverSection: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => (
    <>
        {/* Quick Actions */}
        <div className="flex space-x-3 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
            <QuickAction icon={<Sparkles size={18} />} label="맞춤 추천" onClick={() => onNavigate('/shop/recommended')} />
            <QuickAction icon={<ShoppingBag size={18} />} label="신상품" onClick={() => onNavigate('/shop/new')} />
            <QuickAction icon={<Star size={18} />} label="인기 상품" onClick={() => onNavigate('/shop/popular')} />
            <QuickAction icon={<Tag size={18} />} label="할인 중" onClick={() => onNavigate('/shop/sale')} />
        </div>

        {/* Personalized Recommendation */}
        <section className="glass-panel p-5">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <h2 className="text-base font-bold text-gray-900">맞춤 추천</h2>
            </div>
            <motion.div
                className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl p-4 cursor-pointer border border-blue-100/30"
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('detail')}
            >
                <span className="inline-block px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-md mb-2 shadow-sm">BEST</span>
                <h3 className="text-lg font-bold text-gray-900">슈퍼 5G 프라임 플러스</h3>
                <p className="text-sm text-gray-600 mt-1">현재 요금제보다 월 12,000원 절약</p>
                <p className="text-sm font-semibold text-blue-600 mt-3">자세히 보기 →</p>
            </motion.div>
        </section>

        {/* New Products */}
        <section className="space-y-3">
            <h2 className="text-base font-bold text-gray-900 px-1 drop-shadow-sm">신규 상품</h2>
            <div className="grid grid-cols-2 gap-3">
                <ProductCard title="Galaxy Z Fold6" price="2,200,000원" tag="NEW" />
                <ProductCard title="Galaxy Watch7" price="450,000원" tag="인기" />
            </div>
        </section>
    </>
);

// ========================================
// MODE 3: 멤버십 혜택 이용
// ========================================
const BenefitsSection: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => (
    <>
        {/* Quick Actions */}
        <div className="flex space-x-3 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
            <QuickAction icon={<Ticket size={18} />} label="쿠폰함" onClick={() => onNavigate('/benefits/coupons')} />
            <QuickAction icon={<Gift size={18} />} label="이벤트" onClick={() => onNavigate('/benefits/events')} />
            <QuickAction icon={<Users size={18} />} label="멤버십" onClick={() => onNavigate('/benefits/membership')} />
            <QuickAction icon={<Star size={18} />} label="포인트" onClick={() => onNavigate('/benefits/points')} />
        </div>

        {/* Membership Status */}
        <section className="glass-panel p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-900">내 멤버십</h2>
                <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-sm">VIP</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-xl border border-orange-100/30">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                    <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-900">3,200 P</p>
                    <p className="text-sm text-gray-500">사용 가능 포인트</p>
                </div>
            </div>
        </section>

        {/* Available Coupons */}
        <section className="space-y-3">
            <div className="flex justify-between items-center px-1">
                <h2 className="text-base font-bold text-gray-900 drop-shadow-sm">사용 가능 쿠폰</h2>
                <span className="text-sm font-semibold text-blue-600">5장</span>
            </div>
            <div className="space-y-2">
                <CouponCard brand="스타벅스" discount="50%" expiry="2월 28일까지" />
                <CouponCard brand="CGV" discount="5,000원" expiry="3월 15일까지" />
                <CouponCard brand="배달의민족" discount="3,000원" expiry="2월 20일까지" />
            </div>
        </section>
    </>
);



// ========================================
// Sub Components
// ========================================
const QuickAction = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) => (
    <button
        className="glass-button flex items-center space-x-2 px-4 py-2.5 rounded-full whitespace-nowrap"
        onClick={onClick}
    >
        <span className="text-blue-600">{icon}</span>
        <span className="text-sm font-semibold text-gray-700">{label}</span>
    </button>
);

const QuickMenuItem = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) => (
    <div
        className="glass-panel p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer active:scale-95 transition-transform min-w-[80px]"
        style={{ background: 'rgba(255, 255, 255, 0.95)' }}
        onClick={onClick}
    >
        <span className="text-gray-600">{icon}</span>
        <span className="text-xs text-gray-700 font-medium">{label}</span>
    </div>
);

const ProductCard = ({ title, price, tag }: { title: string; price: string; tag: string }) => (
    <motion.div
        className="glass-panel p-4 cursor-pointer"
        whileTap={{ scale: 0.98 }}
    >
        <div className="w-full h-20 bg-white/40 rounded-lg mb-3 flex items-center justify-center border border-white/20">
            <Smartphone className="w-10 h-10 text-gray-400" />
        </div>
        <span className="inline-block px-2 py-0.5 bg-blue-100/80 text-blue-600 text-[10px] font-bold rounded mb-1">{tag}</span>
        <h4 className="text-sm font-semibold text-gray-900 truncate">{title}</h4>
        <p className="text-xs text-gray-500">{price}</p>
    </motion.div>
);

const CouponCard = ({ brand, discount, expiry }: { brand: string; discount: string; expiry: string }) => (
    <motion.div
        className="glass-panel p-4 flex items-center justify-between cursor-pointer"
        whileTap={{ scale: 0.99 }}
    >
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-md">
                <Ticket className="w-5 h-5 text-white" />
            </div>
            <div>
                <p className="font-semibold text-gray-900">{brand} <span className="text-blue-600">{discount}</span></p>
                <p className="text-xs text-gray-500">{expiry}</p>
            </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
    </motion.div>
);

export default Home;
