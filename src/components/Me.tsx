import React from 'react';
import { ChevronRight, Wallet, Ticket, Star, Settings, ShieldCheck, HelpCircle, Share2, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../types';

interface MeProps {
  onNavigate: (screen: Screen) => void;
}

export default function Me({ onNavigate }: MeProps) {
  const menuItems = [
    { icon: <Wallet className="text-blue-500" size={20} />, label: '我的钱包', extra: '¥ 128.50' },
    { icon: <Ticket className="text-orange-500" size={20} />, label: '优惠券', extra: '3张可用' },
    { icon: <Star className="text-yellow-500" size={20} />, label: '我的评价', extra: '4.9分' },
    { icon: <ShieldCheck className="text-green-500" size={20} />, label: '实名认证', extra: '已认证' },
    { icon: <HelpCircle className="text-purple-500" size={20} />, label: '帮助与反馈' },
    { icon: <Share2 className="text-indigo-500" size={20} />, label: '分享应用' },
    { icon: <Settings className="text-gray-500" size={20} />, label: '设置' },
  ];

  return (
    <div className="pb-32 bg-gray-50 min-h-screen">
      {/* Header Profile */}
      <div className="bg-yellow-400 pt-16 pb-12 px-6 rounded-b-[40px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full -ml-12 -mb-12 blur-xl"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
            <img 
              src="https://picsum.photos/seed/user123/200/200" 
              alt="Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-black">
            <h2 className="text-2xl font-bold">李小明</h2>
            <p className="text-black/60 text-sm mt-1">ID: 88293011</p>
            <div className="mt-2 flex gap-2">
              <span className="bg-black/10 px-2 py-0.5 rounded text-[10px] font-bold">金牌跑腿</span>
              <span className="bg-black/10 px-2 py-0.5 rounded text-[10px] font-bold">信誉极好</span>
            </div>
          </div>
        </div>
      </div>

      <main className="px-4 -mt-6 relative z-20 space-y-4">
        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xl font-bold">156</p>
            <p className="text-[10px] text-gray-400">已发单</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <p className="text-xl font-bold">42</p>
            <p className="text-[10px] text-gray-400">已接单</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">12</p>
            <p className="text-[10px] text-gray-400">收藏夹</p>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              whileTap={{ backgroundColor: '#f9fafb' }}
              className={`w-full flex items-center justify-between p-4 ${
                index !== menuItems.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
              <div className="flex items-center gap-1">
                {item.extra && <span className="text-xs text-gray-400">{item.extra}</span>}
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full bg-white text-red-500 py-4 rounded-2xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 active:bg-gray-50 transition-colors">
          <LogOut size={18} />
          退出登录
        </button>
      </main>
    </div>
  );
}
