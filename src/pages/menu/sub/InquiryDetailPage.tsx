import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Send, Paperclip, Headphones, Check } from 'lucide-react';

interface InquiryDetailPageProps {
    onBack: () => void;
}

const InquiryDetailPage: React.FC<InquiryDetailPageProps> = ({ onBack }) => {
    const [newMessage, setNewMessage] = useState('');

    const inquiry = {
        id: '1',
        title: '요금제 변경 관련 문의',
        status: 'answered',
        createdAt: '2026.01.15 14:30',
        messages: [
            {
                id: '1',
                type: 'user',
                content: '안녕하세요, 현재 프리미엄 요금제를 사용 중인데 스탠다드로 변경하고 싶습니다. 변경 시 기존에 적립된 포인트는 어떻게 되나요?',
                time: '14:30',
            },
            {
                id: '2',
                type: 'agent',
                agentName: '김상담',
                content: '안녕하세요, 기우님. Super T 고객센터 김상담입니다.\n\n요금제 변경 시 기존에 적립된 포인트는 그대로 유지됩니다. 다만, 등급이 변경될 경우 적립률이 달라질 수 있으니 참고해 주세요.\n\n추가 문의사항이 있으시면 편하게 말씀해 주세요!',
                time: '15:45',
            },
            {
                id: '3',
                type: 'user',
                content: '감사합니다! 그럼 바로 변경해도 될까요?',
                time: '16:00',
            },
            {
                id: '4',
                type: 'agent',
                agentName: '김상담',
                content: '네, 언제든지 변경 가능합니다. 전체메뉴 > 가입정보 > 요금제에서 직접 변경하시거나, 여기서 바로 변경 도와드릴까요?',
                time: '16:15',
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                            <ChevronLeft className="w-6 h-6 text-gray-900" />
                        </button>
                        <h1 className="text-lg font-bold text-gray-900">문의 상세</h1>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${inquiry.status === 'answered'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-amber-50 text-amber-600'
                        }`}>
                        {inquiry.status === 'answered' ? '답변 완료' : '처리 중'}
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-2 ml-8">{inquiry.title}</p>
            </header>

            {/* Messages */}
            <main className="flex-1 overflow-y-auto px-5 py-6 space-y-4 pb-32">
                {/* Date */}
                <div className="flex justify-center">
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-500">
                        {inquiry.createdAt.split(' ')[0]}
                    </span>
                </div>

                {inquiry.messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.type === 'agent' && (
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                <Headphones className="w-5 h-5 text-blue-600" />
                            </div>
                        )}
                        <div className={`max-w-[75%] ${msg.type === 'user' ? 'order-1' : ''}`}>
                            {msg.type === 'agent' && (
                                <p className="text-xs text-gray-500 mb-1">{msg.agentName}</p>
                            )}
                            <div className={`px-4 py-3 rounded-2xl ${msg.type === 'user'
                                ? 'bg-blue-600 text-white rounded-br-md'
                                : 'bg-white text-gray-900 shadow-sm rounded-bl-md'
                                }`}>
                                <p className="text-sm whitespace-pre-line">{msg.content}</p>
                            </div>
                            <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-right' : ''
                                } text-gray-400`}>
                                {msg.time}
                                {msg.type === 'user' && (
                                    <Check className="w-3 h-3 inline ml-1 text-blue-400" />
                                )}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </main>

            {/* Input */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4 pb-8">
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Paperclip className="w-5 h-5 text-gray-500" />
                    </button>
                    <input
                        type="text"
                        placeholder="추가 문의사항을 입력하세요..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700">
                        <Send className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InquiryDetailPage;
