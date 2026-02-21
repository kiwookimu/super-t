import React from 'react';
import { Info, ExternalLink, Sparkles } from 'lucide-react';

/**
 * INT-011: 제공주체/적용범위 라벨링 (오해 방지)
 * 제휴/외부 서비스 제공 시 명확한 출처 표시
 */

interface ProviderLabelProps {
    provider: string; // 제공 주체 (예: "SK텔레콤", "제휴사")
    type?: 'internal' | 'partner' | 'external';
    scope?: string; // 적용 범위 (예: "T멤버십 가입 고객")
    notice?: string; // 유의사항
    infoUrl?: string; // 상세 정보 링크
}

const ProviderLabel: React.FC<ProviderLabelProps> = ({
    provider,
    type = 'internal',
    scope,
    notice,
    infoUrl,
}) => {
    const typeStyles = {
        internal: {
            badge: 'bg-blue-100 text-blue-700',
            label: 'SK텔레콤',
        },
        partner: {
            badge: 'bg-purple-100 text-purple-700',
            label: '제휴',
        },
        external: {
            badge: 'bg-gray-100 text-gray-600',
            label: '외부',
        },
    };

    const styles = typeStyles[type];

    return (
        <div className="bg-gray-50 rounded-lg p-3 text-sm">
            {/* Provider info */}
            <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles.badge}`}>
                    {styles.label}
                </span>
                <span className="font-medium text-gray-700">{provider} 제공</span>
            </div>

            {/* Scope */}
            {scope && (
                <p className="text-gray-500 text-xs mb-1">
                    적용 대상: {scope}
                </p>
            )}

            {/* Notice */}
            {notice && (
                <div className="flex items-start gap-1.5 text-xs text-gray-500 mt-2">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>{notice}</span>
                </div>
            )}

            {/* More info link */}
            {infoUrl && (
                <a
                    href={infoUrl}
                    className="inline-flex items-center gap-1 text-xs text-blue-600 mt-2 hover:underline"
                >
                    자세히 보기
                    <ExternalLink className="w-3 h-3" />
                </a>
            )}
        </div>
    );
};

/**
 * INT-012: 개인화/노출 균형 원칙 표시
 * 왜 이 콘텐츠가 추천되었는지 표시
 */
interface PersonalizationBadgeProps {
    reason: 'history' | 'similar' | 'popular' | 'curated';
    showDetails?: boolean;
}

const PersonalizationBadge: React.FC<PersonalizationBadgeProps> = ({
    reason,
    showDetails = false,
}) => {
    const reasonLabels = {
        history: { label: '최근 관심', detail: '최근 조회한 상품과 유사해요' },
        similar: { label: '맞춤 추천', detail: '비슷한 고객이 선택했어요' },
        popular: { label: '인기', detail: '많은 고객이 선택하고 있어요' },
        curated: { label: '에디터 추천', detail: '전문가가 선별했어요' },
    };

    const info = reasonLabels[reason];

    return (
        <div className="inline-flex items-center gap-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full text-xs font-medium text-blue-700">
                <Sparkles className="w-3 h-3" />
                {info.label}
            </span>
            {showDetails && (
                <span className="text-xs text-gray-400">{info.detail}</span>
            )}
        </div>
    );
};

export { ProviderLabel, PersonalizationBadge };
