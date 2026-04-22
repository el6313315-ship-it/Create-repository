import React from 'react';
import { MapPin, Search, Bell, ChevronRight, Store, Navigation, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../types';

interface HomeProps {
  onNavigate: (screen: Screen, type?: string) => void;
  orders: any[];
  pickupAddress?: string;
  deliveryAddress?: string;
}

export default function Home({ onNavigate, orders, pickupAddress, deliveryAddress }: HomeProps) {
  const groupingOrders = orders.filter(o => o.status === 'grouping');

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="px-4 py-3 flex justify-between items-center bg-gray-50/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-1">
          <MapPin size={18} className="text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-lg">龙子湖校区</span>
          <ChevronRight size={16} className="text-gray-400 rotate-90" />
        </div>
        <div className="flex gap-4">
          <Search size={20} className="text-gray-500" />
          <Bell size={20} className="text-gray-500" />
        </div>
      </header>

      <main className="px-4 mt-2 space-y-4">
        {/* Tab Switcher */}
        <div className="flex p-1 bg-white rounded-full w-full max-w-md mx-auto shadow-sm">
          <button className="flex-1 py-2 px-4 rounded-full text-sm font-bold bg-yellow-400 text-black shadow-sm">跑腿</button>
          <button className="flex-1 py-2 px-4 rounded-full text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">代办</button>
        </div>

        {/* Quick Order Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 space-y-1">
            <div 
              onClick={() => onNavigate('address', 'pickup')}
              className="flex items-center gap-4 py-3 active:opacity-70 transition-opacity cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
                <Store size={20} className="text-yellow-500" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-[11px] mb-0.5">从哪里取</p>
                <h3 className="font-bold text-base truncate max-w-[200px]">
                  {pickupAddress || '选择取货地点'}
                </h3>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
            
            <div className="ml-14 border-t border-gray-50"></div>

            <div 
              onClick={() => onNavigate('address', 'delivery')}
              className="flex items-center gap-4 py-3 active:opacity-70 transition-opacity cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <Navigation size={20} className="text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-[11px] mb-0.5">送到哪里</p>
                <h3 className="font-bold text-base truncate max-w-[200px]">
                  {deliveryAddress || '输入送达地点'}
                </h3>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </div>

          <div className="px-4 py-4 bg-gray-50/50 border-t border-gray-50">
            <button 
              onClick={() => onNavigate('create')}
              disabled={!pickupAddress || !deliveryAddress}
              className={`w-full py-3.5 rounded-full font-bold text-base shadow-lg transition-all active:scale-[0.98] ${
                (!pickupAddress || !deliveryAddress)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-yellow-400 text-black shadow-yellow-400/20'
              }`}
            >
              去下单
            </button>
          </div>
        </div>

        {/* Group Order Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between pt-2">
            <h2 className="font-bold text-lg flex items-center gap-2">
              拼单专区
              <span className="bg-red-50 text-red-500 px-1.5 py-0.5 rounded text-[10px] font-bold">HOT</span>
            </h2>
            <button className="text-gray-500 text-sm font-medium flex items-center gap-0.5">
              全部
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar items-center">
            <button className="shrink-0 bg-yellow-400 text-black px-5 py-1.5 rounded-full text-xs font-bold">全部校区</button>
            <button className="shrink-0 bg-white text-gray-500 px-5 py-1.5 rounded-full text-xs font-medium border border-gray-100">拼单人数</button>
            <button className="shrink-0 bg-white text-gray-500 px-5 py-1.5 rounded-full text-xs font-medium border border-gray-100">跑腿类别</button>
            <button className="shrink-0 bg-white text-gray-500 px-5 py-1.5 rounded-full text-xs font-medium border border-gray-100">智能排序</button>
          </div>

          {/* Task Cards */}
          <div className="grid grid-cols-1 gap-3">
            {groupingOrders.map((task) => (
              <motion.div 
                key={task.id}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl p-3.5 space-y-3 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img src={task.user.avatar} alt={task.user.name} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-[13px] leading-tight">{task.user.name}</h4>
                      <p className="text-gray-400 text-[10px]">{task.timestamp}发布</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded text-[10px] font-medium">
                      {(task.title.includes('代拿') || task.title.includes('快递') || task.title.includes('奶茶')) ? '跑腿' : '代办'}
                    </span>
                    {task.user.name === '李小明' && (
                      <span className="bg-red-50 text-red-500 px-1.5 py-0.5 rounded text-[8px] font-bold border border-red-100 italic">即将结束</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full border border-yellow-400"></div>
                    <span className="text-gray-800 text-[13px] truncate">{task.pickup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    <span className="text-gray-800 text-[13px] truncate">{task.destination}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-red-500 text-base font-bold">{typeof task.price === 'number' ? task.price.toFixed(1) : task.price}</span>
                    <span className="text-red-500 text-[10px]">元起拼</span>
                  </div>
                  <button 
                    onClick={() => onNavigate('groupDetail')}
                    className="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-[11px] font-bold active:scale-95 transition-transform"
                  >
                    立即参与
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
