@echo off
echo ========================================
echo  Cleaning up project structure
echo ========================================

REM Delete unwanted folders
echo Deleting unwanted folders...
if exist "contract-obligation-b-07-26" rmdir /s /q "contract-obligation-b-07-26"
if exist "contractiq-backend" rmdir /s /q "contractiq-backend"
if exist "venv" rmdir /s /q "venv"
if exist "backend\venv" rmdir /s /q "backend\venv"
if exist "backend" rmdir /s /q "backend"

REM Create database folder if it doesn't exist
echo Organizing database files...
if not exist "database" mkdir "database"

REM Move database files
if exist "schema.sql" move /Y "schema.sql" "database\"
if exist "er_diagram.mermaid" move /Y "er_diagram.mermaid" "database\"
if exist "er_diagram.png" move /Y "er_diagram.png" "database\"
if exist "er_diagram.private.md" move /Y "er_diagram.private.md" "database\"
if exist "generate_er.py" move /Y "generate_er.py" "database\"

echo.
echo ========================================
echo  Cleanup complete!
echo ========================================
echo.
echo Structure:
echo   client/    - Frontend (Angular)
echo   server/    - Backend (FastAPI)
echo   database/  - Schema and ER diagrams
echo.

pause
