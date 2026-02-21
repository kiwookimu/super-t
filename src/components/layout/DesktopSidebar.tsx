import React from 'react';
import { Home, Gift, ShoppingBag, Smartphone, Menu, Settings, User } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';

interface DesktopSidebarProps {
    activeTab?: string;
    onTabChange?: (tab: string) => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ activeTab = 'home', onTabChange }) => {
    return (
        <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-100 z-50">
            {/* Logo Area */}
            <div className="p-6 pb-2">
                <BrandLogo size="medium" />
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                <NavItem
                    icon={<Home size={20} />}
                    label="홈"
                    active={activeTab === 'home'}
                    onClick={() => onTabChange?.('home')}
                />
                <NavItem
                    icon={<Gift size={20} />}
                    label="혜택"
                    active={activeTab === 'benefits'}
                    onClick={() => onTabChange?.('benefits')}
                />
                <NavItem
                    icon={<ShoppingBag size={20} />}
                    label="Shop"
                    active={activeTab === 'shop'}
                    onClick={() => onTabChange?.('shop')}
                />
                <NavItem
                    icon={<Smartphone size={20} />}
                    label="마이 T"
                    active={activeTab === 'my'}
                    onClick={() => onTabChange?.('my')}
                />
                <NavItem
                    icon={<Menu size={20} />}
                    label="전체 메뉴"
                    active={activeTab === 'all'}
                    onClick={() => onTabChange?.('all')}
                />
            </nav>

            {/* User Profile / Footer */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <User size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">김기우님</p>
                        <p className="text-xs text-gray-500 truncate">VIP 등급</p>
                    </div>
                    <Settings size={16} className="text-gray-400" />
                </div>
            </div>
        </aside>
    );
};

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200
                ${active
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
            `}
        >
            <div className={active ? 'text-blue-600' : 'text-gray-500'}>{icon}</div>
            <span className="text-sm">{label}</span>
        </button>
    );
};

export default DesktopSidebar;
