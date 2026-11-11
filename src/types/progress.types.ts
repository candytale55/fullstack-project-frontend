/* src/types/progress.types.ts
 * Defines progress data normalized by the backend, specifically the course subobject
 * returned by the MongoDB API when the backend responds to GET /api/v1/progress/me. 
 * Lo utiliza el hook useProgress y los componentes CourseProgressCard y DashboardPage
 */

import type { CourseStructure } from './course.types'


// Language data populated inside a course progress record.
export type CourseProgressLanguage = {
    id: string
    name: string
    nativeName: string
    code: string // ISO 639-1 language code
}


// Course data populated by the backend for a progress record.
export type CourseProgressCourse = {
    id: string
    title: string
    level: string
    structure: CourseStructure
    language: CourseProgressLanguage
}


// Progress summary returned by GET /api/v1/progress/me after id normalization.
export type CourseProgress = {
    id: string
    completedSessions: number
    questionsAnswered: number
    correctAnswers: number
    lastStudiedAt?: string
    lastStudiedUnitId?: string
    studyDays: string[] // List of days the user has studied for heat map visualization
    course: CourseProgressCourse
}
