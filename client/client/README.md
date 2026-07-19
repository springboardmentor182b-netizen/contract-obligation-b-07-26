# ContractIQ - Frontend

This is the React frontend for the ContractIQ application.

## Features

- User Authentication (Login/Signup)
- Role-Based Access Control
- Dashboard with Analytics
- Profile Management
- Responsive Design

## Tech Stack

- React 18
- React Router DOM v6
- Axios
- CSS3

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the client directory:
```
REACT_APP_API_URL=http://localhost:8000/api
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Folder Structure

```
client/
├── public/
├── src/
│   ├── assets/            # Global styles and images
│   ├── components/        # Reusable components
│   │   ├── Form/          # Form components
│   │   ├── Buttons/       # Button components
│   │   ├── Modals/        # Modal components
│   │   └── context/       # React context providers
│   ├── data/              # Static data and constants
│   ├── features/          # Feature-based modules
│   │   └── authentication/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── services/
│   ├── hooks/             # Custom hooks
│   ├── layout/            # Layout components
│   ├── pages/             # Page components
│   ├── utils/             # Utility functions
│   ├── App.js
│   └── index.js
└── package.json
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner

## Roles

The application supports the following roles:
- Administrator
- Legal Manager
- Compliance Officer
- Contract Manager
- Department Head
- Employee
