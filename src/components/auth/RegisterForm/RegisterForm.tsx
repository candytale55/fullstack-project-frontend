/*
 * components/auth/RegisterForm/RegisterForm.tsx
 *
 * RegisterForm -> useAuth().register() -> AuthProvider -> authService -> backend.
 * Registration only creates the account; on success the user is redirected
 * to LoginPage to start an authenticated session separately.
 */

import {
    useState,
    type SubmitEvent,
} from 'react'

import { useNavigate } from 'react-router'

import Button from '../../ui/Button/Button'
import Input from '../../ui/Input/Input'
import Card from '../../ui/Card/Card'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader/Loader'

import useAuth from '../../../hooks/useAuth'

import styles from './RegisterForm.module.css'


export default function RegisterForm() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { register } = useAuth()
    const navigate = useNavigate()


    // Submits the account data, then sends the new user to login for a separate session.
    const handleSubmit = async (
        event: SubmitEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        // Reset the previous result before starting a new request.
        setIsLoading(true)
        setError(null)

        try {
            await register({
                name,
                email,
                password,
            })

            navigate('/login')

        } catch (error) {
            // Convert API errors into displayable text.
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('An unexpected error occurred')
            }

        } finally {
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
                    <label htmlFor="name">
                        Nombre de usuario
                    </label>

                    <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="username"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        disabled={isLoading}
                        required
                    />
                </div>

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
                        autoComplete="new-password"
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
                        'Registrarse'
                    )}
                </Button>
            </form>
        </Card>
    )
}