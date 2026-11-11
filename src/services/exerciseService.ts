import type {
    Exercise,
    ExerciseDetail,
    ExerciseType,
    VocabularyItem,
} from '../types/exercise'

const API_URL = import.meta.env.VITE_API_URL

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

type ApiVocabularyItem = {
    _id: string
    term: string
    definition: string
    example?: string
    pronunciation?: string
}

const mapApiExercise = (
    exercise: ApiExercise
): Exercise => ({
    id: exercise._id,
    courseId: exercise.course,
    unitId: exercise.unitId,
    title: exercise.title,
    description: exercise.description,
    type: exercise.type,
    order: exercise.order,
})

const mapApiVocabularyItem = (
    vocabularyItem: ApiVocabularyItem
): VocabularyItem => ({
    id: vocabularyItem._id,
    term: vocabularyItem.term,
    definition: vocabularyItem.definition,
    example: vocabularyItem.example,
    pronunciation: vocabularyItem.pronunciation,
})

const getExercises = async (
    path: string
): Promise<Exercise[]> => {
    const response = await fetch(
        `${API_URL}/api/v1/exercises${path}`
    )

    if (!response.ok) {
        throw new Error('Failed to load exercises')
    }

    const data: ApiExercise[] = await response.json()

    return data.map(mapApiExercise)
}

export function getExercisesByCourse(
    courseId: string
): Promise<Exercise[]> {
    return getExercises(`/course/${courseId}`)
}

export function getExercisesByUnit(
    courseId: string,
    unitId: string
): Promise<Exercise[]> {
    return getExercises(
        `/course/${courseId}/unit/${unitId}`
    )
}

export async function getExercise(
    exerciseId: string
): Promise<ExerciseDetail> {
    const response = await fetch(
        `${API_URL}/api/v1/exercises/${exerciseId}`
    )

    if (!response.ok) {
        throw new Error('Failed to load exercise')
    }

    const data: ApiExercise = await response.json()

    return {
        ...mapApiExercise(data),
        vocabularyItems: (data.vocabularyItems ?? []).map(
            mapApiVocabularyItem
        ),
    }
}
