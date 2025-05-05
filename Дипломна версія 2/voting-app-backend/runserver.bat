@echo off
REM Активувати віртуальне середовище
call venv\Scripts\activate.bat

REM Запустити сервер FastAPI у новому вікні
start "" uvicorn main:app --reload

REM Трохи зачекати, щоб сервер встиг запуститися
timeout /t 3 /nobreak >nul

REM Відкрити сторінку документації FastAPI
start http://127.0.0.1:8000/docs

pause
