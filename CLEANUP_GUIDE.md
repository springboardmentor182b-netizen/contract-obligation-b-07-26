# Project Cleanup Guide

## ✅ Files to KEEP (Essential)

### Frontend
```
frontend/
├── src/                    ✅ KEEP - Your source code
├── node_modules/           ✅ KEEP - Required packages (auto-generated)
├── angular.json           ✅ KEEP - Angular configuration
├── package.json           ✅ KEEP - Dependencies list
├── package-lock.json      ✅ KEEP - Exact versions
└── tsconfig.json          ✅ KEEP - TypeScript config
```

### Backend
```
backend/
├── app/                   ✅ KEEP - Your API code
├── alembic/               ✅ KEEP - Database migrations
├── venv/                  ✅ KEEP - Python virtual environment
├── .env                   ✅ KEEP - Your environment variables
├── .env.example           ✅ KEEP - Example config
├── alembic.ini            ✅ KEEP - Migration config
├── contractiq.db          ✅ KEEP - Your database
└── requirements.txt       ✅ KEEP - Python dependencies
```

## ❌ Files You CAN Delete (Will be regenerated)

### Frontend Cache Files
```
frontend/.angular/          ❌ DELETE - Build cache (already deleted)
frontend/dist/              ❌ DELETE - Production build folder (if exists)
```

### Backend Cache Files
```
backend/**/__pycache__/     ❌ DELETE - Python cache (already deleted)
backend/**/*.pyc            ❌ DELETE - Compiled Python files
```

## 📦 About node_modules

**Size**: ~200-500 MB
**Status**: ✅ REQUIRED - DO NOT DELETE

The `node_modules` folder contains all Angular and JavaScript packages needed to run your app. While it's large, it's essential.

### If you want to reduce size:
1. ❌ Don't delete individual files inside `node_modules`
2. ✅ Only delete the entire folder if you want to reinstall
3. ✅ Add `node_modules/` to `.gitignore` (already done)

### To reinstall node_modules:
```bash
cd frontend
rmdir /s /q node_modules    # Delete entire folder
npm install                  # Reinstall everything
```

## 🎯 Current Project Size Breakdown

### Large but Essential:
- `node_modules/` → ~300-500 MB ✅ KEEP
- `venv/` → ~50-100 MB ✅ KEEP
- Your code → ~5-10 MB ✅ KEEP

### Already Deleted:
- `.angular/` → ~50-100 MB ❌ DELETED
- `__pycache__/` → ~1-5 MB ❌ DELETED
- Documentation files → ~100 KB ❌ DELETED

## 💡 Tips to Keep Project Clean

1. **Add to .gitignore** (already configured):
   - `node_modules/`
   - `venv/`
   - `.angular/`
   - `__pycache__/`
   - `dist/`
   - `.env`

2. **Don't commit large folders to Git**

3. **Clean build regularly**:
   ```bash
   # Frontend
   cd frontend
   rd /s /q .angular
   
   # Backend
   cd backend
   # Cache auto-regenerates, no action needed
   ```

4. **For production deployment**:
   - Build frontend: `npm run build`
   - Only deploy the `dist/` folder
   - Backend: Use production server (not uvicorn --reload)

## 🚀 If You Want Minimal Size

### Option 1: Delete and Reinstall (Recommended)
```bash
cd frontend
rmdir /s /q node_modules
rmdir /s /q .angular
npm install
```

### Option 2: Use Production Build Only
```bash
cd frontend
npm run build
# This creates a small dist/ folder
# You can then delete src/ if only deploying
```

### Option 3: Clean Backend
```bash
cd backend
# Delete test database to start fresh
del contractiq.db
# Recreate it
alembic upgrade head
```

## ⚠️ Warning: DO NOT Delete

- ❌ `node_modules/` - App won't run
- ❌ `venv/` - Backend won't run
- ❌ `src/` - Your source code
- ❌ `package.json` - Dependency list
- ❌ `requirements.txt` - Python dependencies
- ❌ `contractiq.db` - Your data

## ✅ Summary

Your project is now CLEAN! 

**Deleted:**
- Angular cache (`.angular/`)
- Python cache (`__pycache__/`)
- All documentation markdown files
- Batch startup files

**Remaining size is NORMAL and REQUIRED.**

The large folders (`node_modules` and `venv`) are necessary for the application to work.
