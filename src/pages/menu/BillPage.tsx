import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Download, Calendar,
    ChevronRight, AlertCircle, FileText, Check
} from 'lucide-react';

interface BillPageProps {
    onBack: () => void;
}

const BillPage: React.FC<BillPageProps> = ({ onBack }) => {
    const billData = {
        month: '2026년 2월',
        dueDate: '2026.02.25',
        totalAmount: 125400,
        breakdown: [
            { name: '5G 프라임 요금', amount: 89000 },
            { name: '부가서비스', amount: 4400 },
            { name: '넷플릭스', amount: 17000 },
            { name: '유튜브 프리미엄', amount: 14900 },
            { name: '부가세', amount: 100 },
        ],
        isPaid: false,
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between z-10">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">청구서</h1>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Download className="w-5 h-5 text-gray-600" />
                </button>
            </header>

            <main className="px-5 pt-6 space-y-4">
                {/* Bill Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-sm text-gray-500">{billData.month} 청구 금액</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">
                                {billData.totalAmount.toLocaleString()}
                                <span className="text-lg font-normal">원</span>
                            </p>
                        </div>
                        {billData.isPaid ? (
                            <span className="px-3 py-1.5 bg-green-50 text-green-600 text-sm font-medium rounded-full flex items-center gap-1">
                                <Check className="w-4 h-4" />
                                납부 완료
                            </span>
                        ) : (
                            <span className="px-3 py-1.5 bg-amber-50 text-amber-600 text-sm font-medium rounded-full">
                                납부 예정
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>납부 기한: {billData.dueDate}</span>
                    </div>

                    {!billData.isPaid && (
                        <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">
                            지금 납부하기
                        </button>
                    )}
                </motion.div>

                {/* Bill Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">청구 내역</h3>
                        <FileText className="w-5 h-5 text-gray-400" />
                    </div>

                    {billData.breakdown.map((item, index) => (
                        <div
                            key={item.name}
                            className={`flex items-center justify-between px-5 py-4 ${index < billData.breakdown.length - 1 ? 'border-b border-gray-50' : ''
                                }`}
                        >
                            <span className="text-sm text-gray-700">{item.name}</span>
                            <span className="text-sm font-medium text-gray-900">{item.amount.toLocaleString()}원</span>
                        </div>
                    ))}

                    <div className="flex items-center justify-between px-5 py-4 bg-gray-50">
                        <span className="text-sm font-bold text-gray-900">총 청구 금액</span>
                        <span className="text-lg font-bold text-blue-600">{billData.totalAmount.toLocaleString()}원</span>
                    </div>
                </motion.div>

                {/* Past Bills */}
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between hover:bg-gray-50"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-gray-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">지난 청구서 보기</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                </motion.button>

                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3"
                >
                    <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-blue-800">자동납부 설정 안내</p>
                        <p className="text-xs text-blue-700 mt-1">
                            자동납부를 설정하시면 매월 납부일에 자동으로 결제됩니다.
                        </p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default BillPage;
