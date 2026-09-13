import { NavLink } from 'react-router'

import Button from '../../ui/Button/Button'
import  useAuth  from '../../../hooks/useAuth'

import styles from './Navbar.module.css'

export default function Navbar() {
    const {
        user,
        isAuthenticated,
        logout,
    } = useAuth()

    return (
        <header className={styles.navbar}>
            <div className={styles.content}>
                <NavLink
                    to="/"
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
                                onClick={logout}>
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