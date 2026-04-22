export type Screen = 'home' | 'market' | 'orders' | 'me' | 'create' | 'confirm' | 'detail' | 'address' | 'groupDetail' | 'runnerDetail' | 'invite';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'runner';
  rating?: number;
  completedOrders?: number;
}

export interface Address {
  id: string;
  name: string;
  detail: string;
  contact: string;
  phone: string;
  type: 'home' | 'dorm' | 'library' | 'station';
}

export interface Order {
  id: string;
  title: string;
  type: 'express' | 'food' | 'document' | 'other';
  status: 'grouping' | 'delivering' | 'completed' | 'cancelled';
  pickup: string;
  destination: string;
  price: number;
  originalPrice?: number;
  timestamp: string;
  runner?: User;
  user: User;
  itemsCount?: number;
  weight?: string;
  isEnterBuilding?: boolean;
  genderPreference?: 'none' | 'male' | 'female';
  timeRequirement?: string;
  description?: string;
  pickupCode?: string;
  phoneLastFour?: string;
}
