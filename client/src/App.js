import React from 'react'

import Home from './pages/Home'
import "./App.css";
import{
ToastContainer
}
from"react-toastify";
import"react-toastify/dist/ReactToastify.css";
import ObligationTracker from "./pages/ObligationTracker";

function App() {
  return (
    <div className="App">
      <ObligationTracker />
<ToastContainer
position="top-right"
autoClose={3000}
/>
    </div>
  );
}

export default App;
export default function App() {
  return React.createElement(Home)
}
import "./App.css";

import ComplianceDashboard from "./pages/ComplianceDashboard";

function App() {

return (

<div>

<ComplianceDashboard/>

</div>

);

}

export default App;
