import React, { useState } from 'react';
import { Check, ChevronRight, Info } from 'lucide-react';
import Button from './Button';

/**
 * UXP-008: 윤리 (강요/기만 금지·거부권 보장)
 * - 선택 동의/권한은 목적별로 분리
 * - 거부해도 핵심 서비스 이용 가능
 * - 다크패턴 금지
 * 
 * UXP-009: Privacy by Design
 * - 개인정보 최소 수집
 * - 목적, 항목, 보관, 제3자 제공 명확히 고지
 */

export interface ConsentItem {
    id: string;
    title: string;
    required: boolean;
    description?: string;
    detailLink?: string;
}

export interface ConsentProps {
    items: ConsentItem[];
    onComplete: (consents: Record<string, boolean>) => void;
    title?: string;
    description?: string;
    submitLabel?: string;
    className?: string;
}

const Consent: React.FC<ConsentProps> = ({
    items,
    onComplete,
    title = '서비스 이용 동의',
    description,
    submitLabel = '동의하고 진행하기',
    className = '',
}) => {
    const [consents, setConsents] = useState<Record<string, boolean>>(
        Object.fromEntries(items.map(item => [item.id, false]))
    );

    const requiredItems = items.filter(item => item.required);
    const optionalItems = items.filter(item => !item.required);
    const allRequiredChecked = requiredItems.every(item => consents[item.id]);
    const allChecked = items.every(item => consents[item.id]);

    const toggleItem = (id: string) => {
        setConsents(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleAll = () => {
        const newValue = !allChecked;
        setConsents(Object.fromEntries(items.map(item => [item.id, newValue])));
    };

    const handleSubmit = () => {
        if (allRequiredChecked) {
            onComplete(consents);
        }
    };

    return (
        <div className={`bg-white rounded-[var(--uxp-card-radius)] overflow-hidden ${className}`}>
            {/* Header */}
            <div className="p-6 border-b border-[var(--uxp-color-border)]">
                <h2 className="text-xl font-bold text-[var(--uxp-color-text)]">{title}</h2>
                {description && (
                    <p className="mt-2 text-sm text-[var(--uxp-color-text-muted)]">{description}</p>
                )}
            </div>

            {/* All Agree (UXP-008: 선택 존중) */}
            <div className="p-4 bg-gray-50 border-b border-[var(--uxp-color-border)]">
                <ConsentCheckbox
                    checked={allChecked}
                    onChange={toggleAll}
                    label="전체 동의"
                    highlight
                />
            </div>

            {/* Required Items */}
            {requiredItems.length > 0 && (
                <div className="p-4 space-y-3">
                    <div className="text-xs font-medium text-[var(--uxp-color-text-muted)] mb-2">
                        필수 동의
                    </div>
                    {requiredItems.map(item => (
                        <ConsentCheckbox
                            key={item.id}
                            checked={consents[item.id]}
                            onChange={() => toggleItem(item.id)}
                            label={item.title}
                            required
                            description={item.description}
                            detailLink={item.detailLink}
                        />
                    ))}
                </div>
            )}

            {/* Optional Items (UXP-008: 거부해도 핵심 서비스 이용 가능) */}
            {optionalItems.length > 0 && (
                <div className="p-4 space-y-3 border-t border-[var(--uxp-color-border)]">
                    <div className="text-xs font-medium text-[var(--uxp-color-text-muted)] mb-2">
                        선택 동의 (거부해도 서비스 이용 가능)
                    </div>
                    {optionalItems.map(item => (
                        <ConsentCheckbox
                            key={item.id}
                            checked={consents[item.id]}
                            onChange={() => toggleItem(item.id)}
                            label={item.title}
                            description={item.description}
                            detailLink={item.detailLink}
                        />
                    ))}
                </div>
            )}

            {/* Submit Button */}
            <div className="p-4 bg-gray-50">
                <Button
                    variant="primary"
                    fullWidth
                    disabled={!allRequiredChecked}
                    onClick={handleSubmit}
                >
                    {submitLabel}
                </Button>
                {!allRequiredChecked && (
                    <p className="mt-2 text-xs text-center text-[var(--uxp-color-error)]">
                        필수 항목에 동의해 주세요
                    </p>
                )}
            </div>
        </div>
    );
};

/**
 * Consent Checkbox Component
 */
interface ConsentCheckboxProps {
    checked: boolean;
    onChange: () => void;
    label: string;
    required?: boolean;
    description?: string;
    detailLink?: string;
    highlight?: boolean;
}

const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({
    checked,
    onChange,
    label,
    required,
    description,
    detailLink,
    highlight = false,
}) => {
    return (
        <div className="flex items-start gap-3">
            {/* Checkbox */}
            <button
                onClick={onChange}
                className={`
          flex-shrink-0 w-6 h-6 rounded-full border-2 
          flex items-center justify-center transition-all
          ${checked
                        ? 'bg-[var(--uxp-color-primary)] border-[var(--uxp-color-primary)]'
                        : 'bg-white border-gray-300 hover:border-[var(--uxp-color-primary)]'
                    }
        `}
            >
                {checked && <Check className="w-4 h-4 text-white" />}
            </button>

            {/* Label and Description */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className={`text-sm ${highlight ? 'font-semibold' : 'font-medium'} text-[var(--uxp-color-text)]`}>
                        {label}
                    </span>
                    {required && (
                        <span className="text-xs text-[var(--uxp-color-error)]">(필수)</span>
                    )}
                </div>
                {description && (
                    <p className="mt-1 text-xs text-[var(--uxp-color-text-muted)]">
                        {description}
                    </p>
                )}
            </div>

            {/* Detail Link (UXP-009: 명확한 고지) */}
            {detailLink && (
                <a
                    href={detailLink}
                    className="flex-shrink-0 p-1 text-[var(--uxp-color-text-muted)] hover:text-[var(--uxp-color-primary)]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ChevronRight className="w-5 h-5" />
                </a>
            )}
        </div>
    );
};

/**
 * Privacy Notice Component (UXP-009)
 * 개인정보 수집/이용 고지
 */
export interface PrivacyNoticeProps {
    purpose: string;
    items: string[];
    retention: string;
    thirdParty?: {
        recipient: string;
        purpose: string;
        items: string[];
    };
    className?: string;
}

export const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({
    purpose,
    items,
    retention,
    thirdParty,
    className = '',
}) => {
    return (
        <div className={`p-4 bg-gray-50 rounded-lg text-sm ${className}`}>
            <div className="flex items-start gap-2 mb-3">
                <Info className="w-4 h-4 text-[var(--uxp-color-primary)] flex-shrink-0 mt-0.5" />
                <span className="font-medium text-[var(--uxp-color-text)]">개인정보 수집·이용 안내</span>
            </div>

            <div className="space-y-2 text-[var(--uxp-color-text-secondary)]">
                <div>
                    <span className="font-medium">수집 목적:</span> {purpose}
                </div>
                <div>
                    <span className="font-medium">수집 항목:</span> {items.join(', ')}
                </div>
                <div>
                    <span className="font-medium">보관 기간:</span> {retention}
                </div>

                {thirdParty && (
                    <div className="pt-2 mt-2 border-t border-gray-200">
                        <div className="font-medium mb-1">제3자 제공</div>
                        <div>제공 대상: {thirdParty.recipient}</div>
                        <div>제공 목적: {thirdParty.purpose}</div>
                        <div>제공 항목: {thirdParty.items.join(', ')}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Consent;
