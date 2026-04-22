import React from 'react';
import { ChevronLeft, MoreHorizontal, ChevronRight, Info, QrCode, Phone, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { Order, Screen, User } from '../types';
import { currentUser } from '../mockData';

interface ConfirmOrderProps {
  onBack: () => void;
  onConfirm: (order: Order) => void;
  draft: any;
}

export default function ConfirmOrder({ onBack, onConfirm, draft }: ConfirmOrderProps) {
  const [isSolo, setIsSolo] = React.useState(false);
  const [agreed, setAgreed] = React.useState(false);

  const calculatePrice = (solo: boolean) => {
    let base = 1.5;
    if (draft.weight === '2-5kg') base = 2.5;
    if (draft.weight === '5-10kg' || draft.weight === '大于10kg') base = 4.5;
    
    // 时间要求加价
    if (draft.time === '立即取件') base += 1.0;
    if (draft.time === '1小时内') base += 0.5;
    
    if (isSolo) base += 2.0; // 专送加2元
    
    // 快递件数加价
    const qty = parseInt(draft.quantity) || 1;
    if (qty > 1) base += (qty - 1) * 0.5;

    return base.toFixed(1);
  };

  const handleConfirm = () => {
    if (!agreed) {
      alert('请先阅读并同意《校园代送服务协议》');
      return;
    }
    const soloPrice = calculatePrice(true);
    const groupPrice = calculatePrice(false);
    const newOrder: Order = {
      id: 'o' + Date.now(),
      title: `${draft.type} · ${draft.weight}`,
      type: draft.type === '快递' ? 'express' : draft.type === '外卖' ? 'food' : 'other',
      status: 'grouping',
      pickup: draft.pickup,
      destination: draft.destination,
      price: parseFloat(isSolo ? soloPrice : groupPrice),
      timestamp: new Date().toLocaleString(),
      user: currentUser,
      weight: draft.weight,
      itemsCount: parseInt(draft.quantity),
    };
    onConfirm(newOrder);
  };

  return (
    <div className="pb-32 bg-gray-50 min-h-screen">
      <header className="w-full sticky top-0 z-40 bg-gray-50 flex justify-between items-center px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="active:scale-95 transition-transform">
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg">确认订单</h1>
        </div>
        <button className="active:scale-95 transition-transform">
          <MoreHorizontal size={24} />
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-4 mt-2 space-y-3">
        {/* Address Card */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="relative">
            <div className="absolute left-[5px] top-[10px] bottom-[10px] w-[1px] border-l border-dashed border-gray-300"></div>
            
            {/* Pickup */}
            <div className="flex items-start gap-4 pb-6">
              <div className="relative z-10 mt-[6px]">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-xs text-gray-400 font-medium">从哪取</span>
                  <h2 className="text-[16px] font-bold mt-1">{draft.pickup}</h2>
                  <p className="text-sm text-gray-400">张同学 · 138****8888</p>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>

            {/* Delivery */}
            <div className="flex items-start gap-4 pt-2">
              <div className="relative z-10 mt-[6px]">
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-xs text-gray-400 font-medium">送到哪</span>
                  <h2 className="text-[16px] font-bold mt-1">{draft.destination}</h2>
                  <p className="text-sm text-gray-400">李晓明 · 139****1234</p>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>
          </div>
        </section>

        {/* Service Selection */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-[16px] font-bold mb-4">配送服务</h3>
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => setIsSolo(false)}
              className={`p-4 rounded-2xl bg-white border-2 transition-all cursor-pointer relative overflow-hidden ${
                !isSolo ? 'border-yellow-400' : 'border-transparent bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold">拼送</span>
                <span className={`font-bold text-lg ${!isSolo ? 'text-red-500' : 'text-gray-400'}`}>¥ {calculatePrice(false)}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">拼单配送，预计45分钟送达，更实惠的选择。</p>
              <div className={`absolute top-0 left-0 text-[10px] px-2 py-0.5 font-bold rounded-br-lg ${!isSolo ? 'bg-yellow-400' : 'bg-gray-300'}`}>推荐</div>
            </div>
            
            <div 
              onClick={() => setIsSolo(true)}
              className={`p-4 rounded-2xl transition-all cursor-pointer border-2 ${
                isSolo ? 'border-[#FFB990] bg-white' : 'border-transparent bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`font-bold ${isSolo ? 'text-gray-800' : 'text-gray-500'}`}>专送</span>
                <span className={`font-bold ${isSolo ? 'text-gray-800' : 'text-gray-400'}`}>¥ {calculatePrice(true)}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">专人直送，预计20分钟送达，高效稳妥。</p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center gap-2">
            <Info size={16} className="text-yellow-500 fill-yellow-500" />
            <p className="text-[11px] text-gray-500">已选：{draft.type} · {draft.weight} · {draft.time}</p>
          </div>
        </section>

        {/* Privacy Info */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-bold">取件隐私信息</h3>
            <span className="text-[11px] text-red-500 font-medium">加密存储，仅跑手可见</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-4 bg-gray-50 p-3.5 rounded-2xl">
              <QrCode size={20} className="text-gray-400" />
              <input 
                className="bg-transparent border-none focus:ring-0 text-sm flex-1 placeholder:text-gray-300 p-0" 
                placeholder="输入取件码 (例: 5-2-401)" 
                type="text" 
              />
            </div>
            <div className="flex items-center gap-4 bg-gray-50 p-3.5 rounded-2xl">
              <Phone size={20} className="text-gray-400" />
              <input 
                className="bg-transparent border-none focus:ring-0 text-sm flex-1 placeholder:text-gray-300 p-0" 
                placeholder="收货手机后四位" 
                type="text" 
              />
            </div>
          </div>
        </section>

        {/* Image Upload */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-[16px] font-bold mb-4">添加备注图片</h3>
          <div className="flex gap-3">
            <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors cursor-pointer bg-gray-50">
              <Camera size={32} />
              <span className="text-[10px] mt-1 font-bold">上传照片</span>
            </div>
            <div className="flex-1 bg-gray-50 rounded-2xl p-3 flex items-center justify-center relative overflow-hidden">
              <p className="text-[10px] text-gray-400 text-center px-4 leading-relaxed relative z-10">
                上传取件短信截图或实物照片，能帮助跑手更快找到您的快递
              </p>
            </div>
          </div>
        </section>

        {/* Terms */}
        <div className="flex items-center justify-center gap-2 py-4">
          <input 
            className="w-4 h-4 rounded text-yellow-400 focus:ring-yellow-400 border-gray-300 transition-all cursor-pointer" 
            id="terms" 
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label className="text-[11px] text-gray-500 cursor-pointer" htmlFor="terms">
            我已阅读并同意 <span className="text-gray-800 font-bold">《校园代送服务协议》</span>
          </label>
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full z-50 px-4 pb-8 pt-4 bg-white/80 backdrop-blur-xl border-t border-gray-100">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-0.5">
              <span className="text-red-500 font-bold text-sm">¥</span>
              <span className="text-red-500 font-black text-3xl tracking-tighter">{calculatePrice(isSolo)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-600 font-bold">免拼支付 ¥{(parseFloat(calculatePrice(true)) + 0.5).toFixed(1)}</span>
            </div>
          </div>
          <button 
            onClick={handleConfirm}
            style={{ 
              backgroundColor: !agreed ? '#e5e7eb' : (isSolo ? '#FFB990' : undefined),
              color: !agreed ? '#9ca3af' : '#000'
            }}
            disabled={!agreed}
            className={`flex-1 ${(!isSolo && agreed) ? 'bg-yellow-400' : ''} font-black py-4 rounded-full shadow-lg active:scale-[0.98] transition-all text-lg`}
          >
            去支付
          </button>
        </div>
      </div>
    </div>
  );
}
