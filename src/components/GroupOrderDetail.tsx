import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, ChevronRight, Plus, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface GroupOrderDetailProps {
  onBack: () => void;
  onConfirm: () => void;
}

export default function GroupOrderDetail({ onBack, onConfirm }: GroupOrderDetailProps) {
  const [itemType, setItemType] = useState('快递');
  const [quantity, setQuantity] = useState('1');
  const [weight, setWeight] = useState('小于2kg');
  const [entry, setEntry] = useState('不进楼');
  const [building, setBuilding] = useState('1号楼');
  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [gender, setGender] = useState('男');
  const [privacyInfo, setPrivacyInfo] = useState('');

  const calculatePrice = () => {
    let base = 1.5;
    if (weight === '2~5kg' || weight === '2-5kg') base = 2.5;
    if (weight === '5~10kg' || weight === '5-10kg' || weight === '大于10kg') base = 4.5;
    
    // 快递件数加价
    const qty = parseInt(quantity) || 1;
    if (qty > 1) base += (qty - 1) * 0.5;

    // 爬楼层逻辑
    if (entry !== '不进楼' && room) {
      const floor = parseInt(room.charAt(0));
      if (!isNaN(floor) && floor > 1) {
        base += (floor - 1) * 0.5; // 每层加0.5元
      }
    }
    return base.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-4 h-14 bg-white shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg">订单详情</h1>
        <button className="p-2 -mr-2">
          <MoreHorizontal size={24} />
        </button>
      </header>

      <main className="mt-14 p-4 space-y-4">
        {/* Route Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 border-2 border-white shadow-sm mt-1 shrink-0"></div>
              <p className="font-bold text-gray-800">( 龙子湖校区 ) 西门代收点</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-400 border-2 border-white shadow-sm shrink-0"></div>
                  <span className="text-xs text-gray-400 font-medium">送达地址</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <select 
                  className="bg-white border border-gray-100 rounded-lg px-3 py-2 text-sm font-bold text-gray-800 outline-none"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                >
                  <option value="1号楼">1号楼</option>
                  <option value="2号楼">2号楼</option>
                  <option value="3号楼">3号楼</option>
                </select>
                <input 
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="请输入寝室号 (如: 302)"
                  className="flex-1 bg-white border border-gray-100 rounded-lg px-3 py-2 text-sm font-bold text-gray-800 outline-none"
                />
              </div>
              <div className="space-y-2">
                <input 
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="收货人姓名"
                  className="w-full bg-white border border-gray-100 rounded-lg px-3 py-2 text-sm font-bold text-gray-800 outline-none"
                />
                <input 
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="联系电话"
                  className="w-full bg-white border border-gray-100 rounded-lg px-3 py-2 text-sm font-bold text-gray-800 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-xs pt-2">
            <div className="w-4 h-4 rounded-full bg-gray-200"></div>
            <span>立即取件/{itemType}{quantity}件/{weight}/{entry}/{gender}</span>
            <ChevronRight size={14} />
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <div className="w-4 h-4 rounded-full bg-gray-200"></div>
            <span>添加更多描述、要求</span>
            <ChevronRight size={14} />
          </div>
        </div>

        {/* Item Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-6">
          {/* Type */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-800">物品类型</h3>
            <div className="grid grid-cols-4 gap-3">
              {['快递', '外卖', '资料', '其他'].map((type) => (
                <button
                  key={type}
                  onClick={() => setItemType(type)}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${
                    itemType === type ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-800">快递件数</h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {['1', '2', '3', '4', '5', '6', '更多'].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuantity(q)}
                  className={`shrink-0 w-8 h-8 rounded-lg text-xs font-medium flex items-center justify-center transition-all ${
                    quantity === q ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Weight */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-800">物品重量</h3>
            <div className="grid grid-cols-4 gap-3">
              {['小于2kg', '2~5kg', '5~10kg', '大于10kg'].map((w) => (
                <button
                  key={w}
                  onClick={() => setWeight(w)}
                  className={`py-2 rounded-lg text-xs font-medium transition-all ${
                    weight === w ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Entry */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-800">是否进楼</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setEntry('不进楼')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex flex-col items-center justify-center transition-all ${
                  entry === '不进楼' ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <span>不进楼</span>
                <span className="text-[8px] opacity-60">送到楼下</span>
              </button>
              <button
                onClick={() => setEntry('进楼送到房间')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex flex-col items-center justify-center transition-all ${
                  entry === '进楼送到房间' ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <span>进楼送到房间</span>
                <span className="text-[8px] opacity-60">需填写楼层房间</span>
              </button>
            </div>
            
            {entry === '进楼送到房间' && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-gray-50 rounded-lg px-3 py-2 flex items-center gap-2">
                  <span className="text-xs text-gray-400 shrink-0">楼层</span>
                  <input 
                    type="number" 
                    placeholder="如: 3" 
                    className="bg-transparent w-full text-xs outline-none font-bold"
                  />
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-2 flex items-center gap-2">
                  <span className="text-xs text-gray-400 shrink-0">房间</span>
                  <input 
                    type="text" 
                    placeholder="如: 302" 
                    className="bg-transparent w-full text-xs outline-none font-bold"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-gray-800">骑手性别要求</h3>
            <div className="flex gap-3">
              {['不限', '男', '女'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                    gender === g ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
          <h3 className="font-bold text-base">隐私信息 ( 仅接单员可见 )</h3>
          <div className="flex items-center gap-2 text-[10px] text-gray-400">
            <span>快捷输入：</span>
            <button 
              onClick={() => setPrivacyInfo(prev => prev ? `${prev}\n取件码：` : '取件码：')}
              className="bg-gray-100 px-2 py-1 rounded active:bg-gray-200 transition-colors"
            >
              取件码
            </button>
            <button 
              onClick={() => setPrivacyInfo(prev => prev ? `${prev}\n手机尾号：` : '手机尾号：')}
              className="bg-gray-100 px-2 py-1 rounded active:bg-gray-200 transition-colors"
            >
              手机尾号
            </button>
          </div>
          <div className="bg-gray-100 rounded-xl h-24 p-3">
            <textarea 
              className="w-full h-full bg-transparent resize-none text-sm outline-none placeholder:text-gray-300"
              placeholder="请输入取件码或手机尾号..."
              value={privacyInfo}
              onChange={(e) => setPrivacyInfo(e.target.value)}
            ></textarea>
          </div>
          <button className="w-20 h-20 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-300">
            <Plus size={24} />
            <span className="text-[10px] mt-1">选择图片</span>
          </button>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex items-center justify-between px-6 py-3 z-50">
        <div className="flex items-baseline gap-2">
          <span className="text-gray-800 font-bold text-lg">拼送</span>
          <span className="text-gray-400 text-xs">一口价</span>
          <span className="text-red-500 font-bold text-2xl">{calculatePrice()}</span>
          <span className="text-red-500 text-sm">元</span>
        </div>
        <button 
          onClick={onConfirm}
          className="bg-yellow-400 text-black px-12 py-3 rounded-full font-bold text-base shadow-lg shadow-yellow-400/20 active:scale-95 transition-transform"
        >
          去支付
        </button>
      </div>
    </div>
  );
}
