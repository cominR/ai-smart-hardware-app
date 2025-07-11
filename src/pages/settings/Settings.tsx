import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import {
  Monitor, Moon, Sun, Globe, Bell, Mail, Settings as SettingsIcon,
  User, ChevronRight, Edit3, Shield, Lock, Key, Smartphone, Save, Camera,
  LogOut, Trash2, AlertTriangle, Info, HelpCircle, MessageSquare,
  Volume2, Vibrate
} from 'lucide-react';
import { motion } from 'framer-motion';

const UserSettings: React.FC = () => {
  const { mode, setMode } = useTheme();
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  // 状态管理
  const [currentView, setCurrentView] = useState('main'); // 'main' 或具体的设置页面
  const [language, setLanguage] = useState('zh-CN');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  // 个人信息状态
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    bio: '这个人很懒，什么都没有留下...',
    location: '北京市',
    birthday: '1990-01-01',
    occupation: '软件工程师'
  });

  // 密码修改状态
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 通知设置状态
  const [notificationSettings, setNotificationSettings] = useState({
    push: true,
    sms: false,
    email: true,
    sound: true,
    vibration: true,
    deviceUpdates: true,
    aiMessages: true,
    systemNotifications: false
  });

  // 隐私设置状态
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'friends',
    dataCollection: false,
    analytics: true,
    crashReports: true
  });
  
  // 处理函数
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleNotificationToggle = (type: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handlePrivacyToggle = (type: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(profileData);
      setIsEditing(false);
      alert('个人信息更新成功！');
    } catch (error) {
      alert('更新失败，请重试');
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('新密码和确认密码不匹配');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('密码长度至少6位');
      return;
    }

    try {
      // 这里应该调用API更改密码
      alert('密码修改成功！');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordChange(false);
    } catch (error) {
      alert('密码修改失败，请重试');
    }
  };

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      logout();
      navigate('/login');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('确定要删除账号吗？此操作不可恢复！')) {
      if (confirm('请再次确认删除账号，所有数据将永久丢失！')) {
        // 这里应该调用API删除账号
        alert('账号删除成功');
        logout();
        navigate('/login');
      }
    }
  };

  // 设置选项配置
  const settingsOptions = [
    { id: 'profile', name: '修改个人信息', icon: User },
    { id: 'security', name: '账号安全', icon: Shield },
    { id: 'notifications', name: '通知设置', icon: Bell },
    { id: 'privacy', name: '隐私设置', icon: Lock },
    { id: 'general', name: '通用设置', icon: SettingsIcon },
    { id: 'about', name: '关于应用', icon: Info }
  ];

  // 处理选项点击
  const handleOptionClick = (optionId: string) => {
    setCurrentView(optionId);
  };

  // 返回主菜单
  const handleBackToMain = () => {
    setCurrentView('main');
    setIsEditing(false);
    setShowPasswordChange(false);
  };

  // 渲染主菜单
  const renderMainMenu = () => (
    <div className="space-y-3">
      {settingsOptions.map((option) => {
        const IconComponent = option.icon;
        return (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className="w-full flex items-center justify-between p-4 rounded-xl shadow-sm transition-all bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 rounded-lg mr-3 bg-gray-100 dark:bg-gray-700">
                <IconComponent
                  size={20}
                  className="text-gray-600 dark:text-gray-400"
                />
              </div>
              <span className="font-medium text-gray-800 dark:text-white">
                {option.name}
              </span>
            </div>
            <ChevronRight
              size={16}
              className="text-gray-400 dark:text-gray-500"
            />
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="p-4 pb-20">
      {/* 页面标题和返回按钮 */}
      {currentView !== 'main' && (
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackToMain}
            className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
          >
            <ChevronRight size={20} className="rotate-180 mr-2" />
            <span>返回</span>
          </button>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white ml-4">
            {settingsOptions.find(opt => opt.id === currentView)?.name}
          </h1>
        </div>
      )}

      {/* 主菜单 */}
      {currentView === 'main' && renderMainMenu()}

      {/* 个人信息修改 */}
      {currentView === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* 头像设置 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">头像设置</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={profileData.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}
                  alt="头像"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors">
                  <Camera size={14} />
                </button>
              </div>
              <div>
                <p className="text-gray-800 dark:text-white font-medium">更换头像</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">支持JPG、PNG格式，建议尺寸200x200</p>
              </div>
            </div>
          </div>

          {/* 基本信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">基本信息</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
              >
                <Edit3 size={16} className="mr-1" />
                {isEditing ? '取消编辑' : '编辑'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  昵称
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  邮箱
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  手机号
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  个人简介
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    所在地区
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    职业
                  </label>
                  <input
                    type="text"
                    value={profileData.occupation}
                    onChange={(e) => setProfileData(prev => ({ ...prev, occupation: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleProfileUpdate}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Save size={16} className="mr-2" />
                    保存更改
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    取消
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* 账号安全 */}
      {currentView === 'security' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* 密码修改 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">密码管理</h3>
              <button
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
              >
                <Key size={16} className="mr-1" />
                {showPasswordChange ? '取消修改' : '修改密码'}
              </button>
            </div>

            {showPasswordChange && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    当前密码
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入当前密码"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    新密码
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入新密码（至少6位）"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    确认新密码
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请再次输入新密码"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handlePasswordChange}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Save size={16} className="mr-2" />
                    确认修改
                  </button>
                  <button
                    onClick={() => setShowPasswordChange(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    取消
                  </button>
                </div>
              </div>
            )}

            {!showPasswordChange && (
              <div className="text-gray-600 dark:text-gray-400">
                <p>上次修改时间：2024-12-01</p>
                <p className="text-sm mt-1">建议定期更换密码以保护账号安全</p>
              </div>
            )}
          </div>

          {/* 登录设备管理 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">登录设备</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <Smartphone size={20} className="text-blue-500 mr-3" />
                  <div>
                    <p className="text-gray-800 dark:text-white font-medium">当前设备</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Windows 11 - Chrome浏览器</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">最后活跃：刚刚</p>
                  </div>
                </div>
                <span className="text-green-500 text-sm font-medium">当前</span>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <Smartphone size={20} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-gray-800 dark:text-white font-medium">iPhone 15</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">iOS 17.2 - Safari浏览器</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">最后活跃：2小时前</p>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-600 text-sm">
                  移除
                </button>
              </div>
            </div>
          </div>

          {/* 危险操作 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border-l-4 border-red-500">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4 flex items-center">
              <AlertTriangle size={20} className="mr-2" />
              危险操作
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800 dark:text-white font-medium">退出登录</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">退出当前账号，需要重新登录</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut size={16} className="mr-2" />
                  退出登录
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800 dark:text-white font-medium">删除账号</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">永久删除账号和所有数据，此操作不可恢复</p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 size={16} className="mr-2" />
                  删除账号
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 通知设置 */}
      {currentView === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">推送通知</h3>
            <div className="space-y-4">
              {[
                { key: 'push', icon: Bell, label: '应用推送通知', desc: '接收应用内的重要通知' },
                { key: 'email', icon: Mail, label: '邮件通知', desc: '通过邮件接收重要信息' },
                { key: 'sms', icon: Smartphone, label: '短信通知', desc: '通过短信接收验证码等' },
                { key: 'sound', icon: Volume2, label: '声音提醒', desc: '播放通知声音' },
                { key: 'vibration', icon: Vibrate, label: '震动提醒', desc: '设备震动提醒' }
              ].map(({ key, icon: Icon, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-gray-800 dark:text-white">{label}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{desc}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings[key as keyof typeof notificationSettings]}
                      onChange={() => handleNotificationToggle(key as keyof typeof notificationSettings)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">内容通知</h3>
            <div className="space-y-4">
              {[
                { key: 'deviceUpdates', label: '设备更新', desc: '设备固件和功能更新通知' },
                { key: 'aiMessages', label: 'AI消息', desc: 'AI助手的主动消息和建议' },
                { key: 'systemNotifications', label: '系统通知', desc: '系统维护和重要公告' }
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-800 dark:text-white">{label}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings[key as keyof typeof notificationSettings]}
                      onChange={() => handleNotificationToggle(key as keyof typeof notificationSettings)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* 隐私设置 */}
      {currentView === 'privacy' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">数据隐私</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800 dark:text-white">数据收集</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">允许收集使用数据以改善服务</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.dataCollection}
                    onChange={() => handlePrivacyToggle('dataCollection')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800 dark:text-white">使用分析</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">帮助我们了解应用使用情况</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.analytics}
                    onChange={() => handlePrivacyToggle('analytics')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800 dark:text-white">崩溃报告</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">自动发送崩溃报告帮助修复问题</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.crashReports}
                    onChange={() => handlePrivacyToggle('crashReports')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 通用设置 */}
      {currentView === 'general' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* 主题设置 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">主题设置</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setMode('light')}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
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
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
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
                className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
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

          {/* 语言设置 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">语言设置</h3>
            <div className="flex items-center mb-2">
              <Globe size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
              <span className="text-gray-800 dark:text-white">应用语言</span>
            </div>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="zh-CN">简体中文</option>
              <option value="en-US">English (US)</option>
              <option value="ja-JP">日本語</option>
              <option value="ko-KR">한국어</option>
            </select>
          </div>
        </motion.div>
      )}

      {/* 关于应用 */}
      {currentView === 'about' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">应用信息</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">应用版本</span>
                <span className="text-gray-800 dark:text-white">1.0.0</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">构建日期</span>
                <span className="text-gray-800 dark:text-white">2025-01-11</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">开发者</span>
                <span className="text-gray-800 dark:text-white">AI Smart Team</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">技术栈</span>
                <span className="text-gray-800 dark:text-white">React + TypeScript</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">法律信息</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between py-2 text-blue-500 hover:text-blue-600">
                <span>服务条款</span>
                <ChevronRight size={16} />
              </a>
              <a href="#" className="flex items-center justify-between py-2 text-blue-500 hover:text-blue-600">
                <span>隐私政策</span>
                <ChevronRight size={16} />
              </a>
              <a href="#" className="flex items-center justify-between py-2 text-blue-500 hover:text-blue-600">
                <span>开源许可</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">帮助与支持</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between py-2 text-blue-500 hover:text-blue-600">
                <div className="flex items-center">
                  <HelpCircle size={16} className="mr-2" />
                  <span>使用帮助</span>
                </div>
                <ChevronRight size={16} />
              </a>
              <a href="#" className="flex items-center justify-between py-2 text-blue-500 hover:text-blue-600">
                <div className="flex items-center">
                  <MessageSquare size={16} className="mr-2" />
                  <span>意见反馈</span>
                </div>
                <ChevronRight size={16} />
              </a>
              <a href="#" className="flex items-center justify-between py-2 text-blue-500 hover:text-blue-600">
                <div className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  <span>联系我们</span>
                </div>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserSettings;