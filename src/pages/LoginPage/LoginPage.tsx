import LoginForm from '../../components/auth/LoginForm/LoginForm'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <section className={styles.loginPage}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h1>Log In</h1>
            <p>Introduce tus credenciales para acceder a tu cuenta.</p>
          </header>
          <LoginForm />
        </div>
      </section>
    </div>
  )
}