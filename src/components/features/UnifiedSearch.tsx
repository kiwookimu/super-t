import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';

/**
 * INT-020: 랜딩 상태 인지 / 전체 접근
 * 통합 검색 - 모든 서비스/기능을 한 곳에서 검색
 */

interface SearchResult {
    id: string;
    type: 'page' | 'feature' | 'product' | 'faq';
    title: string;
    description?: string;
    path: string;
}

interface UnifiedSearchProps {
    onSearch: (query: string) => void;
    onSelect: (item: SearchResult) => void;
    recentSearches?: string[];
    popularSearches?: string[];
}

const UnifiedSearch: React.FC<UnifiedSearchProps> = ({
    onSearch,
    onSelect,
    recentSearches = [],
    popularSearches = [],
}) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    const handleClear = () => {
        setQuery('');
    };

    const typeLabels: Record<SearchResult['type'], string> = {
        page: '페이지',
        feature: '기능',
        product: '상품',
        faq: 'FAQ',
    };

    const mockResults: SearchResult[] = query.length > 1 ? ([
        { id: '1', type: 'page', title: '요금제 변경', path: '/subscription/plan' },
        { id: '2', type: 'feature', title: '청구서 조회', description: '이번 달 청구서 확인', path: '/payment/bill' },
        { id: '3', type: 'product', title: '5G 프라임 요금제', description: '월 69,000원', path: '/shop/plan/5g-prime' },
        { id: '4', type: 'faq', title: '요금제 변경 방법', description: '자주 묻는 질문', path: '/support/faq/plan' },
    ] satisfies SearchResult[]).filter(r => r.title.includes(query) || r.description?.includes(query)) : [];

    return (
        <div className="relative">
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        placeholder="검색어를 입력하세요"
                        className="w-full h-12 pl-12 pr-12 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                    {query && (
                        <button type="button" onClick={handleClear} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200">
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                    )}
                </div>
            </form>

            {isFocused && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                >
                    {mockResults.length > 0 ? (
                        <div className="py-2">
                            {mockResults.map((result) => (
                                <button key={result.id} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left" onClick={() => onSelect(result)}>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{result.title}</p>
                                        {result.description && <p className="text-sm text-gray-500">{result.description}</p>}
                                    </div>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{typeLabels[result.type]}</span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <>
                            {recentSearches.length > 0 && (
                                <div className="p-4 border-b border-gray-100">
                                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-xs font-medium">최근 검색</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {recentSearches.map((term, i) => (
                                            <button key={i} onClick={() => setQuery(term)} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200">
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {popularSearches.length > 0 && (
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                                        <TrendingUp className="w-4 h-4" />
                                        <span className="text-xs font-medium">인기 검색어</span>
                                    </div>
                                    <div className="space-y-1">
                                        {popularSearches.slice(0, 5).map((term, i) => (
                                            <button key={i} onClick={() => setQuery(term)} className="w-full flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg px-2 -mx-2">
                                                <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-blue-500">{i + 1}</span>
                                                <span className="text-gray-700">{term}</span>
                                                <ArrowRight className="w-4 h-4 text-gray-300 ml-auto" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default UnifiedSearch;
export type { SearchResult, UnifiedSearchProps };
