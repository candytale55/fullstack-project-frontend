import { Link, useParams } from 'react-router'

import { coursesMock } from '../../mocks/coursesMock'

import styles from './CoursesPage.module.css'

export default function CoursesPage() {
    const { languageId } = useParams()

    const courses = coursesMock.filter(
        (course) => course.languageId === languageId
    )

    return (
        <div className={styles.coursesPage}>
            <header className={styles.header}>
                <h1>Cursos</h1>
                <p>
                    Selecciona un curso para ver su contenido.
                </p>
            </header>

            <div className={styles.courseGrid}>
                {courses.map((course) => (
                    <article
                        key={course.id}
                        className={styles.courseCard}
                    >
                        <div className={styles.courseInfo}>
                            <h2>{course.title}</h2>

                            <p>
                                Nivel: {course.level}
                            </p>

                            {course.description && (
                                <p>{course.description}</p>
                            )}

                            <p>
                                {course.contentCount}{' '}
                                {course.structure === 'units'
                                    ? 'unidades'
                                    : 'ejercicios'}
                            </p>
                        </div>

                        <Link
                            to={`/languages/${languageId}/courses/${course.id}`}>
                            Ver curso
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    )
}