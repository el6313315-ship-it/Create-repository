import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, CheckCircle2, HelpCircle, Image as ImageIcon, Mic, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../types';

interface CreateTaskProps {
  onBack: () => void;
  onNext: (draft: any) => void;
  initialDraft: any;
}

export default function CreateTask({ onBack, onNext, initialDraft }: CreateTaskProps) {
  const [itemType, setItemType] = useState(initialDraft.type);
  const [quantity, setQuantity] = useState(initialDraft.quantity);
  const [weight, setWeight] = useState(initialDraft.weight);
  const [time, setTime] = useState(initialDraft.time);
  const [gender, setGender] = useState(initialDraft.gender);
  const [enterBuilding, setEnterBuilding] = useState(initialDraft.enterBuilding);

  const handleNext = () => {
    onNext({
      type: itemType,
      quantity,
      weight,
      time,
      gender,
      enterBuilding
    });
  };

  return (
    <div className="pb-28 bg-gray-50 min-h-screen">
      <header className="w-full sticky top-0 z-40 bg-gray-50 flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="active:scale-95 transition-transform">
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg">填写任务需求</h1>
        </div>
        <button className="active:scale-95 transition-transform">
          <MoreHorizontal size={24} />
        </button>
      </header>

      <main className="px-3 mt-2 space-y-3">
        {/* Item Info */}
        <section className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold">物品信息</h2>
            <span className="text-xs text-gray-400">必填</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['快递', '外卖', '资料', '其他'].map((type) => (
              <button
                key={type}
                onClick={() => setItemType(type)}
                className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all border-2 active:scale-95 ${
                  itemType === type ? 'bg-white border-yellow-400 text-black' : 'bg-gray-100 border-transparent text-gray-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">快递件数</span>
              <div className="flex gap-1">
                {['1', '2', '3', '4', '5+'].map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuantity(q)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all border-2 ${
                      quantity === q ? 'bg-white border-yellow-400 text-black font-bold' : 'bg-gray-100 border-transparent text-gray-500 font-medium'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Weight */}
        <section className="bg-white p-4 rounded-2xl shadow-sm">
          <h2 className="font-bold mb-3">物品重量</h2>
          <div className="grid grid-cols-2 gap-2">
            {['小于2kg', '2-5kg', '5-10kg', '大于10kg'].map((w) => (
              <button
                key={w}
                onClick={() => setWeight(w)}
                className={`py-2.5 rounded-lg text-sm transition-all border-2 ${
                  weight === w ? 'bg-white border-yellow-400 text-black font-bold shadow-sm' : 'bg-gray-100 border-transparent text-gray-500 font-medium'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section className="bg-white p-4 rounded-2xl shadow-sm space-y-4">
          <div>
            <h2 className="font-bold mb-3">时间要求</h2>
            <div className="grid grid-cols-3 gap-2">
              {['立即取件', '1小时内', '2小时内'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`py-2.5 rounded-lg text-xs font-bold transition-all border-2 ${
                    time === t ? 'bg-white border-yellow-400 text-black' : 'bg-gray-100 border-transparent text-gray-500 font-medium'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-sm">骑手性别要求</h2>
            <div className="bg-gray-50 p-1 rounded-full flex gap-1">
              {['不限', '男', '女'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`px-3 py-1 text-xs transition-all rounded-full border-2 ${
                    gender === g ? 'bg-white border-yellow-400 text-black font-bold shadow-sm' : 'border-transparent text-gray-500 font-medium'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h2 className="font-bold text-sm">是否进楼</h2>
              <HelpCircle size={16} className="text-gray-300" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEnterBuilding(false)}
                className={`px-4 py-1 rounded-full text-xs font-medium transition-all border-2 ${
                  !enterBuilding ? 'bg-white border-yellow-400 text-black font-bold shadow-sm' : 'bg-gray-100 border-transparent text-gray-500'
                }`}
              >
                否
              </button>
              <button
                onClick={() => setEnterBuilding(true)}
                className={`px-4 py-1 rounded-full text-xs font-medium transition-all border-2 ${
                  enterBuilding ? 'bg-white border-yellow-400 text-black font-bold shadow-sm' : 'bg-gray-100 border-transparent text-gray-500'
                }`}
              >
                是
              </button>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold">更多任务描述</h2>
            <span className="text-xs text-gray-400">0/200</span>
          </div>
          <div className="relative">
            <textarea
              className="w-full min-h-[100px] p-3 bg-gray-50 border-none rounded-xl focus:ring-0 text-gray-800 text-sm placeholder:text-gray-300 resize-none"
              placeholder="请输入具体的任务需求、取送地点细节或注意事项..."
            />
            <div className="absolute bottom-2 right-2 flex gap-1.5">
              <button className="p-1.5 bg-white rounded-full text-gray-400 shadow-sm active:scale-90">
                <ImageIcon size={18} />
              </button>
              <button className="p-1.5 bg-white rounded-full text-gray-400 shadow-sm active:scale-90">
                <Mic size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Tips */}
        <div className="flex gap-3 p-3 bg-yellow-50/50 rounded-xl border border-yellow-100">
          <Lightbulb size={18} className="text-yellow-500 fill-yellow-500 shrink-0" />
          <p className="text-xs text-gray-500 leading-normal">
            温馨提示：描述清晰的任务更容易被骑手快速接单。如涉及隐私物品，请选择“其他”类型。
          </p>
        </div>
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button 
            onClick={handleNext}
            className="w-full py-4 bg-yellow-400 text-black font-bold rounded-full shadow-lg shadow-yellow-400/20 active:scale-95 transition-all text-lg"
          >
            确认
          </button>
        </div>
        <div className="h-2"></div>
      </div>
    </div>
  );
}
