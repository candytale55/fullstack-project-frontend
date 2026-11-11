export type ExerciseType =
    | 'vocabulary'
    | 'conjugation'
    | 'quiz'
    | 'multiple-choice'
    | 'fill-blank'
    | 'matching'
    | 'crossword'
    | 'word-search'

export type ExerciseStatus =
    | 'available'
    | 'in-progress'
    | 'completed'

export type Exercise = {
    id: string
    courseId: string
    unitId?: string // si tiene unitId, pertenece a una unidad, si no, pertenece directamente al curso
    title: string
    description?: string
    type: ExerciseType
    status?: ExerciseStatus
    order: number
}

export type VocabularyItem = {
    id: string
    term: string
    definition: string
    example?: string
    pronunciation?: string
}

export type ExerciseDetail = Exercise & {
    vocabularyItems: VocabularyItem[]
}