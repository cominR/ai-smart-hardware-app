import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  Monitor, Moon, Sun, Globe, Bell, Mail, Settings as SettingsIcon,
  User, ChevronRight, Edit3, Calendar, MapPin, Phone, Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';

const UserSettings: React.FC = () => {
  const { mode, setMode } = useTheme();
  const [language, setLanguage] = useState('zh-CN');
  const [notificationSettings, setNotificationSettings] = useState({
    push: true,
    sms: false,
    email: true
  });
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  
  const handleNotificationToggle = (type: 'push' | 'sms' | 'email') => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="p-4">
      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">主题设置</h3>
        
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setMode('light')}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
              mode === 'light'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <Sun size={24} className={`mb-2 ${mode === 'light' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`} />
            <span className={mode === 'light' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}>
              浅色
            </span>
          </button>
          
          <button
            onClick={() => setMode('dark')}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
              mode === 'dark'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <Moon size={24} className={`mb-2 ${mode === 'dark' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`} />
            <span className={mode === 'dark' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}>
              深色
            </span>
          </button>
          
          <button
            onClick={() => setMode('system')}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
              mode === 'system'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <Monitor size={24} className={`mb-2 ${mode === 'system' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`} />
            <span className={mode === 'system' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}>
              跟随系统
            </span>
          </button>
        </div>
      </div>
      
      {/* Language Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">语言设置</h3>
        
        <div className="flex items-center mb-2">
          <Globe size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
          <span className="text-gray-800 dark:text-white">应用语言</span>
        </div>
        
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="zh-CN">简体中文</option>
          <option value="en-US">English (US)</option>
          <option value="ja-JP">日本語</option>
          <option value="ko-KR">한국어</option>
        </select>
      </div>
      
      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">通知设置</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
              <span className="text-gray-800 dark:text-white">应用推送通知</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notificationSettings.push} 
                onChange={() => handleNotificationToggle('push')} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
              <span className="text-gray-800 dark:text-white">邮件通知</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={notificationSettings.email} 
                onChange={() => handleNotificationToggle('email')} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>
      
      {/* About App */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">关于应用</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between py-1">
            <span className="text-gray-600 dark:text-gray-400">应用版本</span>
            <span className="text-gray-800 dark:text-white">1.0.0</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600 dark:text-gray-400">构建日期</span>
            <span className="text-gray-800 dark:text-white">2025-06-01</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600 dark:text-gray-400">服务条款</span>
            <a href="#" className="text-blue-500 hover:underline">查看</a>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600 dark:text-gray-400">隐私政策</span>
            <a href="#" className="text-blue-500 hover:underline">查看</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;