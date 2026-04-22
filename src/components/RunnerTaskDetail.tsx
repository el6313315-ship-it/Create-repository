import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Phone, ChevronUp, Camera, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RunnerTaskDetailProps {
  onBack: () => void;
}

type TaskStatus = 'pending_pickup' | 'picked_up' | 'delivered';

interface SubTask {
  id: number;
  building: string;
  room: string;
  items: string;
  floor: string;
  desc: string;
  code: string;
  phone: string;
  status: TaskStatus;
}

export default function RunnerTaskDetail({ onBack }: RunnerTaskDetailProps) {
  const [tasks, setTasks] = useState<SubTask[]>([
    { id: 1, building: '学生公寓1号楼', room: '1321', items: '1件', floor: '爬3楼', desc: '快递/小于2kg', code: '2310', phone: '李** 132****8232', status: 'pending_pickup' },
    { id: 2, building: '学生公寓2号楼', room: '2321', items: '1件', floor: '爬3楼', desc: '快递/小于2kg', code: '2310', phone: '李** 132****8232', status: 'pending_pickup' },
    { id: 3, building: '学生公寓2号楼', room: '2321', items: '1件', floor: '爬3楼', desc: '快递/小于2kg', code: '2310', phone: '李** 132****8232', status: 'pending_pickup' },
  ]);

  const [showCamera, setShowCamera] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);

  const allPickedUp = tasks.every(t => t.status !== 'pending_pickup');
  const allDelivered = tasks.every(t => t.status === 'delivered');
  const pickedUpCount = tasks.filter(t => t.status !== 'pending_pickup').length;
  const deliveredCount = tasks.filter(t => t.status === 'delivered').length;

  const handleAction = (id: number) => {
    setActiveTaskId(id);
    setShowCamera(true);
  };

  const confirmPhoto = () => {
    if (activeTaskId === null) return;
    
    setTasks(prev => prev.map(t => {
      if (t.id === activeTaskId) {
        return {
          ...t,
          status: t.status === 'pending_pickup' ? 'picked_up' : 'delivered'
        };
      }
      return t;
    }));
    
    setShowCamera(false);
    setActiveTaskId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-4 h-14 bg-white shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg">任务详情</h1>
        <div className="flex items-center">
          {!allDelivered && (
            <button className="p-2 -mr-2">
              <MoreHorizontal size={24} />
            </button>
          )}
        </div>
      </header>

      <main className="mt-14 p-4 space-y-4">
        {/* Status Bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
              {allDelivered ? '订单已完成' : allPickedUp ? `配送中 ${deliveredCount}/${tasks.length}` : `取货中 ${pickedUpCount}/${tasks.length}`}
            </span>
            {allDelivered && <CheckCircle2 size={20} className="text-green-500" />}
          </div>
          {!allPickedUp && (
            <button className="bg-yellow-400 text-black px-4 py-1.5 rounded-lg font-bold text-sm shadow-sm active:scale-95 transition-transform">
              一键取件
            </button>
          )}
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">骑手性别要求</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold">女骑手</span>
            </div>
            <div className="text-right">
              <div className="text-yellow-500 font-bold text-3xl">¥ 7.5</div>
              <p className="text-[10px] text-gray-400 mt-0.5">技术服务费 -1.5</p>
              <p className="text-[10px] text-gray-400">预估收入 6.0</p>
            </div>
          </div>
          
          <div className="pt-2">
            <h2 className="text-xl font-bold text-gray-800">04.04 10:33-13:33 送达</h2>
          </div>

          {/* Route */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <p className="font-bold text-gray-800">( 龙子湖校区 ) 西门代收点</p>
          </div>

          {/* Delivery Points */}
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-gray-50 rounded-2xl p-4 space-y-4 border border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="font-bold text-gray-800">{task.building}</span>
                  </div>
                  <ChevronUp size={18} className="text-gray-300" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-bold">寝室：{task.room}</span>
                      {task.status === 'picked_up' && <span className="text-[10px] text-gray-400 font-medium">已取件</span>}
                      {task.status === 'delivered' && <span className="text-[10px] text-gray-400 font-medium">已送达</span>}
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      <span className="bg-white px-1.5 py-0.5 rounded text-[9px] text-gray-500 border border-gray-100">{task.items}</span>
                      <span className="bg-white px-1.5 py-0.5 rounded text-[9px] text-gray-500 border border-gray-100">{task.floor}</span>
                      <span className="bg-white px-1.5 py-0.5 rounded text-[9px] text-gray-500 border border-gray-100">{task.desc}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 active:scale-90 transition-transform">
                      <Phone size={14} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-400 text-xs">取件码：</span>
                        <span className="text-yellow-500 font-bold text-xl">{task.code}</span>
                      </div>
                      <div className="text-gray-400 text-[10px]">{task.phone}</div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {task.status === 'pending_pickup' && (
                        <button 
                          onClick={() => handleAction(task.id)}
                          className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold text-xs shadow-sm active:scale-95 transition-transform"
                        >
                          确认取件
                        </button>
                      )}
                      {task.status === 'picked_up' && allPickedUp && (
                        <button 
                          onClick={() => handleAction(task.id)}
                          className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold text-xs shadow-sm active:scale-95 transition-transform"
                        >
                          确认送达
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Camera Modal Simulation */}
      <AnimatePresence>
        {showCamera && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
          >
            <div className="p-4 flex justify-between items-center text-white">
              <button onClick={() => setShowCamera(false)}><X size={24} /></button>
              <span className="font-bold">拍照上传证明</span>
              <div className="w-6"></div>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative">
              <div className="w-64 h-64 border-2 border-white/30 rounded-3xl flex items-center justify-center">
                <Camera size={64} className="text-white/20" />
              </div>
              <div className="absolute bottom-10 w-full flex justify-center">
                <button 
                  onClick={confirmPhoto}
                  className="w-20 h-20 bg-white rounded-full border-8 border-gray-300 flex items-center justify-center active:scale-90 transition-transform"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full"></div>
                </button>
              </div>
            </div>
            
            <div className="p-8 bg-black/50 text-white text-center text-sm">
              请确保照片清晰，包含货物及环境信息
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
