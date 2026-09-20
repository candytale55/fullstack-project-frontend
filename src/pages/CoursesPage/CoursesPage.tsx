/*
 * src/pages/CoursesPage/CoursesPage.tsx
 *
 * Loads courses for the selected language through courseService.
 * Each course id is used to navigate to its course content.
 */

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import { getCoursesByLanguage } from '../../services/courseService'
import type { Course } from '../../types/course'

import Alert from '../../components/ui/Alert/Alert'
import Loader from '../../components/ui/Loader/Loader'

import styles from './CoursesPage.module.css'


export default function CoursesPage() {
    const { languageId } = useParams()

    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(() => {
        const loadCourses = async () => {
            if (!languageId) {
                setError('Language not found')
                setLoading(false)
                return
            }

            try {
                const data =
                    await getCoursesByLanguage(languageId)

                setCourses(data)
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Failed to load courses'
                )
            } finally {
                setLoading(false)
            }
        }

        loadCourses()
    }, [languageId])


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