import AppLayout from './components/layout/AppLayout/AppLayout.tsx'
import Button from './components/ui/Button/Button.tsx'
import Input from './components/ui/Input/Input.tsx'

export default function App() {
  return (
    <>
      <AppLayout>
        <h1>Language Learning App</h1>
        <p>Content</p>


        <Input
          type="email"
          placeholder="Email"
        />

        <Input
          type="password"
          placeholder="Password"
        />

        <Button>
          Login
        </Button>

      </AppLayout>
    </>
  )
}
