import { useState } from 'react';
import MobileLayout from './components/layout/MobileLayout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AllMenu from './pages/AllMenu';
import HomeModeSelect from './pages/HomeModeSelect';
import MyT from './pages/MyT';
import Shop from './pages/Shop';
import Benefits from './pages/Benefits';
import Notifications from './pages/Notifications';
import type { HomeMode } from './pages/HomeModeSelect';
import Search from './pages/Search';
import { AnimatePresence, motion } from 'framer-motion';

// Menu Pages
import {
  ProfilePage,
  LinesPage,
  SettingsPage,
  PlanPage,
  AddonsPage,
  RoamingPage,
  BillPage,
  PaymentHistoryPage,
  AutoPayPage,
  CouponsPage,
  MembershipPage,
  PointsPage,
  FAQPage,
  InquiryPage,
  ChatPage,
  StorePage,
  NotificationSettingsPage,
  PrivacyPage,
  TermsPage,
  DataRechargePage,
  EventsPage,
  ShopListPage,
  DataGiftPage,
  ComingSoonPage,
} from './pages/menu';

// Sub-Pages
import {
  EditProfilePage,
  ChangePasswordPage,
  ChangePlanPage,
  AddPaymentMethodPage,
  TierBenefitsPage,
  InquiryDetailPage,
  CouponDetailPage,
} from './pages/menu/sub';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentPage, setCurrentPage] = useState('home');
  const [homeMode, setHomeMode] = useState<HomeMode>('manage');
  const [pageStack, setPageStack] = useState<string[]>([]);
  const [shopCategory, setShopCategory] = useState<'subscription' | 'phone' | undefined>(undefined);

  const handleNavigate = (page: string) => {
    setPageStack(prev => [...prev, currentPage]);
    // Handle shop category navigation
    if (page === 'shop-subscription') {
      setShopCategory('subscription');
      setCurrentPage('shop');
      setActiveTab('shop');
    } else if (page === 'shop-phone') {
      setShopCategory('phone');
      setCurrentPage('shop');
      setActiveTab('shop');
    } else {
      setShopCategory(undefined);
      setCurrentPage(page);

      // Auto-sync active tab for root pages
      if (['home', 'all-menu', 'benefits', 'shop', 'my'].includes(page)) {
        setActiveTab(page === 'all-menu' ? 'all' : page);
      }
    }
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (pageStack.length > 0) {
      const lastPage = pageStack[pageStack.length - 1];
      setPageStack(prev => prev.slice(0, -1));
      setCurrentPage(lastPage);
      window.scrollTo(0, 0);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPageStack([]);
    // Map tabs to pages
    if (tab === 'home') setCurrentPage('home');
    else if (tab === 'all') setCurrentPage('all-menu');
    else if (tab === 'benefits') setCurrentPage('benefits');
    else if (tab === 'shop') setCurrentPage('shop');
    else if (tab === 'my') setCurrentPage('my');
  };


  // Route menu pages based on path
  const renderMenuPage = () => {
    switch (currentPage) {
      // 내 정보
      case '/my/profile': return <ProfilePage onBack={handleBack} onNavigate={handleNavigate} />;
      case '/my/profile/edit': return <EditProfilePage onBack={handleBack} />;
      case '/my/profile/password': return <ChangePasswordPage onBack={handleBack} />;
      case '/my/lines': return <LinesPage onBack={handleBack} />;
      case '/my/settings': return <SettingsPage onBack={handleBack} />;
      // 가입 정보
      case '/subscription/plan': return <PlanPage onBack={handleBack} onNavigate={handleNavigate} />;
      case '/subscription/plan/change': return <ChangePlanPage onBack={handleBack} />;
      case '/subscription/addons': return <AddonsPage onBack={handleBack} />;
      case '/subscription/roaming': return <RoamingPage onBack={handleBack} />;
      // 결제/청구
      case '/payment/bill': return <BillPage onBack={handleBack} />;
      case '/payment/history': return <PaymentHistoryPage onBack={handleBack} />;
      case '/payment/auto': return <AutoPayPage onBack={handleBack} onNavigate={handleNavigate} />;
      case '/payment/auto/add': return <AddPaymentMethodPage onBack={handleBack} />;
      // 혜택/쿠폰
      case '/benefits/coupons': return <CouponsPage onBack={handleBack} onNavigate={handleNavigate} />;
      case '/benefits/coupons/detail': return <CouponDetailPage onBack={handleBack} />;
      case '/benefits/membership': return <MembershipPage onBack={handleBack} onNavigate={handleNavigate} />;
      case '/benefits/membership/tier': return <TierBenefitsPage onBack={handleBack} />;
      case '/benefits/points': return <PointsPage onBack={handleBack} />;
      case '/benefits/events': return <EventsPage onBack={handleBack} />;
      // 고객센터
      case '/support/faq': return <FAQPage onBack={handleBack} />;
      case '/support/inquiry': return <InquiryPage onBack={handleBack} onNavigate={handleNavigate} />;
      case '/support/inquiry/detail': return <InquiryDetailPage onBack={handleBack} />;
      case '/support/chat': return <ChatPage onBack={handleBack} />;
      case '/support/store': return <StorePage onBack={handleBack} />;
      // 설정
      case '/settings/notification': return <NotificationSettingsPage onBack={handleBack} />;
      case '/settings/privacy': return <PrivacyPage onBack={handleBack} />;
      case '/settings/terms': return <TermsPage onBack={handleBack} />;
      // 데이터/상품
      case '/data/recharge': return <DataRechargePage onBack={handleBack} />;
      case '/data/gift': return <DataGiftPage onBack={handleBack} />;
      case '/shop/recommended': return <ShopListPage onBack={handleBack} filter="recommended" />;
      case '/shop/new': return <ShopListPage onBack={handleBack} filter="new" />;
      case '/shop/popular': return <ShopListPage onBack={handleBack} filter="popular" />;
      case '/shop/sale': return <ShopListPage onBack={handleBack} filter="sale" />;
      default: return <ComingSoonPage onBack={handleBack} />;
    }
  };


  const isMenuPage = currentPage.startsWith('/');

  return (
    // <TDSMobileAITProvider>
    <MobileLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentPage === 'home' && <Home onNavigate={handleNavigate} homeMode={homeMode} />}
          {/* {currentPage === 'home' && <div className="p-10 text-white">Temporary Home Replacement</div>} */}
          {currentPage === 'search' && <Search onNavigate={handleNavigate} onBack={handleBack} />}
          {currentPage === 'detail' && <ProductDetail onBack={() => handleNavigate('home')} />}
          {currentPage === 'all-menu' && <AllMenu onNavigate={handleNavigate} />}
          {currentPage === 'home-settings' && (
            <HomeModeSelect
              currentMode={homeMode}
              onSelect={setHomeMode}
              onBack={() => handleNavigate('home')}
            />
          )}
          {currentPage === 'benefits' && <Benefits onNavigate={handleNavigate} />}
          {currentPage === 'shop' && <Shop onNavigate={handleNavigate} initialCategory={shopCategory} />}
          {currentPage === 'my' && <MyT onNavigate={handleNavigate} />}
          {currentPage === 'notifications' && (
            <Notifications
              onBack={() => handleNavigate('home')}
              onNavigate={handleNavigate}
            />
          )}
          {/* Menu Detail Pages */}
          {isMenuPage && renderMenuPage()}
        </motion.div>
      </AnimatePresence>
    </MobileLayout>
    // </TDSMobileAITProvider>
  );
}

export default App;

