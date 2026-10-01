/* Loads a course and navigates each embedded unit to its exercise list. */

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import { getCourseById } from '../../services/course.service'
import { getExercisesByUnit } from '../../services/exercise.service'
import { getMyProgress } from '../../services/progress.service'
import type { Course, CourseUnit } from '../../types/course.types'
import type { Exercise } from '../../types/exercise.types'

import Alert from '../../components/ui/Alert/Alert'
import Loader from '../../components/ui/Loader/Loader'
import styles from './UnitsPage.module.css'


export default function UnitsPage() {
    const { languageId, courseId } = useParams()
    const [course, setCourse] = useState<Course | null>(null)
    const [units, setUnits] = useState<CourseUnit[]>([])
    const [unitExercises, setUnitExercises] =
        useState<Record<string, Exercise[]>>({})
    const [lastStudiedUnitId, setLastStudiedUnitId] =
        useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadUnits = async () => {
            if (!languageId || !courseId) {
                setError('Course not found')
                setLoading(false)
                return
            }

            try {
                const courseData = await getCourseById(courseId)

                try {
                    const progress = await getMyProgress()
                    const courseProgress = progress.find(
                        (item) => item.course.id === courseId
                    )
                    setLastStudiedUnitId(
                        courseProgress?.lastStudiedUnitId ?? null
                    )
                } catch {
                    setLastStudiedUnitId(null)
                }

                if (courseData.languageId !== languageId) {
                    setError('Course not found')
                    return
                }

                const sortedUnits = [...courseData.units].sort(
                    (firstUnit, secondUnit) =>
                        firstUnit.order - secondUnit.order
                )

                const exerciseEntries = await Promise.all(
                    sortedUnits.map(async (unit) => [
                        unit.id,
                        await getExercisesByUnit(
                            courseId,
                            unit.id
                        ),
                    ] as const)
                )

                const exercisesByUnit =
                    Object.fromEntries(exerciseEntries)

                setCourse(courseData)
                // Keep empty units in the course, but hide them until exercises exist.
                setUnits(
                    sortedUnits.filter(
                        (unit) =>
                            (exercisesByUnit[unit.id] ?? [])
                                .length > 0
                    )
                )
                setUnitExercises(
                    exercisesByUnit
                )
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
        return <Alert variant="error">{error}</Alert>
    }

    if (!course || !languageId || !courseId) {
        return <Alert variant="error">Course not found</Alert>
    }

    return (
        <div className={styles.unitsPage}>
            <header className={styles.header}>
                <p>{course.title}</p>
                <h1>Unidades</h1>
                <p>Selecciona una unidad para ver sus ejercicios.</p>
            </header>

            <div className={styles.unitList}>
                {units.map((unit) => {
                    const exercises = unitExercises[unit.id] ?? []
                    const onlyExercise = exercises.length === 1
                    const destination = onlyExercise
                        ? `/languages/${languageId}/courses/${courseId}/units/${unit.id}/exercises/${exercises[0].id}`
                        : `/languages/${languageId}/courses/${courseId}/units/${unit.id}/exercises`

                    return (
                        <article
                            key={unit.id}
                            className={`${styles.unitCard} ${unit.id === lastStudiedUnitId
                                ? styles.unitCardAvailable
                                : ''
                                }`}
                        >
                            <div className={styles.unitInfo}>
                                <h2>{unit.title}</h2>
                                {unit.description && <p>{unit.description}</p>}
                            </div>

                            <Link
                                to={destination}
                                className={styles.exerciseLink}
                            >
                                {onlyExercise
                                    ? 'Comenzar ejercicio'
                                    : 'Ver ejercicios'}
                            </Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}
