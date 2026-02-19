@echo off
chcp 65001 >nul
cd /d "%~dp0"
set PORT=5555
echo Playbook Solutions — 正在启动本地服务器...
echo 启动后请在浏览器打开: http://localhost:%PORT%
echo 按 Ctrl+C 可停止服务器。
echo.
timeout /t 2 /nobreak >nul
start "" "http://localhost:%PORT%"
:: 优先用 Python 内置服务器（仅监听 127.0.0.1，避免 EACCES）
python -m http.server %PORT% --bind 127.0.0.1
if errorlevel 1 npx --yes serve . -p %PORT%
pause
