// Esqueleto General  
import type { ReactNode } from 'react'
import PageContainer from '../PageContainer/PageContainer.tsx'
import NavBar from '../NavBar/NavBar.tsx'
import styles from './AppLayout.module.css'



type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
      <div className={styles.layout}>
        <NavBar />
        <main className={styles.main}>
          <PageContainer>
            {children}
          </PageContainer>
        </main>
      </div>
  )
}