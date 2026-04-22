import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, MapPin, User, Phone, History, Home as HomeIcon, Building2, Library, Edit3 } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../types';

interface AddressSelectProps {
  onBack: () => void;
  onSelect: (address: string) => void;
}

export default function AddressSelect({ onBack, onSelect }: AddressSelectProps) {
  const [campus, setCampus] = useState('龙子湖校区');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    if (!address) return;
    onSelect(address);
  };

  const selectHistory = (item: any) => {
    setAddress(item.name);
    setName(item.user);
    setPhone(item.phone.replace(/\*/g, '')); // 简单处理脱敏字符
  };

  return (
    <div className="pb-12 bg-gray-50 min-h-screen">
      <header className="w-full sticky top-0 z-50 bg-gray-50 flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="active:scale-95 transition-transform">
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg">地址选择</h1>
        </div>
        <button className="active:scale-95 transition-transform">
          <MoreHorizontal size={24} />
        </button>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-8">
        {/* Campus Selector */}
        <section className="flex justify-center">
          <div className="w-full flex gap-1 p-1 bg-gray-200 rounded-xl">
            {['龙子湖校区', '花园校区', '江淮校区'].map((c) => (
              <button
                key={c}
                onClick={() => setCampus(c)}
                className={`flex-1 py-2 px-2 rounded-lg transition-all font-bold text-[11px] ${
                  campus === c ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          <div className="space-y-4">
            <div className="relative flex items-center">
              <MapPin size={20} className="absolute left-4 text-yellow-500" />
              <input 
                className="w-full bg-gray-50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-yellow-400/20 text-sm font-medium placeholder:text-gray-300" 
                placeholder="请输入楼号、楼层或房间号" 
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="relative flex items-center">
              <User size={20} className="absolute left-4 text-yellow-500" />
              <input 
                className="w-full bg-gray-50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-yellow-400/20 text-sm font-medium placeholder:text-gray-300" 
                placeholder="您的姓名" 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative flex items-center">
              <Phone size={20} className="absolute left-4 text-yellow-500" />
              <input 
                className="w-full bg-gray-50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-yellow-400/20 text-sm font-medium placeholder:text-gray-300" 
                placeholder="手机号" 
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <button 
            onClick={handleSave}
            className="w-full bg-yellow-400 text-black font-bold py-4 rounded-full shadow-lg shadow-yellow-400/20 active:scale-95 transition-all"
          >
            保存并使用
          </button>
        </section>

        {/* History */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-gray-800 font-bold text-lg flex items-center gap-2">
              <History size={20} className="text-yellow-600" />
              我的历史地址
            </h2>
            <button className="text-yellow-500 text-sm font-medium">全部清空</button>
          </div>
          
          <div className="space-y-3">
            {[
              { id: 1, name: '南苑菜鸟驿站', user: '张同学', phone: '13812345678', icon: <HomeIcon size={20} /> },
              { id: 2, name: '一号楼', user: '李同学', phone: '13590123456', icon: <Building2 size={20} /> },
              { id: 3, name: '图书馆', user: '王同学', phone: '13934567890', icon: <Library size={20} /> },
            ].map((item) => (
              <div 
                key={item.id} 
                onClick={() => selectHistory(item)}
                className="group bg-white p-4 rounded-2xl flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-2 mt-0.5">
                      <span>{item.user}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                      <span>{item.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span>
                    </p>
                  </div>
                </div>
                <button className="text-gray-300 hover:text-yellow-500 transition-colors">
                  <Edit3 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Promo */}
        <section className="relative overflow-hidden rounded-2xl bg-gray-900 p-6 h-48 flex flex-col justify-end">
          <img 
            alt="Campus" 
            className="absolute inset-0 w-full h-full object-cover opacity-40" 
            src="https://picsum.photos/seed/campus/800/400"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">校园特惠</span>
            <h3 className="text-white text-xl font-bold mt-2">专业配送<br/>30分钟送达</h3>
          </div>
        </section>
      </main>
    </div>
  );
}
