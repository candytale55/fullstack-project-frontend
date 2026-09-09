import AppLayout from './components/layout/AppLayout/AppLayout.tsx'
import Button from './components/ui/Button/Button.tsx'

export default function App() {
  return (
    <>
      <AppLayout>
        <h1>Language Learning App</h1>
        <p>Content</p>


        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button disabled>Disabled</Button>

      </AppLayout>
    </>
  )
}
