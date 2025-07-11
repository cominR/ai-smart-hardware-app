import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 text-blue-500">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          页面不存在
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          抱歉，您访问的页面不存在或已被移动到其他位置。
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
        >
          <Home size={18} className="mr-2" />
          返回首页
        </button>
      </div>
    </div>
  );
};

export default NotFound;