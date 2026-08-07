# ContractIQ — Auth Module

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

<<<<<<< HEAD
### 2.2 Start the development server

```bash
# Option A — use npm start (recommended, works if npm scripts are allowed)
npm start

# Option B — if PowerShell script execution is blocked on Windows
node node_modules/@angular/cli/bin/ng.js serve --port 4200
```

Angular dev server starts at **http://localhost:4200**  
API requests to `/api/*` are proxied to `http://localhost:8000` via `src/proxy.conf.json`.

---

## 3 — Auth API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | Public | Register new user (Employee role) |
| POST | `/api/v1/auth/login` | Public | Login, returns JWT tokens |
| POST | `/api/v1/auth/refresh` | Public | Refresh access token |
| GET  | `/api/v1/auth/me` | Bearer | Get current user profile |
| POST | `/api/v1/auth/logout` | Bearer | Revoke refresh token |
| POST | `/api/v1/auth/password-reset/request` | Public | Request password reset |
| POST | `/api/v1/auth/password-reset/confirm` | Public | Confirm password reset |
| POST | `/api/v1/auth/admin/register` | Bearer (Admin only) | Register user with any role |

---

## 4 — Roles

| Role | Value |
|------|-------|
| Administrator | `administrator` |
| Legal Manager | `legal_manager` |
| Compliance Officer | `compliance_officer` |
| Contract Manager | `contract_manager` |
| Department Head | `department_head` |
| Employee | `employee` |

Public registration is locked to `employee`. An Administrator uses `POST /api/v1/auth/admin/register` to assign elevated roles.

---

## 5 — Quick test with curl

```bash
# Register
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@company.com","full_name":"Alice Smith","password":"Secret@123"}'

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@company.com","password":"Secret@123"}'

# Get profile (replace TOKEN)
curl http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer TOKEN"
```

---

## 6 — Frontend Pages

| Route | Component |
|-------|-----------|
| `/auth/login` | Login page |
| `/auth/register` | Registration page |
| `/dashboard` | Protected dashboard (requires login) |
| `/forbidden` | 403 page (wrong role) |

---

## 7 — Password Requirements

- Minimum 8 characters  
- At least one uppercase letter  
- At least one digit  
- At least one special character (`!@#$%^&*` etc.)

---

## 8 — Project Structure

```
backend/
├── app/
│   ├── core/           # Config, JWT, password hashing
│   ├── db/             # SQLAlchemy engine & session
│   ├── dependencies/   # FastAPI auth dependencies
│   ├── models/         # User ORM model + roles enum
│   ├── routers/        # auth.py — all auth routes
│   ├── schemas/        # Pydantic request/response schemas
│   ├── services/       # AuthService business logic
│   └── main.py         # FastAPI app entry point
├── alembic/            # DB migrations
├── .env                # Environment variables (git-ignored)
└── requirements.txt

frontend/src/app/
├── auth/
│   ├── components/
│   │   ├── login/      # Login form component
│   │   └── register/   # Registration form component
│   ├── guards/         # authGuard, roleGuard
│   ├── interceptors/   # JWT injection + auto-refresh
│   ├── models/         # TypeScript interfaces
│   └── services/       # AuthService (signals + RxJS)
├── dashboard/          # Post-login landing (placeholder)
├── shared/forbidden/   # 403 page
├── app.component.ts    # Root component
├── app.config.ts       # Angular providers
└── app.routes.ts       # Top-level routes
```
=======
This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> origin/main-group-B
