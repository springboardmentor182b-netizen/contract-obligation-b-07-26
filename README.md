# contract-obligation-b-07-26
# ContractIQ – Settings Module

## Overview

The Settings Module provides users with a centralized interface to manage their account and application preferences within the ContractIQ platform.

This module was developed as an independent feature in a separate branch to allow seamless integration into the main ContractIQ application.

---

## Features

### Profile
- View profile information
- Edit personal details
- Update:
  - First Name
  - Last Name
  - Email
  - Phone Number
  - Job Title
  - Department
  - Timezone

### Security
- Change Password
- Two-Factor Authentication (UI)
- Active Session Management (UI)

### Notifications
- Email notification preferences
- Push notification preferences
- Reminder settings

### Integrations
- Connected applications
- External service management

### Organization
- Organization information
- Company details
- Business settings

### Appearance
- Theme selection
- Language selection
- Display preferences

---

## Technologies Used

### Frontend

- React
- React Router
- Axios
- React Hook Form
- React Toastify
- CSS Modules

### Backend

- FastAPI
- Python
- REST APIs

---

## Folder Structure

```
settings_module/

client/
    src/
        components/
        pages/
        services/
        styles/

server/
    src/
        models/
        routers/
        schemas/
        services/
```

---

## API Endpoints

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

## Validation

The module validates:

- Required fields
- Email format
- Phone number
- Password confirmation
- Empty input prevention

---

## User Experience

- Loading indicators
- Toast notifications
- Responsive layout
- Sidebar navigation
- Top navigation bar
- Form validation
- Success/Error messages

---

## Running the Project

### Backend

```bash
cd server
py -m uvicorn src.main:app --reload
```

Runs at:

```
http://127.0.0.1:8000
```

---

### Frontend

```bash
cd client
npm install
npm run dev
```

Runs at:

```
http://localhost:5173
```

---

## Future Improvements

- Profile photo upload
- Dark mode
- Role-based settings
- Multi-language support
- Session management
- API authentication
- Organization management

---

## Branch

```
Group-A-feature/Settings-Module
```

---

## Author

**Pragna Sree**

ContractIQ – Settings Module
