import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Clock } from 'lucide-react';

interface BarcodeExpansionProps {
    isOpen: boolean;
    onClose: () => void;
}

const BarcodeExpansion: React.FC<BarcodeExpansionProps> = ({ isOpen, onClose }) => {
    // ----------------------------------
    // State: Barcode Logic
    // ----------------------------------
    const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
    const [barcodePattern, setBarcodePattern] = useState<number[]>([]);
    const [magicBarcode, setMagicBarcode] = useState(true);
    const [paymentBarcode, setPaymentBarcode] = useState(false);

    useEffect(() => {
        if (isOpen) {
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
        }
    }, [isOpen]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    className="overflow-hidden"
                >
                    <div className="bg-white rounded-3xl w-full shadow-lg border border-gray-100 mb-4 mt-2">
                        {/* Header */}
                        <div className="p-5 pb-0 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">멤버십 바코드</h2>
                            <button
                                onClick={onClose}
                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Benefits Style Card Content */}
                        <div className="p-6">
                            <div className="mb-6 flex items-end justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-amber-500 flex items-center gap-1">
                                            <Crown className="w-4 h-4" /> VIP
                                        </span>
                                    </div>
                                    <h2 className="mt-1 text-2xl font-bold text-gray-900">김기우님</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500">보유 포인트</p>
                                    <p className="mt-0.5 text-xl font-bold text-gray-900">12,500 <span className="text-sm font-normal text-gray-400">P</span></p>
                                </div>
                            </div>

                            {/* Barcode Section */}
                            <div className="mt-4 flex flex-col items-center">
                                <div className="flex h-24 w-full items-center justify-center gap-[4px] rounded-2xl bg-gray-50 px-6 py-4 border border-gray-100">
                                    {/* Barcode Pattern (Dynamic) */}
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
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

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

export default BarcodeExpansion;
