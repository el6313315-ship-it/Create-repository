import React from 'react';
import { ChevronLeft, Share2, Copy, MessageCircle, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

interface InviteFriendsProps {
  onBack: () => void;
}

export default function InviteFriends({ onBack }: InviteFriendsProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="w-full sticky top-0 z-50 bg-white flex justify-between items-center px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="active:scale-95 transition-transform">
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg">邀请好友拼单</h1>
        </div>
        <button className="active:scale-95 transition-transform">
          <MoreHorizontal size={24} />
        </button>
      </header>

      <main className="px-4 pt-6 space-y-6">
        {/* Order Card Summary */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full">拼单中 1/2</span>
            <span className="text-gray-400 text-[10px]">2023-11-20 16:00</span>
          </div>
          <h2 className="font-bold text-lg mb-4">代拿快递 · 拼单</h2>
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
              <p className="text-sm text-gray-600">紫荆驿站</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <p className="text-sm text-gray-600">学生公寓 1号楼</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1 pt-4 border-t border-gray-50">
            <span className="text-red-500 font-bold text-xl">¥1.5</span>
            <span className="text-gray-400 text-xs line-through">¥3.0</span>
            <span className="ml-auto text-[10px] text-gray-400">再来一人即可发货</span>
          </div>
        </div>

        {/* Invite Options */}
        <div className="bg-white p-6 rounded-3xl shadow-sm space-y-6">
          <h3 className="font-bold text-center text-gray-800">选择邀请方式</h3>
          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
                <MessageCircle size={28} />
              </div>
              <span className="text-xs font-medium text-gray-600">微信好友</span>
            </button>
            <button className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                <Share2 size={28} />
              </div>
              <span className="text-xs font-medium text-gray-600">朋友圈</span>
            </button>
            <button className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                <Copy size={28} />
              </div>
              <span className="text-xs font-medium text-gray-600">复制链接</span>
            </button>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-yellow-400 p-8 rounded-3xl flex flex-col items-center text-center space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow-inner">
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
              <span className="text-gray-300 text-[10px]">二维码占位符</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-black text-lg">面对面扫码拼单</h4>
            <p className="text-black/60 text-xs mt-1">让周围的小伙伴扫一扫，立即开启拼单</p>
          </div>
        </div>
      </main>

      <div className="fixed bottom-6 left-0 w-full px-6">
        <button 
          onClick={onBack}
          className="w-full py-4 bg-gray-900 text-white font-bold rounded-full shadow-xl active:scale-95 transition-all"
        >
          返回我的订单
        </button>
      </div>
    </div>
  );
}
