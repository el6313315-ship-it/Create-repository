import { Order, User, Address } from './types';

export const currentUser: User = {
  id: 'u1',
  name: '李小明',
  avatar: 'https://picsum.photos/seed/user1/100/100',
  role: 'student',
};

export const mockRunners: User[] = [
  {
    id: 'r1',
    name: '王大明',
    avatar: 'https://picsum.photos/seed/runner1/100/100',
    role: 'runner',
    rating: 4.9,
    completedOrders: 2431,
  },
];

export const mockAddresses: Address[] = [
  {
    id: 'a1',
    name: '南苑菜鸟驿站',
    detail: '南校区 菜鸟驿站 (3号柜)',
    contact: '张同学',
    phone: '138****5678',
    type: 'station',
  },
  {
    id: 'a2',
    name: '学生公寓 7号楼',
    detail: '学生公寓 7号楼 A204',
    contact: '李晓明',
    phone: '139****1234',
    type: 'dorm',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    title: '取快递 · 顺丰大件',
    type: 'express',
    status: 'delivering',
    pickup: '菜鸟驿站（西门）',
    destination: '10号楼 302室',
    price: 5.0,
    timestamp: '2023-11-20 14:30',
    user: currentUser,
    runner: mockRunners[0],
  },
  {
    id: 'o2',
    title: '代买奶茶 · 霸王茶姬',
    type: 'food',
    status: 'grouping',
    pickup: '商业街霸王茶姬店',
    destination: '图书馆南门自提点',
    price: 3.5,
    originalPrice: 6.0,
    timestamp: '2023-11-20 12:15',
    user: currentUser,
  },
  {
    id: 'o3',
    title: '帮买代购 · 冰可乐',
    type: 'food',
    status: 'delivering',
    pickup: '观畴园餐厅',
    destination: '西门家属区 8号楼',
    price: 12.0,
    timestamp: '2023-11-20 15:45',
    user: currentUser,
  },
  {
    id: 'o4',
    title: '代拿快递 · 拼单',
    type: 'express',
    status: 'grouping',
    pickup: '紫荆驿站',
    destination: '学生公寓 1号楼',
    price: 1.5,
    timestamp: '2023-11-20 16:00',
    user: currentUser,
  },
];
