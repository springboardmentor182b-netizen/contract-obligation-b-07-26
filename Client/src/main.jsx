import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./styles/index.css";

import { UsersProvider } from "./context/UsersContext";
import { RolesProvider } from "./context/RolesContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <RolesProvider>
          <App />
        </RolesProvider>
      </UsersProvider>
    </BrowserRouter>
  </StrictMode>
);