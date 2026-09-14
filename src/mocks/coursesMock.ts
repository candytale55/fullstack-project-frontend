import type { Course } from '../types/course'

export const coursesMock: Course[] = [
    {
        id: 'portuguese-b2',
        languageId: 'portuguese',
        title: 'Portugués B2',
        level: 'B2',
        description: 'Curso general de portugués de nivel B2.',
        structure: 'units',
        contentCount: 8,
    },
    {
        id: 'business-portuguese',
        languageId: 'portuguese',
        title: 'Portugués de negocios',
        level: 'B1-B2',
        description: 'Portugués aplicado a situaciones profesionales.',
        structure: 'exercises',
        contentCount: 12,
    },
    {
        id: 'english-b2',
        languageId: 'english',
        title: 'English B2',
        level: 'B2',
        structure: 'units',
        contentCount: 10,
    }
]