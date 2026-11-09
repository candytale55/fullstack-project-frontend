/*
 * src/pages/CoursesPage/CoursesPage.tsx
 *
 * Loads courses for the selected language through courseService.
 * Each course id is used to navigate to its course content.
 */

import { useCallback } from 'react'
import { Link, useParams } from 'react-router'

import { getCoursesByLanguage } from '../../services/courseService'
import useFetch from '../../hooks/useFetch'

import Alert from '../../components/ui/Alert/Alert'
import Loader from '../../components/ui/Loader/Loader'

import styles from './CoursesPage.module.css'


export default function CoursesPage() {
    const { languageId } = useParams()

    const loadCourses = useCallback(
        async () => {
            if (!languageId) {
                throw new Error('Language not found')
            }

            return getCoursesByLanguage(languageId)
        },
        [languageId]
    )

    const {
        data: courses,
        loading,
        error,
    } = useFetch(
        loadCourses,
        {
            initialData: [],
            errorMessage: 'Failed to load courses',
        }
    )


    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Alert>{error}</Alert>
    }


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
                        className={`${styles.courseCard} ${course.code === 'pt-conjugation'
                                ? styles.courseCardAvailable
                                : ''
                            }`}
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
                            to={`/languages/${languageId}/courses/${course.id}`}
                            className={styles.courseLink}
                        >
                            Ver curso
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    )
}