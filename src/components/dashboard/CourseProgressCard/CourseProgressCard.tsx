/* Presents one normalized course progress record for DashboardPage. */

import Button from '../../ui/Button/Button'
import type { CourseProgress } from '../../../types/progress'

import styles from './CourseProgressCard.module.css'


type CourseProgressCardProps = {
  progress: CourseProgress
  onContinue?: () => void
}


export default function CourseProgressCard({
  progress,
  onContinue,
}: CourseProgressCardProps) {
  // Avoids invalid percentages when no questions were answered.
  const precision =
    progress.questionsAnswered === 0
      ? 0
      : progress.correctAnswers /
        progress.questionsAnswered * 100

  // Backend dates arrive as strings and may be absent for new records.
  const lastActivity =
    progress.lastStudiedAt
      ? new Date(
        progress.lastStudiedAt
      ).toLocaleDateString('es-ES')
      : 'Sin actividad'

  return (
    <section className={styles.card}>
      <h2>{progress.course.language.name}</h2>

      <div className={styles.courseInfo}>
        <h3>{progress.course.title}</h3>
        <p>Nivel: {progress.course.level}</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <strong>{progress.completedSessions}</strong>
          <span>Sesiones</span>
        </div>

        <div className={styles.stat}>
          <strong>{progress.questionsAnswered}</strong>
          <span>Preguntas respondidas</span>
        </div>

        <div className={styles.stat}>
          <strong>{progress.correctAnswers}</strong>
          <span>Respuestas correctas</span>
        </div>

        <div className={styles.stat}>
          <strong>{precision.toFixed(0)}%</strong>
          <span>Precisión</span>
        </div>
      </div>

      <p>Última actividad: {lastActivity}</p>

      {onContinue && (
        <Button
          type="button"
          className={styles.continueButton}
          onClick={onContinue}
        >
          Continuar estudiando
        </Button>
      )}
    </section>
  )
}
