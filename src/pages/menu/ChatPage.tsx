import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Send, Bot, Sparkles,
    CreditCard, Wifi, Gift, HelpCircle
} from 'lucide-react';

interface ChatPageProps {
    onBack: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ onBack }) => {
    const [messages, setMessages] = useState([
        { id: '1', type: 'bot', content: '안녕하세요! Super T AI 상담사입니다. 무엇을 도와드릴까요? 😊' },
    ]);
    const [inputValue, setInputValue] = useState('');

    const quickActions = [
        { icon: CreditCard, label: '요금 조회' },
        { icon: Wifi, label: '데이터 확인' },
        { icon: Gift, label: '혜택 안내' },
        { icon: HelpCircle, label: '자주 묻는 질문' },
    ];

    const handleSend = () => {
        if (!inputValue.trim()) return;

        setMessages(prev => [...prev,
        { id: Date.now().toString(), type: 'user', content: inputValue },
        { id: (Date.now() + 1).toString(), type: 'bot', content: '네, 확인해 드리겠습니다. 잠시만 기다려 주세요...' }
        ]);
        setInputValue('');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">AI 상담</h1>
                        <p className="text-xs text-green-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            온라인
                        </p>
                    </div>
                </div>
            </header>

            {/* Chat Messages */}
            <main className="flex-1 overflow-y-auto px-5 py-6 space-y-4 pb-40">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.type === 'bot' && (
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                <Bot className="w-4 h-4 text-blue-600" />
                            </div>
                        )}
                        <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${msg.type === 'user'
                                ? 'bg-blue-600 text-white rounded-br-md'
                                : 'bg-white text-gray-900 shadow-sm rounded-bl-md'
                            }`}>
                            <p className="text-sm">{msg.content}</p>
                        </div>
                    </motion.div>
                ))}

                {/* Quick Actions */}
                {messages.length === 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="pt-4"
                    >
                        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            빠른 질문
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {quickActions.map((action) => {
                                const IconComponent = action.icon;
                                return (
                                    <button
                                        key={action.label}
                                        className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-2 hover:bg-blue-50"
                                        onClick={() => setInputValue(action.label)}
                                    >
                                        <IconComponent className="w-5 h-5 text-blue-500" />
                                        <span className="text-sm font-medium text-gray-700">{action.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </main>

            {/* Input */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4 pb-8">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="메시지를 입력하세요..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSend}
                        className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
