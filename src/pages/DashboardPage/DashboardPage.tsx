/* Loads authenticated progress and presents one summary card per course. */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import useAuth from '../../hooks/useAuth'
import { getMyProgress } from '../../services/progressService'
import type { CourseProgress } from '../../types/progress'

import Alert from '../../components/ui/Alert/Alert'
import Button from '../../components/ui/Button/Button'
import Loader from '../../components/ui/Loader/Loader'

import styles from './DashBoardPage.module.css'

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [progress, setProgress] =
    useState<CourseProgress[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  // Uses the most recent progress record because the API sorts by lastStudiedAt.
  const handleContinueStudying = () => {
    const activeProgress = progress[0]

    if (!activeProgress) {
      navigate('/languages')
      return
    }

    navigate(
      `/languages/${activeProgress.course.language.id}/courses/${activeProgress.course.id}`
    )
  }

  /* --------------- Load progress --------------- */

  // Loads progress once and keeps request failures in the page state.
  useEffect(() => {
    // Separates the async request from the effect lifecycle.
    const loadProgress = async () => {
      try {
        const data = await getMyProgress()
        setProgress(data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'No se pudo cargar el progreso'
        )
      } finally {
        setLoading(false)
      }
    }

    loadProgress()
  }, [])

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

      {!loading && !error && progress.length > 0 && (
        <div className={styles.dashboardGrid}>
          {progress.map((courseProgress, index) => {
            // Avoids invalid percentages when no questions were answered.
            const precision =
              courseProgress.questionsAnswered === 0
                ? 0
                : courseProgress.correctAnswers /
                courseProgress.questionsAnswered * 100

            // Backend dates arrive as strings and may be absent for new records.
            const lastActivity =
              courseProgress.lastStudiedAt
                ? new Date(
                  courseProgress.lastStudiedAt
                ).toLocaleDateString('es-ES')
                : 'Sin actividad'

            return (
              <section
                className={styles.card}
                key={courseProgress.id}
              >
                <h2>
                  {courseProgress.course.language.name}
                </h2>

                <div className={styles.courseInfo}>
                  <h3>{courseProgress.course.title}</h3>
                  <p>Nivel: {courseProgress.course.level}</p>
                </div>

                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <strong>
                      {courseProgress.completedSessions}
                    </strong>
                    <span>Sesiones</span>
                  </div>

                  <div className={styles.stat}>
                    <strong>
                      {courseProgress.questionsAnswered}
                    </strong>
                    <span>Preguntas respondidas</span>
                  </div>

                  <div className={styles.stat}>
                    <strong>
                      {courseProgress.correctAnswers}
                    </strong>
                    <span>Respuestas correctas</span>
                  </div>

                  <div className={styles.stat}>
                    <strong>{precision.toFixed(0)}%</strong>
                    <span>Precisión</span>
                  </div>
                </div>

                <p>
                  Última actividad: {lastActivity}
                </p>

                {index === 0 && (
                  <Button
                    type="button"
                    className={styles.continueButton}
                    onClick={handleContinueStudying}
                  >
                    Continuar estudiando
                  </Button>
                )}
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}