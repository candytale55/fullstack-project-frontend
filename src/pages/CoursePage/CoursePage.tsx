/*
 * src/pages/CoursePage/CoursePage.tsx
 *
 * Loads the selected course through courseService.
 * The course structure determines whether navigation continues to units or exercises.
 */

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import { getCourseById } from '../../services/courseService'
import {
  getExercisesByCourse,
  getExercisesByUnit,
} from '../../services/exerciseService'
import type { Course } from '../../types/course'
import type { Exercise } from '../../types/exercise'

import Alert from '../../components/ui/Alert/Alert'
import Loader from '../../components/ui/Loader/Loader'

import styles from './CoursePage.module.css'


export default function CoursePage() {
  const {
    languageId,
    courseId,
  } = useParams()

  const [course, setCourse] =
    useState<Course | null>(null)

  const [exercises, setExercises] =
    useState<Exercise[]>([])

  const [unitExercises, setUnitExercises] =
    useState<Record<string, Exercise[]>>({})

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  useEffect(() => {
    const loadCourse = async () => {
      if (!courseId) {
        setError('Course not found')
        setLoading(false)
        return
      }

      try {
        const data = await getCourseById(courseId)
        setCourse(data)

        // Courses without embedded units list their exercises here directly.
        if (data.structure === 'exercises') {
          setExercises(
            await getExercisesByCourse(courseId)
          )
        } else {
          const exerciseEntries = await Promise.all(
            data.units.map(async (unit) => [
              unit.id,
              await getExercisesByUnit(courseId, unit.id),
            ] as const)
          )

          setUnitExercises(
            Object.fromEntries(exerciseEntries)
          )
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load course'
        )
      } finally {
        setLoading(false)
      }
    }

    loadCourse()
  }, [courseId])


  if (loading) {
    return <Loader />
  }


  if (error) {
    return <Alert>{error}</Alert>
  }


  if (!course || !languageId || !courseId) {
    return (
      <div className={styles.coursePage}>
        <h1>Curso no encontrado</h1>
      </div>
    )
  }

  const visibleUnits = course.units.filter(
    (unit) => (unitExercises[unit.id] ?? []).length > 0
  )


  return (
    <div className={styles.coursePage}>
      <header className={styles.header}>
        <p>{course.level}</p>

        <h1>{course.title}</h1>

        {course.description && (
          <p>{course.description}</p>
        )}
      </header>

      {course.structure === 'units' ? (
        <section className={styles.contentSection}>
          <h2>Unidades</h2>

          <div className={styles.itemList}>
            {visibleUnits.map((unit) => {
              const exercises = unitExercises[unit.id] ?? []
              const onlyExercise = exercises.length === 1
              const destination = onlyExercise
                ? `/languages/${languageId}/courses/${courseId}/units/${unit.id}/exercises/${exercises[0].id}`
                : `/languages/${languageId}/courses/${courseId}/units/${unit.id}/exercises`

              return (
                <article
                  key={unit.id}
                  className={styles.itemCard}
                >
                  <div>
                    <h3>{unit.title}</h3>
                    {unit.description && (
                      <p>{unit.description}</p>
                    )}
                  </div>

                  <Link
                    to={destination}
                    className={styles.contentLink}
                  >
                    {onlyExercise
                      ? 'Comenzar ejercicio'
                      : 'Ver ejercicios'}
                  </Link>
                </article>
              )
            })}
          </div>

          {visibleUnits.length === 0 && (
            <p>No hay unidades disponibles todavía.</p>
          )}
        </section>
      ) : (
        <section className={styles.contentSection}>
          <h2>Ejercicios</h2>

          <div className={styles.itemList}>
            {exercises.map((exercise) => (
              <article
                key={exercise.id}
                className={styles.itemCard}
              >
                <div>
                  <h3>{exercise.title}</h3>
                  {exercise.description && (
                    <p>{exercise.description}</p>
                  )}
                  <p>Tipo: {exercise.type}</p>
                </div>

                <Link
                  to={`/languages/${languageId}/courses/${courseId}/exercises/${exercise.id}`}
                  className={styles.contentLink}
                >
                  Abrir ejercicio
                </Link>
              </article>
            ))}
          </div>

          {exercises.length === 0 && (
            <p>No hay ejercicios disponibles todavía.</p>
          )}
        </section>
      )}
    </div>
  )
}