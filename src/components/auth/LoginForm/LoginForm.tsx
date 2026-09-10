import Card from '../../ui/Card/Card'
import Button from '../../ui/Button/Button'
import Input from '../../ui/Input/Input'
import styles from './LoginForm.module.css'


export default function LoginForm() {
  return (
    <Card>
      <form className={styles.form}>

        <div className={styles.field}>
          <label htmlFor="name">Nombre de usuario</label>
          <Input
            required />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Contraseña</label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required />
        </div>

        <Button type="submit">Iniciar sesión</Button>
      </form>
    </Card>
  )
}