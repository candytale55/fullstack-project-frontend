/* Loads exercises and their selected practice data from the backend. */

import type { Course } from '../types/course'
import type { Exercise, ExerciseType } from '../types/exercise'
import type { VocabularyItem } from '../types/vocabulary'

const API_URL = import.meta.env.VITE_API_URL

type ApiVocabularyItem = Omit<VocabularyItem, 'id'> & {
    _id: string
}

type ApiExercise = {
    _id: string
    course: string
    unitId?: string
    title: string
    description?: string
    type: ExerciseType
    order: number
    vocabularyItems?: ApiVocabularyItem[]
}

const mapVocabularyItem = (
    item: ApiVocabularyItem
): VocabularyItem => ({
    ...item,
    id: item._id,
})

const mapExercise = (
    exercise: ApiExercise
): Exercise => ({
    id: exercise._id,
    courseId: exercise.course,
    unitId: exercise.unitId,
    title: exercise.title,
    description: exercise.description,
    type: exercise.type,
    status: 'available',
    order: exercise.order,
    vocabularyItems: (exercise.vocabularyItems ?? []).map(
        mapVocabularyItem
    ),
})

const getExercises = async (
    path: string
): Promise<Exercise[]> => {
    const response = await fetch(`${API_URL}${path}`)

    if (!response.ok) {
        throw new Error('Failed to load exercises')
    }

    const data: ApiExercise[] = await response.json()
    return data.map(mapExercise)
}

export const getExercisesByCourse = (
    courseId: string
): Promise<Exercise[]> =>
    getExercises(`/api/v1/exercises/course/${courseId}`)

export const getExercisesByUnit = (
    courseId: string,
    unitId: string
): Promise<Exercise[]> =>
    getExercises(
        `/api/v1/exercises/course/${courseId}/unit/${unitId}`
    )

// Loads all exercises that belong directly to a course or to its units.
export const getExercisesForCourse = async (
    course: Course
): Promise<Exercise[]> => {
    if (course.structure === 'exercises') {
        return getExercisesByCourse(course.id)
    }

    const exercisesByUnit = await Promise.all(
        course.units.map((unit) =>
            getExercisesByUnit(course.id, unit.id)
        )
    )

    return exercisesByUnit.flat()
}

export const getExerciseById = async (
    exerciseId: string
): Promise<Exercise> => {
    const response = await fetch(
        `${API_URL}/api/v1/exercises/${exerciseId}`
    )

    if (!response.ok) {
        throw new Error('Failed to load exercise')
    }

    const data: ApiExercise = await response.json()
    return mapExercise(data)
}
