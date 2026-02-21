import React from 'react';
import { Home, Gift, ShoppingBag, Smartphone, Menu } from 'lucide-react';
import DesktopSidebar from './DesktopSidebar';

interface LayoutProps {
    children: React.ReactNode;
    activeTab?: string;
    onTabChange?: (tab: string) => void;
}

const ResponsiveLayout: React.FC<LayoutProps> = ({ children, activeTab = 'home', onTabChange }) => {
    return (
        <div className="min-h-screen bg-[#f2f4f6] text-gray-900 font-sans">
            {/* Desktop Sidebar */}
            <DesktopSidebar activeTab={activeTab} onTabChange={onTabChange} />

            {/* Main Content Area */}
            <main className="min-h-screen md:pl-64 transition-all duration-300">
                <div className="h-full">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation (Hidden on Desktop) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-3 pt-3 px-4 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.03)] z-50">
                <div className="flex justify-between items-center max-w-md mx-auto">
                    <NavItem icon={<Home size={22} />} label="홈" active={activeTab === 'home'} onClick={() => onTabChange?.('home')} />
                    <NavItem icon={<Gift size={22} />} label="혜택" active={activeTab === 'benefits'} onClick={() => onTabChange?.('benefits')} />
                    <NavItem icon={<ShoppingBag size={22} />} label="Shop" active={activeTab === 'shop'} onClick={() => onTabChange?.('shop')} />
                    <NavItem icon={<Smartphone size={22} />} label="마이 T" active={activeTab === 'my'} onClick={() => onTabChange?.('my')} />
                    <NavItem icon={<Menu size={22} />} label="전체" active={activeTab === 'all'} onClick={() => onTabChange?.('all')} />
                </div>
            </nav>
        </div>
    );
};

const NavItem = ({ icon, label, active, onClick }: any) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center space-y-1 w-14
        ${active ? 'text-gray-900' : 'text-gray-400'}
      `}
        >
            <div>{icon}</div>
            <span className={`text-[10px] font-medium`}>{label}</span>
        </button>
    );
};

export default ResponsiveLayout;
