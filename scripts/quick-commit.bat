@echo off
setlocal enabledelayedexpansion

echo AI Smart Hardware App - Quick Commit Tool
echo ========================================

REM Check if we're in a git repository
git status >nul 2>&1
if errorlevel 1 (
    echo Error: Not in a Git repository!
    pause
    exit /b 1
)

REM Show current status
echo Current Git status:
git status --short

echo.
echo Select commit type:
echo 1. feat     - New feature
echo 2. fix      - Bug fix
echo 3. docs     - Documentation
echo 4. style    - Code style changes
echo 5. refactor - Code refactoring
echo 6. test     - Tests
echo 7. chore    - Build/tools changes
echo 8. custom   - Custom message

set /p choice="Enter choice (1-8): "

REM Set commit type based on choice
if "%choice%"=="1" set "type=feat"
if "%choice%"=="2" set "type=fix"
if "%choice%"=="3" set "type=docs"
if "%choice%"=="4" set "type=style"
if "%choice%"=="5" set "type=refactor"
if "%choice%"=="6" set "type=test"
if "%choice%"=="7" set "type=chore"
if "%choice%"=="8" set "type=custom"

if "%type%"=="" (
    echo Invalid choice!
    pause
    exit /b 1
)

REM Get commit message
if "%type%"=="custom" (
    set /p message="Enter commit message: "
) else (
    set /p description="Enter description: "
    set "message=%type%: !description!"
)

if "%message%"=="" (
    echo Commit message cannot be empty!
    pause
    exit /b 1
)

REM Add all changes
echo.
echo Adding all changes...
git add .

REM Show what will be committed
echo.
echo Files to be committed:
git diff --cached --name-only

REM Confirm commit
echo.
set /p confirm="Commit with message '%message%'? (y/n): "
if /i not "%confirm%"=="y" (
    echo Commit cancelled.
    pause
    exit /b 0
)

REM Commit changes
echo.
echo Committing changes...
git commit -m "%message%"

if errorlevel 1 (
    echo Commit failed!
    pause
    exit /b 1
)

echo.
echo Commit successful!
echo.
echo Recent commits:
git log --oneline -5

echo.
pause
