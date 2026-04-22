import React, { useState } from 'react';
import { Compass, Filter, RefreshCw, MapPin, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../types';

interface TaskMarketProps {
  onNavigate: (screen: Screen) => void;
  orders: any[];
}

export default function TaskMarket({ onNavigate, orders }: TaskMarketProps) {
  const [activeTab, setActiveTab] = useState('全部');

  const marketTasks = [
    {
      id: 'm1',
      tag: '跑腿',
      time: '10分钟前发布',
      price: '5.00',
      tip: '1.00',
      pickup: '紫荆驿站',
      pickupDetail: '3号快递柜 · 凭证码: 4920',
      dest: '学生公寓',
      destDetail: '15号楼 A座 402室',
      requirement: '要求 18:00 前送达',
      type: 'express',
      status: 'pending',
      gender: '不限',
      weight: '小于2kg',
      floors: '4层'
    },
    {
      id: 'm2',
      tag: '代办',
      isUrgent: true,
      time: '急单',
      price: '12.00',
      pickup: '观畴园餐厅',
      pickupDetail: '二层 3号档口 (麻辣烫)',
      dest: '西门家属区',
      destDetail: '8号楼 2单元 301',
      requirement: '备注: 帮买冰可乐一份，垫付 ¥3',
      type: 'buy',
      status: 'pending',
      gender: '男',
      weight: '小于1kg',
      floors: '3层'
    },
    {
      id: 'm3',
      tag: '代办',
      time: '刚刚',
      price: '8.50',
      pickup: '图书馆北馆',
      pickupDetail: '正门大厅 咨询台',
      dest: '校医院',
      destDetail: '住院部 门诊挂号处',
      requirement: '配送距离 1.2km',
      type: 'other',
      status: 'accepted',
      gender: '不限',
      weight: '约3kg',
      floors: '1层'
    }
  ];

  // Map dynamic orders to market task format
  const dynamicMarketTasks = orders.map(order => ({
    id: order.id,
    tag: (order.type === 'express' || order.type === 'food') ? '跑腿' : '代办',
    time: order.timestamp,
    price: order.price.toFixed(2),
    pickup: order.pickup,
    pickupDetail: '校园代收点',
    dest: order.destination.split(' ')[0],
    destDetail: order.destination,
    requirement: order.description || `备注: 暂无`,
    type: order.type,
    status: order.status === 'grouping' ? 'pending' : 'accepted',
    isUrgent: false,
    tip: '0.00',
    gender: order.genderPreference === 'male' ? '男' : order.genderPreference === 'female' ? '女' : '不限',
    weight: order.weight || '小于2kg',
    floors: order.isEnterBuilding ? '上楼' : '送至楼下'
  }));

  const allTasks = [...dynamicMarketTasks, ...marketTasks];

  const filteredTasks = allTasks.filter(task => {
    if (activeTab === '全部') return true;
    if (activeTab === '待接单') return task.status === 'pending';
    if (activeTab === '已接单') return task.status === 'accepted';
    return true;
  });

  return (
    <div className="pb-32 bg-gray-50 min-h-screen">
      <header className="fixed top-0 w-full z-50 flex items-center justify-center px-4 h-14 bg-gray-50/80 backdrop-blur-md">
        <h1 className="font-bold text-lg">任务广场</h1>
      </header>

      <main className="mt-14 px-4 pt-4">
        {/* Stats */}
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

        {/* List Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">全部订单 <span className="text-gray-400 text-sm font-normal ml-1">({filteredTasks.length})</span></h2>
          <div className="flex gap-4 text-gray-400">
            <Filter size={20} />
            <RefreshCw size={20} />
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-5 rounded-2xl shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col items-start gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500">
                    {task.tag}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${task.isUrgent ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                      {task.time}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                      {task.gender === '不限' ? '不限男女' : `${task.gender}骑手`}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-red-500 font-bold text-xl">¥ {task.price}</div>
                </div>
              </div>

              <div className="space-y-4 relative">
                <div className="flex items-start gap-3 pl-4 relative">
                  <MapPin size={12} className="absolute left-[-11px] top-1 text-gray-300" />
                  <div>
                    <p className="text-xs text-gray-400">起点：{task.pickup}</p>
                    <p className="text-sm font-bold text-gray-800 mt-0.5">{task.pickupDetail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pl-4 relative">
                  <MapPin size={12} className="absolute left-[-11px] top-1 text-yellow-500" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">终点：{task.dest}</p>
                    <p className="text-sm font-bold text-gray-800 mt-0.5">{task.destDetail}</p>
                    <div className="mt-2 flex gap-4">
                      <span className="text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded border border-gray-100">重: {task.weight}</span>
                      <span className="text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded border border-gray-100">爬楼: {task.floors}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Info size={14} />
                  <span className="text-[11px] max-w-[180px] truncate">{task.requirement}</span>
                </div>
                <button 
                  onClick={() => onNavigate('runnerDetail')}
                  className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold text-sm shadow-sm active:scale-95 transition-transform flex items-center justify-center"
                >
                  抢单
                </button>
              </div>
            </motion.div>
          ))}
          {filteredTasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Compass size={48} className="mb-4 opacity-20" />
              <p>暂无相关订单</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
