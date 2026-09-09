import type { ReactNode } from 'react'
import type { HTMLAttributes } from 'react'
import styles from './Alert.module.css'

type AlertProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode
    variant?: 'info' | 'success' | 'error'
}

export default function Alert({
    className = '',
    children,
    variant = 'info',
    ...props
}: AlertProps) {
    return (
        <div
            className={`${styles.alert} ${styles[variant]} ${className}`}
            role="alert"
            {...props}>
            {children}
        </div>
    )
}