@echo off
setlocal enabledelayedexpansion

echo AI Smart Hardware App - Remote Repository Setup
echo ================================================

REM Check if we're in a git repository
git status >nul 2>&1
if errorlevel 1 (
    echo Error: Not in a Git repository!
    pause
    exit /b 1
)

echo.
echo Select Git hosting service:
echo 1. GitHub
echo 2. GitLab
echo 3. Gitee (码云)
echo 4. Custom URL
echo 5. Show current remotes

set /p choice="Enter choice (1-5): "

if "%choice%"=="5" (
    echo.
    echo Current remote repositories:
    git remote -v
    if errorlevel 1 (
        echo No remote repositories configured.
    )
    echo.
    pause
    exit /b 0
)

if "%choice%"=="1" set "service=GitHub"
if "%choice%"=="2" set "service=GitLab"
if "%choice%"=="3" set "service=Gitee"
if "%choice%"=="4" set "service=Custom"

if "%service%"=="" (
    echo Invalid choice!
    pause
    exit /b 1
)

echo.
echo Setting up %service% remote repository...

if "%choice%"=="1" (
    set "base_url=https://github.com"
    echo.
    echo GitHub Setup Instructions:
    echo 1. Go to https://github.com/new
    echo 2. Create a new repository named 'ai-smart-hardware-app'
    echo 3. Do NOT initialize with README, .gitignore, or license
    echo 4. Copy the repository URL
    echo.
) else if "%choice%"=="2" (
    set "base_url=https://gitlab.com"
    echo.
    echo GitLab Setup Instructions:
    echo 1. Go to https://gitlab.com/projects/new
    echo 2. Create a new project named 'ai-smart-hardware-app'
    echo 3. Set visibility level as needed
    echo 4. Do NOT initialize with README
    echo 5. Copy the repository URL
    echo.
) else if "%choice%"=="3" (
    set "base_url=https://gitee.com"
    echo.
    echo Gitee Setup Instructions:
    echo 1. Go to https://gitee.com/projects/new
    echo 2. Create a new repository named 'ai-smart-hardware-app'
    echo 3. Do NOT initialize with README
    echo 4. Copy the repository URL
    echo.
)

if not "%choice%"=="4" (
    set /p username="Enter your username: "
    if "!username!"=="" (
        echo Username cannot be empty!
        pause
        exit /b 1
    )
    
    set /p repo_name="Enter repository name (default: ai-smart-hardware-app): "
    if "!repo_name!"=="" set "repo_name=ai-smart-hardware-app"
    
    set "remote_url=%base_url%/!username!/!repo_name!.git"
) else (
    set /p remote_url="Enter the full repository URL: "
    if "!remote_url!"=="" (
        echo URL cannot be empty!
        pause
        exit /b 1
    )
)

echo.
echo Repository URL: !remote_url!
echo.
set /p confirm="Add this remote repository? (y/n): "
if /i not "%confirm%"=="y" (
    echo Setup cancelled.
    pause
    exit /b 0
)

REM Check if origin already exists
git remote get-url origin >nul 2>&1
if not errorlevel 1 (
    echo.
    echo Remote 'origin' already exists:
    git remote get-url origin
    echo.
    set /p replace="Replace existing remote? (y/n): "
    if /i "%replace%"=="y" (
        echo Removing existing remote...
        git remote remove origin
    ) else (
        echo Setup cancelled.
        pause
        exit /b 0
    )
)

REM Add remote repository
echo.
echo Adding remote repository...
git remote add origin "!remote_url!"

if errorlevel 1 (
    echo Failed to add remote repository!
    pause
    exit /b 1
)

echo Remote repository added successfully!

REM Verify remote
echo.
echo Verifying remote connection...
git remote -v

echo.
echo Testing connection...
git ls-remote origin >nul 2>&1
if errorlevel 1 (
    echo Warning: Could not connect to remote repository.
    echo This might be because:
    echo 1. The repository doesn't exist yet
    echo 2. You don't have access permissions
    echo 3. Network connectivity issues
    echo.
    echo Please create the repository on %service% first if you haven't already.
) else (
    echo Connection successful!
)

echo.
echo Next steps:
echo 1. Push your code: git push -u origin master
echo 2. Or use: npm run git:push
echo.
pause
