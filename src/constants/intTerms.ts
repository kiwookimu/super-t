/**
 * INT-005: 용어·정책·상태값 통합 표준
 * 서비스별로 달랐던 용어/정책/상태값을 통합 표준으로 정리
 */

// ===========================================
// 통합 서비스 용어 (4개 서비스 통합)
// ===========================================
export const SERVICE_TERMS = {
    // 행동 용어
    ACTIONS: {
        SUBSCRIBE: '가입',
        CHANGE: '변경',
        CANCEL: '해지',
        APPLY: '신청',
        REGISTER: '등록',
        DELETE: '삭제',
        MODIFY: '수정',
    },

    // 상품/서비스 유형
    PRODUCT_TYPES: {
        PLAN: '요금제',
        ADDON: '부가서비스',
        DEVICE: '단말기',
        ACCESSORY: '액세서리',
        ROAMING: '로밍',
    },

    // 가입 상태
    SUBSCRIPTION_STATUS: {
        ACTIVE: '이용 중',
        SUSPENDED: '일시정지',
        TERMINATED: '해지',
        PENDING: '신청 중',
    },
} as const;

// ===========================================
// 통합 상태값 (INT-005)
// ===========================================
export const UNIFIED_STATUS = {
    // 처리 상태
    PROCESSING: {
        code: 'PROCESSING',
        label: '처리 중',
        color: 'warning',
    },
    COMPLETED: {
        code: 'COMPLETED',
        label: '완료',
        color: 'success',
    },
    FAILED: {
        code: 'FAILED',
        label: '실패',
        color: 'error',
    },
    CANCELLED: {
        code: 'CANCELLED',
        label: '취소됨',
        color: 'muted',
    },
    PENDING: {
        code: 'PENDING',
        label: '대기 중',
        color: 'warning',
    },
    REJECTED: {
        code: 'REJECTED',
        label: '반려',
        color: 'error',
    },
} as const;

// ===========================================
// 통합 메뉴 구조 (INT-004)
// ===========================================
export const MENU_STRUCTURE = {
    MY_INFO: {
        id: 'my-info',
        label: '내 정보',
        icon: 'User',
        items: [
            { id: 'profile', label: '회원 정보', path: '/my/profile' },
            { id: 'lines', label: '회선 관리', path: '/my/lines' },
            { id: 'settings', label: '설정', path: '/my/settings' },
        ],
    },
    SUBSCRIPTION: {
        id: 'subscription',
        label: '가입 정보',
        icon: 'Smartphone',
        items: [
            { id: 'plan', label: '요금제', path: '/subscription/plan' },
            { id: 'addons', label: '부가서비스', path: '/subscription/addons' },
            { id: 'roaming', label: '로밍', path: '/subscription/roaming' },
        ],
    },
    PAYMENT: {
        id: 'payment',
        label: '결제/청구',
        icon: 'CreditCard',
        items: [
            { id: 'bill', label: '청구서', path: '/payment/bill' },
            { id: 'history', label: '결제 내역', path: '/payment/history' },
            { id: 'auto-pay', label: '자동납부', path: '/payment/auto' },
        ],
    },
    BENEFITS: {
        id: 'benefits',
        label: '혜택/쿠폰',
        icon: 'Gift',
        items: [
            { id: 'coupons', label: '쿠폰함', path: '/benefits/coupons' },
            { id: 'membership', label: '멤버십', path: '/benefits/membership' },
            { id: 'points', label: '포인트', path: '/benefits/points' },
        ],
    },
    SUPPORT: {
        id: 'support',
        label: '고객센터',
        icon: 'Headphones',
        items: [
            { id: 'faq', label: '자주 묻는 질문', path: '/support/faq' },
            { id: 'inquiry', label: '1:1 문의', path: '/support/inquiry' },
            { id: 'chat', label: 'AI 상담', path: '/support/chat' },
            { id: 'store', label: '매장 찾기', path: '/support/store' },
        ],
    },
    SETTINGS: {
        id: 'settings',
        label: '설정',
        icon: 'Settings',
        items: [
            { id: 'notification', label: '알림 설정', path: '/settings/notification' },
            { id: 'privacy', label: '개인정보', path: '/settings/privacy' },
            { id: 'terms', label: '약관/동의', path: '/settings/terms' },
        ],
    },
} as const;

// ===========================================
// 레거시 URL 매핑 (INT-008)
// ===========================================
export const LEGACY_ROUTES: Record<string, string> = {
    // 기존 앱 경로 → 통합 서비스 경로
    '/tworld/mypage': '/my',
    '/tworld/plan': '/subscription/plan',
    '/tworld/bill': '/payment/bill',
    '/oneapp/home': '/',
    '/oneapp/benefit': '/benefits',
    '/direct/shop': '/shop',
    '/direct/device': '/shop/device',
    '/biz/service': '/subscription/addons',
};

// ===========================================
// 서비스 브랜드 통합 (INT-011)
// ===========================================
export const SERVICE_BRANDS = {
    INTEGRATED: {
        name: 'Super T',
        description: '통합 모바일 서비스',
    },
    LEGACY: [
        { code: 'TWORLD', name: 'T world' },
        { code: 'ONEAPP', name: 'ONE앱' },
        { code: 'DIRECT', name: 'T다이렉트샵' },
        { code: 'BIZ', name: 'T비즈' },
    ],
} as const;

export type UnifiedStatusCode = keyof typeof UNIFIED_STATUS;
export type MenuCategory = keyof typeof MENU_STRUCTURE;
