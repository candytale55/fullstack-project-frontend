/* Loads one exercise and selects its practice component from exercise.type. */

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import ConjugationExercise, {
    type PortugueseVerbConjugation,
} from '../../components/exercises/ConjugationExercise/ConjugationExercise'
import VocabularyExercise from '../../components/exercises/VocabularyExercise/VocabularyExercise'

import {
    getPortugueseVerbConjugationsByCourse,
    getPortugueseVerbConjugationsByUnit,
} from '../../components/exercises/ConjugationExercise/portugueseVerbConjugationService'
import { getExerciseById } from '../../services/exercise.service'
import { getCourseById } from '../../services/course.service'
import { saveStudySession } from '../../services/progress.service'

import type { Course } from '../../types/course.types'
import type { Exercise } from '../../types/exercise.types'

import Alert from '../../components/ui/Alert/Alert'
import Loader from '../../components/ui/Loader/Loader'

import styles from './ExercisePage.module.css'


type SessionResult = {
    questionsAnswered: number
    correctAnswers: number
}


export default function ExercisePage() {
    const {
        languageId,
        courseId,
        unitId,
        exerciseId,
    } = useParams()
    const navigate = useNavigate()

    const [exercise, setExercise] = useState<Exercise | null>(null)
    const [course, setCourse] = useState<Course | null>(null)
    const [conjugations, setConjugations] = useState<PortugueseVerbConjugation[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadExercise = async () => {
            if (!languageId || !courseId || !exerciseId) {
                setError('Exercise not found')
                setLoading(false)
                return
            }

            try {
                const [exerciseData, courseData] = await Promise.all([
                    getExerciseById(exerciseId),
                    getCourseById(courseId),
                ])

                if (
                    exerciseData.courseId !== courseId ||
                    courseData.languageId !== languageId
                ) {
                    throw new Error('Exercise not found')
                }

                if (unitId && exerciseData.unitId !== unitId) {
                    throw new Error('Exercise not found')
                }

                if (!unitId && exerciseData.unitId) {
                    throw new Error('Exercise not found')
                }

                if (exerciseData.type === 'conjugation') {
                    const data = unitId
                        ? await getPortugueseVerbConjugationsByUnit(
                            unitId,
                            courseId
                        )
                        : await getPortugueseVerbConjugationsByCourse(courseId)

                    setConjugations(data)
                }

                setExercise(exerciseData)
                setCourse(courseData)
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Failed to load exercise'
                )
            } finally {
                setLoading(false)
            }
        }

        loadExercise()
    }, [languageId, courseId, unitId, exerciseId])

    const handleSessionComplete = async (
        result: SessionResult
    ) => {
        if (!courseId) {
            throw new Error('Course ID is missing')
        }

        await saveStudySession(
            courseId,
            {
                ...result,
                ...(unitId && { unitId }),
            }
        )
    }

    const handleExit = () => {
        if (!languageId || !courseId) {
            navigate('/languages')
            return
        }

        const basePath = `/languages/${languageId}/courses/${courseId}`
        navigate(
            unitId
                ? `${basePath}/units/${unitId}/exercises`
                : `${basePath}/exercises`
        )
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return (
            <div className={styles.exercisePage}>
                <Alert variant="error">{error}</Alert>
            </div>
        )
    }

    if (!exercise || !course) {
        return (
            <div className={styles.exercisePage}>
                <Alert variant="error">Exercise not found</Alert>
            </div>
        )
    }

    if (exercise.type === 'vocabulary') {
        return (
            <VocabularyExercise
                vocabulary={exercise.vocabularyItems ?? []}
                onExit={handleExit}
                onSessionComplete={handleSessionComplete}
            />
        )
    }

    if (exercise.type === 'conjugation') {
        const unit = unitId
            ? course.units.find((courseUnit) => courseUnit.id === unitId)
            : undefined

        return (
            <ConjugationExercise
                conjugations={conjugations}
                onExit={handleExit}
                onSessionComplete={handleSessionComplete}
                languageName={course.languageId}
                courseName={course.title}
                unitName={unit?.title ?? course.title}
            />
        )
    }

    return (
        <div className={styles.exercisePage}>
            <Alert variant="error">
                This exercise type is not supported yet.
            </Alert>
        </div>
    )
}
