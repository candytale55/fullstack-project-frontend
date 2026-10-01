/* src/types/unit.types.ts
 * Defines UNIT data used by the frontend.
 * Backend unit documents are normalized to this shape by course.service.
 */

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