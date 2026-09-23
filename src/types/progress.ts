/* Defines progress data normalized by the future progress service for Dashboard. */

import type { CourseStructure } from './course'


// Language data populated inside a course progress record.
export type CourseProgressLanguage = {
    id: string
    name: string
    nativeName: string
    code: string
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
    studyDays: string[]
    course: CourseProgressCourse
}
