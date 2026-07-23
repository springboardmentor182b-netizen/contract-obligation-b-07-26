
import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ObligationTracker from "./pages/ObligationTracker";

export default function App() {
  return (
    <div className="App">
      <ObligationTracker />
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </div>
  );
}f