import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import './assets/global.css'
import ReactDOM from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
createRoot(document.getElementById('root')).render(React.createElement(App))

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
