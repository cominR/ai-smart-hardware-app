import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Plus, Cpu, Bell, Gift, Headphones, Speaker,
  Star, ArrowRight, Calendar, Users, Zap, Shield,
  Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Device {
  id: string;
  name: string;
  battery: number;
  volume: number;
  status: 'online' | 'offline';
  lastActive: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'update' | 'feature' | 'maintenance';
  date: string;
  isNew: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'accessory' | 'device' | 'service';
  rating: number;
  isHot: boolean;
}

interface VoiceModel {
  id: string;
  name: string;
  status: 'training' | 'ready' | 'failed';
  progress: number;
  createdAt: string;
  duration: string;
}

interface VoiceSubscription {
  isActive: boolean;
  expiresAt: string;
  plan: 'annual';
  price: number;
}

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [voiceModels, setVoiceModels] = useState<VoiceModel[]>([]);
  const [voiceSubscription, setVoiceSubscription] = useState<VoiceSubscription | null>(null);
  const [announcements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'AI助手2.0重大更新',
      content: '全新的语音识别技术，更智能的对话体验，支持多语言切换',
      type: 'update',
      date: '2025-01-15',
      isNew: true
    },
    {
      id: '2', 
      title: '春节活动开启',
      content: '购买任意智能设备享受8折优惠，还有神秘礼品等你来拿',
      type: 'feature',
      date: '2025-01-10',
      isNew: true
    },
    {
      id: '3',
      title: '系统维护通知',
      content: '1月20日凌晨2:00-4:00进行系统维护，期间可能影响部分功能',
      type: 'maintenance', 
      date: '2025-01-08',
      isNew: false
    }
  ]);

  const [products] = useState<Product[]>([
    {
      id: '1',
      name: '智能耳机 Pro',
      description: '主动降噪，超长续航，完美音质体验',
      price: '¥299',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      category: 'accessory',
      rating: 4.8,
      isHot: true
    },
    {
      id: '2', 
      name: '智能音箱 Max',
      description: '360度环绕音效，智能家居控制中心',
      price: '¥599',
      image: 'https://images.pexels.com/photos/4790268/pexels-photo-4790268.jpeg',
      category: 'device',
      rating: 4.9,
      isHot: true
    },
    {
      id: '3',
      name: '智能手环',
      description: '健康监测，运动追踪，时尚设计',
      price: '¥199',
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      category: 'accessory',
      rating: 4.6,
      isHot: false
    },
    {
      id: '4',
      name: '云端AI服务',
      description: '专业AI模型，无限对话次数，优先技术支持',
      price: '¥29/月',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      category: 'service',
      rating: 4.7,
      isHot: false
    }
  ]);

  // Mock data for devices - in real app this would come from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, sometimes show no devices to demonstrate unbound state
      const hasDevices = Math.random() > 0.3; // 70% chance of having devices
      
      if (hasDevices) {
        setDevices([
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
          }
        ]);
      } else {
        setDevices([]); // No devices to show unbound state
      }
      
      // Mock voice subscription - simulate user has active subscription
      setVoiceSubscription({
        isActive: true,
        expiresAt: '2025-12-15',
        plan: 'annual',
        price: 99
      });
      
      // Mock voice models (only if user has subscription)
      setVoiceModels([
        {
          id: 'voice1',
          name: '我的声音模型',
          status: 'ready',
          progress: 100,
          createdAt: '2025-01-10',
          duration: '5分钟'
        },
        {
          id: 'voice2',
          name: '专业播音',
          status: 'training',
          progress: 65,
          createdAt: '2025-01-15',
          duration: '训练中'
        }
      ]);
      
      setLoading(false);
    }, 500);
  }, []);

  // Battery color based on level
  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Get announcement type color
  const getAnnouncementColor = (type: string) => {
    switch (type) {
      case 'update': return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
      case 'feature': return 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800';
      case 'maintenance': return 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800';
      default: return 'bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800';
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'accessory': return Headphones;
      case 'device': return Speaker;
      case 'service': return Zap;
      default: return Cpu;
    }
  };

  // Get voice model status color and icon
  const getVoiceModelStatus = (status: string) => {
    switch (status) {
      case 'ready':
        return { color: 'text-green-500', icon: CheckCircle, bg: 'bg-green-50 dark:bg-green-900/30' };
      case 'training':
        return { color: 'text-blue-500', icon: Clock, bg: 'bg-blue-50 dark:bg-blue-900/30' };
      case 'failed':
        return { color: 'text-red-500', icon: AlertCircle, bg: 'bg-red-50 dark:bg-red-900/30' };
      default:
        return { color: 'text-gray-500', icon: Clock, bg: 'bg-gray-50 dark:bg-gray-900/30' };
    }
  };

  // Handle subscription purchase
  const handleSubscribe = () => {
    // In a real app, this would integrate with payment system
    navigate('/voice-cloning/subscribe');
  };

  // Calculate days remaining
  const getDaysRemaining = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-4 pb-20">
      {/* Greeting */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          你好, {user?.name || '用户'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          欢迎使用智能助手管理系统
        </p>
      </div>

      {/* Bound Devices Section - Always Show Add Device */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            <Cpu className="mr-2 text-blue-500" size={20} />
            绑定设备
          </h3>
          <button
            onClick={() => navigate('/devices')}
            className="text-blue-500 text-sm hover:text-blue-600"
          >
            管理设备
          </button>
        </div>

        {/* Always Show Add Device Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm p-6 text-center border border-blue-100 dark:border-blue-800/30 relative overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200"
          onClick={() => navigate('/devices/add')}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 dark:from-blue-800/20 dark:to-indigo-700/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100/20 to-blue-100/20 dark:from-indigo-700/20 dark:to-blue-800/20 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full mb-4">
              <Plus className="text-blue-500" size={32} />
            </div>
            
            <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">添加设备</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 max-w-sm mx-auto">
              绑定您的智能硬件设备，开启智能语音交互体验
            </p>
            
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              支持多种智能设备，简单几步即可完成绑定
            </div>
          </div>
        </motion.div>
      </div>

      {/* Announcements Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            <Bell className="mr-2 text-blue-500" size={20} />
            产品公告
          </h3>
          <button className="text-blue-500 text-sm hover:text-blue-600">
            查看全部
          </button>
        </div>
        
        <div className="space-y-3">
          {announcements.slice(0, 2).map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-xl border ${getAnnouncementColor(announcement.type)} relative`}
            >
              {announcement.isNew && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  NEW
                </div>
              )}
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                {announcement.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {announcement.content}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <Calendar size={12} className="mr-1" />
                  {announcement.date}
                </span>
                <button className="text-blue-500 text-sm hover:text-blue-600 flex items-center">
                  查看详情
                  <ArrowRight size={12} className="ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            <Gift className="mr-2 text-blue-500" size={20} />
            精选产品
          </h3>
          <button className="text-blue-500 text-sm hover:text-blue-600">
            查看全部
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {products.slice(0, 4).map((product, index) => {
            const CategoryIcon = getCategoryIcon(product.category);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 relative"
              >
                {product.isHot && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    HOT
                  </div>
                )}
                
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex items-start mb-2">
                  <CategoryIcon size={14} className="text-blue-500 mr-1 mt-0.5 flex-shrink-0" />
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight">
                    {product.name}
                  </h4>
                </div>
                
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-500 text-sm">{product.price}</span>
                  <div className="flex items-center">
                    <Star size={12} className="text-yellow-500 mr-1" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{product.rating}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 text-center">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
            <Users className="text-blue-500" size={16} />
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">1.2M+</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">活跃用户</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 text-center">
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
            <Shield className="text-green-500" size={16} />
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">99.9%</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">安全保障</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 text-center">
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
            <Zap className="text-purple-500" size={16} />
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">24/7</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">智能服务</div>
        </div>
      </div>
    </div>
  );
};

export default Home;