import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, Search, ChevronDown, ChevronUp,
    Smartphone, CreditCard, Wifi, Gift, HelpCircle
} from 'lucide-react';

interface FAQPageProps {
    onBack: () => void;
}

const FAQPage: React.FC<FAQPageProps> = ({ onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: '전체', icon: HelpCircle },
        { id: 'plan', name: '요금제', icon: Smartphone },
        { id: 'payment', name: '결제', icon: CreditCard },
        { id: 'data', name: '데이터', icon: Wifi },
        { id: 'benefits', name: '혜택', icon: Gift },
    ];

    const faqs = [
        { id: '1', category: 'plan', question: '요금제 변경은 어떻게 하나요?', answer: 'T월드 앱 또는 홈페이지에서 마이 T > 요금제 변경 메뉴에서 변경 가능합니다. 변경 시 현재 요금제의 혜택이 종료되며, 새 요금제는 다음 결제일부터 적용됩니다.' },
        { id: '2', category: 'payment', question: '납부일 변경이 가능한가요?', answer: '네, 가능합니다. 마이 T > 결제/청구 > 자동납부 메뉴에서 납부일을 변경하실 수 있습니다. 변경 가능한 날짜는 1일, 10일, 15일, 25일 중 선택 가능합니다.' },
        { id: '3', category: 'data', question: '데이터 사용량 확인은 어디서 하나요?', answer: '홈 화면에서 바로 확인 가능하며, 마이 T > 요금제에서 상세 사용량을 확인하실 수 있습니다. 데이터 알림 설정도 가능합니다.' },
        { id: '4', category: 'benefits', question: '멤버십 포인트 적립 기준이 뭔가요?', answer: '요금 납부 금액의 1%가 포인트로 적립됩니다. VIP 등급 이상은 추가 적립 혜택이 있으며, 이벤트 참여 시 보너스 포인트도 받으실 수 있습니다.' },
        { id: '5', category: 'plan', question: '해외 로밍은 어떻게 신청하나요?', answer: '전체 메뉴 > 가입 정보 > 로밍에서 신청 가능합니다. 출국 전 미리 신청하시면 현지 도착 즉시 이용 가능합니다.' },
    ];

    const filteredFAQs = faqs.filter(faq =>
        (activeCategory === 'all' || faq.category === activeCategory) &&
        (searchQuery === '' || faq.question.includes(searchQuery))
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">자주 묻는 질문</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-4 shadow-sm"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="궁금한 내용을 검색하세요"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </motion.div>

                {/* Categories */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5"
                >
                    {categories.map((cat) => {
                        const IconComponent = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === cat.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <IconComponent className="w-4 h-4" />
                                <span className="text-sm font-medium">{cat.name}</span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* FAQ List */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    {filteredFAQs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className={index < filteredFAQs.length - 1 ? 'border-b border-gray-50' : ''}
                        >
                            <button
                                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50"
                            >
                                <span className="text-sm font-medium text-gray-900 pr-4">{faq.question}</span>
                                {expandedId === faq.id ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>
                            <AnimatePresence>
                                {expandedId === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
};

export default FAQPage;
