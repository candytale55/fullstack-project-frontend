/* Lists real course or unit exercises and builds links consumed by ExercisePage. */

import { useCallback } from 'react'
import { Link, useParams } from 'react-router'

import {
  getExercisesByCourse,
  getExercisesByUnit,
} from '../../services/exerciseService'
import { getCourseById } from '../../services/courseService'
import useFetch from '../../hooks/useFetch'

import Alert from '../../components/ui/Alert/Alert'
import Loader from '../../components/ui/Loader/Loader'

import styles from './ExercisesPage.module.css'


export default function ExercisesPage() {

  const {
    languageId,
    courseId,
    unitId,
  } = useParams()

  const loadExercises = useCallback(
    async () => {
      if (!languageId || !courseId) {
        throw new Error('Curso no encontrado')
      }

      const course = await getCourseById(courseId)

      if (course.languageId !== languageId) {
        throw new Error('Curso no encontrado')
      }

      const unit = unitId
        ? course.units.find((item) => item.id === unitId)
        : undefined

      if (unitId && !unit) {
        throw new Error('Unidad no encontrada')
      }

      const exercises = unitId
        ? await getExercisesByUnit(courseId, unitId)
        : await getExercisesByCourse(courseId)

      return {
        course,
        unit,
        exercises,
      }
    },
    [courseId, languageId, unitId]
  )

  const {
    data,
    loading,
    error,
  } = useFetch(
    loadExercises,
    {
      initialData: null,
      errorMessage: 'No se pudieron cargar los ejercicios',
    }
  )

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Alert>{error}</Alert>
  }

  if (!data || !courseId || !languageId) {
    return (
      <div className={styles.exercisesPage}>
        <h1>Curso no encontrado</h1>
      </div>
    )
  }

  return (
    <div className={styles.exercisesPage}>

      <header className={styles.header}>
        <p>{data.course.title}</p>
        {data.unit && <p>{data.unit.title}</p>}
        <h1>Ejercicios</h1>
        <p>Selecciona un ejercicio para comenzar</p>
      </header>

      <main className={styles.exercisesPage}>
        {data.exercises.map((exercise) => {
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
        {data.exercises.length === 0 && (
          <p>No hay ejercicios disponibles.</p>
        )}
      </main>
    </div>
  )
}