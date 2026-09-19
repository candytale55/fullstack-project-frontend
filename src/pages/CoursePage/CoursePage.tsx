/*
 * src/pages/CoursePage/CoursePage.tsx
 *
 * Loads the selected course through courseService.
 * The course structure determines whether navigation continues to units or exercises.
 */

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import { getCourseById } from '../../services/courseService'
import type { Course } from '../../types/course'

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


  const contentPath =
    course.structure === 'units'
      ? `/languages/${languageId}/courses/${courseId}/units`
      : `/languages/${languageId}/courses/${courseId}/exercises`


  return (
    <div className={styles.coursePage}>
      <header className={styles.header}>
        <p>{course.level}</p>

        <h1>{course.title}</h1>

        {course.description && (
          <p>{course.description}</p>
        )}
      </header>

      <section className={styles.content}>
        <h2>Contenido del curso</h2>

        <p>
          {course.contentCount}{' '}
          {course.structure === 'units'
            ? 'unidades'
            : 'ejercicios'}
        </p>

        <Link
          to={contentPath}
          className={styles.contentLink}
        >
          {course.structure === 'units'
            ? 'Ver unidades'
            : 'Ver ejercicios'}
        </Link>
      </section>
    </div>
  )
}