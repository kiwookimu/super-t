import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Smartphone, Filter, Star, Sparkles, Tag, TrendingUp
} from 'lucide-react';

interface ShopListPageProps {
    onBack: () => void;
    onNavigate?: (page: string) => void;
    filter?: 'recommended' | 'new' | 'popular' | 'sale';
}

const ShopListPage: React.FC<ShopListPageProps> = ({ onBack, filter = 'recommended' }) => {
    const [activeFilter, setActiveFilter] = useState(filter);

    const filters = [
        { id: 'recommended', label: '맞춤 추천', icon: Sparkles },
        { id: 'new', label: '신상품', icon: Star },
        { id: 'popular', label: '인기 상품', icon: TrendingUp },
        { id: 'sale', label: '할인 중', icon: Tag },
    ] as const;

    const products = [
        { id: '1', name: 'Galaxy S24 Ultra', price: 1650000, originalPrice: 1800000, image: '', tags: ['NEW', '인기'], rating: 4.8 },
        { id: '2', name: 'Galaxy Z Fold6', price: 2200000, originalPrice: 2400000, image: '', tags: ['NEW'], rating: 4.7 },
        { id: '3', name: 'iPhone 15 Pro Max', price: 1900000, originalPrice: null, image: '', tags: ['인기'], rating: 4.9 },
        { id: '4', name: 'Galaxy Tab S9 Ultra', price: 1450000, originalPrice: 1600000, image: '', tags: ['할인'], rating: 4.6 },
        { id: '5', name: 'Galaxy Watch 7', price: 450000, originalPrice: 500000, image: '', tags: ['NEW', '할인'], rating: 4.5 },
        { id: '6', name: 'Galaxy Buds3 Pro', price: 280000, originalPrice: 320000, image: '', tags: ['할인'], rating: 4.4 },
    ];

    const getFilteredProducts = () => {
        switch (activeFilter) {
            case 'new':
                return products.filter(p => p.tags.includes('NEW'));
            case 'popular':
                return products.filter(p => p.tags.includes('인기'));
            case 'sale':
                return products.filter(p => p.originalPrice !== null);
            default:
                return products;
        }
    };

    const filteredProducts = getFilteredProducts();

    const getTitle = () => {
        switch (activeFilter) {
            case 'new': return '신상품';
            case 'popular': return '인기 상품';
            case 'sale': return '할인 중';
            default: return '맞춤 추천';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between z-10">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg mr-2">
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">{getTitle()}</h1>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Filter className="w-5 h-5 text-gray-600" />
                </button>
            </header>

            <main className="px-5 pt-4 space-y-4">
                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2 overflow-x-auto no-scrollbar py-1"
                >
                    {filters.map((f) => {
                        const Icon = f.icon;
                        return (
                            <button
                                key={f.id}
                                onClick={() => setActiveFilter(f.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeFilter === f.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-600 border border-gray-200'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {f.label}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Product Count */}
                <p className="text-sm text-gray-500 px-1">
                    총 <span className="font-bold text-gray-900">{filteredProducts.length}</span>개 상품
                </p>

                {/* Product Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 gap-3"
                >
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                        >
                            {/* Product Image */}
                            <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center relative">
                                <Smartphone className="w-12 h-12 text-gray-300" />
                                {product.tags.length > 0 && (
                                    <div className="absolute top-2 left-2 flex gap-1">
                                        {product.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${tag === 'NEW' ? 'bg-blue-500 text-white' :
                                                        tag === '인기' ? 'bg-red-500 text-white' :
                                                            'bg-green-500 text-white'
                                                    }`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                <h3 className="text-sm font-bold text-gray-900 truncate">{product.name}</h3>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                    <span className="text-xs text-gray-500">{product.rating}</span>
                                </div>
                                <div className="mt-2">
                                    {product.originalPrice && (
                                        <p className="text-xs text-gray-400 line-through">
                                            {product.originalPrice.toLocaleString()}원
                                        </p>
                                    )}
                                    <p className="text-sm font-bold text-blue-600">
                                        {product.price.toLocaleString()}원
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
};

export default ShopListPage;
