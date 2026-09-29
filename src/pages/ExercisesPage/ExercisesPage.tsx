/* Lists the real exercises available for a course or one of its units. */

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import { getCourseById } from '../../services/courseService'
import {
    getExercisesByCourse,
    getExercisesByUnit,
} from '../../services/exerciseService'

import type { Course, CourseUnit } from '../../types/course'
import type { Exercise } from '../../types/exercise'

import Alert from '../../components/ui/Alert/Alert'
import Loader from '../../components/ui/Loader/Loader'

import styles from './ExercisesPage.module.css'


export default function ExercisesPage() {
    const { languageId, courseId, unitId } = useParams()
    const [course, setCourse] = useState<Course | null>(null)
    const [unit, setUnit] = useState<CourseUnit | null>(null)
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadExercises = async () => {
            if (!languageId || !courseId) {
                setError('Course not found')
                setLoading(false)
                return
            }

            try {
                const courseData = await getCourseById(courseId)

                if (courseData.languageId !== languageId) {
                    setError('Course not found')
                    return
                }

                const selectedUnit = unitId
                    ? courseData.units.find(
                        (courseUnit) => courseUnit.id === unitId
                    ) ?? null
                    : null

                if (unitId && !selectedUnit) {
                    setError('Unit not found')
                    return
                }

                const exerciseData = unitId
                    ? await getExercisesByUnit(courseId, unitId)
                    : await getExercisesByCourse(courseId)

                setCourse(courseData)
                setUnit(selectedUnit)
                setExercises(exerciseData)
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Failed to load exercises'
                )
            } finally {
                setLoading(false)
            }
        }

        loadExercises()
    }, [languageId, courseId, unitId])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Alert variant="error">{error}</Alert>
    }

    if (!course || !languageId || !courseId) {
        return <Alert variant="error">Course not found</Alert>
    }

    return (
        <div className={styles.exercisesPage}>
            <header className={styles.header}>
                <p>{course.title}</p>
                {unit && <p>{unit.title}</p>}
                <h1>Ejercicios</h1>
                <p>Selecciona un ejercicio para comenzar</p>
            </header>

            <main className={styles.exerciseList}>
                {exercises.map((exercise) => {
                    const exercisePath = unitId
                        ? `/languages/${languageId}/courses/${courseId}/units/${unitId}/exercises/${exercise.id}`
                        : `/languages/${languageId}/courses/${courseId}/exercises/${exercise.id}`

                    return (
                        <article
                            key={exercise.id}
                            className={styles.exerciseCard}
                        >
                            <div className={styles.exerciseInfo}>
                                <h2>{exercise.title}</h2>
                                {exercise.description && (
                                    <p>{exercise.description}</p>
                                )}
                                <p>Tipo: {exercise.type}</p>
                                <span className={styles.status}>
                                    {exercise.status}
                                </span>
                            </div>

                            <Link
                                to={exercisePath}
                                className={styles.exerciseLink}
                            >
                                Abrir ejercicio
                            </Link>
                        </article>
                    )
                })}
            </main>
        </div>
    )
}
