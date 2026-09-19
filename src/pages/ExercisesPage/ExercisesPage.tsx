import { Link, useParams } from 'react-router'

import { coursesMock } from '../../mocks/coursesMock'
import { unitsMock } from '../../mocks/unitsMock'
import { exercisesMock } from '../../mocks/exercisesMock'

import styles from './ExercisesPage.module.css'


export default function ExercisesPage() {

  const {
    languageId,
    courseId,
    unitId,
  } = useParams()

  // Find the course based on the courseId and languageId
  const course = coursesMock.find(
    (course) => course.id === courseId &&
      course.languageId === languageId
  )

  // If unitId is provided, find it based on the unitId and courseId
  const unit = unitId
    ? unitsMock.find(
      (unit) => unit.id === unitId &&
        unit.courseId === courseId
    )
    : undefined

  const exercises = exercisesMock.filter(
    (exercise) => {
      if (unitId) { // If unitId is provided, filter by courseId and unitId
        return (
          exercise.courseId === courseId &&
          exercise.unitId === unitId
        )
      } // Otherwise, filter exercises by courseId only
      return (
        exercise.courseId === courseId &&
        exercise.unitId === undefined
      )
    }).sort((a, b) => a.order - b.order) // Sort by their order within the unit or course

  console.log(exercises) // TODO: Remove this log before deploying

  if (!course) {
    return (
      <div className={styles.exercisesPage}>
        <h1>Curso no encontrado</h1>
      </div>
    )
  }

  // If a unitId is provided but the unit is not found, show an error message
  if (unitId && !unit) {
    return (
      <div className={styles.exercisesPage}>
        <h1>Unidad no encontrada</h1>
      </div>
    )
  }

  return (
    <div className={styles.exercisesPage}>

      <header className={styles.header}>
        <p>{course?.title}</p>
        {unit && <p>{unit?.title}</p>}
        <h1>Ejercicios</h1>
        <p>Selecciona un ejercicio para comenzar</p>
      </header>

      <main className={styles.exercisesPage}>
        {/* Map through the exercises and display each one as a card with a link to the exercise page */}
        {exercises.map((exercise) => {
          const exercisePath = unitId
            ? `/languages/${languageId}/courses/${courseId}/units/${unitId}/exercises/${exercise.id}`
            : `/languages/${languageId}/courses/${courseId}/exercises/${exercise.id}`

          return (
            <article
              key={exercise.id}
              className={styles.exerciseCard}
            >
              <div className={styles.exerciseInfo}>
                <h2>{exercise.title}</h2>

                {exercise.description && (
                  <p>{exercise.description}</p>
                )}

                <p>Tipo: {exercise.type}</p>

                <span className={styles.status}>
                  {exercise.status}
                </span>
              </div>

              <Link
                to={exercisePath}
                className={styles.exerciseLink}
              >
                Abrir ejercicio
              </Link>
            </article>
          )
        })}
      </main>
    </div>
  )
}