/*
 * src/pages/CoursePage/CoursePage.tsx
 *
 * Loads the selected course through courseService.
 * The course structure determines whether navigation continues to units or exercises.
 */

import { useCallback } from 'react'
import { Link, useParams } from 'react-router'

import { getCourseById } from '../../services/courseService'
import useFetch from '../../hooks/useFetch'

import Alert from '../../components/ui/Alert/Alert'
import Loader from '../../components/ui/Loader/Loader'

import styles from './CoursePage.module.css'


export default function CoursePage() {
  const {
    languageId,
    courseId,
  } = useParams()

  const loadCourse = useCallback(
    async () => {
      if (!languageId || !courseId) {
        throw new Error('Course not found')
      }

      const course =
        await getCourseById(courseId)

      if (course.languageId !== languageId) {
        throw new Error('Course not found')
      }

      return course
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
      errorMessage: 'Failed to load course',
    }
  )


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

      <section
        className={`${styles.content} ${course.code === 'pt-conjugation'
            ? styles.contentAvailable
            : ''
          }`}
      >
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