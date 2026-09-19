/*
 * src/types/course.ts
 *
 * Defines course and embedded unit data used by the frontend.
 * Backend course documents are normalized to these shapes by courseService.
 */

export type CourseStructure =
    | 'units'
    | 'exercises'


export type CourseUnit = {
    id: string
    code: string
    title: string
    description?: string
    order: number
}


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