import React, { useState, useEffect, useRef } from 'react';
// framer-motion removed - not used in Search
import { ArrowLeft, Search as SearchIcon, X, TrendingUp, ChevronRight, Smartphone, FileText, Settings, Gift, CreditCard, Box, Zap } from 'lucide-react';

interface SearchProps {
    onNavigate: (page: string) => void;
    onBack?: () => void;
}

const RECENT_SEARCHES_KEY = 'super-t-recent-searches';

// Mock Data
const MOCK_MENUS = [
    { title: '요금제 변경', path: '/subscription/plan/change', icon: FileText, keywords: ['요금', '요금제', 'change', 'plan'] },
    { title: '실시간 요금 조회', path: '/payment/bill', icon: CreditCard, keywords: ['요금', '청구', 'bill', 'payment'] },
    { title: '데이터 충전', path: '/data/recharge', icon: Zap, keywords: ['데이터', '충전', 'data', 'recharge'] },
    { title: '데이터 선물하기', path: '/data/gift', icon: Gift, keywords: ['데이터', '선물', 'data', 'gift'] },
    { title: '내 정보 설정', path: '/my/settings', icon: Settings, keywords: ['설정', '정보', 'settings', 'my'] },
    { title: '이용 서비스 상태', path: '/subscription/plan', icon: Smartphone, keywords: ['이용', '서비스', 'status', 'service'] },
    { title: '부가서비스 조회/변경', path: '/subscription/addons', icon: Box, keywords: ['부가', '서비스', 'addon'] },
    { title: '멤버십 바코드', path: '/benefits/membership', icon: CreditCard, keywords: ['멤버십', '바코드', 'membership'] },
];

const MOCK_PRODUCTS = [
    { id: 1, title: 'Galaxy S24 Ultra', price: '1,698,000원', category: '휴대폰', image: 'https://images.unsplash.com/photo-1610945265078-38584e26920b?w=200&h=200&fit=crop', keywords: ['galaxy', 's24', 'samsung', '갤럭시'] },
    { id: 2, title: 'iPhone 15 Pro', price: '1,550,000원', category: '휴대폰', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=200&h=200&fit=crop', keywords: ['iphone', '15', 'apple', '아이폰'] },
    { id: 3, title: 'Galaxy Z Flip5', price: '1,399,000원', category: '휴대폰', image: 'https://images.unsplash.com/photo-1692323868660-e883582488a0?w=200&h=200&fit=crop', keywords: ['galaxy', 'flip', 'z', '플립'] },
    { id: 4, title: 'T 우주 패스 life', price: '월 9,900원', category: '구독', image: 'https://images.unsplash.com/photo-1629239826359-5776d6537748?w=200&h=200&fit=crop', keywords: ['우주', '패스', 'subscription'] },
    { id: 5, title: 'Wavve 앤 데이터', price: '월 9,900원', category: '부가서비스', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop', keywords: ['wavve', '웨이브', 'video'] },
    { id: 6, title: 'FLO 앤 데이터', price: '월 7,900원', category: '부가서비스', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop', keywords: ['flo', '플로', 'music'] },
];

const MOCK_CONTENTS = [
    { id: 1, title: 'Galaxy S24 시리즈 출시 혜택 안내', type: '이벤트', date: '2024.01.19', keywords: ['galaxy', 's24', 'event', '혜택'] },
    { id: 2, title: 'T 멤버십 2월 T Day 혜택 미리보기', type: '멤버십', date: '2024.02.01', keywords: ['membership', 't day', '멤버십', '혜택'] },
    { id: 3, title: '요금제 변경 시 유의사항 안내', type: '가이드', date: '2023.12.15', keywords: ['요금', '변경', 'guide', '유의'] },
    { id: 4, title: '데이터 선물하기 이용 방법', type: '가이드', date: '2023.11.20', keywords: ['데이터', '선물', 'guide', '방법'] },
    { id: 5, title: '아이폰 15 프로 즉시 개통 가능', type: '공지', date: '2023.10.13', keywords: ['iphone', 'notice', '아이폰'] },
];

const Search: React.FC<SearchProps> = ({ onNavigate, onBack }) => {
    const [query, setQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<{
        menus: typeof MOCK_MENUS,
        products: typeof MOCK_PRODUCTS,
        contents: typeof MOCK_CONTENTS
    }>({ menus: [], products: [], contents: [] });

    const inputRef = useRef<HTMLInputElement>(null);

    // Mock Trending Searches
    const trendingSearches = [
        "iPhone 15",
        "요금제 변경",
        "데이터 충전",
        "멤버십 카드",
        "로밍",
        "가족 결합",
        "T 우주",
        "Galaxy S24",
    ];

    useEffect(() => {
        // Load recent searches
        const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
        // Auto focus
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Helper: Check if item matches query
    const matchItem = (item: any, q: string) => {
        const lowerQ = q.toLowerCase();
        // Check title
        if (item.title.toLowerCase().includes(lowerQ)) return true;
        // Check keywords
        if (item.keywords && item.keywords.some((k: string) => k.toLowerCase().includes(lowerQ))) return true;
        return false;
    };

    const handleSearch = (searchTerm: string) => {
        if (!searchTerm.trim()) return;

        // Save to recent
        const newRecent = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 10);
        setRecentSearches(newRecent);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newRecent));

        setQuery(searchTerm);

        // Filter Data
        const filteredMenus = MOCK_MENUS.filter(item => matchItem(item, searchTerm));
        const filteredProducts = MOCK_PRODUCTS.filter(item => matchItem(item, searchTerm));
        const filteredContents = MOCK_CONTENTS.filter(item => matchItem(item, searchTerm));

        setSearchResults({
            menus: filteredMenus,
            products: filteredProducts,
            contents: filteredContents
        });
    };

    const removeRecent = (term: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newRecent = recentSearches.filter(s => s !== term);
        setRecentSearches(newRecent);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newRecent));
    };

    const clearRecent = () => {
        setRecentSearches([]);
        localStorage.removeItem(RECENT_SEARCHES_KEY);
    };

    const handleMenuClick = (path: string) => {
        onNavigate(path);
    };

    const hasResults = searchResults.menus.length > 0 || searchResults.products.length > 0 || searchResults.contents.length > 0;

    return (
        <div className="bg-gray-50 min-h-screen pb-safe">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 px-4 py-3 flex items-center gap-3 border-b border-gray-100">
                <button onClick={onBack} className="p-1 -ml-1">
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </button>
                <div className="flex-1 relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (e.target.value === '') {
                                setSearchResults({ menus: [], products: [], contents: [] });
                            }
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                        placeholder="검색어를 입력해주세요"
                        className="w-full bg-gray-100 rounded-full px-4 py-2 pl-10 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    {query && (
                        <button
                            onClick={() => {
                                setQuery('');
                                setSearchResults({ menus: [], products: [], contents: [] });
                                inputRef.current?.focus();
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                        >
                            <div className="bg-gray-400 rounded-full p-0.5">
                                <X className="w-3 h-3 text-white" />
                            </div>
                        </button>
                    )}
                </div>
            </div>

            <div className="p-5 pb-20">
                {/* Search Results */}
                {query && hasResults ? (
                    <div className="space-y-6">
                        {/* 1. Menu Shortcuts */}
                        {searchResults.menus.length > 0 && (
                            <section>
                                <h3 className="font-bold text-gray-900 mb-3 text-lg">바로가기</h3>
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-100">
                                    {searchResults.menus.map((menu, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleMenuClick(menu.path)}
                                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                                    <menu.icon className="w-5 h-5" />
                                                </div>
                                                <div className="text-left">
                                                    <span className="block text-gray-900 font-medium">{menu.title}</span>
                                                    <span className="block text-xs text-gray-500">메뉴 바로가기</span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        </button>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 2. Products */}
                        {searchResults.products.length > 0 && (
                            <section>
                                <h3 className="font-bold text-gray-900 mb-3 text-lg">관련 상품</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {searchResults.products.map((product) => (
                                        <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                                            <div className="aspect-square bg-gray-100 relative">
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold rounded-full">
                                                    {product.category}
                                                </span>
                                            </div>
                                            <div className="p-3">
                                                <h4 className="font-medium text-gray-900 text-sm line-clamp-1 mb-1">{product.title}</h4>
                                                <p className="text-blue-600 font-bold text-sm">{product.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 3. Contents */}
                        {searchResults.contents.length > 0 && (
                            <section>
                                <h3 className="font-bold text-gray-900 mb-3 text-lg">관련 콘텐츠</h3>
                                <div className="space-y-3">
                                    {searchResults.contents.map((content) => (
                                        <div key={content.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                            <div className="flex items-start justify-between mb-1">
                                                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${content.type === '이벤트' ? 'bg-pink-100 text-pink-600' :
                                                    content.type === '멤버십' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {content.type}
                                                </span>
                                                <span className="text-xs text-gray-400">{content.date}</span>
                                            </div>
                                            <h4 className="text-gray-900 font-medium text-sm">{content.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                ) : query && !hasResults ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                            <SearchIcon className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">검색 결과가 없습니다</h3>
                        <p className="text-gray-500 text-sm">다른 검색어로 다시 시도해보세요.</p>
                    </div>
                ) : (
                    // Default View (Recent & Trending)
                    <div className="space-y-8">
                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                            <section>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-gray-900">최근 검색어</h3>
                                    <button onClick={clearRecent} className="text-xs text-gray-500 hover:text-gray-700">
                                        전체 삭제
                                    </button>
                                </div>
                                <div className="flex overflow-x-auto gap-2 no-scrollbar pb-1">
                                    {recentSearches.map((term, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSearch(term)}
                                            className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-gray-200 text-sm text-gray-700 shadow-sm"
                                        >
                                            <span>{term}</span>
                                            <div
                                                role="button"
                                                onClick={(e) => removeRecent(term, e)}
                                                className="text-gray-400 hover:text-gray-600 p-0.5"
                                            >
                                                <X className="w-3 h-3" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Trending Searches */}
                        <section>
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-blue-500" />
                                급상승 검색어
                            </h3>
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 grid grid-cols-2 gap-x-6 gap-y-4">
                                {trendingSearches.map((term, index) => (
                                    <button
                                        key={term}
                                        onClick={() => handleSearch(term)}
                                        className="flex items-center gap-3 text-left group"
                                    >
                                        <span className={`w-4 font-bold ${index < 3 ? 'text-blue-500' : 'text-gray-400'}`}>
                                            {index + 1}
                                        </span>
                                        <span className="text-sm text-gray-800 truncate flex-1 group-hover:text-blue-600 transition-colors">{term}</span>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
