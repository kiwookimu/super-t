import { mockStore } from '../../data/mockStore';

import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, X, Sparkles,
    Plus, Mic, MicOff, Send, Check, Copy,
    RefreshCw, ThumbsUp, ThumbsDown
} from 'lucide-react';

interface Attachment {
    type: 'image' | 'file';
    name: string;
}

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    attachment?: Attachment;
    options?: string[];
    isStreaming?: boolean;
}

const ChatOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [attachedFile, setAttachedFile] = useState<Attachment | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [ratings, setRatings] = useState<Record<number, 'up' | 'down' | null>>({});
    const [copiedId, setCopiedId] = useState<number | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleCopy = (text: string, id: number) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleSend = async (textOverride?: string) => {
        const msgText = textOverride || input;
        if (!msgText.trim() && !attachedFile) return;

        const userMsg: Message = {
            id: Date.now(),
            text: msgText || (attachedFile ? `파일 첨부: ${attachedFile.name}` : ''),
            sender: 'user',
            timestamp: new Date(),
            attachment: attachedFile || undefined
        };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setAttachedFile(null);
        setIsTyping(true);

        // --- PAYMENT LOGIC START ---
        if (msgText.includes('납부') && (msgText.includes('해줘') || msgText.includes('할래') || msgText.includes('싶어') || msgText.includes('하기'))) {
            const billing = mockStore.getState().billing;

            setTimeout(() => {
                setIsTyping(false);
                if (billing.status === 'paid') {
                    addAiMessage("이미번 달 요금 납부가 완료되었어요! 🎉\n\n**납부 금액:** 82,000원\n**납부일:** 2026.02.13", ['납부 내역 보기']);
                    return;
                }

                addAiMessage(`등록된 결제 수단(**신한카드 1234**)으로\n**${billing.amount.toLocaleString()}원**을 납부하시겠습니까?`, ['네, 납부할게요', '아니요']);
            }, 1000);
            return;
        }

        if (msgText.includes('납부할게요')) {
            setTimeout(() => {
                setIsTyping(false);
                addAiMessage("결제를 진행 중입니다...\n잠시만 기다려주세요. 💳");

                setTimeout(() => {
                    mockStore.payBill();
                    addAiMessage("납부가 정상적으로 완료되었습니다! ✅\n\n홈 화면에서 납부 내역을 확인하실 수 있습니다.", ['홈으로 가기', '다른 문의하기']);
                }, 2000);
            }, 500);
            return;
        }
        // --- PAYMENT LOGIC END ---

        // Simulate AI Response with streaming effect
        const fullText = attachedFile
            ? `파일을 확인했어요! **${attachedFile.name}**\n\n${attachedFile.type === 'image' ? '이미지를 분석해봤어요. 더 자세한 정보가 필요하시면 말씀해주세요!' : '파일 내용을 확인했어요. 무엇을 도와드릴까요?'}`
            : getAIResponse(msgText);

        const options = getActionOptions(msgText);

        streamResponse(fullText, options);
    };

    const addAiMessage = (text: string, options?: string[]) => {
        setMessages(prev => [...prev, {
            id: Date.now(),
            text,
            sender: 'ai',
            timestamp: new Date(),
            options
        }]);
    };

    const streamResponse = (fullText: string, options: string[]) => {
        const msgId = Date.now() + 1;
        setTimeout(() => {
            setIsTyping(false);

            // Add message with empty text first
            const aiMsg: Message = {
                id: msgId,
                text: '',
                sender: 'ai',
                timestamp: new Date(),
                isStreaming: true
            };
            setMessages(prev => [...prev, aiMsg]);

            // Stream characters one by one
            let currentIndex = 0;
            const streamInterval = setInterval(() => {
                currentIndex += 2; // Stream 2 characters at a time for speed
                if (currentIndex >= fullText.length) {
                    currentIndex = fullText.length;
                    clearInterval(streamInterval);
                    // Finalize with options
                    setMessages(prev => prev.map(m =>
                        m.id === msgId
                            ? { ...m, text: fullText, isStreaming: false, type: 'action' as const, options }
                            : m
                    ));
                } else {
                    setMessages(prev => prev.map(m =>
                        m.id === msgId
                            ? { ...m, text: fullText.slice(0, currentIndex) }
                            : m
                    ));
                }
            }, 45); // 45ms per update
        }, 1500);
    }

    // ... (rest of the file)

    const toggleRecording = () => {
        if (isRecording) {
            // Stop recording - simulate voice input
            setIsRecording(false);
            setInput(prev => prev + (prev ? ' ' : '') + '음성으로 입력 중...');
            setTimeout(() => {
                setInput('이번 달 데이터 사용량 알려줘');
            }, 500);
        } else {
            setIsRecording(true);
        }
    };

    const getAIResponse = (query: string): string => {
        if (query.includes('데이터') || query.includes('사용량')) {
            return "고객님의 이번 달 데이터 사용량을 확인해봤어요.\n\n**현재 사용량:** 37.5GB / 100GB\n**남은 데이터:** 62.5GB\n**갱신일:** 2026년 2월 15일\n\n평소보다 사용량이 약간 많은 편이에요. 현재 속도로 사용하시면 갱신일까지 충분할 것 같습니다. 😊";
        }
        if (query.includes('요금') || query.includes('청구')) {
            return "이번 달 예상 청구 요금을 알려드릴게요.\n\n**기본 요금제:** 5G 프리미어 에센셜\n**월정액:** 85,000원\n**부가서비스:** 12,000원\n**할인 적용:** -15,000원\n\n---\n**예상 총액:** 82,000원\n\n지난 달보다 3,000원 줄었어요! 🎉";
        }
        return "네, 무엇이든 도와드릴게요!\n\n아래 내용들을 처리해드릴 수 있어요:\n- 📊 데이터 사용량 확인\n- 💰 요금 조회 및 납부\n- 📱 요금제 변경\n- 🎁 멤버십 혜택 확인\n- 🛒 기기 구매 상담\n\n무엇이 궁금하신가요?";
    };

    const getActionOptions = (query: string): string[] => {
        if (query.includes('데이터')) {
            return ['데이터 충전하기', '사용 내역 자세히', '요금제 변경'];
        }
        if (query.includes('요금')) {
            return ['바로 납부하기', '자동납부 설정', '청구서 보기'];
        }
        return ['데이터 확인', '요금 조회', '멤버십 혜택'];
    };

    const suggestedPrompts = [
        "이번 달 데이터 얼마나 썼어?",
        "요금 얼마 나올 것 같아?",
        "내 멤버십 등급 알려줘",
        "요금제 추천해줘"
    ];

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Prevent sending during IME composition (Korean input)
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return ReactDOM.createPortal(
        <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-[100] bg-white flex flex-col touch-none overscroll-contain"
            style={{ height: '100dvh' }}
        >
            {/* Header */}
            <div className="px-4 py-3 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={24} className="text-gray-600" />
                    </button>
                    <span className="text-lg font-medium text-gray-700">T AI</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 font-medium">Alpha</span>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <X size={22} className="text-gray-500" />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto touch-pan-y">
                {messages.length === 0 ? (
                    /* Empty State - Like Claude/ChatGPT */
                    <div className="h-full flex flex-col items-center justify-center px-6 py-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-6 shadow-lg">
                            <Sparkles size={32} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">무엇을 도와드릴까요?</h3>
                        <p className="text-gray-500 text-center text-sm mb-8">
                            요금, 데이터, 멤버십 등<br />궁금한 건 뭐든 물어보세요
                        </p>

                        {/* Suggested Prompts */}
                        <div className="w-full space-y-2">
                            {suggestedPrompts.map((prompt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(prompt)}
                                    className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 text-sm transition-colors border border-gray-100"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Messages */
                    <div className="p-4 space-y-6">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group"
                            >
                                {msg.sender === 'user' ? (
                                    /* User Message */
                                    /* User Message - Gemini Style */
                                    <div className="flex justify-end">
                                        <div className="bg-[#f0f4f9] text-gray-900 px-5 py-3 rounded-2xl rounded-br-sm text-[16px] leading-relaxed max-w-[85%]">
                                            {msg.text}
                                        </div>
                                    </div>
                                ) : (
                                    /* AI Message */
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-1 space-y-2 px-4">
                                                <div className="text-[15px] leading-relaxed text-gray-800 whitespace-pre-wrap">
                                                    {msg.text.split('\n').map((line, i) => {
                                                        if (line.startsWith('**') && line.endsWith('**')) {
                                                            return <p key={i} className="font-semibold">{line.replace(/\*\*/g, '')}</p>;
                                                        }
                                                        if (line === '---') {
                                                            return <hr key={i} className="my-2 border-gray-200" />;
                                                        }
                                                        if (line.startsWith('- ')) {
                                                            return <p key={i} className="pl-2">{line}</p>;
                                                        }
                                                        return <p key={i}>{line}</p>;
                                                    })}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => handleCopy(msg.text, msg.id)}
                                                        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                                    >
                                                        {copiedId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                                                    </button>
                                                    <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                                                        <RefreshCw size={14} />
                                                    </button>
                                                    <div className="w-px h-4 bg-gray-200 mx-1" />
                                                    <button
                                                        onClick={() => setRatings(prev => ({ ...prev, [msg.id]: prev[msg.id] === 'up' ? null : 'up' }))}
                                                        className={`p-1.5 rounded-md transition-colors ${ratings[msg.id] === 'up' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                                                    >
                                                        <ThumbsUp size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => setRatings(prev => ({ ...prev, [msg.id]: prev[msg.id] === 'down' ? null : 'down' }))}
                                                        className={`p-1.5 rounded-md transition-colors ${ratings[msg.id] === 'down' ? 'bg-red-100 text-red-500' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                                                    >
                                                        <ThumbsDown size={14} />
                                                    </button>
                                                </div>

                                                {/* Quick Actions */}
                                                {msg.options && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {msg.options.map(opt => (
                                                            <button
                                                                key={opt}
                                                                onClick={() => handleSend(opt)}
                                                                className="px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
                                                            >
                                                                {opt}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {/* Typing Indicator */}
                        <AnimatePresence>
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                                        <Sparkles size={14} className="text-white" />
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 rounded-2xl rounded-tl-md flex items-center gap-3">
                                        <span className="text-sm text-gray-600">확인 중이에요</span>
                                        <div className="flex space-x-1">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area - Gemini Style */}
            <div className="p-4 bg-white pb-[calc(env(safe-area-inset-bottom)+16px)]">
                <div className="bg-[#f0f4f9] rounded-[28px] px-4 py-2 flex items-center gap-2 transition-all focus-within:bg-white focus-within:shadow-[0_0_0_2px_rgba(11,87,208,0.3)] focus-within:ring-0">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
                    >
                        <Plus size={20} />
                    </button>

                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="T AI에게 무엇이든 물어보세요"
                        rows={1}
                        className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 px-2 text-[16px] text-gray-900 placeholder:text-gray-500 max-h-32"
                        style={{ minHeight: '48px' }}
                    />

                    <div className="flex items-center gap-1">
                        <button
                            onClick={toggleRecording}
                            className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}
                        >
                            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                        </button>
                        {input.trim() || attachedFile ? (
                            <button
                                onClick={() => handleSend()}
                                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                <Send size={18} />
                            </button>
                        ) : null}
                    </div>
                </div>
                <p className="text-[11px] text-center text-gray-400 mt-3">
                    T AI는 실수를 할 수 있습니다. 중요한 정보는 꼭 확인해 주세요.
                </p>
            </div>
        </motion.div>,
        document.body
    );
};

export default ChatOverlay;
