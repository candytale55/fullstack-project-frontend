import AppLayout from './components/layout/AppLayout/AppLayout.tsx'
import Loader from './components/ui/Loader/Loader.tsx'

export default function App() {
  return (
    <>
      <AppLayout>
        <h1>Language Learning App</h1>

        <Loader size="large" />

      </AppLayout>
    </>
  )
}
