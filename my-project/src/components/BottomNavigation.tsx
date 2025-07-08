
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, User, Bell, Package, Settings, History } from 'lucide-react';

const BottomNavigation = ({ userType = 'shared' }: { userType?: 'shared' | 'admin' | 'employee' }) => {
  const location = useLocation();
  
  const getNavItems = () => {
    switch (userType) {
      case 'admin':
        return [
          { path: '/home', icon: Home, label: 'المواد' },
          { path: '/search', icon: Search, label: 'البحث' },
          { path: '/reservations', icon: Package, label: 'الحجوزات' },
          { path: '/history', icon: History, label: 'السجل' },
          { path: '/admin', icon: Settings, label: 'الإدارة' },
        ];
      case 'employee':
        return [
          { path: '/home', icon: Home, label: 'المواد' },
          { path: '/search', icon: Search, label: 'البحث' },
          { path: '/reservations', icon: Package, label: 'الحجوزات' },
          { path: '/notifications', icon: Bell, label: 'الإشعارات' },
        ];
      default:
        return [
          { path: '/home', icon: Home, label: 'المواد' },
          { path: '/search', icon: Search, label: 'البحث' },
          { path: '/reservations', icon: Package, label: 'الحجوزات' },
          { path: '/notifications', icon: Bell, label: 'الإشعارات' },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50 transform scale-105' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
