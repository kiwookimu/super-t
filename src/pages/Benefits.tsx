import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Gift, Star, Clock, Play, Pause,
    Coffee, Film, Music, ShoppingBag, Utensils
} from 'lucide-react';

// ========================================
// Interfaces
// ========================================
interface BenefitsProps {
    onNavigate?: (page: string) => void;
}

type BenefitCategory = 'all' | 'coupon' | 'membership' | 'event' | 'partner';

interface Coupon {
    id: string;
    brand: string;
    title: string;
    discount: string;
    expiry: string;
    category: string;
    isNew?: boolean;
    isHot?: boolean;
}

interface BannerItem {
    id: string;
    tag: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    pattern: string;
}

// ========================================
// Main Component
// ========================================
const Benefits: React.FC<BenefitsProps> = () => {
    // ----------------------------------
    // State: Categories & Data
    // ----------------------------------
    const [activeCategory, setActiveCategory] = useState<BenefitCategory>('all');

    const categories: { id: BenefitCategory; label: string }[] = [
        { id: 'all', label: '전체' },
        { id: 'coupon', label: '쿠폰' },
        { id: 'membership', label: '멤버십' },
        { id: 'event', label: '이벤트' },
        { id: 'partner', label: '제휴혜택' },
    ];

    // Mock coupons data
    const coupons: Coupon[] = [
        { id: '1', brand: '스타벅스', title: '아메리카노 50% 할인', discount: '50%', expiry: '2월 28일', category: 'cafe', isHot: true },
        { id: '2', brand: 'CGV', title: '영화 관람권 5,000원 할인', discount: '5,000원', expiry: '3월 15일', category: 'movie', isNew: true },
        { id: '3', brand: '배달의민족', title: '첫 주문 3,000원 할인', discount: '3,000원', expiry: '2월 20일', category: 'food' },
        { id: '4', brand: '멜론', title: '이용권 1개월 무료', discount: '무료', expiry: '3월 31일', category: 'music', isNew: true },
        { id: '5', brand: 'GS25', title: '5,000원 이상 10% 할인', discount: '10%', expiry: '2월 25일', category: 'convenience' },
    ];

    const categoryIcons: Record<string, React.ReactNode> = {
        cafe: <Coffee className="w-5 h-5" />,
        movie: <Film className="w-5 h-5" />,
        music: <Music className="w-5 h-5" />,
        food: <Utensils className="w-5 h-5" />,
        convenience: <ShoppingBag className="w-5 h-5" />,
    };

    // ----------------------------------
    // State: Barcode
    // ----------------------------------
    const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
    const [barcodePattern, setBarcodePattern] = useState<number[]>([]);
    const [magicBarcode, setMagicBarcode] = useState(true);
    const [paymentBarcode, setPaymentBarcode] = useState(false);

    useEffect(() => {
        setBarcodePattern(Array.from({ length: 38 }, () => Math.random() > 0.5 ? 1 : 2.5));

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setBarcodePattern(Array.from({ length: 38 }, () => Math.random() > 0.5 ? 1 : 2.5));
                    return 1200;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // ----------------------------------
    // State: Banner Carousel
    // ----------------------------------
    const [[currentBanner, direction], setBanner] = useState([0, 0]);
    const [isPlaying, setIsPlaying] = useState(true);

    const banners: BannerItem[] = [
        {
            id: '1',
            tag: '이번 주 혜택',
            title: 'T Day 혜택 확인하기',
            description: '도미노피자 50% 할인 + 콜라 무료',
            icon: <Gift className="w-5 h-5 text-white" />,
            color: 'from-blue-500 to-rose-500',
            pattern: 'bg-white/20'
        },
        {
            id: '2',
            tag: '0 day',
            title: '매달 10, 20, 30일',
            description: 'MZ세대를 위한 특별한 혜택',
            icon: <Star className="w-5 h-5 text-white" />,
            color: 'from-blue-500 to-indigo-600',
            pattern: 'bg-white/10'
        },
        {
            id: '3',
            tag: 'VIP Pick',
            title: '나만의 VIP 혜택',
            description: '연 12회, 영화/커피/편의점 무료',
            icon: <Star className="w-5 h-5 text-amber-100" />,
            color: 'from-amber-400 to-orange-500',
            pattern: 'bg-white/20'
        }
    ];

    const paginate = (newDirection: number) => {
        setBanner(([prevPage]) => {
            const nextPage = (prevPage + newDirection + banners.length) % banners.length;
            return [nextPage, newDirection];
        });
    };

    useEffect(() => {
        if (!isPlaying) return;

        const timer = setInterval(() => {
            paginate(1);
        }, 4000);
        return () => clearInterval(timer);
    }, [banners.length, isPlaying]);

    const handleDragEnd = (_event: any, info: any) => {
        const swipeThreshold = 50;
        if (info.offset.x > swipeThreshold) {
            paginate(-1);
        } else if (info.offset.x < -swipeThreshold) {
            paginate(1);
        }
    };

    const variants = {
        enter: (d: number) => ({
            x: d > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (d: number) => ({
            zIndex: 0,
            x: d < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.95
        })
    };

    // ========================================
    // Render
    // ========================================
    return (
        <div className="space-y-5 pb-24 px-5 py-2 max-w-md md:max-w-full xl:max-w-7xl mx-auto transition-all duration-300">
            {/* Header */}
            <header className="flex justify-between items-center pt-2">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">혜택</h1>
                    <p className="text-sm text-gray-500 mt-0.5">나만의 특별한 혜택</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full">
                    <Star className="w-4 h-4 text-white" />
                    <span className="text-sm font-bold text-white">VIP</span>
                </div>
            </header>

            <div className="flex flex-col xl:grid xl:grid-cols-12 xl:gap-6 space-y-5 md:space-y-0">
                {/* Right Column: Membership Summary (First on mobile) */}
                <div className="xl:col-span-4 order-first xl:order-last">
                    <div className="sticky top-4 space-y-5 z-20">
                        <section className="relative overflow-hidden rounded-3xl bg-white px-6 pt-6 pb-5 shadow-xl shadow-gray-100 border border-gray-100">
                            <div className="relative z-10">
                                <div className="mb-6 flex items-end justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-amber-500">VIP</span>
                                        </div>
                                        <h2 className="mt-1 text-2xl font-bold text-gray-900">김기우님</h2>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">연간 누적 할인</p>
                                        <p className="mt-0.5 text-xl font-bold text-gray-900">158,000 <span className="text-sm font-normal text-gray-400">원</span></p>
                                    </div>
                                </div>

                                {/* Barcode Section (Bottom) */}
                                <div className="mt-4 flex flex-col items-center">
                                    <div className="flex h-24 w-full items-center justify-center gap-[4px] rounded-2xl bg-gray-50 px-6 py-4 border border-gray-100">
                                        {/* Barcode Pattern (Static) */}
                                        {barcodePattern.map((width, i) => (
                                            <div
                                                key={i}
                                                className={`h-full bg-gray-900`}
                                                style={{ width: `${width === 1 ? '4px' : '10px'}` }}
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-2 flex w-full items-center justify-between px-1">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5 text-gray-400" />
                                            <span className="text-xs font-medium text-gray-500">{formatTime(timeLeft)}</span>
                                        </div>
                                        <p className="text-sm font-bold tracking-[0.2em] text-gray-900">1234 5678 9012 3456</p>
                                    </div>

                                    {/* Divider */}
                                    <div className="my-3 h-px w-full bg-gray-100" />

                                    {/* Toggles */}
                                    <div className="flex w-full gap-3">
                                        <BarcodeToggle
                                            label="매직 바코드"
                                            isActive={magicBarcode}
                                            onToggle={() => setMagicBarcode(!magicBarcode)}
                                        />
                                        <BarcodeToggle
                                            label="결제 바코드"
                                            isActive={paymentBarcode}
                                            onToggle={() => setPaymentBarcode(!paymentBarcode)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Coupon Link Card */}
                        <section
                            className="rounded-3xl bg-white px-5 py-4 shadow-xl shadow-gray-100 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
                            onClick={() => setActiveCategory('coupon')}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
                                    <Gift className="w-5 h-5 text-rose-500" />
                                </div>
                                <h3 className="text-sm font-bold text-gray-900">사용 가능한 쿠폰</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-rose-500">3개</span>
                                <span className="text-gray-300 text-lg">›</span>
                            </div>
                        </section>

                        {/* Partner Benefits - 제휴 혜택 */}
                        <section className="space-y-3">
                            <div className="flex justify-between items-center px-1">
                                <h2 className="text-base font-bold text-gray-900">제휴 혜택</h2>
                                <button className="text-sm text-gray-400">전체보기</button>
                            </div>
                            <div className="grid grid-cols-4 gap-3 md:gap-4">
                                <PartnerItem icon={<Coffee className="w-6 h-6" />} label="카페" />
                                <PartnerItem icon={<Film className="w-6 h-6" />} label="영화" />
                                <PartnerItem icon={<Music className="w-6 h-6" />} label="음악" />
                                <PartnerItem icon={<Utensils className="w-6 h-6" />} label="음식" />
                            </div>
                        </section>
                    </div>
                </div>

                {/* Left Column: Banners & Content */}
                <div className="xl:col-span-8 space-y-5">
                    {/* Promotional Banner Carousel */}
                    <div className="relative h-32 md:h-48 overflow-hidden rounded-2xl shadow-md cursor-grab active:cursor-grabbing">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentBanner}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 32 },
                                    opacity: { duration: 0.2 },
                                    scale: { duration: 0.2 }
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={handleDragEnd}
                                className={`absolute inset-0 bg-gradient-to-r ${banners[currentBanner].color} p-5 text-white`}
                            >
                                <div className={`absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full blur-2xl ${banners[currentBanner].pattern}`} />
                                <div className="relative z-10 flex items-center justify-between h-full pb-8">
                                    <div className="flex flex-col justify-center h-full">
                                        <span className="inline-block px-2 py-0.5 bg-white/20 rounded text-[10px] md:text-xs font-bold mb-1 md:mb-2 w-fit">
                                            {banners[currentBanner].tag}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-bold">{banners[currentBanner].title}</h3>
                                        <p className="text-sm md:text-base opacity-90 mt-0.5">{banners[currentBanner].description}</p>
                                    </div>
                                    <div className="h-10 w-10 md:h-16 md:w-16 rounded-full bg-white/20 flex items-center justify-center">
                                        {React.cloneElement(banners[currentBanner].icon as React.ReactElement, { className: "w-5 h-5 md:w-8 md:h-8 text-white" })}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Banner Controls */}
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
                            {/* Counter */}
                            <div className="bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-medium text-white/90">
                                {currentBanner + 1} / {banners.length}
                            </div>

                            {/* Play/Pause Control */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsPlaying(!isPlaying);
                                }}
                                className="bg-black/20 backdrop-blur-sm p-1.5 rounded-full text-white/90 hover:bg-black/30 transition-colors"
                            >
                                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                            </button>
                        </div>
                    </div>





                    {/* Events Section Title - 진행 중인 이벤트 */}
                    <section className="space-y-3 mt-8">
                        <div className="flex justify-between items-center px-1 md:px-0">
                            <h2 className="text-base font-bold text-gray-900">진행 중인 이벤트</h2>
                            <button className="text-sm text-gray-400">전체보기</button>
                        </div>
                    </section>

                    {/* Category Tabs */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar md:flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat.id
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white text-gray-600 border border-gray-200'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Coupons Section */}
                    {
                        (activeCategory === 'all' || activeCategory === 'coupon') && (
                            <section className="space-y-3">
                                <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                                    {coupons.map((coupon) => (
                                        <CouponCard
                                            key={coupon.id}
                                            coupon={coupon}
                                            icon={categoryIcons[coupon.category] || <Gift className="w-5 h-5" />}
                                        />
                                    ))}
                                </div>
                            </section>
                        )
                    }


                </div>
            </div>
        </div >
    );
};

// ========================================
// Sub Components
// ========================================
const CouponCard: React.FC<{ coupon: Coupon; icon: React.ReactNode }> = ({ coupon, icon }) => (
    <motion.div
        className="toss-card p-4 flex items-center gap-4 cursor-pointer"
        whileTap={{ scale: 0.99 }}
    >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-purple-500">
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-0.5">
                {coupon.isNew && <span className="px-1.5 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded">NEW</span>}
                {coupon.isHot && <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">HOT</span>}
                <span className="text-xs text-gray-500">{coupon.brand}</span>
            </div>
            <p className="font-semibold text-gray-900 truncate">{coupon.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{coupon.expiry}까지</p>
        </div>
        <div className="text-right">
            <p className="text-lg font-bold text-blue-500">{coupon.discount}</p>
        </div>
    </motion.div>
);

const PartnerItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
    <motion.div
        className="toss-card p-4 flex flex-col items-center justify-center gap-2 cursor-pointer"
        whileTap={{ scale: 0.95 }}
    >
        <span className="text-gray-500">{icon}</span>
        <span className="text-xs font-medium text-gray-600">{label}</span>
    </motion.div>
);


const BarcodeToggle: React.FC<{ label: string; isActive: boolean; onToggle: () => void }> = ({ label, isActive, onToggle }) => (
    <button
        onClick={onToggle}
        className="flex flex-1 items-center justify-between px-2 py-1 transition-opacity hover:opacity-80"
    >
        <span className={`text-xs font-bold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
        <div className={`relative h-5 w-9 rounded-full transition-colors ${isActive ? 'bg-gray-900' : 'bg-gray-200'}`}>
            <div
                className={`absolute top-1 h-3 w-3 rounded-full bg-white transition-transform ${isActive ? 'left-5' : 'left-1'
                    }`}
            />
        </div>
    </button>
);

export default Benefits;
