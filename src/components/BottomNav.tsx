import React from 'react';
import { Home, Compass, ReceiptText, User } from 'lucide-react';
import { Screen } from '../types';
import { motion } from 'motion/react';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const tabs: { id: Screen; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: '首页', icon: <Home size={24} /> },
    { id: 'market', label: '任务广场', icon: <Compass size={24} /> },
    { id: 'orders', label: '订单', icon: <ReceiptText size={24} /> },
    { id: 'me', label: '我的', icon: <User size={24} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 flex items-end justify-around px-2 pb-6 pt-2 z-50 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] h-20">
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className="relative flex flex-col items-center justify-center w-20 group"
          >
            <div className="relative h-12 w-full flex items-center justify-center">
              {isActive && (
                <motion.div
                  layoutId="activeTabCircle"
                  className="absolute -top-3 w-14 h-14 bg-yellow-400 rounded-full shadow-lg border-4 border-white flex items-center justify-center"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {React.cloneElement(tab.icon as React.ReactElement, { size: 28, className: 'text-black' })}
                </motion.div>
              )}
              {!isActive && (
                <div className="text-gray-400 group-active:scale-90 transition-transform">
                  {tab.icon}
                </div>
              )}
            </div>
            <span className={`text-[11px] mt-1 transition-all duration-200 ${
              isActive ? 'text-gray-900 font-bold' : 'text-gray-400'
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
