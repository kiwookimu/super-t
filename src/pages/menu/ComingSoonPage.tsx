import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Hammer } from 'lucide-react';

interface ComingSoonPageProps {
    onBack: () => void;
    title?: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ onBack, title = '준비 중' }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2 transition-colors">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">{title}</h1>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6"
                >
                    <Hammer className="w-10 h-10 text-blue-500" />
                </motion.div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">보다 나은 서비스를 위해<br />준비 중입니다</h2>
                <p className="text-sm text-gray-500 max-w-[260px] leading-relaxed">
                    이용에 불편을 드려 죄송합니다.<br />
                    빠른 시일 내에 원활한 서비스를<br />
                    제공해 드릴 수 있도록 노력하겠습니다.
                </p>
            </main>
        </div>
    );
};

export default ComingSoonPage;
