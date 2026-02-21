import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Info, AlertCircle, CreditCard, User, Settings, Shield, HelpCircle } from 'lucide-react';

interface MenuDetailPageProps {
    path: string;
    onBack: () => void;
}

const MenuDetailPage: React.FC<MenuDetailPageProps> = ({ path, onBack }) => {
    // Extract title from path
    const getPageTitle = (path: string) => {
        const parts = path.split('/');
        const id = parts[parts.length - 1];

        const titleMap: Record<string, string> = {
            'profile': '회원 정보',
            'lines': '회선 관리',
            'settings': '설정',
            'plan': '요금제',
            'addons': '부가서비스',
            'roaming': '로밍',
            'bill': '청구서',
            'history': '결제 내역',
            'auto': '자동납부',
            'coupons': '쿠폰함',
            'membership': '멤버십',
            'points': '포인트',
            'faq': '자주 묻는 질문',
            'inquiry': '1:1 문의',
            'chat': 'AI 상담',
            'store': '매장 찾기',
            'notification': '알림 설정',
            'privacy': '개인정보 보호',
            'terms': '약관/동의',
            'notifications': '알림 센터',
        };

        return titleMap[id] || '상세 페이지';
    };

    const title = getPageTitle(path);

    // Get icon based on category
    const getCategoryIcon = (path: string) => {
        if (path.includes('my')) return <User className="w-12 h-12 text-blue-500" />;
        if (path.includes('payment')) return <CreditCard className="w-12 h-12 text-blue-500" />;
        if (path.includes('support')) return <HelpCircle className="w-12 h-12 text-blue-500" />;
        if (path.includes('settings')) return <Settings className="w-12 h-12 text-blue-500" />;
        return <Info className="w-12 h-12 text-blue-500" />;
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center z-10">
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">{title}</h1>
            </header>

            {/* Content Container */}
            <main className="px-5 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-sm border border-gray-50"
                >
                    <div className="bg-blue-50 p-6 rounded-full mb-6">
                        {getCategoryIcon(path)}
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                        {title}
                    </h2>

                    <p className="text-gray-500 leading-relaxed mb-8">
                        현재 이 페이지는 준비 중입니다.<br />
                        곧 통합된 <span className="text-blue-600 font-bold">Super T</span>의 새로운<br />
                        {title} 기능을 만나보실 수 있습니다.
                    </p>

                    <div className="w-full space-y-3">
                        <div className="h-4 bg-gray-50 rounded-full w-full" />
                        <div className="h-4 bg-gray-50 rounded-full w-3/4 mx-auto" />
                        <div className="h-4 bg-gray-50 rounded-full w-5/6 mx-auto" />
                    </div>

                    <button
                        onClick={onBack}
                        className="mt-10 px-8 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm"
                    >
                        이전 화면으로
                    </button>
                </motion.div>

                {/* Additional Info Cards */}
                <div className="mt-6 space-y-4">
                    <div className="bg-white rounded-2xl p-5 flex items-center gap-4 border border-gray-50">
                        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">사용자 안내</p>
                            <p className="text-xs text-gray-500">통합 서비스 개편 기간 동안 일부 기능이 제한될 수 있습니다.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 flex items-center gap-4 border border-gray-50">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">보안 안내</p>
                            <p className="text-xs text-gray-500">당신의 소중한 정보는 Super T 보안 정책에 의해 안전하게 보호됩니다.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MenuDetailPage;
