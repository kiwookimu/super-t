import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Smartphone, Wifi, Tv, Phone, ChevronDown,
    Plus, RefreshCw, Send, Plane, Users, CreditCard, Settings,
    AlertCircle, CheckCircle, Sparkles, Play
} from 'lucide-react';

/**
 * SVC (서비스 관리) 요구사항 구현
 * - SVC-001: 내 서비스 홈 (회선/서비스 목록)
 * - SVC-046: 데이터 선물하기 퀵액션
 * - SVC-047: 데이터 리필/충전 퀵액션
 * - SVC-048: 로밍 상품 관리
 * - SVC-035: 가족/결합 그룹 관리
 * - SVC-056: 미납요금 조회
 */

interface MyTProps {
    onNavigate?: (page: string) => void;
}

type LineType = 'mobile' | 'internet' | 'tv' | 'phone' | 'subscription';

interface ServiceLine {
    id: string;
    type: LineType;
    name: string;
    number: string;
    plan: string;
    status: 'active' | 'suspended' | 'pending';
    dataUsage?: { used: number; total: number };
    subscriptionPeriod?: { usedDays: number; totalDays: number }; // Added for subscriptions
    monthlyFee: number;
    isPrimary?: boolean;
    nextBillingDate?: string; // For subscriptions
}

const MyT: React.FC<MyTProps> = ({ onNavigate }) => {
    const [activeFilter, setActiveFilter] = useState<LineType | 'all'>('all');
    const [expandedLine, setExpandedLine] = useState<string | null>(null);

    // Mock data - SVC-001: 회선/서비스 목록
    const serviceLines: ServiceLine[] = [
        {
            id: '1',
            type: 'mobile',
            name: '내 휴대폰',
            number: '010-1234-5678',
            plan: '슈퍼 5G 프라임',
            status: 'active',
            dataUsage: { used: 12.5, total: 100 },
            monthlyFee: 59000,
            isPrimary: true,
        },
        {
            id: 'sub1',
            type: 'subscription',
            name: 'Netflix',
            number: '광고 없는 영화/시리즈',
            plan: '프리미엄 요금제',
            status: 'active',
            monthlyFee: 9500,
            nextBillingDate: '2월 14일',
            subscriptionPeriod: { usedDays: 22, totalDays: 30 },
        },
        {
            id: 'sub2',
            type: 'subscription',
            name: 'YouTube Premium',
            number: '광고 제거 및 오프라인 저장',
            plan: '개인용',
            status: 'active',
            monthlyFee: 10450,
            nextBillingDate: '2월 21일',
            subscriptionPeriod: { usedDays: 15, totalDays: 31 },
        },
        {
            id: '2',
            type: 'mobile',
            name: '가족 회선',
            number: '010-9876-5432',
            plan: '5G 베이직',
            status: 'active',
            dataUsage: { used: 8.2, total: 50 },
            monthlyFee: 45000,
        },
        {
            id: '3',
            type: 'internet',
            name: '우리집 인터넷',
            number: '서울 강남구',
            plan: '기가 인터넷 500M',
            status: 'active',
            monthlyFee: 33000,
        },
        {
            id: '4',
            type: 'tv',
            name: 'TV',
            number: '서울 강남구',
            plan: 'IPTV 베이직',
            status: 'active',
            monthlyFee: 15000,
        },
    ];

    const filteredLines = activeFilter === 'all'
        ? serviceLines
        : serviceLines.filter(l => l.type === activeFilter);

    // Add subscription fees to total calculation properly
    const totalMonthlyFee = serviceLines.reduce((sum, l) => sum + l.monthlyFee, 0);

    const filterOptions: { id: LineType | 'all'; label: string; icon: React.ReactNode }[] = [
        { id: 'all', label: '전체', icon: null },
        { id: 'subscription', label: '구독', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'mobile', label: '모바일', icon: <Smartphone className="w-4 h-4" /> },
        { id: 'internet', label: '인터넷', icon: <Wifi className="w-4 h-4" /> },
        { id: 'tv', label: 'TV', icon: <Tv className="w-4 h-4" /> },
    ];

    return (
        <div className="space-y-5 pb-24 px-5 py-2 max-w-md md:max-w-full xl:max-w-7xl mx-auto transition-all duration-300">
            {/* Header */}
            <header className="flex justify-between items-center pt-2">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">마이 T</h1>
                    <p className="text-sm text-gray-500 mt-0.5">내 서비스를 한눈에</p>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <Settings className="w-5 h-5 text-gray-400" />
                </button>
            </header>

            <div className="flex flex-col xl:grid xl:grid-cols-12 xl:gap-6 space-y-5 md:space-y-0">
                {/* Right Column: Summary & Actions (First on Mobile) */}
                <div className="xl:col-span-4 space-y-5 order-first xl:order-last">
                    {/* Summary Card */}
                    <section className="relative overflow-hidden toss-card p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-100">
                        {/* Decorative background circle */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">이번 달 예상 요금</h2>
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">결합할인 반영</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-gray-900 tracking-tight">
                                    {totalMonthlyFee.toLocaleString()}
                                </span>
                                <span className="text-lg font-bold text-gray-400">원</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>가족결합 -15,000원</span>
                                </div>
                                <button className="text-xs font-bold text-blue-600 hover:underline">상세보기</button>
                            </div>
                        </div>
                    </section>

                    {/* Quick Actions (Grid on mobile, stacked/grid on desktop) */}
                    <div className="flex space-x-3 overflow-x-auto no-scrollbar py-1 -mx-1 px-1 md:grid md:grid-cols-2 md:space-x-0 md:gap-3 md:mx-0 md:px-0">
                        <QuickAction icon={<RefreshCw size={18} />} label="데이터 충전" />
                        <QuickAction icon={<Send size={18} />} label="데이터 선물" />
                        <QuickAction icon={<Plane size={18} />} label="로밍" />
                        <QuickAction icon={<Users size={18} />} label="가족 관리" />
                    </div>
                </div>

                {/* Left Column: Service Lines */}
                <div className="xl:col-span-8 space-y-5">
                    {/* SVC-056: 미납 안내 (있을 경우) */}
                    {/* <UnpaidBanner amount={59000} dueDate="2월 25일" /> */}

                    {/* Filter Options */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar md:flex-wrap">
                        {filterOptions.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setActiveFilter(opt.id)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeFilter === opt.id
                                    ? 'bg-gray-900 text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200'
                                    }`}
                            >
                                {opt.icon}
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    {/* Service Lines List */}
                    <section className="space-y-3">
                        {filteredLines.map((line) => (
                            <ServiceLineCard
                                key={line.id}
                                line={line}
                                isExpanded={expandedLine === line.id}
                                onToggle={() => setExpandedLine(expandedLine === line.id ? null : line.id)}
                                onNavigate={onNavigate}
                            />
                        ))}
                    </section>

                    {/* Add Line Button */}
                    <motion.button
                        className="w-full py-5 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:border-gray-300 hover:text-gray-600 hover:bg-gray-50/50 transition-colors"
                        whileTap={{ scale: 0.99 }}
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-semibold">상품/서비스 추가 등록</span>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

// ========================================
// Service Line Card Component
// ========================================
const ServiceLineCard: React.FC<{
    line: ServiceLine;
    isExpanded: boolean;
    onToggle: () => void;
    onNavigate?: (page: string) => void;
}> = ({ line, isExpanded, onToggle }) => {
    const typeIcons = {
        mobile: <Smartphone className="w-5 h-5" />,
        internet: <Wifi className="w-5 h-5" />,
        tv: <Tv className="w-5 h-5" />,
        phone: <Phone className="w-5 h-5" />,
        subscription: <Sparkles className="w-5 h-5" />,
    };

    // const statusColors = {
    //     active: 'bg-emerald-100 text-emerald-700',
    //     suspended: 'bg-rose-100 text-rose-700',
    //     pending: 'bg-amber-100 text-amber-700',
    // };

    // const statusLabels = {
    //     active: '이용 중',
    //     suspended: '정지',
    //     pending: '신청 중',
    // };

    const renderIcon = () => {
        if (line.type === 'subscription') {
            if (line.name === 'Netflix') {
                return (
                    <div className="w-full h-full bg-[#E50914] flex items-center justify-center">
                        <span className="text-white font-black text-xl italic">N</span>
                    </div>
                );
            }
            if (line.name === 'YouTube Premium') {
                return (
                    <div className="w-full h-full bg-[#FF0000] flex items-center justify-center">
                        <Play className="w-7 h-7 text-white fill-white" />
                    </div>
                );
            }
        }
        return typeIcons[line.type];
    };

    return (
        <motion.div className="toss-card overflow-hidden border border-transparent hover:border-gray-100 transition-colors" layout>
            {/* Main Row */}
            <button
                onClick={onToggle}
                className="w-full p-5 flex items-center gap-4 text-left group"
            >
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 ${line.type === 'mobile' ? 'bg-blue-50 text-blue-600' :
                    line.type === 'internet' ? 'bg-indigo-50 text-indigo-600' :
                        line.type === 'tv' ? 'bg-blue-50 text-blue-600' :
                            line.type === 'subscription' ? 'bg-purple-50 text-purple-600' :
                                'bg-gray-50 text-gray-600'
                    }`}>
                    {renderIcon()}
                </div>

                {/* Info Area */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-gray-900 text-base">{line.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-400 font-medium truncate">{line.number}</p>
                    </div>
                </div>

                {/* Action Area: Price + Chevron */}
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-lg font-black text-gray-900 tracking-tight">
                            {line.monthlyFee.toLocaleString()}
                            <span className="text-sm font-bold text-gray-400 ml-0.5">원</span>
                        </p>
                    </div>
                    <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                            }`}
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                </div>
            </button>

            {/* Expanded Details */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-gray-100"
                    >
                        <div className="p-5 space-y-4 bg-gray-50/30">
                            {/* Detailed Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">현재 이용 요금제</p>
                                    <p className="text-sm font-bold text-gray-900">{line.plan}</p>
                                </div>
                                {line.nextBillingDate && (
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">다음 결제 예정일</p>
                                        <p className="text-sm font-bold text-blue-600">{line.nextBillingDate}</p>
                                    </div>
                                )}
                            </div>

                            {/* Data Usage (Mobile only) */}
                            {line.dataUsage && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[11px] text-gray-400 font-bold uppercase">데이터 사용량</p>
                                        <span className="text-sm font-bold text-gray-900">
                                            {line.dataUsage.used}GB <span className="text-gray-300 font-medium mx-1">/</span> {line.dataUsage.total}GB
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-blue-500 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(line.dataUsage.used / line.dataUsage.total) * 100}%` }}
                                            transition={{ duration: 0.5, ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Subscription Period Graph (Subscription only) */}
                            {line.subscriptionPeriod && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[11px] text-gray-400 font-bold uppercase">남은 구독 기간</p>
                                        <span className="text-sm font-bold text-gray-900">
                                            {line.subscriptionPeriod.totalDays - line.subscriptionPeriod.usedDays}일 남음 <span className="text-gray-300 font-medium mx-1">/</span> 총 {line.subscriptionPeriod.totalDays}일
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-purple-500 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(line.subscriptionPeriod.usedDays / line.subscriptionPeriod.totalDays) * 100}%` }}
                                            transition={{ duration: 0.5, ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Quick Actions for this line */}
                            <div className="flex items-center justify-center gap-4 pt-3">
                                <ActionButton icon={<CreditCard size={15} />} label="요금 상세" />
                                <div className="w-px h-3 bg-gray-200" />
                                {line.type === 'subscription' ? (
                                    <>
                                        <ActionButton icon={<Settings size={15} />} label="상품 변경" />
                                        <div className="w-px h-3 bg-gray-200" />
                                        <ActionButton icon={<AlertCircle size={15} />} label="해지 신청" />
                                    </>
                                ) : (
                                    <ActionButton icon={<RefreshCw size={15} />} label="요금제 변경" />
                                )}
                                {line.type === 'mobile' && (
                                    <>
                                        <div className="w-px h-3 bg-gray-200" />
                                        <ActionButton icon={<Send size={15} />} label="데이터 선물" />
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// ========================================
// Sub Components
// ========================================
const QuickAction = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <button className="flex items-center space-x-2 px-4 py-2.5 bg-white rounded-full border border-gray-100 shadow-sm whitespace-nowrap active:scale-95 transition-transform">
        <span className="text-blue-500">{icon}</span>
        <span className="text-sm font-semibold text-gray-700">{label}</span>
    </button>
);

const ActionButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors active:opacity-60">
        <span className="text-gray-400">{icon}</span>
        {label}
    </button>
);

// SVC-056: Unpaid Bill Banner (exported for future use)
export const UnpaidBanner = ({ amount, dueDate }: { amount: number; dueDate: string }) => (
    <motion.div
        className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
        <div className="flex-1">
            <p className="font-semibold text-red-800">미납 요금 {amount.toLocaleString()}원</p>
            <p className="text-sm text-red-600">{dueDate}까지 납부해주세요</p>
        </div>
        <button className="px-3 py-1.5 bg-red-500 text-white text-sm font-semibold rounded-lg">
            납부하기
        </button>
    </motion.div>
);

export default MyT;
