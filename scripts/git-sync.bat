@echo off
setlocal enabledelayedexpansion

echo AI Smart Hardware App - Git Sync Tool
echo =====================================

REM Check if we're in a git repository
git status >nul 2>&1
if errorlevel 1 (
    echo Error: Not in a Git repository!
    pause
    exit /b 1
)

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Error: No remote repository configured!
    echo Please run 'npm run git:setup-remote' first.
    pause
    exit /b 1
)

echo Current remote: 
git remote get-url origin

echo.
echo Select operation:
echo 1. Push to remote (upload changes)
echo 2. Pull from remote (download changes)
echo 3. Force push (dangerous - overwrites remote)
echo 4. Sync status (fetch and compare)
echo 5. Clone/backup to another location

set /p choice="Enter choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo Checking for uncommitted changes...
    git diff-index --quiet HEAD --
    if errorlevel 1 (
        echo You have uncommitted changes!
        git status --short
        echo.
        set /p commit_first="Commit changes first? (y/n): "
        if /i "!commit_first!"=="y" (
            call scripts\quick-commit.bat
            if errorlevel 1 (
                echo Commit failed or cancelled.
                pause
                exit /b 1
            )
        ) else (
            echo Push cancelled. Please commit or stash changes first.
            pause
            exit /b 1
        )
    )
    
    echo.
    echo Pushing to remote repository...
    git push origin master
    if errorlevel 1 (
        echo.
        echo Push failed! This might be because:
        echo 1. The remote repository doesn't exist
        echo 2. You don't have push permissions
        echo 3. The remote has changes you don't have locally
        echo.
        set /p force="Try force push? (DANGEROUS - y/n): "
        if /i "!force!"=="y" (
            echo Force pushing...
            git push --force origin master
        )
    ) else (
        echo Push successful!
    )

) else if "%choice%"=="2" (
    echo.
    echo Pulling from remote repository...
    git pull origin master
    if errorlevel 1 (
        echo Pull failed! You may need to resolve conflicts.
    ) else (
        echo Pull successful!
    )

) else if "%choice%"=="3" (
    echo.
    echo WARNING: Force push will overwrite the remote repository!
    echo This will permanently delete any commits on the remote that you don't have locally.
    echo.
    set /p confirm="Are you absolutely sure? Type 'FORCE' to confirm: "
    if "!confirm!"=="FORCE" (
        echo Force pushing...
        git push --force origin master
        if errorlevel 1 (
            echo Force push failed!
        ) else (
            echo Force push successful!
        )
    ) else (
        echo Force push cancelled.
    )

) else if "%choice%"=="4" (
    echo.
    echo Fetching remote information...
    git fetch origin
    
    echo.
    echo Local commits not on remote:
    git log origin/master..HEAD --oneline
    if errorlevel 1 (
        echo No local commits ahead of remote.
    )
    
    echo.
    echo Remote commits not local:
    git log HEAD..origin/master --oneline
    if errorlevel 1 (
        echo No remote commits ahead of local.
    )
    
    echo.
    echo Current branch status:
    git status -b

) else if "%choice%"=="5" (
    echo.
    set /p backup_path="Enter backup location (full path): "
    if "!backup_path!"=="" (
        echo Backup path cannot be empty!
        pause
        exit /b 1
    )
    
    echo.
    echo Creating backup at: !backup_path!
    git clone . "!backup_path!"
    if errorlevel 1 (
        echo Backup failed!
    ) else (
        echo Backup created successfully!
    )

) else (
    echo Invalid choice!
    pause
    exit /b 1
)

echo.
echo Current repository status:
git status --short

echo.
echo Recent commits:
git log --oneline -5

echo.
pause
