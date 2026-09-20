/*
 * src/pages/UnitsPage/UnitsPage.tsx
 *
 * Loads the selected course and its embedded units through courseService.
 * Units are retrieved from the backend using the course id.
 */

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import {
  getCourseById,
  getCourseUnits,
} from '../../services/courseService'

import type {
  Course,
  CourseUnit,
} from '../../types/course'

import Alert from '../../components/ui/Alert/Alert'
import Loader from '../../components/ui/Loader/Loader'
import styles from './UnitsPage.module.css'


export default function UnitsPage() {
  const {
    languageId,
    courseId,
  } = useParams()

  const [course, setCourse] =
    useState<Course | null>(null)

  const [units, setUnits] =
    useState<CourseUnit[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  useEffect(() => {
    const loadUnits = async () => {
      if (!languageId || !courseId) {
        setError('Course not found')
        setLoading(false)
        return
      }

      try {
        const [
          courseData,
          unitsData,
        ] = await Promise.all([
          getCourseById(courseId),
          getCourseUnits(courseId),
        ])

        if (courseData.languageId !== languageId) {
          setError('Course not found')
          return
        }

        setCourse(courseData)
        setUnits(unitsData)

      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load units'
        )

      } finally {
        setLoading(false)
      }
    }

    loadUnits()
  }, [languageId, courseId])


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
        {units.map((unit) => (
          <article
            key={unit.id}
            className={`${styles.unitCard} ${course.code === 'pt-conjugation' &&
                availableExerciseUnits.has(unit.code)
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
              to={`/languages/${languageId}/courses/${courseId}/units/${unit.id}/exercises`}
              className={styles.exerciseLink}
            >
              Ver ejercicios
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}