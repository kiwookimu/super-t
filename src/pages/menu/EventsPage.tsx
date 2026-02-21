import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Gift, Calendar, ChevronRight, Sparkles, Star, Ticket
} from 'lucide-react';

interface EventsPageProps {
    onBack: () => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ onBack }) => {
    const featuredEvent = {
        id: 'featured',
        title: '슈퍼챗 런칭 기념 이벤트',
        subtitle: '가입만 해도 10,000P 적립!',
        period: '2026.02.01 ~ 2026.02.28',
        gradient: 'from-purple-500 to-blue-500',
    };

    const events = [
        {
            id: '1',
            title: '친구 초대하면 3만원 할인',
            category: '추천',
            period: '상시',
            badge: 'HOT',
            badgeColor: 'bg-red-500',
        },
        {
            id: '2',
            title: '첫 결제 시 5,000P 적립',
            category: '신규가입',
            period: '2026.02.28까지',
            badge: 'NEW',
            badgeColor: 'bg-blue-500',
        },
        {
            id: '3',
            title: 'VIP 전용 더블 포인트',
            category: '멤버십',
            period: '2026.03.31까지',
            badge: 'VIP',
            badgeColor: 'bg-amber-500',
        },
        {
            id: '4',
            title: '영화 무제한 할인권 증정',
            category: '혜택',
            period: '2026.02.15까지',
            badge: '',
            badgeColor: '',
        },
        {
            id: '5',
            title: '데이터 무제한 체험 이벤트',
            category: '요금제',
            period: '2026.02.20까지',
            badge: '',
            badgeColor: '',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">이벤트</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Featured Event Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-gradient-to-br ${featuredEvent.gradient} rounded-2xl p-6 text-white relative overflow-hidden`}
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="relative">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5" />
                            <span className="text-sm font-medium opacity-90">FEATURED</span>
                        </div>
                        <h2 className="text-xl font-bold mb-1">{featuredEvent.title}</h2>
                        <p className="text-lg opacity-90">{featuredEvent.subtitle}</p>
                        <div className="flex items-center gap-2 mt-4 text-sm opacity-80">
                            <Calendar className="w-4 h-4" />
                            <span>{featuredEvent.period}</span>
                        </div>
                        <button className="mt-4 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm">
                            참여하기 →
                        </button>
                    </div>
                </motion.div>

                {/* Event Categories */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-2 overflow-x-auto no-scrollbar py-1"
                >
                    {['전체', '추천', '신규가입', '멤버십', '혜택', '요금제'].map((cat, index) => (
                        <button
                            key={cat}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${index === 0
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white text-gray-600 border border-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Event List */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="space-y-3"
                >
                    {events.map((event, index) => (
                        <motion.button
                            key={event.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="w-full bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between hover:bg-gray-50"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
                                    {event.category === '추천' && <Star className="w-6 h-6 text-amber-500" />}
                                    {event.category === '신규가입' && <Gift className="w-6 h-6 text-blue-500" />}
                                    {event.category === '멤버십' && <Ticket className="w-6 h-6 text-purple-500" />}
                                    {event.category === '혜택' && <Gift className="w-6 h-6 text-blue-500" />}
                                    {event.category === '요금제' && <Sparkles className="w-6 h-6 text-green-500" />}
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-gray-900">{event.title}</p>
                                        {event.badge && (
                                            <span className={`px-1.5 py-0.5 ${event.badgeColor} text-white text-[10px] font-bold rounded`}>
                                                {event.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">{event.period}</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300" />
                        </motion.button>
                    ))}
                </motion.div>
            </main>
        </div>
    );
};

export default EventsPage;
