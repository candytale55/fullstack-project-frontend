import type { ReactNode } from 'react'
import styles from './PageContainer.module.css' 

type PageContainerProps = {
    children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps){
    return (
        <div className={styles.pageContainer}>
            <p>Page Container</p>
            {children}
        </div>
    )

}

