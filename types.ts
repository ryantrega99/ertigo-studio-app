import React from 'react';

export enum ViewState {
  DASHBOARD = 'DASHBOARD', // System/Monitoring
  DATA_CHANNEL = 'DATA_CHANNEL', // Multi-channel Management
  STREAMING = 'STREAMING', // Live Control
  MAGIC_EDITOR = 'MAGIC_EDITOR', // AI Studio
  VIDEO_GALLERY = 'VIDEO_GALLERY', // Asset Management
  LOOPING = 'LOOPING', // Loop Automation Monitor
  YT_AUTOMATION = 'YT_AUTOMATION', // YouTube Automation Tools
  ANALYTICS = 'ANALYTICS', // Stats
  SCHEDULE = 'SCHEDULE', // Calendar
  SYSTEM = 'SYSTEM' // Settings & Config
}

export interface NavItem {
  id: ViewState;
  label: string;
  icon: React.ReactNode;
}

export interface AnalyticsData {
  name: string;
  views: number;
  subs: number;
}

export interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  color: string;
}

export interface VideoAsset {
  id: string;
  no: number;
  channel: string;
  source: string;
  fileName: string;
  category: string;
  date: string;
  duration: string;
  status: 'IDLE' | 'LOOPING' | 'SCHEDULED';
}

export interface ChannelData {
  id: string;
  name: string;
  handle: string;
  subscribers: string;
  views: string;
  videoCount: number;
  avatarUrl: string;
  status: 'ACTIVE' | 'EXPIRED' | 'SYNCING';
  lastSync: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}