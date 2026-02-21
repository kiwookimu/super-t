import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Info } from 'lucide-react';

/**
 * INT-018: 서비스별 홈 제공 (랜딩 템플릿)
 * 기존 서비스에 익숙한 고객 적응을 위한 서비스별 랜딩
 */

interface ServiceLauncherProps {
    services: ServiceItem[];
    onLaunch: (serviceId: string) => void;
}

interface ServiceItem {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    isLegacy?: boolean; // 기존 서비스 표시
}

const ServiceLauncher: React.FC<ServiceLauncherProps> = ({ services, onLaunch }) => {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">빠른 서비스 접속</h3>
                <span className="text-xs text-gray-400">기존 앱 사용자용</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                    <motion.button
                        key={service.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-left"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onLaunch(service.id)}
                    >
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: service.color }}
                        >
                            {service.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">
                                {service.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {service.description}
                            </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    </motion.button>
                ))}
            </div>

            {/* 통합 안내 */}
            <div className="mt-3 flex items-start gap-2 p-2 bg-blue-50 rounded-lg text-xs text-blue-700">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                    모든 서비스는 Super T 통합 계정으로 이용하실 수 있습니다.
                </span>
            </div>
        </div>
    );
};

/**
 * INT-019: 의도 기반 랜딩
 * 진입 의도에 따라 적절한 화면으로 안내
 */
interface IntentBasedLandingProps {
    intent: 'payment' | 'plan' | 'benefit' | 'support' | 'general';
    userContext?: {
        hasUnpaidBill?: boolean;
        planExpiresIn?: number; // days
        unusedCoupons?: number;
        pendingInquiry?: boolean;
    };
    onNavigate: (path: string) => void;
}

const IntentBasedLanding: React.FC<IntentBasedLandingProps> = ({
    intent,
    userContext,
    onNavigate,
}) => {
    // 의도와 컨텍스트에 따른 우선 액션 결정
    const getPriorityActions = () => {
        const actions: { label: string; path: string; priority: 'high' | 'medium' }[] = [];

        // 미납 청구서가 있으면 항상 표시
        if (userContext?.hasUnpaidBill) {
            actions.push({ label: '미납 요금 납부하기', path: '/payment/bill', priority: 'high' });
        }

        // 의도별 추천 액션
        switch (intent) {
            case 'payment':
                actions.push({ label: '청구서 확인', path: '/payment/bill', priority: 'medium' });
                actions.push({ label: '결제수단 관리', path: '/payment/method', priority: 'medium' });
                break;
            case 'plan':
                actions.push({ label: '요금제 변경', path: '/subscription/plan', priority: 'medium' });
                if (userContext?.planExpiresIn && userContext.planExpiresIn <= 30) {
                    actions.push({ label: '갱신 안내 확인', path: '/subscription/renew', priority: 'high' });
                }
                break;
            case 'benefit':
                actions.push({ label: '쿠폰함', path: '/benefits/coupons', priority: 'medium' });
                actions.push({ label: '멤버십 혜택', path: '/benefits/membership', priority: 'medium' });
                break;
            case 'support':
                actions.push({ label: 'AI 상담', path: '/support/chat', priority: 'medium' });
                if (userContext?.pendingInquiry) {
                    actions.push({ label: '답변 확인하기', path: '/support/inquiry', priority: 'high' });
                }
                break;
            default:
                break;
        }

        return actions.slice(0, 3); // 최대 3개
    };

    const actions = getPriorityActions();

    if (actions.length === 0) return null;

    return (
        <div className="space-y-2">
            {actions.map((action) => (
                <motion.button
                    key={action.path}
                    className={`w-full flex items-center justify-between p-4 rounded-xl ${action.priority === 'high'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-900'
                        }`}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate(action.path)}
                >
                    <span className="font-medium">{action.label}</span>
                    <ChevronRight className="w-5 h-5 opacity-50" />
                </motion.button>
            ))}
        </div>
    );
};

export { ServiceLauncher, IntentBasedLanding };
export type { ServiceItem, IntentBasedLandingProps };
