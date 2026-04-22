import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Headset, Truck, MessageCircle, Phone, Package, Building2, User, Copy, ChevronUp, Plus, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../types';

interface TaskDetailProps {
  onBack: () => void;
}

export default function TaskDetail({ onBack }: TaskDetailProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="pb-32 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-4 h-14 bg-gray-50/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="active:scale-95 transition-transform">
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg">任务详情</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full cursor-pointer active:scale-95 transition-transform">
          <Headset size={18} className="text-gray-500" />
          <span className="text-xs font-medium text-gray-500">联系客服</span>
        </div>
      </header>

      <main className="pt-14 px-4 space-y-4">
        {/* Status Header */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-red-600 font-bold text-lg">正在取件</span>
            <span className="text-gray-500 text-xs mt-0.5">预计 5 分钟后送达</span>
          </div>
          <div className="bg-yellow-400 p-2 rounded-full">
            <Truck size={20} className="text-black" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Rider Card */}
          <section className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    className="w-14 h-14 rounded-full object-cover" 
                    src="https://picsum.photos/seed/female_rider/100/100" 
                    alt="Rider"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-yellow-400 px-1.5 py-0.5 rounded-full border-2 border-white">
                    <span className="text-[10px] text-white font-bold italic">PRO</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">李晓梅</h3>
                    <div className="bg-yellow-50 px-2 py-0.5 rounded-sm flex items-center gap-1">
                      <span className="text-yellow-500 text-[12px] font-bold">★ 4.9</span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">已完成 2,431 笔订单</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 active:scale-95 transition-transform">
                  <MessageCircle size={20} />
                </button>
                <button className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black active:scale-95 transition-transform">
                  <Phone size={20} />
                </button>
              </div>
            </div>
          </section>

          {/* Details Bento */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm space-y-1">
              <span className="text-gray-400 text-xs">配送金额</span>
              <div className="flex items-baseline gap-1">
                <span className="text-red-600 font-bold text-2xl">¥12.50</span>
                <span className="text-gray-400 text-[10px] line-through">¥15.00</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm space-y-1">
              <span className="text-gray-400 text-xs">预计时长</span>
              <div className="flex items-baseline gap-1">
                <span className="text-gray-800 font-bold text-2xl">25</span>
                <span className="text-gray-400 text-xs">分钟</span>
              </div>
            </div>
          </div>

          {/* Route */}
          <section className="bg-white rounded-2xl p-5 space-y-6 shadow-sm">
            <div className="relative flex gap-4">
              <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-gray-100"></div>
              <div className="flex flex-col gap-8 w-full">
                <div className="flex gap-4 relative z-10">
                  <div className="w-[22px] h-[22px] rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
                    <span className="text-[12px] font-bold text-white">取</span>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-gray-800">学一食堂 · 瑞幸咖啡</h4>
                    <p className="text-gray-400 text-sm mt-1">校本部西区1号楼1层</p>
                  </div>
                </div>
                <div className="flex gap-4 relative z-10">
                  <div className="w-[22px] h-[22px] rounded-full bg-gray-600 flex items-center justify-center shrink-0">
                    <span className="text-[12px] font-bold text-white">送</span>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-gray-800">图书馆 · 402研讨室</h4>
                    <p className="text-gray-400 text-sm mt-1">南校区启智路图书馆4层</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-50 flex flex-wrap gap-2">
              <div className="px-3 py-1.5 bg-gray-50 rounded-lg flex items-center gap-1.5">
                <Package size={16} className="text-gray-400" />
                <span className="text-xs text-gray-800">1件</span>
              </div>
              <div className="px-3 py-1.5 bg-gray-50 rounded-lg flex items-center gap-1.5">
                <Building2 size={16} className="text-gray-400" />
                <span className="text-xs text-gray-800">进楼</span>
              </div>
              <div className="px-3 py-1.5 bg-yellow-50 rounded-lg flex items-center gap-1.5">
                <User size={16} className="text-yellow-500" />
                <span className="text-xs text-yellow-600">女骑手</span>
              </div>
            </div>
          </section>

          {/* Metadata */}
          <section className="bg-white rounded-2xl p-5 space-y-3 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">订单编号</span>
              <div className="flex items-center gap-1">
                <span className="text-gray-800 text-sm font-medium">8273 9912 0481</span>
                <Copy size={14} className="text-gray-300" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">下单时间</span>
              <span className="text-gray-800 text-sm">2023-11-24 14:20:12</span>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full z-50 bg-white/80 backdrop-blur-md pb-8 pt-4 px-4 h-24 flex items-center justify-between gap-4 border-t border-gray-100">
        <div className="flex flex-col">
          <span className="text-gray-400 text-[10px]">合计支付</span>
          <div className="flex items-baseline gap-1">
            <span className="text-red-600 font-bold text-2xl">¥12.50</span>
          </div>
        </div>
        <div className="flex items-center gap-3 grow justify-end">
          <button className="px-6 h-10 rounded-full text-gray-400 font-medium text-xs active:scale-95 transition-transform hover:text-gray-500 underline underline-offset-4 decoration-gray-200">
            取消订单
          </button>
        </div>
      </footer>
    </div>
  );
}

// No longer need mock icons
