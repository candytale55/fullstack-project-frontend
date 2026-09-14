import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { useNavigate } from 'react-router'

import Card from '../../ui/Card/Card'
import Button from '../../ui/Button/Button'
import Input from '../../ui/Input/Input'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader/Loader'
import styles from './LoginForm.module.css'

import useAuth from '../../../hooks/useAuth'



export default function LoginForm() {

  const [name, setName] = useState('')
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
  
    setIsLoading(true)
    setError(null)

    try {
      await login({ name, email, password })
      navigate('/languages')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Card>
      <form
        className={styles.form}
        onSubmit={handleSubmit}>
        
        {error &&
          <Alert variant="error">
            {error}
          </Alert>}

        <div className={styles.field}>
          <label htmlFor="name">Nombre de usuario</label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="username"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isLoading}
            required />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isLoading}
            required />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Contraseña</label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isLoading}
            required />
        </div>

        <Button
          type="submit"
          disabled={isLoading}>
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