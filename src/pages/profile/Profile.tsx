import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  User, Mail, Smartphone, Camera, ChevronRight, 
  Shield, LogOut, Edit, Check, Bell, Info, HelpCircle, Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleUpdateName = async () => {
    await updateProfile({ name: newName });
    setIsEditingName(false);
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This would handle file uploads in a real app
    console.log('Avatar change requested');
  };

  return (
    <div className="p-4">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user?.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={32} className="text-gray-400" />
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 text-white cursor-pointer">
              <Camera size={16} />
              <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
            </label>
          </div>
          
          <div className="ml-4 flex-1">
            {isEditingName ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  autoFocus
                  className="px-2 py-1 border border-blue-300 dark:border-blue-700 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleUpdateName}
                  className="ml-2 p-1 text-blue-500"
                >
                  <Check size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Edit size={16} />
                </button>
              </div>
            )}
            
            {user?.email && (
              <p className="text-gray-600 dark:text-gray-400 flex items-center">
                <Mail size={14} className="mr-1" />
                {user.email}
              </p>
            )}
            
            {user?.phone && (
              <p className="text-gray-600 dark:text-gray-400 flex items-center">
                <Smartphone size={14} className="mr-1" />
                {user.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white p-4 border-b border-gray-100 dark:border-gray-700">
          账号设置
        </h3>
        
        <div>
          <button
            onClick={() => navigate('/profile/edit')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750 border-b border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center">
              <User className="text-gray-500 dark:text-gray-400 mr-3" size={18} />
              <span className="text-gray-800 dark:text-white">修改个人信息</span>
            </div>
            <ChevronRight className="text-gray-400" size={18} />
          </button>
          
          <button
            onClick={() => navigate('/profile/security')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750 border-b border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center">
              <Shield className="text-gray-500 dark:text-gray-400 mr-3" size={18} />
              <span className="text-gray-800 dark:text-white">账号安全</span>
            </div>
            <ChevronRight className="text-gray-400" size={18} />
          </button>
          
          <button
            onClick={() => navigate('/profile/notifications')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750"
          >
            <div className="flex items-center">
              <Bell className="text-gray-500 dark:text-gray-400 mr-3" size={18} />
              <span className="text-gray-800 dark:text-white">通知设置</span>
            </div>
            <ChevronRight className="text-gray-400" size={18} />
          </button>
        </div>
      </div>
      
      {/* App Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white p-4 border-b border-gray-100 dark:border-gray-700">
          应用设置
        </h3>
        
        <div>
          <button
            onClick={() => navigate('/settings')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750 border-b border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center">
              <Settings className="text-gray-500 dark:text-gray-400 mr-3" size={18} />
              <span className="text-gray-800 dark:text-white">通用设置</span>
            </div>
            <ChevronRight className="text-gray-400" size={18} />
          </button>
          
          <button
            onClick={() => navigate('/settings/about')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750 border-b border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center">
              <Info className="text-gray-500 dark:text-gray-400 mr-3" size={18} />
              <span className="text-gray-800 dark:text-white">关于应用</span>
            </div>
            <ChevronRight className="text-gray-400" size={18} />
          </button>
          
          <button
            onClick={() => navigate('/settings/help')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750"
          >
            <div className="flex items-center">
              <HelpCircle className="text-gray-500 dark:text-gray-400 mr-3" size={18} />
              <span className="text-gray-800 dark:text-white">帮助与反馈</span>
            </div>
            <ChevronRight className="text-gray-400" size={18} />
          </button>
        </div>
      </div>
      
      {/* Logout Button */}
      <button
        onClick={() => setShowLogoutConfirm(true)}
        className="w-full flex items-center justify-center p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
      >
        <LogOut size={18} className="mr-2" />
        退出登录
      </button>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-sm"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="text-red-500" size={24} />
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                确认退出登录
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                退出后需要重新登录才能使用应用功能
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  取消
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  确认退出
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;