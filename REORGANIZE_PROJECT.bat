@echo off
REM ============================================================
REM Reorganize Project Structure
REM ============================================================

echo.
echo ========================================
echo  Reorganizing Project Structure
echo ========================================
echo.

echo Step 1: Deleting unwanted folders...
rmdir /s /q "contract-obligation-b-07-26" 2>nul
rmdir /s /q "contractiq-backend" 2>nul
rmdir /s /q "venv" 2>nul
rmdir /s /q "backend\venv" 2>nul

echo Step 2: Creating clean structure...
mkdir "server" 2>nul
mkdir "client" 2>nul
mkdir "database" 2>nul

echo Step 3: Moving backend files to server...
xcopy /E /I /Y "backend\*" "server\" 2>nul

echo Step 4: Moving database files...
move /Y "schema.sql" "database\" 2>nul
move /Y "er_diagram.mermaid" "database\" 2>nul
move /Y "er_diagram.png" "database\" 2>nul
move /Y "er_diagram.private.md" "database\" 2>nul
move /Y "generate_er.py" "database\" 2>nul

echo Step 5: Cleaning up...
rmdir /s /q "backend" 2>nul

echo.
echo ========================================
echo  Done! New structure:
echo ========================================
echo.
echo   server/          - FastAPI backend
echo   client/          - Angular frontend (to be added)
echo   database/        - Schema and diagrams
echo   README.md        - Documentation
echo.

pause
