/* Loads and saves authenticated progress data for the future Dashboard. */

import type { CourseProgress } from '../types/progress'

const API_URL = import.meta.env.VITE_API_URL


type StudySessionData = {
    questionsAnswered: number
    correctAnswers: number
}


/* ---------------------------------- */
/* Save completed study session       */
/* ---------------------------------- */

export async function saveStudySession(
    courseId: string,
    sessionData: StudySessionData
) {

    const token =
        localStorage.getItem('authToken')


    if (!token) {
        throw new Error(
            'User is not authenticated'
        )
    }

    // Send PATCH request to save study session
    const response = await fetch(
        `${API_URL}/api/v1/progress/me/course/${courseId}/session`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type':
                    'application/json',
                Authorization:
                    `Bearer ${token}`,
            },
            body: JSON.stringify(
                sessionData
            ),
        }
    )

    const data =
        await response.json()

    if (!response.ok) {
        throw new Error(
            data.error ||
            'Failed to save progress'
        )
    }

    return data
}

type ApiCourseProgress = Omit<CourseProgress, 'id' | 'course'> & {
    _id: string
    course: {
        _id: string
        title: string
        level: string
        structure: CourseProgress['course']['structure']
        language: {
            _id: string
            name: string
            nativeName: string
            code: string
        }
    }
}


// Converts MongoDB identifiers into the frontend's normalized id shape.
const mapCourseProgress = (
    progress: ApiCourseProgress
): CourseProgress => ({
    id: progress._id,
    completedSessions: progress.completedSessions,
    questionsAnswered: progress.questionsAnswered,
    correctAnswers: progress.correctAnswers,
    lastStudiedAt: progress.lastStudiedAt,
    studyDays: progress.studyDays,
    course: {
        id: progress.course._id,
        title: progress.course.title,
        level: progress.course.level,
        structure: progress.course.structure,
        language: {
            id: progress.course.language._id,
            name: progress.course.language.name,
            nativeName: progress.course.language.nativeName,
            code: progress.course.language.code,
        },
    },
})


/* ---------------------------------- */
/* Get authenticated user progress    */
/* ---------------------------------- */

export async function getMyProgress(): Promise<CourseProgress[]> {
    const token =
        localStorage.getItem('authToken')

    if (!token) {
        throw new Error(
            'User is not authenticated'
        )
    }

    const response = await fetch(
        `${API_URL}/api/v1/progress/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    const data =
        await response.json() as ApiCourseProgress[]

    if (!response.ok) {
        throw new Error(
            'Failed to load progress'
        )
    }

    return data.map(mapCourseProgress)
}