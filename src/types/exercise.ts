export type ExerciseType =
    | 'multiple-choice'
    | 'fill-blank'
    | 'matching'

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
    status: ExerciseStatus
    order: number
}