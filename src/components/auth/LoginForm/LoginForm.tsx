import type { SubmitEvent } from 'react'
import { useState } from 'react'
import Card from '../../ui/Card/Card'
import Button from '../../ui/Button/Button'
import Input from '../../ui/Input/Input'
import styles from './LoginForm.module.css'


export default function LoginForm() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => { 
    event.preventDefault()
    console.log({ name, email, password }) // TODO: Remove this line before deploying
  }
  return (
    <Card>
      <form
        className={styles.form}
        onSubmit={handleSubmit}>

        <div className={styles.field}>
          <label htmlFor="name">Nombre de usuario</label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>

        <Button type="submit">Iniciar sesión</Button>
      </form>
    </Card>
  )
}