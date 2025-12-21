@echo off
chcp 65001 > nul
echo.
echo ========================================================
echo   Urban Gray Blog Generator & Publisher
echo   AI is writing your article...
echo ========================================================
echo.

cd /d "%~dp0"

:: 1. Generate Article
call npx tsx scripts/generate-news.ts
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to generate article.
    pause
    exit /b %errorlevel%
)

echo.
echo ========================================================
echo   Article generated. Publishing to GitHub...
echo ========================================================
echo.

:: 2. Git Operations
git add client/src/posts/
git add client/public/blog-images/

:: Check if there are changes
git diff --staged --quiet
if %errorlevel% equ 0 (
    echo [INFO] No new changes to commit.
    pause
    exit /b 0
)

git commit -m "📝 Auto-generated news article via Batch Script"
git push

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to push to GitHub. Check your internet or git settings.
    pause
    exit /b %errorlevel%
)

echo.
echo ========================================================
echo   SUCCESS! The article is now live.
echo   https://urban-gray.vercel.app/blog
echo ========================================================
echo.
pause