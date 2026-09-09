
import styles from './NavBar.module.css'


/* //TODO: BRAND - Cambiar nombre */
export default function NavBar(){
    return (
        <header className={styles.navbar}>
            <div className={styles.content}>
                <span className={styles.brand}>NavBar</span>
            </div>
        </header>
    
       
    )
}