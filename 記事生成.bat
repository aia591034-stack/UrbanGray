@echo off
chcp 65001 > nul

echo ========================================================
echo   Urban Gray Blog Generator
echo   AI is writing your article...
echo ========================================================

cd /d "%~dp0"

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

git add client/src/posts/
git add client/public/blog-images/

git commit -m "Auto-generated news article via Batch Script"
git push

echo.
echo ========================================================
echo   SUCCESS! The article is now live.
echo   https://urban-gray.vercel.app/blog
echo ========================================================

pause