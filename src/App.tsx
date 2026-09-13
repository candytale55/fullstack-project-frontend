import AppLayout from './components/layout/AppLayout/AppLayout.tsx'
import LoginPage from './pages/LoginPage/LoginPage.tsx'
import Button from './components/ui/Button/Button.tsx'

import  useAuth  from './hooks/useAuth.ts'

export default function App() {

  const { user, isAuthenticated, logout } = useAuth()

  return (
    <>
      <AppLayout>
        <h1>Language Learning App</h1>
        {isAuthenticated && user ? (
          <>
            <p>Welcome, {user.name}</p>
            <p>{user.email}</p>

            <Button onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <LoginPage />
        )}
      </AppLayout>
    </>
  )
}
