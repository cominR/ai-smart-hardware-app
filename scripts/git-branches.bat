@echo off
setlocal enabledelayedexpansion

echo AI Smart Hardware App - Branch Management
echo =========================================

REM Check if we're in a git repository
git status >nul 2>&1
if errorlevel 1 (
    echo Error: Not in a Git repository!
    pause
    exit /b 1
)

echo Current branch:
git branch --show-current

echo.
echo Select operation:
echo 1. List all branches
echo 2. Create new branch
echo 3. Switch to branch
echo 4. Create and switch to new branch
echo 5. Merge branch into current
echo 6. Delete branch
echo 7. Push branch to remote
echo 8. Pull branch from remote

set /p choice="Enter choice (1-8): "

if "%choice%"=="1" (
    echo.
    echo Local branches:
    git branch
    echo.
    echo Remote branches:
    git branch -r
    echo.
    echo All branches:
    git branch -a

) else if "%choice%"=="2" (
    echo.
    set /p branch_name="Enter new branch name: "
    if "!branch_name!"=="" (
        echo Branch name cannot be empty!
        pause
        exit /b 1
    )
    
    echo Creating branch: !branch_name!
    git branch "!branch_name!"
    if errorlevel 1 (
        echo Failed to create branch!
    ) else (
        echo Branch created successfully!
        echo To switch to this branch, use: git checkout !branch_name!
    )

) else if "%choice%"=="3" (
    echo.
    echo Available branches:
    git branch
    echo.
    set /p branch_name="Enter branch name to switch to: "
    if "!branch_name!"=="" (
        echo Branch name cannot be empty!
        pause
        exit /b 1
    )
    
    echo Switching to branch: !branch_name!
    git checkout "!branch_name!"
    if errorlevel 1 (
        echo Failed to switch branch!
        echo Make sure the branch exists and you have no uncommitted changes.
    ) else (
        echo Switched to branch: !branch_name!
    )

) else if "%choice%"=="4" (
    echo.
    set /p branch_name="Enter new branch name: "
    if "!branch_name!"=="" (
        echo Branch name cannot be empty!
        pause
        exit /b 1
    )
    
    echo Creating and switching to branch: !branch_name!
    git checkout -b "!branch_name!"
    if errorlevel 1 (
        echo Failed to create and switch to branch!
    ) else (
        echo Created and switched to branch: !branch_name!
    )

) else if "%choice%"=="5" (
    echo.
    echo Current branch:
    git branch --show-current
    echo.
    echo Available branches to merge:
    git branch
    echo.
    set /p branch_name="Enter branch name to merge into current branch: "
    if "!branch_name!"=="" (
        echo Branch name cannot be empty!
        pause
        exit /b 1
    )
    
    echo.
    set /p confirm="Merge '!branch_name!' into current branch? (y/n): "
    if /i "!confirm!"=="y" (
        echo Merging branch: !branch_name!
        git merge "!branch_name!"
        if errorlevel 1 (
            echo Merge failed! You may need to resolve conflicts.
            echo Use 'git status' to see conflicted files.
        ) else (
            echo Merge successful!
        )
    ) else (
        echo Merge cancelled.
    )

) else if "%choice%"=="6" (
    echo.
    echo Available branches:
    git branch
    echo.
    set /p branch_name="Enter branch name to delete: "
    if "!branch_name!"=="" (
        echo Branch name cannot be empty!
        pause
        exit /b 1
    )
    
    REM Check if it's the current branch
    for /f %%i in ('git branch --show-current') do set current_branch=%%i
    if "!branch_name!"=="!current_branch!" (
        echo Cannot delete the current branch!
        echo Switch to another branch first.
        pause
        exit /b 1
    )
    
    echo.
    set /p confirm="Delete branch '!branch_name!'? (y/n): "
    if /i "!confirm!"=="y" (
        echo Deleting branch: !branch_name!
        git branch -d "!branch_name!"
        if errorlevel 1 (
            echo.
            set /p force="Branch has unmerged changes. Force delete? (y/n): "
            if /i "!force!"=="y" (
                git branch -D "!branch_name!"
                if errorlevel 1 (
                    echo Failed to force delete branch!
                ) else (
                    echo Branch force deleted!
                )
            )
        ) else (
            echo Branch deleted successfully!
        )
    ) else (
        echo Delete cancelled.
    )

) else if "%choice%"=="7" (
    echo.
    for /f %%i in ('git branch --show-current') do set current_branch=%%i
    echo Current branch: !current_branch!
    echo.
    set /p confirm="Push current branch '!current_branch!' to remote? (y/n): "
    if /i "!confirm!"=="y" (
        echo Pushing branch to remote...
        git push -u origin "!current_branch!"
        if errorlevel 1 (
            echo Failed to push branch!
        ) else (
            echo Branch pushed successfully!
        )
    ) else (
        echo Push cancelled.
    )

) else if "%choice%"=="8" (
    echo.
    set /p branch_name="Enter remote branch name to pull: "
    if "!branch_name!"=="" (
        echo Branch name cannot be empty!
        pause
        exit /b 1
    )
    
    echo Pulling branch from remote...
    git fetch origin
    git checkout -b "!branch_name!" origin/"!branch_name!"
    if errorlevel 1 (
        echo Failed to pull branch! Branch might already exist locally.
        echo Try: git checkout !branch_name! && git pull origin !branch_name!
    ) else (
        echo Branch pulled and checked out successfully!
    )

) else (
    echo Invalid choice!
    pause
    exit /b 1
)

echo.
echo Current status:
git status --short

echo.
pause
