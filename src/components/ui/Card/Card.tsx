import type { ReactNode } from 'react'
import type { HTMLAttributes } from 'react'
import styles from './Card.module.css'

type CardProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode
}

export default function Card({
    className = '',
    children,
    ...props
}: CardProps) {
    return (
        <div
            className={`${styles.card} ${className}`}
            {...props}>
            {children}
        </div>
    )
}
