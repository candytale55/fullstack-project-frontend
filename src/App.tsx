import { Routes, Route } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx'
import AppLayout from './components/layout/AppLayout/AppLayout.tsx'
import DashboardPage from './pages/DashboardPage/DashboardPage.tsx'
import LoginPage from './pages/LoginPage/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx'
import LanguagesPage from './pages/LanguagesPage/LanguagePage.tsx'
import CoursesPage from './pages/CoursesPage/CoursesPage.tsx'
import CoursePage from './pages/CoursePage/CoursePage.tsx'

export default function App() {

  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/languages" element={
            <ProtectedRoute>
              <LanguagesPage />
            </ProtectedRoute>
          } />
          <Route
            path="/languages/:languageId/courses"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            } />
          <Route
            path="/languages/:languageId/courses/"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            } />
          <Route
            path="/languages/:languageId/courses/:courseId"
            element={
              <ProtectedRoute>
                <CoursePage />
              </ProtectedRoute>
            }/>
          
        </Routes>
      </AppLayout>
    </>
  )
}
