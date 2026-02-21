import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronLeft, Star, Smartphone, HelpCircle, CheckCircle2 } from 'lucide-react';

const ProductDetail: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="pb-24 relative bg-gray-50 min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 p-4 z-50 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-200">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <span className="text-sm font-bold text-gray-800">상품 상세</span>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <HelpCircle size={20} className="text-gray-500" />
                </button>
            </nav>

            <div className="pt-20 px-4 space-y-6">
                {/* Value Proposition (The "Value First" Strategy) - Monimo Style */}
                <section className="text-center pt-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-bold rounded-full mb-3">
                        강력 추천
                    </span>
                    <h1 className="text-2xl font-bold text-gray-900 leading-snug">
                        데이터 걱정 없는<br />
                        <span className="text-blue-600">슈퍼 5G 프라임</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        월 69,000원으로 누리는<br />
                        최고의 모바일 라이프
                    </p>
                </section>

                {/* Hero Illust/Image Area */}
                <div className="w-full h-48 bg-gradient-to-b from-blue-50 to-white rounded-3xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20 -top-10 -left-10" />
                    <div className="absolute w-32 h-32 bg-purple-400 rounded-full blur-3xl opacity-20 -bottom-10 -right-10" />
                    <img
                        src="https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2070&auto=format&fit=crop"
                        alt="Product"
                        className="h-32 object-contain drop-shadow-xl z-10"
                    />
                </div>

                {/* Benefits Grid */}
                <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">주요 혜택</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <BenefitCard icon={<Smartphone size={24} />} title="5G 데이터 무제한" desc="속도 제어 없음" color="text-blue-600 bg-blue-50" />
                        <BenefitCard icon={<Shield size={24} />} title="폰 파손 보험" desc="가입 시 무료 제공" color="text-green-600 bg-green-50" />
                        <BenefitCard icon={<Star size={24} />} title="VIP 멤버십" desc="영화/카페 무료" color="text-purple-600 bg-purple-50" />
                        <BenefitCard icon={<CheckCircle2 size={24} />} title="가족 데이터 공유" desc="최대 40GB 선물" color="text-orange-600 bg-orange-50" />
                    </div>
                </section>

                {/* Pricing & Terms - Clean Card */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-400 mb-4 px-1">요금 상세</h3>
                    <div className="flex justify-between items-baseline mb-1">
                        <span className="text-gray-600 font-medium">월 정액</span>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-gray-900">69,000원</span>
                        </div>
                    </div>
                    <p className="text-sm text-right text-gray-400 mb-6">부가세 포함</p>

                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">약정 기간</span>
                            <span className="text-gray-900 font-medium">24개월</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">데이터 속도</span>
                            <span className="text-gray-900 font-medium">최대 20 Gbps</span>
                        </div>
                    </div>
                </section>

                <p className="text-sm text-gray-400 text-center px-4 leading-relaxed">
                    * 가입 후 6개월 내 해지 시 위약금이 발생할 수 있습니다.<br />
                    * 제휴 혜택은 제휴사 사정에 따라 변경될 수 있습니다.
                </p>
            </div>

            {/* Floating CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 pb-8 safe-area-bottom">
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
                    가입 신청하기
                </button>
            </div>
        </div>
    );
};

const BenefitCard = ({ icon, title, desc, color }: any) => (
    <motion.div
        className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-start space-y-3"
        whileTap={{ scale: 0.98 }}
    >
        <div className={`p-2.5 rounded-xl ${color}`}>
            {icon}
        </div>
        <div>
            <h3 className="text-sm font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{desc}</p>
        </div>
    </motion.div>
);

export default ProductDetail;
