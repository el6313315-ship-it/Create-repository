/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Screen } from './types';
import Home from './components/Home';
import CreateTask from './components/CreateTask';
import ConfirmOrder from './components/ConfirmOrder';
import OrderList from './components/OrderList';
import TaskMarket from './components/TaskMarket';
import GroupOrderDetail from './components/GroupOrderDetail';
import RunnerTaskDetail from './components/RunnerTaskDetail';
import Me from './components/Me';
import TaskDetail from './components/TaskDetail';
import AddressSelect from './components/AddressSelect';
import BottomNav from './components/BottomNav';
import InviteFriends from './components/InviteFriends';
import { mockOrders } from './mockData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [orders, setOrders] = useState(mockOrders);
  const [addressType, setAddressType] = useState<'pickup' | 'delivery'>('pickup');
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [taskDraft, setTaskDraft] = useState({
    type: '快递' as any,
    quantity: '1',
    weight: '小于2kg',
    time: '立即取件',
    gender: '不限',
    enterBuilding: true,
    pickup: '南校区 菜鸟驿站 (3号柜)',
    destination: '学生公寓 7号楼 A204',
  });

  const addOrder = (newOrder: any) => {
    setOrders([newOrder, ...orders]);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <Home 
            onNavigate={(screen: Screen, type?: string) => {
              if (type) setAddressType(type as any);
              setCurrentScreen(screen);
            }} 
            orders={orders} 
            pickupAddress={pickupAddress}
            deliveryAddress={deliveryAddress}
          />
        );
      case 'market':
        return <TaskMarket onNavigate={setCurrentScreen} orders={orders} />;
      case 'create':
        return (
          <CreateTask 
            onBack={() => setCurrentScreen('home')} 
            onNext={(draft) => {
              setTaskDraft({ ...taskDraft, ...draft });
              setCurrentScreen('confirm');
            }} 
            initialDraft={taskDraft}
          />
        );
      case 'confirm':
        return (
          <ConfirmOrder 
            onBack={() => setCurrentScreen('create')} 
            onConfirm={(order) => {
              addOrder(order);
              setCurrentScreen('orders');
            }} 
            draft={taskDraft}
          />
        );
      case 'orders':
        return <OrderList onNavigate={setCurrentScreen} orders={orders} />;
      case 'groupDetail':
        return <GroupOrderDetail onBack={() => setCurrentScreen('home')} onConfirm={() => setCurrentScreen('orders')} />;
      case 'runnerDetail':
        return <RunnerTaskDetail onBack={() => setCurrentScreen('market')} />;
      case 'me':
        return <Me onNavigate={setCurrentScreen} />;
      case 'detail':
        return <TaskDetail onBack={() => setCurrentScreen('orders')} />;
      case 'address':
        return (
          <AddressSelect 
            onBack={() => setCurrentScreen('home')} 
            onSelect={(addr) => {
              if (addressType === 'pickup') setPickupAddress(addr);
              else setDeliveryAddress(addr);
              setCurrentScreen('home');
            }}
          />
        );
      case 'invite':
        return <InviteFriends onBack={() => setCurrentScreen('orders')} />;
      default:
        return <Home onNavigate={setCurrentScreen} orders={orders} />;
    }
  };

  const showBottomNav = ['home', 'market', 'orders', 'me'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {showBottomNav && (
        <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
    </div>
  );
}

