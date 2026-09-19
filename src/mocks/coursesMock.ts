/*
 * src/mocks/coursesMock.ts
 *
 * Temporary course data used by pages that have not yet been connected
 * to the backend.
 */

import type { Course } from '../types/course'


export const coursesMock: Course[] = [
    {
        id: 'course-en-c1',
        code: 'en-c1-1',
        languageId: 'english',
        title: 'English C1.1',
        level: 'C1',
        description: 'Advanced English vocabulary and course material.',
        structure: 'units',
        units: [],
        contentCount: 11,
    },
    {
        id: 'course-pt-daily',
        code: 'pt-daily',
        languageId: 'portuguese',
        title: 'Português do dia a dia',
        level: 'Mixed',
        description: 'Practical Portuguese for common everyday situations.',
        structure: 'units',
        units: [],
        contentCount: 6,
    },
]