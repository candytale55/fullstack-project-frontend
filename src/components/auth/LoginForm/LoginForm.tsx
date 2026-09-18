/*
 * components/auth/LoginForm/LoginForm.tsx
 *
 * LoginForm -> useAuth().login() -> AuthProvider -> authService -> backend.
 * A successful login stores the session through AuthProvider and then
 * redirects the authenticated user to the application content.
 */

import {
  useState,
  type SubmitEvent,
} from 'react'

import { useNavigate } from 'react-router'

import Card from '../../ui/Card/Card'
import Button from '../../ui/Button/Button'
import Input from '../../ui/Input/Input'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader/Loader'

import useAuth from '../../../hooks/useAuth'

import styles from './LoginForm.module.css'


export default function LoginForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { login } = useAuth()
  const navigate = useNavigate()


  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    // Lock the form and clear feedback while the auth request is in progress.
    setIsLoading(true)
    setError(null)

    try {
      // AuthProvider owns session persistence; navigation only happens after login succeeds.
      await login({
        email,
        password,
      })

      navigate('/languages')

    } catch (error) {
      // Convert errors into displayable feedback.
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred')
      }

    } finally {
      // Re-enable the form whether auth succeeds or fails.
      setIsLoading(false)
    }
  }


  return (
    <Card>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        {error && (
          <Alert variant="error">
            {error}
          </Alert>
        )}

        <div className={styles.field}>
          <label htmlFor="email">
            Email
          </label>

          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            disabled={isLoading}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">
            Contraseña
          </label>

          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            disabled={isLoading}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader size="small" />
          ) : (
            'Iniciar sesión'
          )}
        </Button>
      </form>
    </Card>
  )
}