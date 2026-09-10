import AppLayout from './components/layout/AppLayout/AppLayout.tsx'
import LoginPage from './pages/LoginPage/LoginPage.tsx'

export default function App() {
  return (
    <>
      <AppLayout>
        <h1>Language Learning App</h1>

        <LoginPage />

      </AppLayout>
    </>
  )
}
