@echo off
echo Setting up Git hooks for AI Smart Hardware App...

REM Create hooks directory if it doesn't exist
if not exist ".git\hooks" mkdir ".git\hooks"

REM Create pre-commit hook
echo #!/bin/sh > .git\hooks\pre-commit
echo # Pre-commit hook for AI Smart Hardware App >> .git\hooks\pre-commit
echo echo "Running pre-commit checks..." >> .git\hooks\pre-commit
echo. >> .git\hooks\pre-commit
echo # Run TypeScript type checking >> .git\hooks\pre-commit
echo npm run type-check 2^>nul ^|^| echo "Warning: TypeScript type checking failed" >> .git\hooks\pre-commit
echo. >> .git\hooks\pre-commit
echo # Run linting >> .git\hooks\pre-commit
echo npm run lint 2^>nul ^|^| echo "Warning: Linting issues found" >> .git\hooks\pre-commit
echo. >> .git\hooks\pre-commit
echo echo "Pre-commit checks completed." >> .git\hooks\pre-commit

REM Create commit-msg hook
echo #!/bin/sh > .git\hooks\commit-msg
echo # Commit message hook >> .git\hooks\commit-msg
echo commit_regex='^(feat^|fix^|docs^|style^|refactor^|test^|chore)(\(.+\))?: .{1,50}' >> .git\hooks\commit-msg
echo. >> .git\hooks\commit-msg
echo if ! grep -qE "$commit_regex" "$1"; then >> .git\hooks\commit-msg
echo     echo "Invalid commit message format!" >> .git\hooks\commit-msg
echo     echo "Format: type(scope): description" >> .git\hooks\commit-msg
echo     echo "Types: feat, fix, docs, style, refactor, test, chore" >> .git\hooks\commit-msg
echo     exit 1 >> .git\hooks\commit-msg
echo fi >> .git\hooks\commit-msg

echo Git hooks have been set up successfully!
echo.
echo Available hooks:
echo - pre-commit: Runs type checking and linting
echo - commit-msg: Validates commit message format
echo.
pause
