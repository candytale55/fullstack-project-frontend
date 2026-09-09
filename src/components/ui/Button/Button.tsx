import type { ReactNode } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...props}>
      {children}
    </button>
  )
}


