import { Link, useParams } from 'react-router'

import { coursesMock } from '../../../docs/notas/mocks/coursesMock'
import { unitsMock } from '../../mocks/unitsMock'

import styles from './UnitsPage.module.css'

export default function UnitsPage() {
  const { languageId, courseId } = useParams()

  const course = coursesMock.find(
    (course) =>
      course.id === courseId &&
      course.languageId === languageId
  )

  const units = unitsMock
    .filter((unit) => unit.courseId === courseId)
    .sort((a, b) => a.order - b.order)

  if (!course) {
    return (
      <div className={styles.unitsPage}>
        <h1>Curso no encontrado</h1>
      </div>
    )
  }

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
            className={styles.unitCard}
          >
            <div className={styles.unitInfo}>
              <div className={styles.unitHeader}>
                <h2>{unit.title}</h2>

                <span className={styles.status}>
                  {unit.status}
                </span>
              </div>

              {unit.description && (
                <p>{unit.description}</p>
              )}

              <p>
                {unit.exerciseCount} ejercicios
              </p>
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