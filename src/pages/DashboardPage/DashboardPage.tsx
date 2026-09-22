/* Loads authenticated progress and presents one summary card per course. */

import { useNavigate } from 'react-router'

import useAuth from '../../hooks/useAuth'
import useProgress from '../../hooks/useProgress'
import CourseProgressCard from '../../components/dashboard/CourseProgressCard/CourseProgressCard'

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
          {progress.map((courseProgress) => (
            <CourseProgressCard
              key={courseProgress.id}
              progress={courseProgress}
              onContinue={
                courseProgress.id === progress[0].id
                  ? handleContinueStudying
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}