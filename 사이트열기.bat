@echo off
chcp 65001 >nul
cd /d "%~dp0"
set PORT=8765

where py >nul 2>&1
if %errorlevel%==0 (
  start "C문제-서버" cmd /k py -3 -m http.server %PORT%
  goto OPEN
)
where python >nul 2>&1
if %errorlevel%==0 (
  start "C문제-서버" cmd /k python -m http.server %PORT%
  goto OPEN
)

echo Python이 없어 파일로만 엽니다. ^(팀원에게 링크 보내려면 Python 설치 후 이 파일을 다시 실행^)
start "" "%~dp0index.html"
pause
exit /b 0

:OPEN
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:%PORT%/index.html"
exit /b 0
