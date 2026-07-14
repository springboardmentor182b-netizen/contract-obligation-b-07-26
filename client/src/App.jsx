import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ContractRepository from './components/ContractRepository'
import Dashboard from './components/Dashboard'
import Login from './components/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContractRepository />} />
        <Route path="/contracts" element={<ContractRepository />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
