import { Auth } from './features/authentication/Auth'
import { Dashboard } from './pages/Dashboard'
import { useState } from 'react'
import './App.css'

function App() {
  const [session, setSession] = useState(() => {
    const token = window.localStorage.getItem('contractiq_token')
    const role = window.localStorage.getItem('contractiq_role')
    return token ? { token, role } : null
  })

  function handleLogout() {
    window.localStorage.removeItem('contractiq_token')
    window.localStorage.removeItem('contractiq_role')
    setSession(null)
  }

  if (session) {
    return <Dashboard userRole={session.role} onLogout={handleLogout} />
  }

  return <Auth onLogin={setSession} />
}

export default App
