import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Smartphone, Tablet, Watch, Headphones, Router,
    ChevronRight, Search, SlidersHorizontal, Grid3X3, List,
    Star, Heart, Sparkles, Play
} from 'lucide-react';

/**
 * DSP (전시/상품) 요구사항 구현
 * - DSP-001: 전시 진입 (홈/카테고리)
 * - DSP-002: 홈 전시 슬롯 구성
 * - DSP-003~005: 카테고리 전시 + 필터/정렬
 * - DSP-008/010: 상품 상세 연결
 * - DSP-015: 가격/혜택 표시 규칙
 */

interface ShopProps {
    onNavigate?: (page: string) => void;
    initialCategory?: Category;
}

type Category = 'all' | 'phone' | 'tablet' | 'wearable' | 'accessory' | 'home' | 'subscription' | 'plan' | 'addon';
type SortOption = 'popular' | 'newest' | 'price_low' | 'price_high' | 'discount';

interface Product {
    id: string;
    name: string;
    brand: string;
    category: Category;
    price: number;
    originalPrice?: number;
    monthlyPrice?: number;
    rating: number;
    reviewCount: number;
    tags: string[];
    imageUrl?: string;
    isNew?: boolean;
    isBest?: boolean;
    isSubscription?: boolean;
    subDescription?: string;
}

const Shop: React.FC<ShopProps> = ({ onNavigate, initialCategory }) => {
    const [activeCategory, setActiveCategory] = useState<Category>(initialCategory || 'all');
    const [sortOption, setSortOption] = useState<SortOption>('popular');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    // DSP-001: Category list
    const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
        { id: 'all', label: '전체', icon: <Grid3X3 className="w-5 h-5" /> },
        { id: 'plan', label: '요금제', icon: <Sparkles className="w-5 h-5" /> },
        { id: 'addon', label: '부가서비스', icon: <Play className="w-5 h-5" /> },
        { id: 'subscription', label: '구독', icon: <Star className="w-5 h-5" /> },
        { id: 'phone', label: '휴대폰', icon: <Smartphone className="w-5 h-5" /> },
        { id: 'tablet', label: '태블릿', icon: <Tablet className="w-5 h-5" /> },
        { id: 'wearable', label: '웨어러블', icon: <Watch className="w-5 h-5" /> },
        { id: 'accessory', label: '액세서리', icon: <Headphones className="w-5 h-5" /> },
        { id: 'home', label: '홈 IoT', icon: <Router className="w-5 h-5" /> },
    ];

    // Mock products data
    const products: Product[] = [
        {
            id: 'sub1', name: 'Netflix', brand: 'T 우주', category: 'subscription',
            price: 9500, originalPrice: 12000,
            rating: 4.9, reviewCount: 5432, tags: ['인기', '첫 달 100원'], isBest: true, isSubscription: true,
            subDescription: '광고 없는 영화, 시리즈 시청'
        },
        {
            id: 'sub2', name: 'YouTube Premium', brand: 'T 우주', category: 'subscription',
            price: 10450, originalPrice: 14900,
            rating: 4.8, reviewCount: 4210, tags: ['BEST', '음악 포함'], isBest: true, isSubscription: true,
            subDescription: '광고 제거 및 오프라인 저장'
        },
        {
            id: '1', name: 'Galaxy S24 Ultra', brand: '삼성', category: 'phone',
            price: 1650000, originalPrice: 1850000, monthlyPrice: 68750,
            rating: 4.8, reviewCount: 2341, tags: ['5G', 'AI'], isBest: true,
            imageUrl: '/assets/products/galaxy_s24_ultra_product_1770441969089.png'
        },
        {
            id: '2', name: 'iPhone 15 Pro Max', brand: 'Apple', category: 'phone',
            price: 1900000, monthlyPrice: 79166,
            rating: 4.9, reviewCount: 1892, tags: ['5G', 'ProMotion'], isNew: true,
            imageUrl: '/assets/products/iphone_15_pro_max_product_1770441985799.png'
        },
        {
            id: '3', name: 'Galaxy Z Fold6', brand: '삼성', category: 'phone',
            price: 2200000, originalPrice: 2400000, monthlyPrice: 91666,
            rating: 4.7, reviewCount: 856, tags: ['폴더블', '5G'],
            imageUrl: '/assets/products/galaxy_z_fold6_product_v2_1770442007265.png'
        },
        {
            id: '4', name: 'Galaxy Tab S9 Ultra', brand: '삼성', category: 'tablet',
            price: 1450000, monthlyPrice: 60416,
            rating: 4.6, reviewCount: 432, tags: ['S펜 포함'],
            imageUrl: '/assets/products/galaxy_tab_s9_ultra_product_v2_1770442025178.png'
        },
        {
            id: '5', name: 'Galaxy Watch 7', brand: '삼성', category: 'wearable',
            price: 450000, originalPrice: 500000, monthlyPrice: 18750,
            rating: 4.5, reviewCount: 678, tags: ['건강관리'], isNew: true,
            imageUrl: '/assets/products/galaxy_watch_7_product_v2_1770442039097.png'
        },
        {
            id: '6', name: 'Galaxy Buds 3 Pro', brand: '삼성', category: 'accessory',
            price: 350000, monthlyPrice: 14583,
            rating: 4.4, reviewCount: 1234, tags: ['ANC', '무선충전'],
            imageUrl: '/assets/products/galaxy_buds_3_pro_product_v2_1770442054119.png'
        },
        // 요금제 (Plan) 상품
        {
            id: 'plan1', name: '5G 프리미엄', brand: 'Super T', category: 'plan',
            price: 85000,
            rating: 4.8, reviewCount: 8234, tags: ['데이터 무제한', '인기'], isBest: true,
            subDescription: '데이터 무제한 + 넷플릭스 포함'
        },
        {
            id: 'plan2', name: '5G 스탠다드', brand: 'Super T', category: 'plan',
            price: 69000, originalPrice: 75000,
            rating: 4.7, reviewCount: 5621, tags: ['100GB', '할인'],
            subDescription: '데이터 100GB + 통화 무제한'
        },
        {
            id: 'plan3', name: '5G 라이트', brand: 'Super T', category: 'plan',
            price: 55000,
            rating: 4.5, reviewCount: 3420, tags: ['50GB', '가성비'], isNew: true,
            subDescription: '데이터 50GB + 통화 무제한'
        },
        // 부가서비스 (Addon) 상품
        {
            id: 'addon1', name: '콜링 차단', brand: 'Super T', category: 'addon',
            price: 2200,
            rating: 4.6, reviewCount: 1523, tags: ['스팸 차단'],
            subDescription: '광고/스팸 전화 자동 차단'
        },
        {
            id: 'addon2', name: '클라우드 저장소', brand: 'Super T', category: 'addon',
            price: 3300, originalPrice: 5500,
            rating: 4.7, reviewCount: 2341, tags: ['100GB', '할인'], isBest: true,
            subDescription: '사진/동영상 자동 백업'
        },
        {
            id: 'addon3', name: '데이터 선물', brand: 'Super T', category: 'addon',
            price: 0,
            rating: 4.4, reviewCount: 892, tags: ['무료'], isNew: true,
            subDescription: '가족/친구에게 데이터 선물'
        },
    ];

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory);

    // DSP-003: Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            case 'price_low': return a.price - b.price;
            case 'price_high': return b.price - a.price;
            case 'discount': return (b.originalPrice ? b.originalPrice - b.price : 0) - (a.originalPrice ? a.originalPrice - a.price : 0);
            default: return b.reviewCount - a.reviewCount; // popular
        }
    });

    return (
        <div className="space-y-4 pb-24 px-5 py-2 max-w-md md:max-w-full xl:max-w-7xl mx-auto transition-all duration-300">
            {/* Header */}
            <header className="flex justify-between items-center pt-2">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Shop</h1>
                    <p className="text-sm text-gray-500 mt-0.5">최신 기기부터 다양한 혜택까지</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        <Search className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </header>

            {/* DSP-002: Featured Banner Slot */}
            <motion.div
                className="relative h-40 lg:h-72 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br from-[#1e293b] to-[#334155] shadow-lg border border-white/5"
                whileTap={{ scale: 0.98 }}
            >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 p-6 md:p-10 text-white h-full flex flex-col justify-center items-start">
                    <span className="inline-block px-2.5 py-1 bg-blue-500 text-white text-[10px] md:text-sm font-bold rounded-lg mb-3 w-fit tracking-wider shadow-sm">NEW</span>
                    <h2 className="text-xl md:text-4xl font-bold leading-tight mb-2">Galaxy S24 시리즈</h2>
                    <p className="text-sm md:text-lg text-gray-300 mt-1.5">AI 폰의 새로운 시대, 지금 바로 만나보세요.</p>
                    <p className="text-sm md:text-base font-semibold text-blue-400 mt-4 md:mt-8 flex items-center gap-1.5 group cursor-pointer hover:text-blue-300 transition-colors">
                        자세히 보기 <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </p>
                </div>
            </motion.div>

            {/* DSP-001: Category Tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 md:flex-wrap md:mx-0 md:px-0">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat.id
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {cat.icon}
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* DSP-003: Sort & Filter Bar */}
            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        className="text-sm font-medium text-gray-700 bg-transparent border-none focus:ring-0 cursor-pointer hover:text-gray-900"
                    >
                        <option value="popular">인기순</option>
                        <option value="newest">최신순</option>
                        <option value="price_low">낮은 가격순</option>
                        <option value="price_high">높은 가격순</option>
                        <option value="discount">할인율순</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {viewMode === 'grid' ?
                            <List className="w-4 h-4 text-gray-500" /> :
                            <Grid3X3 className="w-4 h-4 text-gray-500" />
                        }
                    </button>
                </div>
            </div>

            {/* DSP-004/005: Product Grid */}
            <section className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 xl:gap-6' : 'space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0'}>
                {sortedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        viewMode={viewMode}
                        onNavigate={onNavigate}
                    />
                ))}
            </section>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">해당 카테고리에 상품이 없습니다</p>
                </div>
            )}
        </div>
    );
};

// ========================================
// DSP-008/010/015: Product Card Component
// ========================================
const ProductCard: React.FC<{
    product: Product;
    viewMode: 'grid' | 'list';
    onNavigate?: (page: string) => void;
}> = ({ product, viewMode, onNavigate }) => {
    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    const renderIcon = () => {
        if (product.name === 'Netflix') {
            return (
                <div className="w-full h-full bg-[#E50914] flex items-center justify-center">
                    <span className="text-white font-black text-3xl italic">N</span>
                </div>
            );
        }
        if (product.name === 'YouTube Premium') {
            return (
                <div className="w-full h-full bg-[#FF0000] flex items-center justify-center">
                    <Play className="w-12 h-12 text-white fill-white" />
                </div>
            );
        }
        return (
            <div className="w-full h-full flex items-center justify-center bg-blue-50">
                <Sparkles className="w-12 h-12 text-blue-400" />
            </div>
        );
    };

    if (viewMode === 'list') {
        return (
            <motion.div
                className="toss-card p-4 flex gap-4 cursor-pointer"
                whileTap={{ scale: 0.99 }}
                onClick={() => onNavigate?.('detail')}
            >
                {/* Image / Icon */}
                <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    {product.isSubscription ? (
                        renderIcon()
                    ) : product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-2" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Smartphone className="w-10 h-10 text-gray-300" />
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                        {product.isNew && <Badge text="NEW" color="blue" />}
                        {product.isBest && <Badge text="BEST" color="red" />}
                        {discount > 0 && <Badge text={`${discount}%`} color="green" />}
                    </div>
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                    {product.subDescription && (
                        <p className="text-[11px] text-gray-400 truncate">{product.subDescription}</p>
                    )}

                    {/* DSP-015: Price Display */}
                    <div className="mt-2">
                        {product.originalPrice && (
                            <p className="text-xs text-gray-400 line-through">
                                {product.originalPrice.toLocaleString()}원
                            </p>
                        )}
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-gray-900">
                                {product.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500">원</span>
                            {product.isSubscription && <span className="text-xs text-gray-400 ml-1">/ 월</span>}
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviewCount})</span>
                    </div>
                </div>

                {/* Wishlist */}
                <button className="p-2 self-start">
                    <Heart className="w-5 h-5 text-gray-300" />
                </button>
            </motion.div>
        );
    }

    // Grid View
    return (
        <motion.div
            className="toss-card overflow-hidden cursor-pointer"
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate?.('detail')}
        >
            {/* Image / Icon */}
            <div className="relative">
                <div className="w-full h-40 bg-gray-100 overflow-hidden">
                    {product.isSubscription ? (
                        renderIcon()
                    ) : product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-3" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Smartphone className="w-12 h-12 text-gray-300" />
                        </div>
                    )}
                </div>
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full z-10">
                    <Heart className="w-4 h-4 text-gray-400" />
                </button>
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    {product.isNew && <Badge text="NEW" color="blue" />}
                    {product.isBest && <Badge text="BEST" color="red" />}
                </div>
            </div>

            {/* Info */}
            <div className="p-3">
                <p className="text-[10px] text-gray-500">{product.brand}</p>
                <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
                {product.subDescription && (
                    <p className="text-[10px] text-gray-400 truncate mt-0.5">{product.subDescription}</p>
                )}

                {/* Tags */}
                <div className="flex gap-1 mt-1.5">
                    {product.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-[10px] text-gray-500 rounded">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* DSP-015: Price Display */}
                <div className="mt-2.5">
                    {discount > 0 && (
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-red-500">{discount}%</span>
                            <span className="text-[10px] text-gray-400 line-through">
                                {product.originalPrice?.toLocaleString()}
                            </span>
                        </div>
                    )}
                    <p className="text-base font-bold text-gray-900">
                        {product.price.toLocaleString()}
                        <span className="text-sm font-normal text-gray-500">원</span>
                        {product.isSubscription && <span className="text-xs text-gray-400 ml-1">/ 월</span>}
                    </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviewCount})</span>
                </div>
            </div>
        </motion.div>
    );
};

// Badge Component
const Badge: React.FC<{ text: string; color: 'blue' | 'red' | 'green' }> = ({ text, color }) => {
    const colors = {
        blue: 'bg-blue-500 text-white',
        red: 'bg-red-500 text-white',
        green: 'bg-green-500 text-white',
    };
    return (
        <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${colors[color]}`}>
            {text}
        </span>
    );
};

export default Shop;
