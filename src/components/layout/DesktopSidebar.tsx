import React from 'react';
import { Home, Gift, ShoppingBag, Smartphone, Menu, Settings, User } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';

interface DesktopSidebarProps {
    activeTab?: string;
    onTabChange?: (tab: string) => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ activeTab = 'home', onTabChange }) => {
    return (
        <header className="hidden md:flex items-center w-full h-16 fixed top-0 left-0 bg-white/80 backdrop-blur-md border-b border-gray-100/50 z-50 px-6 justify-between">
            {/* Logo Area */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => onTabChange?.('home')}>
                <BrandLogo size="medium" />
            </div>

            {/* Navigation Menu */}
            <nav className="flex items-center gap-2 lg:gap-8 flex-1 justify-center max-w-2xl mx-auto">
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

            {/* User Profile / Settings */}
            <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                        <User size={16} />
                    </div>
                    <div className="hidden lg:block min-w-0 text-right">
                        <p className="text-sm font-bold text-gray-900 leading-tight">김기우님</p>
                    </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50">
                    <Settings size={20} />
                </button>
            </div>
        </header>
    );
};

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full transition-all duration-200
                ${active
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
            `}
        >
            <div className={active ? 'text-blue-600' : 'text-gray-500'}>{icon}</div>
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
};

export default DesktopSidebar;
