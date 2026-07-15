
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComplianceDashboard from "./pages/ComplianceDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComplianceDashboard />} />
        <Route path="/compliance" element={<ComplianceDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;