// Basic Mock Store using LocalStorage for persistence

export interface Plan {
    id: string;
    name: string;
    price: number;
    data: string;
    voice: string;
    sms: string;
    features: string[];
    renewalDate: string;
}

export const ALL_PLANS: Record<string, Plan> = {
    'basic': {
        id: 'basic',
        name: '5G 베이직',
        price: 45000,
        data: '10GB',
        voice: '무제한',
        sms: '무제한',
        features: ['기본 데이터'],
        renewalDate: '2026.03.01',
    },
    'standard': {
        id: 'standard',
        name: '5G 스탠다드',
        price: 65000,
        data: '50GB',
        voice: '무제한',
        sms: '무제한',
        features: ['넷플릭스 베이직', '5G 속도'],
        renewalDate: '2026.03.01',
    },
    'premium': {
        id: 'premium',
        name: '5G 프라임',
        price: 89000,
        data: '무제한',
        voice: '무제한',
        sms: '무제한',
        features: ['넷플릭스 베이직', '유튜브 프리미엄', 'T 멤버십 VIP'],
        renewalDate: '2026.03.01',
    },
    'premium-plus': {
        id: 'premium-plus',
        name: '5G 프라임 플러스',
        price: 99000,
        data: '무제한',
        voice: '무제한',
        sms: '무제한',
        features: ['넷플릭스 프리미엄', '유튜브 프리미엄', 'T 멤버십 VVIP', '해외로밍 10GB'],
        renewalDate: '2026.03.01',
    },
    'family': {
        id: 'family',
        name: '5G 패밀리',
        price: 110000,
        data: '무제한 (4인)',
        voice: '무제한',
        sms: '무제한',
        features: ['가족 4인 공유', '넷플릭스', '디즈니+'],
        renewalDate: '2026.03.01',
    },
};

const DEFAULT_STATE = {
    currentPlanId: 'premium',
    dataUsage: {
        used: 12.5,
        total: 100
    },
    billing: {
        amount: 82000,
        month: '2월',
        status: 'unpaid' as 'unpaid' | 'paid'
    }
};

export const mockStore = {
    getState: () => {
        const saved = localStorage.getItem('super_ch_state');
        return saved ? JSON.parse(saved) : DEFAULT_STATE;
    },

    updatePlan: (planId: string) => {
        const state = mockStore.getState();
        const newState = { ...state, currentPlanId: planId };
        localStorage.setItem('super_ch_state', JSON.stringify(newState));
        window.dispatchEvent(new Event('mockStorageUpdate'));
    },

    payBill: () => {
        const state = mockStore.getState();
        const newState = {
            ...state,
            billing: { ...state.billing, status: 'paid' }
        };
        localStorage.setItem('super_ch_state', JSON.stringify(newState));
        window.dispatchEvent(new Event('mockStorageUpdate'));
    },

    getCurrentPlan: (): Plan => {
        const state = mockStore.getState();
        return ALL_PLANS[state.currentPlanId] || ALL_PLANS['premium'];
    }
};
