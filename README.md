# 📄 ContractIQ - Contract Repository & Settings Module

A modern Contract Repository and Management System built using **React (Vite)** for the frontend and **FastAPI** for the backend.

The application helps organizations manage contracts throughout their lifecycle, including creating, searching, filtering, and organizing contracts efficiently. Includes a comprehensive Settings Module for user and application preferences.

---

## 🚀 Features

### Contract Repository
- 📋 View all contracts in a responsive table
- ➕ Create new contracts using a modal form
- 🔍 Search contracts by ID, Name, or Party
- 📂 Filter contracts by Category
- 📌 Filter contracts by Status
- 🏷️ Status badges with different colors
- 📱 Responsive UI
- ⚡ FastAPI backend
- ⚛️ React + Vite frontend

### Settings Module
- 👤 **Profile Management**: View and edit personal details, contact information, job title, department, timezone
- 🔒 **Security**: Change password, Two-Factor Authentication (UI), Active Session Management (UI)
- 🔔 **Notifications**: Email notification preferences, Push notification preferences, Reminder settings
- 🔗 **Integrations**: Connected applications, External service management
- 🏢 **Organization**: Organization information, Company details, Business settings
- 🎨 **Appearance**: Theme selection, Language selection, Display preferences

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router
- React Icons
- Axios
- React Hook Form
- React Toastify
- CSS3

### Backend
- FastAPI
- Python
- Uvicorn
- PostgreSQL
- SQLAlchemy
- Pydantic

---

# 📁 Project Structure

```
contract-obligation-b-07-26/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── Settings/
│   │   │   ├── Layout/
│   │   │   └── ...
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── Settings/
│   │   │   └── ...
│   │   ├── routes/
│   │   └── ...
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── models/
│   │   │   └── settings.py
│   │   ├── routers/
│   │   │   └── settings.py
│   │   ├── schemas/
│   │   │   └── settings.py
│   │   ├── services/
│   │   │   └── settings_service.py
│   │   └── ...
│   ├── requirements.txt
│   └── main.py
│
├── .gitignore
└── README.md
```

---

## API Endpoints

### Settings Module Endpoints

### Get Profile
```
GET /api/settings/profile
```

### Update Profile
```
PUT /api/settings/profile
```

### Change Password
```
PUT /api/settings/password
```

### Notification Preferences
```
GET /api/settings/notifications
PUT /api/settings/notifications
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <your-repository-url>
cd contract-obligation-b-07-26
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Backend Setup

Create virtual environment

```bash
cd server

python -m venv venv
```

Activate it

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI

```bash
uvicorn src.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## � Future Enhancements

### Contract Repository
- Database Integration
- Authentication & Authorization
- Contract Editing
- Delete Contracts
- Import / Export Contracts
- File Upload Support
- Dashboard Analytics

### Settings Module
- Profile photo upload
- Dark mode
- Role-based settings
- Multi-language support
- Session management
- API authentication
- Organization management

---

## 👩‍💻 Author

**Pragna Sree**

Built as part of a Contract Management project using React and FastAPI.