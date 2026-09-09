import AppLayout from './components/layout/AppLayout/AppLayout.tsx'
import Alert from './components/ui/Alert/Alert.tsx'

export default function App() {
  return (
    <>
      <AppLayout>
        <h1>Language Learning App</h1>

        <Alert variant="info">
          This is an info alert.
        </Alert>
        <Alert variant="success">
          This is a success alert.
        </Alert>
        <Alert variant="error">
          This is an error alert.
        </Alert>

      </AppLayout>
    </>
  )
}
