import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Package, Truck, CheckCircle, Clock, ChevronRight,
    MapPin, AlertCircle
} from 'lucide-react';

/**
 * ORD (주문) 요구사항 구현
 * - ORD-001: 주문 내역 조회
 * - ORD-005: 배송 조회
 * - ORD-010: 주문 상세
 * - ORD-015: 주문 취소/변경
 */

interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: 'processing' | 'shipping' | 'delivered' | 'cancelled';
    items: OrderItem[];
    totalAmount: number;
    deliveryInfo?: DeliveryInfo;
}

interface OrderItem {
    id: string;
    name: string;
    option?: string;
    quantity: number;
    price: number;
}

interface DeliveryInfo {
    carrier: string;
    trackingNumber: string;
    estimatedDate: string;
    currentLocation?: string;
    status: string;
}

const OrderManagement: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'processing' | 'shipping' | 'delivered'>('all');

    const orders: Order[] = [
        {
            id: '1',
            orderNumber: 'ORD-2024020501',
            date: '2024.02.05',
            status: 'shipping',
            items: [
                { id: '1', name: 'Galaxy S24 Ultra', option: '블랙 256GB', quantity: 1, price: 1650000 },
            ],
            totalAmount: 1650000,
            deliveryInfo: {
                carrier: 'CJ대한통운',
                trackingNumber: '123456789012',
                estimatedDate: '2024.02.08',
                currentLocation: '서울 강남 허브',
                status: '배송중',
            },
        },
        {
            id: '2',
            orderNumber: 'ORD-2024020102',
            date: '2024.02.01',
            status: 'delivered',
            items: [
                { id: '1', name: 'Galaxy Buds 3 Pro', option: '화이트', quantity: 1, price: 350000 },
                { id: '2', name: '충전 케이스', option: '기본', quantity: 1, price: 29000 },
            ],
            totalAmount: 379000,
        },
        {
            id: '3',
            orderNumber: 'ORD-2024012501',
            date: '2024.01.25',
            status: 'cancelled',
            items: [
                { id: '1', name: 'Galaxy Tab S9', quantity: 1, price: 1150000 },
            ],
            totalAmount: 1150000,
        },
    ];

    const statusLabels = {
        processing: '처리중',
        shipping: '배송중',
        delivered: '배송완료',
        cancelled: '취소됨',
    };

    const statusColors = {
        processing: 'bg-yellow-100 text-yellow-700',
        shipping: 'bg-blue-100 text-blue-700',
        delivered: 'bg-green-100 text-green-700',
        cancelled: 'bg-gray-100 text-gray-500',
    };

    const statusIcons = {
        processing: <Clock className="w-4 h-4" />,
        shipping: <Truck className="w-4 h-4" />,
        delivered: <CheckCircle className="w-4 h-4" />,
        cancelled: <AlertCircle className="w-4 h-4" />,
    };

    const filterOptions = [
        { id: 'all' as const, label: '전체' },
        { id: 'processing' as const, label: '처리중' },
        { id: 'shipping' as const, label: '배송중' },
        { id: 'delivered' as const, label: '배송완료' },
    ];

    const filteredOrders = activeFilter === 'all'
        ? orders
        : orders.filter(o => o.status === activeFilter);

    return (
        <div className="space-y-5 pb-28">
            {/* Header */}
            <header className="pt-2">
                <h1 className="text-xl font-bold text-gray-900">주문/배송 조회</h1>
            </header>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {filterOptions.map(option => (
                    <button
                        key={option.id}
                        onClick={() => setActiveFilter(option.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeFilter === option.id
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-gray-600 border border-gray-200'
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <section className="space-y-3">
                {filteredOrders.map(order => (
                    <OrderCard key={order.id} order={order} statusLabels={statusLabels} statusColors={statusColors} statusIcons={statusIcons} />
                ))}
            </section>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">주문 내역이 없습니다</p>
                </div>
            )}
        </div>
    );
};

const OrderCard: React.FC<{
    order: Order;
    statusLabels: Record<string, string>;
    statusColors: Record<string, string>;
    statusIcons: Record<string, React.ReactNode>;
}> = ({ order, statusLabels, statusColors, statusIcons }) => {
    return (
        <motion.div className="toss-card overflow-hidden" whileTap={{ scale: 0.99 }}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div>
                    <div className="flex items-center gap-2">
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                            {statusIcons[order.status]}
                            {statusLabels[order.status]}
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{order.orderNumber} • {order.date}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>

            {/* Items */}
            <div className="p-4">
                {order.items.map((item, idx) => (
                    <div key={item.id} className={idx > 0 ? 'mt-3 pt-3 border-t border-gray-100' : ''}>
                        <div className="flex gap-3">
                            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Package className="w-6 h-6 text-gray-300" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{item.name}</p>
                                {item.option && (
                                    <p className="text-sm text-gray-500">{item.option}</p>
                                )}
                                <p className="text-sm text-gray-500">수량: {item.quantity}</p>
                            </div>
                            <p className="font-bold text-gray-900">{item.price.toLocaleString()}원</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delivery Info (if shipping) */}
            {order.status === 'shipping' && order.deliveryInfo && (
                <div className="mx-4 mb-4 p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-2 text-blue-700">
                        <Truck className="w-4 h-4" />
                        <span className="text-sm font-medium">{order.deliveryInfo.status}</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                        {order.deliveryInfo.carrier} {order.deliveryInfo.trackingNumber}
                    </p>
                    {order.deliveryInfo.currentLocation && (
                        <p className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {order.deliveryInfo.currentLocation}
                        </p>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="flex border-t border-gray-100">
                {order.status === 'shipping' && (
                    <button className="flex-1 py-3 text-sm font-medium text-blue-600 border-r border-gray-100">
                        배송조회
                    </button>
                )}
                <button className="flex-1 py-3 text-sm font-medium text-gray-600">
                    주문상세
                </button>
            </div>
        </motion.div>
    );
};

export default OrderManagement;
