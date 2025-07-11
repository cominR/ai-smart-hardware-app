# GitHub 设置指南

## 🚀 将项目推送到GitHub的完整步骤

### 第一步：在GitHub上创建仓库

1. **访问GitHub**: https://github.com/new
2. **填写仓库信息**:
   - Repository name: `ai-smart-hardware-app`
   - Description: `一个基于 React + TypeScript 的智能硬件管理应用，提供设备连接、AI交互和个人信息管理功能`
   - 选择 Public 或 Private
   - **重要**: 不要勾选任何初始化选项（README、.gitignore、license）
3. **点击 "Create repository"**

### 第二步：复制仓库URL

创建完成后，GitHub会显示仓库URL，类似于：
```
https://github.com/YOUR_USERNAME/ai-smart-hardware-app.git
```

### 第三步：在本地设置远程仓库

打开命令行，在项目目录中执行：

```bash
# 添加远程仓库（替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/ai-smart-hardware-app.git

# 将主分支重命名为main（GitHub默认）
git branch -M main

# 推送代码到GitHub
git push -u origin main
```

### 第四步：验证推送成功

推送完成后，访问您的GitHub仓库页面，应该能看到：
- 所有源代码文件
- 3个提交记录
- README.md文件显示项目介绍
- GitHub Actions工作流

### 第五步：启用GitHub Pages（可选）

如果您想要部署网站：

1. 进入仓库的 Settings 页面
2. 滚动到 "Pages" 部分
3. Source 选择 "GitHub Actions"
4. 保存设置

每次推送到main分支时，GitHub Actions会自动构建和部署您的应用。

## 🔧 使用项目内置脚本

项目已经包含了便捷的Git管理脚本：

### 设置远程仓库
```bash
npm run git:setup-remote
```

### 快速推送
```bash
npm run git:push
```

### 同步代码
```bash
npm run git:sync
```

### 分支管理
```bash
npm run git:branches
```

## 📋 推送后的仓库结构

推送成功后，您的GitHub仓库将包含：

```
ai-smart-hardware-app/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI/CD
├── scripts/                # Git管理脚本
├── src/                    # 源代码
├── public/                 # 静态资源
├── README.md              # 项目文档
├── LICENSE                # MIT许可证
├── package.json           # 项目配置
└── ...                    # 其他配置文件
```

## 🎯 下一步操作

1. **克隆到其他设备**: `git clone https://github.com/YOUR_USERNAME/ai-smart-hardware-app.git`
2. **邀请协作者**: 在仓库Settings > Collaborators中添加
3. **创建Issues**: 用于bug报告和功能请求
4. **设置分支保护**: 保护main分支，要求PR审核

## 🔗 有用的链接

- **仓库地址**: https://github.com/YOUR_USERNAME/ai-smart-hardware-app
- **GitHub Pages**: https://YOUR_USERNAME.github.io/ai-smart-hardware-app
- **Issues**: https://github.com/YOUR_USERNAME/ai-smart-hardware-app/issues
- **Actions**: https://github.com/YOUR_USERNAME/ai-smart-hardware-app/actions

## ⚠️ 注意事项

1. 确保您有GitHub账户并已登录
2. 如果推送失败，可能需要设置Git凭据
3. 首次推送可能需要GitHub个人访问令牌（PAT）
4. 私有仓库的GitHub Pages需要付费计划

## 🆘 常见问题

### 推送被拒绝
```bash
# 如果远程有更改，先拉取
git pull origin main --rebase

# 然后重新推送
git push origin main
```

### 认证失败
- 使用GitHub个人访问令牌代替密码
- 或者使用SSH密钥认证

### 分支名称不匹配
```bash
# 将本地master分支推送到远程main分支
git push origin master:main
```
