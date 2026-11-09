/*
 * src/pages/UnitsPage/UnitsPage.tsx
 *
 * Loads the selected course and its embedded units through courseService.
 * Units are retrieved from the backend using the course id.
 */

import { useCallback } from 'react'
import { Link, useParams } from 'react-router'

import {
  getCourseById,
} from '../../services/courseService'

import useFetch from '../../hooks/useFetch'

import Alert from '../../components/ui/Alert/Alert'
import Loader from '../../components/ui/Loader/Loader'
import styles from './UnitsPage.module.css'


export default function UnitsPage() {
  const {
    languageId,
    courseId,
  } = useParams()

  const loadCourse = useCallback(
    async () => {
      if (!languageId || !courseId) {
        throw new Error('Course not found')
      }

      const courseData =
        await getCourseById(courseId)

      if (courseData.languageId !== languageId) {
        throw new Error('Course not found')
      }

      return courseData
    },
    [courseId, languageId]
  )

  const {
    data: course,
    loading,
    error,
  } = useFetch(
    loadCourse,
    {
      initialData: null,
      errorMessage: 'Failed to load units',
    }
  )

  const units = course
    ? [...course.units].sort(
      (firstUnit, secondUnit) =>
        firstUnit.order - secondUnit.order
    )
    : []


  if (loading) {
    return <Loader />
  }


  if (error) {
    return (
      <Alert variant="error">
        {error}
      </Alert>
    )
  }


  if (!course || !languageId || !courseId) {
    return (
      <div className={styles.unitsPage}>
        <h1>Curso no encontrado</h1>
      </div>
    )
  }

  const availableExerciseUnits = new Set([
    'present',
    'imperfect',
    'imperative',
  ])


  return (
    <div className={styles.unitsPage}>
      <header className={styles.header}>
        <p>{course.title}</p>

        <h1>Unidades</h1>

        <p>
          Selecciona una unidad para ver sus ejercicios.
        </p>
      </header>

      <div className={styles.unitList}>
        {units.map((unit) => {
          const hasExercises =
            course.code === 'pt-conjugation' &&
            availableExerciseUnits.has(unit.code)

          const unitPath = hasExercises
            ? `/languages/${languageId}/courses/${courseId}/units/${unit.id}/exercise`
            : `/languages/${languageId}/courses/${courseId}/units/${unit.id}/exercises`

          return (
            <article
              key={unit.id}
              className={`${styles.unitCard} ${hasExercises
                ? styles.unitCardAvailable
                : ''
                }`}
            >
              <div className={styles.unitInfo}>
                <h2>{unit.title}</h2>

                {unit.description && (
                  <p>{unit.description}</p>
                )}
              </div>

              <Link
                to={unitPath}
                className={styles.exerciseLink}
              >
                Ver ejercicios
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}