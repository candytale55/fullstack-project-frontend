import { Link } from 'react-router'

import useAuth from '../../hooks/useAuth'

import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
    const { isAuthenticated } = useAuth()

    const destination = isAuthenticated
        ? '/dashboard'
        : '/login'

    return (
        <div className={styles.notFoundPage}>
            <p className={styles.code}>404</p>

            <h1>Página no encontrada</h1>

            <p>
                La página que buscas no existe o no está disponible.
            </p>

            <Link
                to={destination}
                className={styles.homeLink}
            >
                Volver
            </Link>
        </div>
    )

    /* //TODO: Navbar debe cambiar dependiendo de si el usuario está autenticado o no - ahora mismo siempre muestra Login y Registrarse */
}