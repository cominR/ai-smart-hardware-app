# AI Smart Hardware App

一个基于 React + TypeScript 的智能硬件管理应用，提供设备连接、AI交互和个人信息管理功能。

## 🚀 功能特性

### 🔐 用户认证
- 手机号/邮箱登录
- 用户注册和密码重置
- 安全的用户会话管理

### 📱 设备管理
- 蓝牙设备搜索和连接
- WiFi网络配置（支持2.4G频段提醒）
- 设备状态监控（电池、音量、在线状态）
- 设备解绑和重命名

### 🤖 AI交互
- 多种AI角色选择（智能助手、虚拟女友、蜡笔小新等）
- AI模型切换（GPT-4、Claude、Gemini等）
- 语音设置和个性化配置
- 实时聊天对话

### 👤 个人信息
- 完善的个人资料管理
- AI设备个性化服务
- 兴趣爱好和偏好设置

### 🎨 界面设计
- 响应式移动端设计
- 亮色/暗色主题切换
- 流畅的动画效果
- 直观的用户体验

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式**: Tailwind CSS
- **路由**: React Router DOM
- **动画**: Framer Motion
- **表单**: React Hook Form
- **图标**: Lucide React
- **状态管理**: React Context

## 📦 安装和运行

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

### 代码检查
```bash
npm run lint
```

### TypeScript类型检查
```bash
npm run type-check
```

## 🔧 Git工作流

### 快速提交
```bash
npm run git:commit
```

### 设置远程仓库
```bash
npm run git:setup-remote
```

### 同步代码
```bash
npm run git:sync
```

### 分支管理
```bash
npm run git:branches
```

### 查看状态和历史
```bash
npm run git:status
npm run git:log
```

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   └── layouts/        # 布局组件
├── contexts/           # React Context
│   ├── AuthContext.tsx # 认证上下文
│   └── ThemeContext.tsx # 主题上下文
├── pages/              # 页面组件
│   ├── auth/          # 认证相关页面
│   ├── devices/       # 设备管理页面
│   ├── profile/       # 个人资料页面
│   └── settings/      # 设置页面
├── App.tsx            # 主应用组件
├── main.tsx           # 应用入口
└── index.css          # 全局样式
```

## 🚀 部署

### GitHub Pages
1. 推送代码到GitHub
2. 启用GitHub Pages
3. 选择GitHub Actions作为部署源

### 其他平台
- **Vercel**: 连接GitHub仓库自动部署
- **Netlify**: 拖拽dist文件夹或连接Git
- **服务器**: 上传dist文件夹到Web服务器

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 提交信息规范
- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- 项目链接: [https://github.com/yourusername/ai-smart-hardware-app](https://github.com/yourusername/ai-smart-hardware-app)
- 问题反馈: [Issues](https://github.com/yourusername/ai-smart-hardware-app/issues)

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！
