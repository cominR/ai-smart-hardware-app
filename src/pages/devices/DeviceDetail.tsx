import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Battery, Volume2, Trash2, Share2, Edit, UserCircle, MessageSquare, Mic, ChevronLeft, Brain, Heart, Smile, Notebook as Robot, Unlink, User, Calendar, MapPin, Briefcase, Phone, Mail, Save, X, Plus, BookOpen, Tag, Clock, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeviceDetails {
  id: string;
  name: string;
  battery: number;
  volume: number;
  status: 'online' | 'offline';
  lastActive: string;
  model: string;
  firmware: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface AIRole {
  id: string;
  name: string;
  description: string;
  icon: typeof Heart;
  personality: string;
}

interface PersonalInfo {
  name: string;
  age: string;
  location: string;
  occupation: string;
  phone: string;
  email: string;
  hobbies: string;
  personality: string;
  preferences: string;
}

interface MemoryItem {
  id: string;
  content: string;
  timestamp: string;
  category: 'preference' | 'habit' | 'important' | 'other';
  isEditing?: boolean;
}

const DeviceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'control' | 'chat' | 'settings'>('control');
  const [isEditing, setIsEditing] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [volume, setVolume] = useState(50);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [selectedVoice, setSelectedVoice] = useState('female1');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('assistant');
  const [showRoleDetails, setShowRoleDetails] = useState(false);
  const [showUnbindConfirm, setShowUnbindConfirm] = useState(false);
  const [isUnbinding, setIsUnbinding] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    age: '',
    location: '',
    occupation: '',
    phone: '',
    email: '',
    hobbies: '',
    personality: '',
    preferences: ''
  });

  // 记忆功能状态
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [newMemory, setNewMemory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MemoryItem['category']>('important');
  const [showAddMemory, setShowAddMemory] = useState(false);
  
  // Available AI models
  const aiModels = [
    { id: 'gpt-4', name: 'GPT-4 Advanced' },
    { id: 'gpt-3.5', name: 'GPT-3.5 Turbo' },
    { id: 'claude', name: 'Claude 3' },
    { id: 'gemini', name: 'Gemini Pro' },
  ];

  // Available voice options
  const voices = [
    { id: 'female1', name: '女声 - 默认' },
    { id: 'female2', name: '女声 - 温柔' },
    { id: 'male1', name: '男声 - 默认' },
    { id: 'male2', name: '男声 - 沉稳' },
  ];
  
  // Mock device details
  const [device, setDevice] = useState<DeviceDetails>({
    id: id || 'unknown',
    name: '智能助手 Alpha',
    battery: 75,
    volume: 50,
    status: 'online',
    lastActive: '刚刚',
    model: 'AI-X1000',
    firmware: 'v2.3.1'
  });

  // Available AI roles - memoized to prevent unnecessary re-renders
  const aiRoles: AIRole[] = useMemo(() => [
    {
      id: 'assistant',
      name: '智能助手',
      description: '专业、理性的AI助手',
      icon: Robot,
      personality: '我是你的智能助手，随时为你提供专业的帮助。'
    },
    {
      id: 'girlfriend',
      name: '虚拟女友',
      description: '温柔体贴的AI伴侣',
      icon: Heart,
      personality: '亲爱的，今天过得怎么样呀？'
    },
    {
      id: 'crayon',
      name: '蜡笔小新',
      description: '活泼可爱的动漫角色',
      icon: Smile,
      personality: '我是野原新之助，最喜欢吃巧克力棒了！'
    },
    {
      id: 'friend',
      name: '知心朋友',
      description: '理解你的知心好友',
      icon: UserCircle,
      personality: '有什么想和我分享的吗？我一直在这里倾听。'
    }
  ], []);
  
  // Initialize with the device's volume
  useEffect(() => {
    setVolume(device.volume);
    setDeviceName(device.name);
    
    // Initialize with some mock chat messages
    setMessages([
      { 
        id: '1', 
        sender: 'ai', 
        content: aiRoles.find(role => role.id === selectedRole)?.personality || '你好！我是你的智能助手，有什么我可以帮你的吗？', 
        timestamp: '10:30' 
      }
    ]);
  }, [device, selectedRole, aiRoles]);
  
  // Update device name
  const handleUpdateName = () => {
    setDevice({ ...device, name: deviceName });
    setIsEditing(false);
  };
  
  // Update device volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setDevice({ ...device, volume: newVolume });
  };

  // 记忆功能处理函数
  const handleAddMemory = () => {
    if (!newMemory.trim()) return;

    const memory: MemoryItem = {
      id: `memory-${Date.now()}`,
      content: newMemory.trim(),
      timestamp: new Date().toLocaleString('zh-CN'),
      category: selectedCategory
    };

    setMemories(prev => [memory, ...prev]);
    setNewMemory('');
    setShowAddMemory(false);
  };

  const handleEditMemory = (id: string, newContent: string) => {
    setMemories(prev => prev.map(memory =>
      memory.id === id
        ? { ...memory, content: newContent, isEditing: false }
        : memory
    ));
  };

  const handleDeleteMemory = (id: string) => {
    setMemories(prev => prev.filter(memory => memory.id !== id));
  };

  const toggleEditMemory = (id: string) => {
    setMemories(prev => prev.map(memory =>
      memory.id === id
        ? { ...memory, isEditing: !memory.isEditing }
        : { ...memory, isEditing: false }
    ));
  };

  // Handle device unbinding
  const handleUnbindDevice = async () => {
    setIsUnbinding(true);
    
    // Simulate API call to unbind device
    setTimeout(() => {
      setIsUnbinding(false);
      setShowUnbindConfirm(false);
      
      // Navigate back to devices list
      navigate('/devices', { 
        state: { 
          message: `设备 "${device.name}" 已成功解绑`,
          type: 'success'
        }
      });
    }, 2000);
  };

  // Battery color based on level
  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Handle role selection
  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setShowRoleDetails(true);
  };

  // Handle personal info save
  const handleSavePersonalInfo = () => {
    // Here you would typically save to backend/localStorage
    localStorage.setItem(`personalInfo_${device.id}`, JSON.stringify(personalInfo));
    setIsEditingPersonalInfo(false);
    // Show success message or toast
  };

  // Load personal info and memories on component mount
  useEffect(() => {
    const savedInfo = localStorage.getItem(`personalInfo_${device.id}`);
    if (savedInfo) {
      setPersonalInfo(JSON.parse(savedInfo));
    }

    // Load memories from localStorage or set default examples
    const savedMemories = localStorage.getItem(`memories_${device.id}`);
    if (savedMemories) {
      setMemories(JSON.parse(savedMemories));
    } else {
      // Set some example memories for demonstration
      const exampleMemories: MemoryItem[] = [
        {
          id: 'memory-1',
          content: '喜欢在早上7点被轻柔的音乐叫醒，不喜欢太突然的闹钟声',
          timestamp: '2024-01-10 08:30:00',
          category: 'preference'
        },
        {
          id: 'memory-2',
          content: '每天晚上10点后会进入休息模式，希望设备音量自动降低',
          timestamp: '2024-01-09 22:15:00',
          category: 'habit'
        },
        {
          id: 'memory-3',
          content: '对古典音乐特别感兴趣，经常询问相关的音乐推荐',
          timestamp: '2024-01-08 15:20:00',
          category: 'preference'
        }
      ];
      setMemories(exampleMemories);
    }
  }, [device.id]);

  // Save memories to localStorage when memories change
  useEffect(() => {
    if (memories.length > 0) {
      localStorage.setItem(`memories_${device.id}`, JSON.stringify(memories));
    }
  }, [memories, device.id]);

  // Handle personal info field change
  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-4 mb-4 shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/devices')}
            className="mr-2 text-gray-500 dark:text-gray-400"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  autoFocus
                  className="flex-1 px-2 py-1 border border-blue-300 dark:border-blue-700 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleUpdateName}
                  className="ml-2 text-blue-500 font-medium text-sm"
                >
                  保存
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{device.name}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="ml-2 text-gray-400 dark:text-gray-500"
                >
                  <Edit size={16} />
                </button>
              </div>
            )}
            <div className="flex items-center text-sm">
              <span className={`h-2 w-2 rounded-full mr-2 ${
                device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`}></span>
              <span className="text-gray-600 dark:text-gray-400">
                {device.status === 'online' ? '在线' : '离线'}
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">{device.model}</span>
            </div>
          </div>
          
          <div className={`text-right ${getBatteryColor(device.battery)}`}>
            <div className="text-lg font-medium">{device.battery}%</div>
            <div className="flex items-center justify-end">
              <Battery size={14} className="mr-1" />
              <span className="text-xs">电量</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4 px-4">
        <button
          className={`flex-1 text-center py-2 ${
            activeTab === 'control'
              ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('control')}
        >
          控制
        </button>
        <button
          className={`flex-1 text-center py-2 ${
            activeTab === 'chat'
              ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('chat')}
        >
          说了什么
        </button>
        <button
          className={`flex-1 text-center py-2 ${
            activeTab === 'settings'
              ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('settings')}
        >
          设置
        </button>
      </div>

      {/* Tab Content */}
      <div className="px-4">
        {/* Control Tab */}
        {activeTab === 'control' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Volume Control */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-800 dark:text-white">音量控制</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">{volume}%</div>
              </div>
              <div className="flex items-center">
                <Volume2 size={18} className="text-gray-400 mr-2" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                />
              </div>
            </div>

            {/* AI Role Selection */}
            {!showRoleDetails ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <h3 className="font-medium text-gray-800 dark:text-white mb-3">角色设置</h3>
                <div className="space-y-2">
                  {aiRoles.map(role => {
                    const RoleIcon = role.icon;
                    return (
                      <div
                        key={role.id}
                        onClick={() => handleRoleSelect(role.id)}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          selectedRole === role.id 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                            : 'border-gray-200 dark:border-gray-700'
                        } cursor-pointer transition-colors`}
                      >
                        <div className="flex items-center">
                          <RoleIcon size={18} className={selectedRole === role.id ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'} />
                          <div className="ml-3">
                            <span className={`font-medium ${
                              selectedRole === role.id 
                                ? 'text-blue-600 dark:text-blue-400' 
                                : 'text-gray-800 dark:text-gray-200'
                            }`}>{role.name}</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{role.description}</p>
                          </div>
                        </div>
                        {selectedRole === role.id && (
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => setShowRoleDetails(false)}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <h3 className="font-medium text-gray-800 dark:text-white ml-2">角色详情</h3>
                </div>

                {/* Role Info */}
                {(() => {
                  const role = aiRoles.find(r => r.id === selectedRole);
                  const RoleIcon = role?.icon || Robot;
                  return (
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <RoleIcon size={24} className="text-blue-500 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white">{role?.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{role?.description}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        {role?.personality}
                      </p>
                    </div>
                  );
                })()}

                {/* AI Model Selection */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-3">AI模型</h4>
                  <div className="space-y-2">
                    {aiModels.map(model => (
                      <div
                        key={model.id}
                        onClick={() => setSelectedModel(model.id)}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          selectedModel === model.id 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                            : 'border-gray-200 dark:border-gray-700'
                        } cursor-pointer transition-colors`}
                      >
                        <div className="flex items-center">
                          <Brain size={18} className={selectedModel === model.id ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'} />
                          <span className={`ml-3 ${
                            selectedModel === model.id 
                              ? 'font-medium text-blue-600 dark:text-blue-400' 
                              : 'text-gray-800 dark:text-gray-200'
                          }`}>{model.name}</span>
                        </div>
                        {selectedModel === model.id && (
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Voice Selection */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-3">语音设置</h4>
                  <div className="space-y-2">
                    {voices.map(voice => (
                      <div
                        key={voice.id}
                        onClick={() => setSelectedVoice(voice.id)}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          selectedVoice === voice.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-gray-200 dark:border-gray-700'
                        } cursor-pointer transition-colors`}
                      >
                        <div className="flex items-center">
                          <Mic size={18} className={selectedVoice === voice.id ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'} />
                          <span className={`ml-3 ${
                            selectedVoice === voice.id
                              ? 'font-medium text-blue-600 dark:text-blue-400'
                              : 'text-gray-800 dark:text-gray-200'
                          }`}>{voice.name}</span>
                        </div>
                        {selectedVoice === voice.id && (
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800 dark:text-white">个人信息</h4>
                    <button
                      onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                      {showPersonalInfo ? '收起' : '展开'}
                    </button>
                  </div>

                  <div
                    onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <div className="flex items-center">
                      <User size={18} className="text-gray-500 dark:text-gray-400 mr-3" />
                      <div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">完善个人信息</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {personalInfo.name ? `已设置 - ${personalInfo.name}` : '让AI更好地了解您'}
                        </p>
                      </div>
                    </div>
                    <ChevronLeft
                      size={16}
                      className={`text-gray-400 transform transition-transform ${showPersonalInfo ? 'rotate-90' : '-rotate-90'}`}
                    />
                  </div>

                  {showPersonalInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-4"
                    >
                      {!isEditingPersonalInfo ? (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-medium text-gray-800 dark:text-white">个人资料</h5>
                            <button
                              onClick={() => setIsEditingPersonalInfo(true)}
                              className="flex items-center text-blue-500 hover:text-blue-600 text-sm"
                            >
                              <Edit size={14} className="mr-1" />
                              编辑
                            </button>
                          </div>

                          <div className="space-y-3 text-sm">
                            <div className="flex items-center">
                              <User size={14} className="text-gray-400 mr-2" />
                              <span className="text-gray-600 dark:text-gray-400 w-16">姓名:</span>
                              <span className="text-gray-800 dark:text-gray-200">{personalInfo.name || '未设置'}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar size={14} className="text-gray-400 mr-2" />
                              <span className="text-gray-600 dark:text-gray-400 w-16">年龄:</span>
                              <span className="text-gray-800 dark:text-gray-200">{personalInfo.age || '未设置'}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin size={14} className="text-gray-400 mr-2" />
                              <span className="text-gray-600 dark:text-gray-400 w-16">位置:</span>
                              <span className="text-gray-800 dark:text-gray-200">{personalInfo.location || '未设置'}</span>
                            </div>
                            <div className="flex items-center">
                              <Briefcase size={14} className="text-gray-400 mr-2" />
                              <span className="text-gray-600 dark:text-gray-400 w-16">职业:</span>
                              <span className="text-gray-800 dark:text-gray-200">{personalInfo.occupation || '未设置'}</span>
                            </div>
                            {personalInfo.hobbies && (
                              <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">兴趣爱好:</p>
                                <p className="text-gray-800 dark:text-gray-200">{personalInfo.hobbies}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="font-medium text-gray-800 dark:text-white">编辑个人资料</h5>
                            <button
                              onClick={() => setIsEditingPersonalInfo(false)}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              <X size={16} />
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">姓名</label>
                              <input
                                type="text"
                                value={personalInfo.name}
                                onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="请输入您的姓名"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">年龄</label>
                                <input
                                  type="text"
                                  value={personalInfo.age}
                                  onChange={(e) => handlePersonalInfoChange('age', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="年龄"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">职业</label>
                                <input
                                  type="text"
                                  value={personalInfo.occupation}
                                  onChange={(e) => handlePersonalInfoChange('occupation', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="职业"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">所在地</label>
                              <input
                                type="text"
                                value={personalInfo.location}
                                onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="如：北京市朝阳区"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">兴趣爱好</label>
                              <textarea
                                value={personalInfo.hobbies}
                                onChange={(e) => handlePersonalInfoChange('hobbies', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="如：阅读、运动、音乐、旅行等"
                                rows={2}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">性格特点</label>
                              <textarea
                                value={personalInfo.personality}
                                onChange={(e) => handlePersonalInfoChange('personality', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="如：开朗、内向、幽默、严谨等"
                                rows={2}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">偏好设置</label>
                              <textarea
                                value={personalInfo.preferences}
                                onChange={(e) => handlePersonalInfoChange('preferences', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="如：喜欢的交流方式、话题偏好等"
                                rows={2}
                              />
                            </div>

                            <button
                              onClick={handleSavePersonalInfo}
                              className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                            >
                              <Save size={16} className="mr-2" />
                              保存个人信息
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Memory Function */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <BookOpen size={20} className="text-purple-500 mr-2" />
                  <h3 className="font-medium text-gray-800 dark:text-white">设备记忆</h3>
                </div>
                <button
                  onClick={() => setShowAddMemory(!showAddMemory)}
                  className="flex items-center px-3 py-1.5 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Plus size={16} className="mr-1" />
                  添加记忆
                </button>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                记录与设备对话时的重要信息，帮助AI更好地了解您的偏好和需求
              </p>

              {/* Add Memory Form */}
              {showAddMemory && (
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      记忆分类
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'preference', label: '偏好', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
                        { value: 'habit', label: '习惯', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
                        { value: 'important', label: '重要', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
                        { value: 'other', label: '其他', color: 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' }
                      ].map((category) => (
                        <button
                          key={category.value}
                          onClick={() => setSelectedCategory(category.value as MemoryItem['category'])}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            selectedCategory === category.value
                              ? category.color
                              : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      记忆内容
                    </label>
                    <textarea
                      value={newMemory}
                      onChange={(e) => setNewMemory(e.target.value)}
                      placeholder="记录重要信息，如：喜欢早上7点叫醒、不喜欢太大声音、偏好轻音乐等..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddMemory}
                      disabled={!newMemory.trim()}
                      className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <Save size={16} className="mr-1" />
                      保存记忆
                    </button>
                    <button
                      onClick={() => {
                        setShowAddMemory(false);
                        setNewMemory('');
                      }}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </div>
              )}

              {/* Memory List */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {memories.length > 0 ? (
                  memories.map((memory) => (
                    <MemoryCard
                      key={memory.id}
                      memory={memory}
                      onEdit={handleEditMemory}
                      onDelete={handleDeleteMemory}
                      onToggleEdit={toggleEditMemory}
                    />
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    <BookOpen size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">暂无记忆记录</p>
                    <p className="text-xs mt-1">点击"添加记忆"开始记录重要信息</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Chat History Tab */}
        {activeTab === 'chat' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[calc(100vh-220px)] flex flex-col"
          >
            {messages.length > 0 ? (
              <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-t-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-bl-lg'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-br-lg'
                    } p-3 shadow-sm`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <span className={`text-xs ${
                        message.sender === 'user'
                          ? 'text-blue-100'
                          : 'text-gray-500 dark:text-gray-400'
                      } block text-right mt-2`}>{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <MessageSquare size={64} className="mx-auto" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                    暂无对话记录
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    与 {device.name} 的对话记录将显示在这里
                  </p>
                </div>
              </div>
            )}

            {/* 底部统计信息 */}
            {messages.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <div className="flex justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
                  <div className="text-center">
                    <div className="font-semibold text-blue-500">{messages.length}</div>
                    <div>总消息</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-500">
                      {messages.filter(m => m.sender === 'user').length}
                    </div>
                    <div>我发送</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-500">
                      {messages.filter(m => m.sender === 'ai').length}
                    </div>
                    <div>AI回复</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <h3 className="font-medium text-gray-800 dark:text-white mb-3">设备信息</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 dark:text-gray-400">型号</span>
                  <span className="text-gray-800 dark:text-white">{device.model}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 dark:text-gray-400">固件版本</span>
                  <span className="text-gray-800 dark:text-white">{device.firmware}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 dark:text-gray-400">设备ID</span>
                  <span className="text-gray-800 dark:text-white">{device.id}</span>
                </div>
              </div>
            </div>
            
            <button className="w-full flex items-center justify-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <Share2 size={18} className="mr-2 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-800 dark:text-gray-200">分享设备</span>
            </button>
            
            <button 
              onClick={() => setShowUnbindConfirm(true)}
              className="w-full flex items-center justify-center p-3 border border-orange-200 dark:border-orange-900/30 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
            >
              <Unlink size={18} className="mr-2 text-orange-500" />
              <span className="text-orange-500">解绑设备</span>
            </button>
            
            <button className="w-full flex items-center justify-center p-3 border border-red-200 dark:border-red-900/30 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
              <Trash2 size={18} className="mr-2 text-red-500" />
              <span className="text-red-500">删除设备</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Unbind Confirmation Modal */}
      <AnimatePresence>
        {showUnbindConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-sm"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Unlink className="text-orange-500" size={24} />
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  确认解绑设备
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  您确定要解绑设备 <span className="font-medium">"{device.name}"</span> 吗？
                </p>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  解绑后，您将无法远程控制此设备，但可以重新绑定。
                </p>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowUnbindConfirm(false)}
                    disabled={isUnbinding}
                    className="flex-1 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    取消
                  </button>
                  
                  <button
                    onClick={handleUnbindDevice}
                    disabled={isUnbinding}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isUnbinding ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        解绑中...
                      </>
                    ) : (
                      '确认解绑'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Memory Card Component
interface MemoryCardProps {
  memory: MemoryItem;
  onEdit: (id: string, newContent: string) => void;
  onDelete: (id: string) => void;
  onToggleEdit: (id: string) => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onEdit, onDelete, onToggleEdit }) => {
  const [editContent, setEditContent] = useState(memory.content);

  const getCategoryInfo = (category: MemoryItem['category']) => {
    switch (category) {
      case 'preference':
        return { label: '偏好', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' };
      case 'habit':
        return { label: '习惯', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' };
      case 'important':
        return { label: '重要', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' };
      case 'other':
        return { label: '其他', color: 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' };
      default:
        return { label: '其他', color: 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200' };
    }
  };

  const categoryInfo = getCategoryInfo(memory.category);

  const handleSaveEdit = () => {
    if (editContent.trim()) {
      onEdit(memory.id, editContent.trim());
    }
  };

  const handleCancelEdit = () => {
    setEditContent(memory.content);
    onToggleEdit(memory.id);
  };

  return (
    <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
      <div className="flex items-start justify-between mb-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
          {categoryInfo.label}
        </span>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onToggleEdit(memory.id)}
            className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
            title="编辑"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => onDelete(memory.id)}
            className="p-1 text-gray-500 hover:text-red-500 transition-colors"
            title="删除"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {memory.isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={2}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              className="flex items-center px-2 py-1 text-xs bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              <Check size={12} className="mr-1" />
              保存
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-800 dark:text-white mb-2">{memory.content}</p>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock size={12} className="mr-1" />
            {memory.timestamp}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceDetail;