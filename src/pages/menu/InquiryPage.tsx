import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, ChevronDown, Send,
    Camera, FileText
} from 'lucide-react';

interface InquiryPageProps {
    onBack: () => void;
    onNavigate?: (page: string) => void;
}

const InquiryPage: React.FC<InquiryPageProps> = ({ onBack, onNavigate }) => {
    const [category] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // const categories = [
    //     '요금제/부가서비스',
    //     '결제/청구',
    //     '데이터/통화',
    //     '로밍',
    //     '멤버십/포인트',
    //     '기타 문의',
    // ];

    const recentInquiries = [
        { id: '1', title: '요금제 변경 관련 문의', status: 'answered', date: '2026.01.15' },
        { id: '2', title: '포인트 적립 누락 확인 요청', status: 'pending', date: '2026.02.01' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">1:1 문의</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Recent Inquiries */}
                {recentInquiries.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm"
                    >
                        <div className="px-5 py-4 border-b border-gray-50">
                            <h3 className="font-bold text-gray-900">최근 문의</h3>
                        </div>
                        {recentInquiries.map((inquiry, index) => (
                            <button
                                key={inquiry.id}
                                className={`w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 ${index < recentInquiries.length - 1 ? 'border-b border-gray-50' : ''
                                    }`}
                                onClick={() => onNavigate?.('/support/inquiry/detail')}
                            >
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-900">{inquiry.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{inquiry.date}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${inquiry.status === 'answered'
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-amber-50 text-amber-600'
                                    }`}>
                                    {inquiry.status === 'answered' ? '답변 완료' : '처리 중'}
                                </span>
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* New Inquiry Form */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm space-y-4"
                >
                    <h3 className="font-bold text-gray-900">새 문의 작성</h3>

                    {/* Category */}
                    <div className="relative">
                        <label className="text-sm text-gray-500 mb-2 block">문의 유형</label>
                        <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl text-left">
                            <span className={category ? 'text-gray-900' : 'text-gray-400'}>
                                {category || '유형을 선택하세요'}
                            </span>
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="text-sm text-gray-500 mb-2 block">제목</label>
                        <input
                            type="text"
                            placeholder="문의 제목을 입력하세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="text-sm text-gray-500 mb-2 block">문의 내용</label>
                        <textarea
                            placeholder="문의하실 내용을 상세히 작성해 주세요"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* Attachments */}
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200">
                            <Camera className="w-4 h-4" />
                            <span>사진</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200">
                            <FileText className="w-4 h-4" />
                            <span>파일</span>
                        </button>
                    </div>

                    {/* Submit */}
                    <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        문의 등록
                    </button>
                </motion.div>
            </main>
        </div>
    );
};

export default InquiryPage;
