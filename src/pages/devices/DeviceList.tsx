import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cpu, Battery, Volume2, Plus, Search, MoreVertical, CheckCircle, X, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Device {
  id: string;
  name: string;
  battery: number;
  volume: number;
  status: 'online' | 'offline';
  lastActive: string;
}

const DeviceList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  
  // Mock data for devices
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'device1',
      name: '智能助手 Alpha',
      battery: 75,
      volume: 80,
      status: 'online',
      lastActive: '刚刚',
    },
    {
      id: 'device2',
      name: '客厅助手',
      battery: 32,
      volume: 50,
      status: 'offline',
      lastActive: '3小时前',
    },
    {
      id: 'device3',
      name: '卧室助手',
      battery: 92,
      volume: 30,
      status: 'online',
      lastActive: '10分钟前',
    }
  ]);

  // Check for navigation state message
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setMessageType(location.state.type || 'success');
      setShowMessage(true);
      
      // Clear the state to prevent showing message on refresh
      window.history.replaceState({}, document.title);
      
      // Auto hide message after 5 seconds
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }, [location.state]);
  
  // Battery color based on level
  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Filter devices based on search term
  const filteredDevices = devices.filter(device => 
    device.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Item animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="p-4">
      {/* Success/Error Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 left-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              messageType === 'success' 
                ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle 
                  size={20} 
                  className={messageType === 'success' ? 'text-green-500 mr-2' : 'text-red-500 mr-2'} 
                />
                <span className={`font-medium ${
                  messageType === 'success' 
                    ? 'text-green-800 dark:text-green-200' 
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {message}
                </span>
              </div>
              <button
                onClick={() => setShowMessage(false)}
                className={messageType === 'success' ? 'text-green-500' : 'text-red-500'}
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="搜索设备..."
        />
      </div>
      
      {/* Add Device Button */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">绑定设备 ({devices.length})</h3>
        <button
          onClick={() => navigate('/devices/add')}
          className="inline-flex items-center justify-center py-2 px-4 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          绑定设备
        </button>
      </div>
      
      {/* Device List */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {filteredDevices.map(device => (
          <motion.div
            key={device.id}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                <Cpu className="text-blue-500" size={24} />
              </div>
              <div className="flex-1" onClick={() => navigate(`/devices/${device.id}`)}>
                <h4 className="font-medium text-gray-900 dark:text-white">{device.name}</h4>
                <div className="flex items-center text-sm">
                  <span className={`h-2 w-2 rounded-full mr-2 ${
                    device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {device.status === 'online' ? '在线' : '离线'}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600 dark:text-gray-400">{device.lastActive}</span>
                </div>
              </div>
              
              {/* Device Status Info */}
              <div className="flex space-x-3 mr-2">
                <div className="flex flex-col items-center">
                  <Battery className={getBatteryColor(device.battery)} size={20} />
                  <span className={`text-xs ${getBatteryColor(device.battery)}`}>{device.battery}%</span>
                </div>
                <div className="flex flex-col items-center text-gray-600 dark:text-gray-400">
                  <Volume2 size={20} />
                  <span className="text-xs">{device.volume}%</span>
                </div>
              </div>
              
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <MoreVertical size={20} />
              </button>
            </div>
          </motion.div>
        ))}
        
        {filteredDevices.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
            {searchTerm ? (
              <>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">未找到设备</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  没有找到与 "{searchTerm}" 相关的设备
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                  <WifiOff className="text-gray-400 dark:text-gray-500" size={32} />
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">暂无绑定设备</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  您还没有绑定任何智能设备
                </p>
                <button
                  onClick={() => navigate('/devices/add')}
                  className="inline-flex items-center justify-center py-2 px-4 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  立即绑定设备
                </button>
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DeviceList;