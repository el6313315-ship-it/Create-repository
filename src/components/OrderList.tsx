import React, { useState, useEffect } from 'react';
import { Clock, MessageCircle, RefreshCw, Filter, Zap, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen, Order } from '../types';
import { mockOrders } from '../mockData';

const CountdownTimer = ({ initialMinutes = 5, onExpire }: { initialMinutes?: number, onExpire?: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <span className="font-mono">
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </span>
  );
};

interface OrderListProps {
  onNavigate: (screen: Screen) => void;
  orders: Order[];
}

export default function OrderList({ onNavigate, orders }: OrderListProps) {
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');

  const displayOrders = activeTab === 'sent' ? orders : orders.filter(o => o.status === 'completed' || o.status === 'delivering');

  return (
    <div className="pb-32 bg-gray-50 min-h-screen">
      <header className="fixed top-0 w-full z-50 flex items-center justify-center px-4 h-14 bg-gray-50/80 backdrop-blur-md">
        <h1 className="font-bold text-lg">校园跑腿</h1>
      </header>

      <main className="mt-14 px-4 pt-4">
        {/* Segmented Control */}
        <div className="flex p-1.5 bg-gray-200 rounded-2xl mb-6 relative">
          <button 
            onClick={() => setActiveTab('sent')}
            className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === 'sent' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'
            }`}
          >
            我发的单
          </button>
          <button 
            onClick={() => setActiveTab('received')}
            className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === 'received' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'
            }`}
          >
            已抢订单
          </button>
        </div>

        {/* Stats Summary (Optional, based on image 2) */}
        {activeTab === 'received' && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <p className="text-xs text-gray-400 mb-1">今日已赚 (元)</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">128.50</span>
                <span className="text-[10px] text-red-500 bg-red-50 px-1 rounded">+12%</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <p className="text-xs text-gray-400 mb-1">已完成任务</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">14</span>
                <span className="text-[10px] text-black bg-yellow-400 px-1 rounded">超80%骑手</span>
              </div>
            </div>
          </div>
        )}

        {/* List Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">
            {activeTab === 'sent' ? '全部订单' : '已抢订单'} 
            <span className="text-gray-400 text-sm font-normal ml-2">({displayOrders.length})</span>
          </h2>
          <div className="flex gap-4 text-gray-400">
            <Filter size={20} />
            <RefreshCw size={20} />
          </div>
        </div>

        {/* Orders Stack */}
        <div className="space-y-4">
          {displayOrders.map((order) => (
            <motion.div 
              key={order.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('detail')}
              className="bg-white p-4 rounded-2xl shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-gray-400">{order.timestamp}</span>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                    order.status === 'delivering' ? 'bg-blue-50 text-blue-600' : 
                    order.status === 'grouping' ? 'bg-gray-100 text-gray-500' : 
                    'bg-green-50 text-green-500'
                  }`}>
                    {order.status === 'delivering' ? '配送中' : 
                     order.status === 'grouping' ? '拼单中 1/2' : '已完成'}
                  </span>
                  {order.status === 'grouping' && (
                    <div className="flex items-center gap-1 text-red-500 font-bold text-[10px]">
                      <Clock size={10} />
                      <span>还剩：</span>
                      <CountdownTimer onExpire={() => alert('拼单超时，建议直接免拼')} />
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="font-bold text-base mb-4">{order.title}</h3>
              
              <div className="space-y-3 mb-5 mt-2">
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-gray-300 mt-1 shrink-0" />
                  <p className="text-sm font-bold text-gray-800">{order.pickup}</p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-yellow-400 mt-1 shrink-0" />
                  <p className="text-sm font-bold text-gray-800">{order.destination}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-red-600 font-black text-xl">¥{order.price.toFixed(2)}</span>
                    {order.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">¥{order.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  {order.status === 'grouping' && (
                    <span className="text-[10px] text-orange-500 font-medium">免拼 +¥{( (order.originalPrice || order.price + 2) - order.price ).toFixed(1)}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  {activeTab === 'sent' ? (
                    order.status === 'delivering' ? (
                      <>
                        <button className="px-5 py-2 text-xs font-bold text-gray-500 bg-gray-100 rounded-full active:scale-95 transition-transform">取消订单</button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('detail');
                          }}
                          className="px-5 py-2 text-xs font-bold text-black bg-yellow-400 rounded-full active:scale-95 transition-transform"
                        >
                          详情信息
                        </button>
                      </>
                    ) : order.status === 'grouping' ? (
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const bypassPrice = (order.originalPrice || order.price + 2);
                            const updatedOrder = { ...order, status: 'delivering', price: bypassPrice };
                            // Find and update the specific order in parent state is handled via alert/dispatch if we had store, 
                            // but usually "Confirm" means navigating or performing action.
                            // The user wants "直接免拼直接跳转支付页面". 
                            // Since this is a mock app, we'll simulate the jump to payment/success.
                            alert(`已为您调起免拼支付：¥${bypassPrice.toFixed(2)}`);
                            onNavigate('orders');
                          }}
                          className="px-4 py-2 text-xs font-bold text-white bg-gray-800 rounded-full flex items-center gap-1 active:scale-95 transition-transform"
                        >
                          <Zap size={10} fill="currentColor" />
                          直接免拼
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('invite');
                          }}
                          className="px-4 py-2 text-xs font-bold text-black bg-yellow-400 rounded-full active:scale-95 transition-transform"
                        >
                          邀请好友
                        </button>
                      </div>
                    ) : (
                      <button className="px-5 py-2 text-xs font-bold text-gray-500 bg-gray-100 rounded-full active:scale-95 transition-transform">再来一单</button>
                    )
                  ) : (
                    // 我接的单 Logic
                    order.status === 'completed' ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('detail');
                        }}
                        className="px-5 py-2 text-xs font-bold text-gray-500 bg-gray-50 border border-gray-100 rounded-full active:scale-95 transition-transform"
                      >
                        查看详情
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('正在拨打客户电话...');
                        }}
                        className="px-5 py-2 text-xs font-bold text-black bg-yellow-400 rounded-full shadow-sm active:scale-95 transition-transform"
                      >
                        联系客户
                      </button>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
