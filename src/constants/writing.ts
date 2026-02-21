/**
 * UXP-010: Writing System (용어·문구 표준)
 * - 용어(가입/신청/구매/개통/설치), 상태값(처리중/완료/반려)
 * - 오류/안내 템플릿 통일
 * - CTA/안내에는 다음 화면을 예측할 힌트 포함
 */

// ===========================================
// CTA 표준 문구 (UXP-003: 행동+결과)
// ===========================================
export const CTA = {
    // 요금제
    PLAN_CHANGE: '요금제 변경하기',
    PLAN_SUBSCRIBE: '요금제 가입하기',
    PLAN_COMPARE: '요금제 비교하기',

    // 결제/청구
    PAYMENT: '결제하기',
    PAY_BILL: '요금 납부하기',
    VIEW_BILL: '청구서 확인하기',

    // 부가서비스
    SERVICE_ADD: '서비스 추가하기',
    SERVICE_CANCEL: '서비스 해지하기',

    // 데이터
    DATA_REFILL: '데이터 충전하기',
    DATA_SHARE: '데이터 선물하기',
    DATA_CHECK: '데이터 사용량 확인하기',

    // 로밍
    ROAMING_APPLY: '로밍 신청하기',
    ROAMING_CANCEL: '로밍 해지하기',

    // 일반
    CONTINUE: '계속하기',
    CONFIRM: '확인',
    CANCEL: '취소',
    RETRY: '다시 시도하기',
    GO_HOME: '홈으로 가기',
    GO_BACK: '이전으로',
    LEARN_MORE: '자세히 보기',
    CONTACT_CS: '고객센터 문의하기',
} as const;

// ===========================================
// 상태값 표준 문구
// ===========================================
export const STATUS = {
    // 처리 상태
    PENDING: '처리 중',
    PROCESSING: '처리 중',
    COMPLETED: '완료',
    FAILED: '실패',
    CANCELLED: '취소됨',
    REJECTED: '반려',

    // 신청 상태
    APPLIED: '신청 완료',
    APPROVED: '승인',
    REVIEWING: '심사 중',

    // 결제 상태
    PAID: '결제 완료',
    UNPAID: '미결제',
    REFUNDED: '환불 완료',
    OVERDUE: '연체',
} as const;

// ===========================================
// 에러 메시지 표준 (UXP-007)
// ===========================================
export const ERROR_MESSAGES = {
    // 네트워크
    NETWORK_ERROR: '네트워크 연결을 확인해 주세요',
    SERVER_ERROR: '일시적인 오류가 발생했어요',
    TIMEOUT: '요청 시간이 초과되었어요',

    // 인증
    SESSION_EXPIRED: '로그인이 만료되었어요',
    AUTH_FAILED: '인증에 실패했어요',
    PERMISSION_DENIED: '접근 권한이 없어요',

    // 입력
    INVALID_INPUT: '입력 정보를 확인해 주세요',
    REQUIRED_FIELD: '필수 항목을 입력해 주세요',
    INVALID_FORMAT: '올바른 형식으로 입력해 주세요',

    // 비즈니스
    NOT_ELIGIBLE: '이용 조건에 맞지 않아요',
    ALREADY_APPLIED: '이미 신청되어 있어요',
    SERVICE_UNAVAILABLE: '현재 이용할 수 없는 서비스예요',
    LIMIT_EXCEEDED: '이용 한도를 초과했어요',
} as const;

// ===========================================
// 안내 메시지 표준
// ===========================================
export const INFO_MESSAGES = {
    // 성공
    SAVE_SUCCESS: '저장되었어요',
    APPLY_SUCCESS: '신청이 완료되었어요',
    CANCEL_SUCCESS: '취소되었어요',
    CHANGE_SUCCESS: '변경되었어요',

    // 안내
    LOADING: '잠시만 기다려 주세요',
    PROCESSING: '처리 중이에요',
    EMPTY_RESULT: '결과가 없어요',

    // 확인
    CONFIRM_DELETE: '정말 삭제하시겠어요?',
    CONFIRM_CANCEL: '정말 취소하시겠어요?',
    CONFIRM_CHANGE: '변경 사항을 저장하시겠어요?',
} as const;

// ===========================================
// 빈 상태 메시지
// ===========================================
export const EMPTY_STATE = {
    NO_DATA: '아직 데이터가 없어요',
    NO_RESULT: '검색 결과가 없어요',
    NO_HISTORY: '이용 내역이 없어요',
    NO_NOTIFICATION: '알림이 없어요',
    NO_COUPON: '사용 가능한 쿠폰이 없어요',
    NO_BENEFIT: '받을 수 있는 혜택이 없어요',
} as const;

// ===========================================
// 용어 통일
// ===========================================
export const TERMS = {
    // 행동 용어
    ACTION: {
        SIGN_UP: '가입',
        APPLY: '신청',
        PURCHASE: '구매',
        ACTIVATE: '개통',
        INSTALL: '설치',
        CANCEL: '해지',
        CHANGE: '변경',
    },

    // 요금 관련
    BILLING: {
        PLAN: '요금제',
        BILL: '청구서',
        PAYMENT: '결제',
        USAGE: '사용량',
        DISCOUNT: '할인',
        BENEFIT: '혜택',
    },

    // 서비스
    SERVICE: {
        DATA: '데이터',
        VOICE: '음성',
        SMS: '문자',
        ROAMING: '로밍',
        ADDON: '부가서비스',
    },
} as const;

// ===========================================
// 에러 코드 매핑 (UXP-007: 분석 연계)
// ===========================================
export const ERROR_CODES = {
    // 시스템
    'ERR_NETWORK': { message: ERROR_MESSAGES.NETWORK_ERROR, solution: '네트워크 연결 후 다시 시도해 주세요' },
    'ERR_SERVER': { message: ERROR_MESSAGES.SERVER_ERROR, solution: '잠시 후 다시 시도해 주세요' },
    'ERR_TIMEOUT': { message: ERROR_MESSAGES.TIMEOUT, solution: '네트워크 상태를 확인 후 다시 시도해 주세요' },

    // 인증
    'ERR_AUTH_EXPIRED': { message: ERROR_MESSAGES.SESSION_EXPIRED, solution: '다시 로그인해 주세요' },
    'ERR_AUTH_FAILED': { message: ERROR_MESSAGES.AUTH_FAILED, solution: '정보를 확인 후 다시 시도해 주세요' },

    // 비즈니스
    'ERR_NOT_ELIGIBLE': { message: ERROR_MESSAGES.NOT_ELIGIBLE, solution: '이용 조건을 확인해 주세요' },
    'ERR_ALREADY_APPLIED': { message: ERROR_MESSAGES.ALREADY_APPLIED, solution: '신청 내역에서 확인해 주세요' },
    'ERR_LIMIT': { message: ERROR_MESSAGES.LIMIT_EXCEEDED, solution: '이용 한도를 확인해 주세요' },
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;
