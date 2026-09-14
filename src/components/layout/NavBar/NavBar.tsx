import { NavLink, useNavigate } from 'react-router'

import Button from '../../ui/Button/Button'
import  useAuth  from '../../../hooks/useAuth'

import styles from './NavBar.module.css'

export default function NavBar() {

    // Get state and actions from the authentication context.
    const {
        user,
        isAuthenticated,
        logout,
    } = useAuth()

    const navigate = useNavigate()

    // Redirect the user to the login page after logging out.
    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <header className={styles.navbar}>
            <div className={styles.content}>
                <NavLink
                    to={isAuthenticated ? '/dashboard' : '/login'}
                    className={styles.brand}>
                    Language Learning
                </NavLink>

                <nav className={styles.navigation}>
                    {isAuthenticated ? (
                        <>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.link} ${styles.active}`
                                        : styles.link
                                }>
                                Dashboard
                            </NavLink>

                            <span
                                className={styles.user}>
                                {user?.name}
                            </span>

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={ handleLogout }>
                                Log out
                            </Button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.link} ${styles.active}`
                                        : styles.link
                                }>
                                Log in
                            </NavLink>

                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.link} ${styles.active}`
                                        : styles.link
                                }>
                                Register
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}