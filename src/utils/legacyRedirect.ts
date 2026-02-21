/**
 * INT-008: 레거시 URL/딥링크 전환 리다이렉트
 * 기존 서비스 URL을 통합 서비스로 리다이렉트
 */

import { LEGACY_ROUTES } from '../constants/intTerms';

/**
 * 레거시 URL을 통합 서비스 경로로 변환
 */
export function getLegacyRedirect(legacyPath: string): string | null {
    // 정확히 일치하는 경로
    if (LEGACY_ROUTES[legacyPath]) {
        return LEGACY_ROUTES[legacyPath];
    }

    // 부분 일치 (prefix 매칭)
    for (const [legacy, newPath] of Object.entries(LEGACY_ROUTES)) {
        if (legacyPath.startsWith(legacy)) {
            const suffix = legacyPath.slice(legacy.length);
            return newPath + suffix;
        }
    }

    return null;
}

/**
 * URL 파라미터에서 딥링크 타겟 추출
 */
export function extractDeepLinkTarget(url: string): {
    target: string | null;
    params: Record<string, string>;
} {
    try {
        const urlObj = new URL(url, window.location.origin);
        const target = urlObj.searchParams.get('target') || urlObj.searchParams.get('redirect');
        const params: Record<string, string> = {};

        urlObj.searchParams.forEach((value, key) => {
            if (key !== 'target' && key !== 'redirect') {
                params[key] = value;
            }
        });

        return { target, params };
    } catch {
        return { target: null, params: {} };
    }
}

/**
 * 앱 스킴 딥링크 파싱
 * 예: supert://benefit/coupon?id=123
 */
export function parseAppSchemeDeepLink(deepLink: string): {
    path: string;
    params: Record<string, string>;
} | null {
    const schemePattern = /^supert:\/\/(.+)$/;
    const match = deepLink.match(schemePattern);

    if (!match) return null;

    const pathWithQuery = match[1];
    const [path, queryString] = pathWithQuery.split('?');
    const params: Record<string, string> = {};

    if (queryString) {
        const searchParams = new URLSearchParams(queryString);
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
    }

    return { path: '/' + path, params };
}

/**
 * INT-016: 통합 공지/장애 대응
 * 공통 공지 메시지 타입
 */
export interface SystemNotice {
    id: string;
    type: 'maintenance' | 'incident' | 'policy' | 'migration';
    severity: 'info' | 'warning' | 'critical';
    title: string;
    message: string;
    startAt?: Date;
    endAt?: Date;
    affectedServices?: string[];
    actionUrl?: string;
    actionLabel?: string;
}

/**
 * INT-017: 중복 기능 단일화
 * 기존 기능 → 통합 기능 매핑
 */
export const FEATURE_CONSOLIDATION: Record<string, string> = {
    // 혜택 관련
    '/tworld/benefit': '/benefits',
    '/oneapp/coupon': '/benefits/coupons',
    '/direct/point': '/benefits/points',

    // 구독 관리
    '/tworld/subscription': '/subscription/plan',
    '/oneapp/plan': '/subscription/plan',

    // 결제
    '/tworld/payment': '/payment',
    '/direct/checkout': '/payment',
};
