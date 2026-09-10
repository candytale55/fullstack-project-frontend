import AppLayout from './components/layout/AppLayout/AppLayout.tsx'
import LoginForm from './components/auth/LoginForm/LoginForm.tsx'

export default function App() {
  return (
    <>
      <AppLayout>
        <h1>Language Learning App</h1>

        <LoginForm />

      </AppLayout>
    </>
  )
}
