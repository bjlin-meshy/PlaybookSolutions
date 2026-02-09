@echo off
chcp 65001 >nul
title Meshy Solution Playbook

echo.
echo  ╔══════════════════════════════════════════════╗
echo  ║                                              ║
echo  ║     Meshy AI Solution Playbook               ║
echo  ║                                              ║
echo  ║     Made by BJ Lin                           ║
echo  ║                                              ║
echo  ╚══════════════════════════════════════════════╝
echo.
echo  Opening presentation...
echo.

:: Get current script directory
cd /d "%~dp0"

:: Open index page
start "" "%~dp0index.html"

echo  Done! Presentation opened in your default browser.
echo.
echo  TIP: Press F11 for fullscreen mode
echo.
pause
