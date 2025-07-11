# Git 常用命令指南

## 基本操作

### 查看状态
```bash
git status                    # 查看工作区状态
git log --oneline            # 查看提交历史（简洁版）
git log --graph --oneline    # 查看分支图
```

### 添加和提交
```bash
git add .                    # 添加所有更改
git add <file>               # 添加特定文件
git commit -m "message"      # 提交更改
git commit -am "message"     # 添加并提交已跟踪文件
```

### 分支操作
```bash
git branch                   # 查看本地分支
git branch -a               # 查看所有分支
git branch <name>           # 创建新分支
git checkout <branch>       # 切换分支
git checkout -b <branch>    # 创建并切换到新分支
git merge <branch>          # 合并分支
git branch -d <branch>      # 删除分支
```

### 远程操作
```bash
git remote -v               # 查看远程仓库
git remote add origin <url> # 添加远程仓库
git push origin <branch>    # 推送到远程分支
git pull origin <branch>    # 拉取远程更改
git clone <url>             # 克隆仓库
```

### 撤销操作
```bash
git reset HEAD <file>       # 取消暂存文件
git checkout -- <file>     # 撤销工作区更改
git reset --soft HEAD~1    # 撤销最后一次提交（保留更改）
git reset --hard HEAD~1    # 撤销最后一次提交（丢弃更改）
```

## 项目特定工作流

### 功能开发流程
```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 开发并提交
git add .
git commit -m "feat: add new feature"

# 3. 切换到主分支并合并
git checkout master
git merge feature/new-feature

# 4. 删除功能分支
git branch -d feature/new-feature
```

### 修复Bug流程
```bash
# 1. 创建修复分支
git checkout -b fix/bug-description

# 2. 修复并提交
git add .
git commit -m "fix: resolve bug description"

# 3. 合并到主分支
git checkout master
git merge fix/bug-description
```

### 提交信息规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

## 常用别名设置
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```
