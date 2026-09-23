/* Loads authenticated progress and presents one summary card per course. */

import { useNavigate } from 'react-router'

import useAuth from '../../hooks/useAuth'
import useProgress from '../../hooks/useProgress'
import CourseProgressCard from '../../components/dashboard/CourseProgressCard/CourseProgressCard'
import StudyHeatmap from '../../components/dashboard/StudyHeatmap/StudyHeatmap'

import Alert from '../../components/ui/Alert/Alert'
import Button from '../../components/ui/Button/Button'
import Loader from '../../components/ui/Loader/Loader'

import styles from './DashBoardPage.module.css'

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const {
    progress,
    loading,
    error,
  } = useProgress()

  // The API returns progress ordered from most to least recently studied.
  const lastCourse = progress[0] ?? null

  // Prepares one sorted, duplicate-free list for a future StudyHeatmap.
  const studyDays = Array.from(
    new Set(
      progress.flatMap(
        (courseProgress) => courseProgress.studyDays
      )
    )
  ).sort()

  // Uses the most recent progress record because the API sorts by lastStudiedAt.
  const handleContinueStudying = () => {
    if (!lastCourse) {
      navigate('/languages')
      return
    }

    navigate(
      `/languages/${lastCourse.course.language.id}/courses/${lastCourse.course.id}`
    )
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <p>
          Bienvenid@ {user?.name}
        </p>
      </header>

      {loading && <Loader />}

      {/* Error takes precedence over the empty state after loading. */}
      {!loading && error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {!loading && !error && progress.length === 0 && (
        <section className={styles.card}>
          <Alert>
            Todavía no has realizado ninguna sesión de estudio.
          </Alert>

          <Button
            type="button"
            className={styles.continueButton}
            onClick={handleContinueStudying}
          >
            Continuar estudiando
          </Button>
        </section>
      )}

      {!loading && !error && lastCourse && (
        <div className={styles.dashboardGrid}>
          <CourseProgressCard
            progress={lastCourse}
            onContinue={handleContinueStudying}
          />

          <section className={`${styles.card} ${styles.heatmapCard}`}>
            <div>
              <h2 className={styles.heatmapTitle}>
                Actividad de estudio
              </h2>

              <p className={styles.heatmapSubtitle}>
                Últimos 4 meses
              </p>
            </div>

            <StudyHeatmap studyDays={studyDays} />

            <div className={styles.legend}>
              <span className={styles.legendItem}>
                <span
                  className={`${styles.legendSwatch} ${styles.legendSwatchStudied}`}
                  aria-hidden="true"
                />
                Día de estudio
              </span>

              <span className={styles.legendItem}>
                <span
                  className={styles.legendSwatch}
                  aria-hidden="true"
                />
                Sin actividad
              </span>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}