/* Presents the authenticated user's overview using auth context and dashboard data. */

import Button from '../../components/ui/Button/Button'
import styles from './DashBoardPage.module.css'

import {
  activeCourseMock,
  dashboardStatsMock,
} from '../../mocks/dashboardMock'

import useAuth from '../../hooks/useAuth'
import { saveStudySession } from '../../services/progressService'

export default function DashboardPage() {
  const { user } = useAuth()


  /* ------- Test saving study session ----- */
  // Temporary test for saving study session
  // TODO: REMOVE AFTER TESTING
  

  const handleTestProgress = async () => {
    try {
      const result = await saveStudySession(
        'COURSE_ID_DE_MONGODB',
        {
          questionsAnswered: 10,
          correctAnswers: 7,
        }
      )

      console.log(
        'Progress saved:',
        result
      )

    } catch (error) {
      console.error(
        'Error saving progress:',
        error
      )
    }
  }
 /* ------------------------------------- */

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

          {/* // TODO: Remove test progress button after testing */}
          <button
            type="button"
            onClick={handleTestProgress}
          >
            Test progress
          </button>

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