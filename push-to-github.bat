@echo off
echo AI Smart Hardware App - GitHub推送工具
echo =====================================

REM 检查是否在Git仓库中
git status >nul 2>&1
if errorlevel 1 (
    echo 错误：不在Git仓库中！
    pause
    exit /b 1
)

echo.
echo 当前项目状态：
git log --oneline -3

echo.
echo 请按照以下步骤操作：
echo.
echo 1. 访问 https://github.com/new
echo 2. 创建名为 'ai-smart-hardware-app' 的新仓库
echo 3. 不要勾选任何初始化选项（README、.gitignore、license）
echo 4. 点击 'Create repository'
echo 5. 复制仓库URL

echo.
set /p username="请输入您的GitHub用户名: "
if "%username%"=="" (
    echo 用户名不能为空！
    pause
    exit /b 1
)

set "repo_url=https://github.com/%username%/ai-smart-hardware-app.git"

echo.
echo 将要设置的远程仓库URL: %repo_url%
echo.
set /p confirm="确认设置此远程仓库？(y/n): "
if /i not "%confirm%"=="y" (
    echo 操作已取消。
    pause
    exit /b 0
)

echo.
echo 正在设置远程仓库...

REM 检查是否已存在origin
git remote get-url origin >nul 2>&1
if not errorlevel 1 (
    echo 远程仓库 'origin' 已存在，正在移除...
    git remote remove origin
)

REM 添加远程仓库
git remote add origin "%repo_url%"
if errorlevel 1 (
    echo 添加远程仓库失败！
    pause
    exit /b 1
)

echo 远程仓库添加成功！

REM 重命名分支为main
echo.
echo 正在将主分支重命名为 main...
git branch -M main

REM 推送到GitHub
echo.
echo 正在推送代码到GitHub...
echo 这可能需要几分钟时间...

git push -u origin main
if errorlevel 1 (
    echo.
    echo 推送失败！可能的原因：
    echo 1. GitHub仓库不存在
    echo 2. 没有推送权限
    echo 3. 需要GitHub个人访问令牌（PAT）
    echo.
    echo 请检查：
    echo - 仓库是否已在GitHub上创建
    echo - GitHub用户名是否正确
    echo - 是否需要设置Git凭据
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ 推送成功！
echo.
echo 您的项目现在可以在以下地址访问：
echo 🔗 仓库地址: https://github.com/%username%/ai-smart-hardware-app
echo 📋 Issues: https://github.com/%username%/ai-smart-hardware-app/issues
echo 🚀 Actions: https://github.com/%username%/ai-smart-hardware-app/actions

echo.
echo 下一步操作：
echo 1. 访问您的GitHub仓库确认代码已上传
echo 2. 在仓库Settings中启用GitHub Pages（可选）
echo 3. 邀请协作者（如果需要）
echo 4. 创建第一个Issue或Pull Request

echo.
echo 本地Git状态：
git remote -v
git status

echo.
pause
