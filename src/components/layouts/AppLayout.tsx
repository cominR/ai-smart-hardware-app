import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Cpu, User, Settings } from 'lucide-react';

import { motion } from 'framer-motion';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { icon: Home, label: '首页', path: '/' },
    { icon: Cpu, label: '设备', path: '/devices' },
    { icon: User, label: '我的', path: '/profile' },
    { icon: Settings, label: '设置', path: '/settings' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-gray-800 shadow-sm z-10 flex items-center px-4">
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
            {location.pathname === '/' && '智能助手'}
            {location.pathname === '/devices' && '绑定设备'}
            {location.pathname.startsWith('/devices/') && '设备详情'}
            {location.pathname === '/profile' && '个人中心'}
            {location.pathname === '/settings' && '设置'}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-14 pb-16">
        <motion.div 
          className="h-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-around z-10">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === '/devices' && location.pathname.startsWith('/devices/'));
          
          return (
            <button
              key={item.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive 
                  ? 'text-blue-500 dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
              {isActive && (
                <motion.div
                  className="absolute bottom-0 w-10 h-1 rounded-t-full bg-blue-500 dark:bg-blue-400"
                  layoutId="navIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default AppLayout;