import type { HTMLAttributes } from 'react'
import styles from './Loader.module.css'

type LoaderProps = HTMLAttributes<HTMLDivElement> & {
    size?: 'small' | 'medium' | 'large'
}

export default function Loader({
    className = '',
    size = 'medium',
    ...props
}: LoaderProps) {
    return (
        <div
            className={`${styles.loader} ${styles[size]} ${className}`}
            role="status"
            aria-label="Loading"
            {...props}>
        </div>
    )
}