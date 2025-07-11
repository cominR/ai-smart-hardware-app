import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <Link to="/login" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 mb-6">
            <ArrowLeft size={16} className="mr-1" />
            返回登录
          </Link>
          
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">找回密码</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {submitted 
                ? '我们已经发送了重置密码邮件' 
                : '输入您的邮箱，我们将发送重置密码链接'}
            </p>
          </div>
          
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">邮箱地址</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入邮箱地址"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin mr-2" />
                ) : (
                  <ArrowRight size={20} className="mr-2" />
                )}
                发送重置链接
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle size={60} className="text-green-500" />
              </div>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                重置链接已发送
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                我们已将密码重置链接发送至 <span className="font-medium">{email}</span>，请查收并按照提示操作。
              </p>
              <Link 
                to="/login"
                className="inline-flex items-center justify-center w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium py-2.5 px-4 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <ArrowLeft size={20} className="mr-2" />
                返回登录
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;