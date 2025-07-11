import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Cpu, Battery, Volume2, Trash2, Share2, Edit, UserCircle, MessageSquare, Mic, Settings, ChevronLeft, Brain, Sparkles, Radio, Play, Square, Heart, Smile, Notebook as Robot, Unlink, User, Calendar, MapPin, Briefcase, Phone, Mail, Save, X } from 'lucide-react';
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
  const [newMessage, setNewMessage] = useState('');
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

  // Available AI roles
  const aiRoles: AIRole[] = [
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
  ];
  
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
  
  // Send a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const currentRole = aiRoles.find(role => role.id === selectedRole);
      let response = '我理解你的问题，让我来帮助你解决这个问题。';
      
      // Customize response based on role
      switch(selectedRole) {
        case 'girlfriend':
          response = '亲爱的，我完全理解你的感受。让我们一起来解决这个问题吧！';
          break;
        case 'crayon':
          response = '哈哈哈！这个问题好有趣啊！让我想想该怎么回答...';
          break;
        case 'friend':
          response = '嗯，我明白你的意思。作为朋友，我建议...';
          break;
      }
      
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
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

  // Load personal info on component mount
  useEffect(() => {
    const savedInfo = localStorage.getItem(`personalInfo_${device.id}`);
    if (savedInfo) {
      setPersonalInfo(JSON.parse(savedInfo));
    }
  }, [device.id]);

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
          聊天
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
          </motion.div>
        )}
        
        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[calc(100vh-220px)] flex flex-col"
          >
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
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
                    <p>{message.content}</p>
                    <span className={`text-xs ${
                      message.sender === 'user' 
                        ? 'text-blue-100' 
                        : 'text-gray-500 dark:text-gray-400'
                    } block text-right mt-1`}>{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="输入消息..."
                className="flex-1 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-r-lg transition-colors"
              >
                发送
              </button>
            </form>
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

export default DeviceDetail;