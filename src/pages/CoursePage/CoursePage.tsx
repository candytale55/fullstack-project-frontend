import { Link, useParams } from 'react-router'
import styles from './CoursePage.module.css'

import { coursesMock } from '../../../docs/notas/mocks/coursesMock.ts'

export default function CoursePage() {

  const { languageId, courseId } = useParams()

  const course = coursesMock.find(
    (course) =>
      course.id === courseId &&
      course.languageId === languageId)

  if (!course) {
    return (
      <div className={styles.coursePage}>
        <h1>Curso no encontrado</h1>
      </div>)
  }

  const contentPath = course.structure === 'units'
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
        <p>{course.contentCount}{' '}
          {course.structure === 'units'
            ? 'unidades'
            : 'ejercicios'}</p>
        <Link
          to={contentPath}
          className={styles.contentLink}>
          {course.structure === 'units'
            ? 'Ver unidades'
            : 'Ver ejercicios'}
        </Link>
      </section>
    </div>
  )
}