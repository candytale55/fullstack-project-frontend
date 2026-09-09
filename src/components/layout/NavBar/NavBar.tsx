import type { ReactNode } from 'react'
import styles from './NavBar.module.css'

type NavBarProps = {
    children: ReactNode;
}

/* //TODO: BRAND - Cambiar nombre */
export default function NavBar({ children }: NavBarProps){
    return (
        <header className={styles.navbar}>
            <div className={styles.content}>
                <span className={styles.brand}>NavBar</span>
                {children}
            </div>
        </header>
    
       
    )
}