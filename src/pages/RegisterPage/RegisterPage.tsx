import RegisterForm from '../../components/auth/RegisterForm/RegisterForm'
import styles from './RegisterPage.module.css'

export default function RegisterPage() {
    return (
        <section className={styles.registerPage}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <h1>Crear una cuenta</h1>
                    <p>Regístrate para acceder al contenido.</p>
                </header>
                <RegisterForm />
            </div>
        </section>
    )
}
