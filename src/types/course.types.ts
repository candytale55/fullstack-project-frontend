/*
 * src/types/course.types.ts
 *
 * Defines COURSE and embedded UNIT data used by the frontend.
 * Backend course documents are normalized to these shapes by course.service.
 */

export type CourseStructure =
    | 'units'
    | 'exercises'

// Represents a single unit within a course.
export type CourseUnit = {
    id: string
    code: string
    title: string
    description?: string
    order: number
}

// Represents a course with its metadata and embedded units.
export type Course = {
    id: string
    code: string
    languageId: string

    title: string
    level: string
    description?: string

    structure: CourseStructure
    units: CourseUnit[]

    contentCount: number
}