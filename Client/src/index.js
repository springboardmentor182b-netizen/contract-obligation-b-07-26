<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/global.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

// Import your Tailwind and global styles
import './index.css';
import './assets/global.css';
import './assets/dashboard.css';

const e = React.createElement;

ReactDOM.createRoot(document.getElementById('root')).render(
  e(React.StrictMode, null, e(App, null))
);
>>>>>>> 5b0fc5b9d (Fixed Tailwind setup, cleared git cache, and secured environment variables)
