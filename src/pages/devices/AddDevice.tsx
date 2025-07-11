import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wifi, Search, Loader2, Cpu, ChevronRight, X, CheckCircle, Bluetooth, MapPin, Smartphone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddDevice: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'permission' | 'search' | 'connect' | 'setup'>('permission');
  const [isSearching, setIsSearching] = useState(false);
  const [foundDevices, setFoundDevices] = useState<Array<{id: string, name: string}>>([]);
  const [selectedDevice, setSelectedDevice] = useState<{id: string, name: string} | null>(null);
  const [wifiName, setWifiName] = useState('Home WiFi');
  const [wifiPassword, setWifiPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [setupComplete, setSetupComplete] = useState(false);

  // Handle permission confirmation
  const handlePermissionConfirm = () => {
    setStep('search');
  };

  // Simulate device search
  const handleSearch = () => {
    setIsSearching(true);
    setFoundDevices([]);
    
    // Simulate API delay
    setTimeout(() => {
      setFoundDevices([
        { id: 'dev1', name: '智能助手 (AI-001)' },
        { id: 'dev2', name: '智能助手 (AI-002)' }
      ]);
      setIsSearching(false);
    }, 2000);
  };

  // Handle device selection
  const handleSelectDevice = (device: {id: string, name: string}) => {
    setSelectedDevice(device);
    setStep('connect');
  };

  // Handle WiFi connection
  const handleConnectWifi = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setStep('setup');
    }, 3000);
  };

  // Handle final setup
  const handleFinishSetup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate final setup
    setTimeout(() => {
      setSetupComplete(true);
      
      // Redirect to devices page after a short delay
      setTimeout(() => {
        navigate('/devices');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {step === 'permission' && (
            <motion.div
              key="permission"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => navigate('/devices')}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 mb-6"
              >
                <X size={16} className="mr-1" />
                取消
              </button>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">打开手机蓝牙及定位服务</h2>
              
              <div className="space-y-6 mb-8">
                {/* Bluetooth Permission */}
                <div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-2">1</span>
                    <span>前往设置-蓝牙-打开蓝牙</span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Bluetooth size={20} className="text-blue-500 mr-2" />
                        <span className="font-medium text-gray-800 dark:text-gray-200">蓝牙</span>
                      </div>
                      <div className="w-11 h-6 bg-blue-500 rounded-full relative">
                        <div className="absolute top-[2px] right-[2px] bg-white rounded-full h-5 w-5"></div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <div>我的设备</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">搜索附近的设备</div>
                    </div>
                  </div>
                </div>

                {/* Location Permission */}
                <div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-2">2</span>
                    <span>前往设置-隐私-打开定位服务并刷新本页面</span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <MapPin size={20} className="text-blue-500 mr-2" />
                        <span className="font-medium text-gray-800 dark:text-gray-200">定位服务</span>
                      </div>
                      <div className="w-11 h-6 bg-blue-500 rounded-full relative">
                        <div className="absolute top-[2px] right-[2px] bg-white rounded-full h-5 w-5"></div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <div>共享我的位置</div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePermissionConfirm}
                className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                我已经打开蓝牙和位置权限
                <ArrowRight size={20} className="ml-2" />
              </button>
            </motion.div>
          )}

          {step === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setStep('permission')}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 mb-6"
              >
                <X size={16} className="mr-1" />
                返回
              </button>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">搜索设备</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">请确保设备已开机且处于配网模式</p>
              
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed mb-6"
              >
                {isSearching ? (
                  <Loader2 size={20} className="animate-spin mr-2" />
                ) : (
                  <Search size={20} className="mr-2" />
                )}
                {isSearching ? '正在搜索...' : '开始搜索'}
              </button>
              
              {isSearching && (
                <div className="flex items-center justify-center p-8">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                  </div>
                </div>
              )}
              
              {foundDevices.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    发现 {foundDevices.length} 个设备
                  </h3>
                  
                  <div className="space-y-2">
                    {foundDevices.map(device => (
                      <button
                        key={device.id}
                        onClick={() => handleSelectDevice(device)}
                        className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                            <Cpu className="text-blue-500" size={20} />
                          </div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{device.name}</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
          
          {step === 'connect' && selectedDevice && (
            <motion.div
              key="connect"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setStep('search')}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 mb-6"
              >
                <X size={16} className="mr-1" />
                取消
              </button>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">连接WiFi</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                请为 "{selectedDevice.name}" 设置WiFi连接
              </p>
              
              <form onSubmit={handleConnectWifi}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WiFi名称</label>
                  <div className="relative">
                    <Wifi className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
                    <input
                      type="text"
                      value={wifiName}
                      onChange={(e) => setWifiName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="WiFi名称"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WiFi密码</label>
                  <input
                    type="password"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="WiFi密码"
                    required
                  />
                </div>

                {/* 5G频段提示 */}
                <div className="mb-6 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        <span className="font-medium">注意：</span>设备不支持5G频段，请连接2.4G WiFi网络
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isConnecting}
                  className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      正在连接...
                    </>
                  ) : (
                    <>
                      <Wifi size={20} className="mr-2" />
                      连接WiFi
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
          
          {step === 'setup' && selectedDevice && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">设备设置</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                设备已成功连接，请完成最后的设置
              </p>
              
              <form onSubmit={handleFinishSetup}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">设备名称</label>
                  <input
                    type="text"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="给设备起个名字"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <CheckCircle size={20} className="mr-2" />
                  完成设置
                </button>
              </form>
              
              {setupComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 text-center"
                >
                  <CheckCircle className="mx-auto text-green-500" size={48} />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-3">设置完成!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    正在跳转至设备列表...
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddDevice;