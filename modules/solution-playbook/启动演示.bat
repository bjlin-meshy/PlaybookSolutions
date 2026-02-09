@echo off
chcp 936 >nul 2>&1
title Meshy Solution Playbook

echo.
echo  ========================================
echo.
echo     Meshy AI Solution Playbook
echo.
echo     Made by BJ Lin - Meshy.AI
echo.
echo  ========================================
echo.

cd /d "%~dp0"
start "" "%~dp0index.html"

echo  Done! Press F11 for fullscreen.
echo.
pause
