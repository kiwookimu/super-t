import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, FileText, ChevronRight, Check,
    Clock, ExternalLink, Shield
} from 'lucide-react';

interface TermsPageProps {
    onBack: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
    const terms = [
        { id: '1', name: 'Super T 서비스 이용약관', version: 'v2.1', date: '2026.01.01', agreed: true, required: true },
        { id: '2', name: '개인정보 수집 및 이용 동의', version: 'v1.8', date: '2026.01.01', agreed: true, required: true },
        { id: '3', name: '개인정보 제3자 제공 동의', version: 'v1.5', date: '2025.10.15', agreed: true, required: true },
        { id: '4', name: '위치정보 이용약관', version: 'v1.2', date: '2025.08.01', agreed: true, required: false },
        { id: '5', name: '마케팅 정보 수신 동의', version: 'v1.0', date: '2025.06.01', agreed: false, required: false },
    ];

    const consentHistory = [
        { date: '2026.01.01', action: '이용약관 변경 동의', detail: 'Super T 서비스 이용약관 v2.1' },
        { date: '2025.10.15', action: '제3자 제공 동의', detail: '개인정보 제3자 제공 동의' },
        { date: '2025.06.01', action: '마케팅 수신 거부', detail: '마케팅 정보 수신 동의' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">약관/동의</h1>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Terms List */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">이용 약관</h3>
                    </div>

                    {terms.map((term, index) => (
                        <button
                            key={term.id}
                            className={`w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 ${index < terms.length - 1 ? 'border-b border-gray-50' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${term.agreed ? 'bg-green-50' : 'bg-gray-100'
                                    }`}>
                                    {term.agreed ? (
                                        <Check className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <FileText className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium text-gray-900">{term.name}</p>
                                        {term.required && (
                                            <span className="px-1.5 py-0.5 bg-red-50 text-red-500 text-[10px] font-bold rounded">
                                                필수
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {term.version} · {term.date}
                                    </p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300" />
                        </button>
                    ))}
                </motion.div>

                {/* Consent History */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">동의 내역</h3>
                        <Clock className="w-5 h-5 text-gray-400" />
                    </div>

                    {consentHistory.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-4 px-5 py-4 ${index < consentHistory.length - 1 ? 'border-b border-gray-50' : ''
                                }`}
                        >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">{item.action}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                                <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* External Links */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-700">개인정보 처리방침</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-700">전자금융거래 이용약관</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                    </button>
                </motion.div>
            </main>
        </div>
    );
};

export default TermsPage;
