@echo off
echo 创建GitHub上传包...
echo =====================

REM 创建临时目录
if exist "github-upload" rmdir /s /q "github-upload"
mkdir "github-upload"

echo 复制核心文件...

REM 复制根目录文件
copy "README.md" "github-upload\"
copy "package.json" "github-upload\"
copy "package-lock.json" "github-upload\"
copy "LICENSE" "github-upload\"
copy "vite.config.ts" "github-upload\"
copy "tsconfig.json" "github-upload\"
copy "tsconfig.app.json" "github-upload\"
copy "tsconfig.node.json" "github-upload\"
copy "tailwind.config.js" "github-upload\"
copy "postcss.config.js" "github-upload\"
copy "eslint.config.js" "github-upload\"
copy "index.html" "github-upload\"
copy "GITHUB_SETUP.md" "github-upload\"
copy "UPLOAD_CHECKLIST.md" "github-upload\"

REM 复制src目录
echo 复制源代码...
xcopy "src" "github-upload\src" /E /I

REM 复制scripts目录
echo 复制脚本...
xcopy "scripts" "github-upload\scripts" /E /I

REM 复制.github目录
echo 复制GitHub Actions...
xcopy ".github" "github-upload\.github" /E /I

REM 创建.gitignore文件
echo 创建.gitignore...
echo # Dependencies > "github-upload\.gitignore"
echo node_modules/ >> "github-upload\.gitignore"
echo npm-debug.log* >> "github-upload\.gitignore"
echo yarn-debug.log* >> "github-upload\.gitignore"
echo yarn-error.log* >> "github-upload\.gitignore"
echo. >> "github-upload\.gitignore"
echo # Build outputs >> "github-upload\.gitignore"
echo dist/ >> "github-upload\.gitignore"
echo build/ >> "github-upload\.gitignore"
echo. >> "github-upload\.gitignore"
echo # Environment files >> "github-upload\.gitignore"
echo .env >> "github-upload\.gitignore"
echo .env.local >> "github-upload\.gitignore"
echo .env.development.local >> "github-upload\.gitignore"
echo .env.test.local >> "github-upload\.gitignore"
echo .env.production.local >> "github-upload\.gitignore"
echo. >> "github-upload\.gitignore"
echo # IDE files >> "github-upload\.gitignore"
echo .vscode/ >> "github-upload\.gitignore"
echo .idea/ >> "github-upload\.gitignore"
echo *.swp >> "github-upload\.gitignore"
echo *.swo >> "github-upload\.gitignore"
echo. >> "github-upload\.gitignore"
echo # OS files >> "github-upload\.gitignore"
echo .DS_Store >> "github-upload\.gitignore"
echo Thumbs.db >> "github-upload\.gitignore"

REM 创建压缩包
echo 创建压缩包...
powershell Compress-Archive -Path "github-upload\*" -DestinationPath "ai-smart-hardware-app-clean.zip" -Force

echo.
echo ✅ 上传包创建完成！
echo.
echo 📦 文件位置: ai-smart-hardware-app-clean.zip
echo 📁 临时目录: github-upload\
echo.
echo 🚀 上传步骤：
echo 1. 在GitHub创建仓库: https://github.com/new
echo 2. 仓库名: ai-smart-hardware-app
echo 3. 上传 ai-smart-hardware-app-clean.zip 中的所有文件
echo 4. 或者直接拖拽 github-upload 文件夹中的所有文件
echo.
pause
