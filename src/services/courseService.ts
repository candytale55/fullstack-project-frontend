/*
 * src/services/courseService.ts
 *
 * CoursesPage -> courseService -> backend course endpoints.
 * Backend course documents and embedded units are normalized before reaching the UI.
 */

import type {
    Course,
    CourseStructure,
} from '../types/course'

const API_URL = import.meta.env.VITE_API_URL


// API response type for an embedded unit returned by the backend.
type ApiUnit = {
    _id: string
    code: string
    title: string
    description?: string
    order: number
}


// API response type for a course document returned by the backend.
type ApiCourse = {
    _id: string
    code: string

    language: {
        _id: string
        name: string
        nativeName: string
        code: string
    }

    title: string
    level: string
    description?: string

    structure: CourseStructure
    units: ApiUnit[]
}


// Maps a backend course document to the frontend Course type.
const mapApiCourse = (
    course: ApiCourse
): Course => ({
    id: course._id,
    code: course.code,
    languageId: course.language._id,

    title: course.title,
    level: course.level,
    description: course.description,

    structure: course.structure,

    units: course.units.map((unit) => ({
        id: unit._id,
        code: unit.code,
        title: unit.title,
        description: unit.description,
        order: unit.order,
    })),

    contentCount: course.units.length,
})


// Fetches one course by its MongoDB id.
export async function getCourseById(
    courseId: string
): Promise<Course> {
    const response = await fetch(
        `${API_URL}/api/v1/courses/${courseId}`
    )

    if (!response.ok) {
        throw new Error('Failed to load course')
    }

    const data: ApiCourse =
        await response.json()

    return mapApiCourse(data)
}

// Fetches all courses belonging to a language.
export async function getCoursesByLanguage(
    languageId: string
): Promise<Course[]> {
    const response = await fetch(
        `${API_URL}/api/v1/courses/language/${languageId}`
    )

    if (!response.ok) {
        throw new Error('Failed to load courses')
    }

    const data: ApiCourse[] =
        await response.json()

    return data.map(mapApiCourse)
}