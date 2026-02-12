@echo off
echo.
echo ========================================
echo    AI Learning Hub - Starting Server
echo ========================================
echo.
echo Starting local server on port 8080...
echo.
echo Open this URL in your browser:
echo    http://localhost:8080/frontend/curriculum-viewer.html
echo.
echo Press Ctrl+C to stop the server.
echo ========================================
echo.
start http://localhost:8080/frontend/curriculum-viewer.html
cd /d "%~dp0"
python -m http.server 8080
