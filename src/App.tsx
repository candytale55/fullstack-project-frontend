/* Defines the frontend route tree and composes protected pages with the shared layout. */

import { Routes, Route } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx'
import AppLayout from './components/layout/AppLayout/AppLayout.tsx'
import DashboardPage from './pages/DashboardPage/DashboardPage.tsx'
import LoginPage from './pages/LoginPage/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx'
import LanguagesPage from './pages/LanguagesPage/LanguagePage.tsx'
import CoursesPage from './pages/CoursesPage/CoursesPage.tsx'
import CoursePage from './pages/CoursePage/CoursePage.tsx'
import UnitsPage from './pages/UnitsPage/UnitsPage.tsx'
import ExercisesPage from './pages/ExercisesPage/ExercisesPage.tsx'
import ExercisePage from './pages/ExercisePage/ExercisePage.tsx'
import ProgressPage from './pages/ProgressPage/ProgressPage.tsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx'

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
            path="/languages/:languageId/courses/:courseId"
            element={
              <ProtectedRoute>
                <CoursePage />
              </ProtectedRoute>
            } />
          <Route
            path="/languages/:languageId/courses/:courseId/units"
            element={
              <ProtectedRoute>
                <UnitsPage />
              </ProtectedRoute>
            } />
          <Route
            path="/languages/:languageId/courses/:courseId/units/:unitId/exercises"
            element={
              <ProtectedRoute>
                <ExercisesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/languages/:languageId/courses/:courseId/exercises"
            element={
              <ProtectedRoute>
                <ExercisesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/languages/:languageId/courses/:courseId/units/:unitId/exercises/:exerciseId"
            element={
              <ProtectedRoute>
                <ExercisePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/languages/:languageId/courses/:courseId/exercises/:exerciseId"
            element={
              <ProtectedRoute>
                <ExercisePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <ProgressPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/languages/:languageId/courses/:courseId/units/:unitId/exercise"
            element={
              <ProtectedRoute>
                <ExercisePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </AppLayout>
    </>
  )
}
