import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BannerItem {
    id: number;
    tag: string;
    title: string;
    desc: string;
    imageUrl: string;
    gradient: string;
    footerColor: string;
}

const BANNERS: BannerItem[] = [
    {
        id: 1,
        tag: "New Event",
        title: "갤럭시 S24 시리즈 출시",
        desc: "사전 예약하고 특별한 혜택을 받아보세요",
        imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop",
        gradient: "from-violet-600 to-indigo-600",
        footerColor: "#1e1b4b"
    },
    {
        id: 2,
        tag: "T Day",
        title: "2월 T Day 혜택",
        desc: "매주 펼쳐지는 놀라운 혜택을 확인하세요",
        imageUrl: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1974&auto=format&fit=crop",
        gradient: "from-blue-500 to-cyan-500",
        footerColor: "#0f172a"
    },
    {
        id: 3,
        tag: "Hot Pick",
        title: "Youtube Premium 할인",
        desc: "T 우주 패스로 즐기는 끊김 없는 즐거움",
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
        gradient: "from-red-600 to-orange-600",
        footerColor: "#450a0a"
    },
    {
        id: 4,
        tag: "Membership",
        title: "VIP만의 특별한 특권",
        desc: "연 12회 영화 무료 관람의 기회",
        imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
        gradient: "from-purple-600 to-pink-600",
        footerColor: "#3b0764"
    },
    {
        id: 5,
        tag: "Roaming",
        title: "baro 요금제 출시",
        desc: "해외에서도 내 집처럼 편안하게",
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
        gradient: "from-emerald-500 to-teal-600",
        footerColor: "#022c22"
    }
];

const AUTO_PLAY_INTERVAL = 4000;

const BannerCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [direction, setDirection] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
    };

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
    };

    const handleDragEnd = (event: any, info: any) => {
        const threshold = 50;
        if (info.offset.x < -threshold) {
            nextSlide();
        } else if (info.offset.x > threshold) {
            prevSlide();
        }
    };

    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying]);

    const currentBanner = BANNERS[currentIndex];

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            zIndex: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <section className="glass-panel p-0 overflow-hidden relative min-h-[450px] flex flex-col cursor-pointer group transition-all hover:shadow-lg">
            {/* Main Content Area */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded-t-[1.5rem] isolate transform-gpu">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentBanner.id}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        className="absolute inset-0 rounded-t-[1.5rem] overflow-hidden cursor-grab active:cursor-grabbing"
                    >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${currentBanner.gradient}`} />
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay transition-transform duration-[4000ms] ease-linear scale-100 group-hover:scale-105"
                            style={{ backgroundImage: `url('${currentBanner.imageUrl}')` }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Content Overlay */}
                <div className="relative z-10 text-center text-white p-6">
                    <motion.div
                        key={`content-${currentBanner.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold mb-3 border border-white/30">
                            {currentBanner.tag}
                        </span>
                        <h3 className="text-2xl font-bold mb-2">{currentBanner.title}</h3>
                        <p className="text-blue-100 text-sm">{currentBanner.desc}</p>
                    </motion.div>
                </div>

                {/* Controls Layer (Absolute) */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                    {/* Page Indicator */}
                    <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white/90 border border-white/10">
                        {currentIndex + 1} / {BANNERS.length}
                    </div>

                    {/* Play/Stop Toggle */}
                    <button
                        onClick={togglePlay}
                        className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white/90 hover:bg-black/50 transition-colors border border-white/10"
                    >
                        {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                    </button>
                </div>
            </div>

            {/* Footer Area */}
            <motion.div
                className="px-5 py-4 flex justify-between items-center transition-colors duration-500"
                style={{ backgroundColor: currentBanner.footerColor }}
            >
                <span className="text-white font-medium">더 알아보기</span>
                <ChevronRight className="w-5 h-5 text-white" />
            </motion.div>
        </section>
    );
};

export default BannerCarousel;
