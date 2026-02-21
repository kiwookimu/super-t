import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    HelpCircle, MessageCircle, Phone, ChevronRight, Search,
    FileText, Download, Clock, CheckCircle, AlertTriangle
} from 'lucide-react';

/**
 * CS (고객센터) 요구사항 구현
 * - CS-001: 고객센터 홈
 * - CS-003: FAQ 검색
 * - CS-010: 1:1 문의
 * - CS-015: 상담 예약
 * - CS-020: 문의 내역 조회
 */

interface CustomerServiceProps {
    onNavigate?: (page: string) => void;
}

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
}

interface InquiryItem {
    id: string;
    title: string;
    date: string;
    status: 'pending' | 'in_progress' | 'completed';
    category: string;
}

const CustomerService: React.FC<CustomerServiceProps> = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

    const quickMenus = [
        { id: '1', icon: <MessageCircle className="w-6 h-6" />, label: '1:1 문의', color: 'bg-blue-100 text-blue-500' },
        { id: '2', icon: <Phone className="w-6 h-6" />, label: '상담 예약', color: 'bg-green-100 text-green-500' },
        { id: '3', icon: <FileText className="w-6 h-6" />, label: '문의 내역', color: 'bg-purple-100 text-purple-500' },
        { id: '4', icon: <Download className="w-6 h-6" />, label: '서류 발급', color: 'bg-orange-100 text-orange-500' },
    ];

    const faqs: FAQ[] = [
        { id: '1', question: '데이터 사용량은 어떻게 확인하나요?', answer: '마이 T > 내 휴대폰 카드를 누르시면 데이터 사용량을 확인할 수 있습니다.', category: 'usage' },
        { id: '2', question: '요금제 변경은 언제 적용되나요?', answer: '요금제 변경은 신청 다음 달 1일부터 적용됩니다. 단, 일부 요금제는 즉시 적용됩니다.', category: 'plan' },
        { id: '3', question: '해외 로밍은 어떻게 신청하나요?', answer: 'Shop > 부가서비스 > 로밍에서 원하시는 로밍 상품을 선택하여 신청할 수 있습니다.', category: 'roaming' },
        { id: '4', question: '청구서를 이메일로 받으려면?', answer: '마이 T > 청구서 > 청구서 수신 방법에서 이메일 수신을 설정하실 수 있습니다.', category: 'billing' },
    ];

    const recentInquiries: InquiryItem[] = [
        { id: '1', title: '데이터 추가 충전 문의', date: '2024.02.05', status: 'completed', category: 'usage' },
        { id: '2', title: '요금제 상담 예약', date: '2024.02.03', status: 'in_progress', category: 'plan' },
    ];

    const filteredFaqs = searchQuery
        ? faqs.filter(f => f.question.includes(searchQuery))
        : faqs;

    const statusColors = {
        pending: 'bg-gray-100 text-gray-600',
        in_progress: 'bg-blue-100 text-blue-600',
        completed: 'bg-green-100 text-green-600',
    };

    const statusLabels = {
        pending: '접수중',
        in_progress: '처리중',
        completed: '완료',
    };

    const statusIcons = {
        pending: <Clock className="w-4 h-4" />,
        in_progress: <AlertTriangle className="w-4 h-4" />,
        completed: <CheckCircle className="w-4 h-4" />,
    };

    return (
        <div className="space-y-5 pb-28">
            {/* Header */}
            <header className="pt-2">
                <h1 className="text-xl font-bold text-gray-900">고객센터</h1>
                <p className="text-sm text-gray-500 mt-0.5">무엇을 도와드릴까요?</p>
            </header>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="궁금한 점을 검색해보세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
            </div>

            {/* Quick Menu */}
            <section className="grid grid-cols-4 gap-3">
                {quickMenus.map(menu => (
                    <motion.div
                        key={menu.id}
                        className="toss-card p-4 flex flex-col items-center justify-center gap-2 cursor-pointer"
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${menu.color}`}>
                            {menu.icon}
                        </div>
                        <span className="text-xs font-medium text-gray-700">{menu.label}</span>
                    </motion.div>
                ))}
            </section>

            {/* Recent Inquiries */}
            {recentInquiries.length > 0 && (
                <section className="space-y-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-base font-bold text-gray-900">최근 문의</h2>
                        <button className="text-sm text-gray-400">전체보기</button>
                    </div>
                    <div className="toss-card divide-y divide-gray-100">
                        {recentInquiries.map(inquiry => (
                            <motion.div
                                key={inquiry.id}
                                className="flex items-center justify-between p-4 cursor-pointer"
                                whileTap={{ backgroundColor: '#f8f9fa' }}
                            >
                                <div>
                                    <p className="font-medium text-gray-900">{inquiry.title}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{inquiry.date}</p>
                                </div>
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[inquiry.status]}`}>
                                    {statusIcons[inquiry.status]}
                                    {statusLabels[inquiry.status]}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* FAQ */}
            <section className="space-y-2">
                <h2 className="text-base font-bold text-gray-900">자주 묻는 질문</h2>
                <div className="toss-card divide-y divide-gray-100">
                    {filteredFaqs.map(faq => (
                        <div key={faq.id}>
                            <motion.button
                                className="w-full flex items-center justify-between p-4 text-left"
                                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                whileTap={{ backgroundColor: '#f8f9fa' }}
                            >
                                <div className="flex items-center gap-3">
                                    <HelpCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    <span className="font-medium text-gray-900">{faq.question}</span>
                                </div>
                                <motion.div
                                    animate={{ rotate: expandedFaq === faq.id ? 90 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronRight className="w-5 h-5 text-gray-300" />
                                </motion.div>
                            </motion.button>
                            {expandedFaq === faq.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-4 pb-4 pl-12"
                                >
                                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Info */}
            <section className="toss-card p-5 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                        <p className="font-semibold text-gray-900">고객센터 전화 상담</p>
                        <p className="text-sm text-gray-500">평일 09:00 ~ 18:00</p>
                    </div>
                </div>
                <motion.button
                    className="w-full mt-4 py-3 bg-gray-900 text-white font-semibold rounded-xl"
                    whileTap={{ scale: 0.98 }}
                >
                    1588-0000 전화하기
                </motion.button>
            </section>
        </div>
    );
};

export default CustomerService;
