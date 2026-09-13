import { Routes, Route } from 'react-router'
import AppLayout from './components/layout/AppLayout/AppLayout.tsx'
import DashboardPage from './pages/DashboardPage/DashboardPage.tsx'
import LoginPage from './pages/LoginPage/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx'

export default function App() {

  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </AppLayout>
    </>
  )
}
