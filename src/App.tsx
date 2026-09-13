import { Routes, Route } from 'react-router'
import AppLayout from './components/layout/AppLayout/AppLayout.tsx'
import DashboardPage from './pages/DashboardPage/DashboardPage.tsx'
import LoginPage from './pages/LoginPage/LoginPage.tsx'

export default function App() {

  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </AppLayout>
    </>
  )
}
