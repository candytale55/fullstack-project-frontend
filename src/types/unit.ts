export type UnitStatus =
    | 'available'
    | 'in-progress'
    | 'completed'

export type Unit = {
    id: string
    courseId: string
    title: string
    description?: string
    order: number
    status: UnitStatus
    exerciseCount: number
}