/* Presents the authenticated user's overview using auth context and dashboard data. */

import Button from '../../components/ui/Button/Button'
import styles from './DashBoardPage.module.css'

import {
  activeCourseMock,
  dashboardStatsMock,
} from '../../mocks/dashboardMock'

import useAuth from '../../hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <p>
          Bienvenid@ {user?.name}
        </p>
      </header>

      <div className={styles.dashboardGrid}>
        <section className={styles.card}>
          <h2>Curso activo</h2>

          <div className={styles.courseInfo}>
            <h3>{activeCourseMock.title}</h3>
            <p>Nivel: {activeCourseMock.level}</p>
          </div>

          <div className={styles.progressInfo}>
            <p>
              Progreso: {activeCourseMock.progress}%
            </p>

            <p>
              {activeCourseMock.completedUnits} de{' '}
              {activeCourseMock.totalUnits} unidades completadas
            </p>
          </div>

          <Button
            type="button"
            className={styles.continueButton}
          >
            Continuar estudiando
          </Button>
        </section>

        <section className={styles.card}>
          <h2>Tu progreso</h2>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <strong>
                {dashboardStatsMock.completedExercises}
              </strong>

              <span>
                Ejercicios completados
              </span>
            </div>

            <div className={styles.stat}>
              <strong>
                {dashboardStatsMock.studyStreak}
              </strong>

              <span>
                Días de racha
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}