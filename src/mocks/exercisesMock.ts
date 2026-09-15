import type { Exercise } from '../types/exercise'

export const exercisesMock: Exercise[] = [
    {
        id: 'exercise-1',
        courseId: 'portuguese-b2',
        unitId: 'unit-1',
        title: 'Vocabulário quotidiano',
        description: 'Revisa vocabulario de situaciones cotidianas.',
        type: 'multiple-choice',
        status: 'completed',
        order: 1,
    },
    {
        id: 'exercise-2',
        courseId: 'portuguese-b2',
        unitId: 'unit-1',
        title: 'Completar frases',
        description: 'Completa las frases con la palabra adecuada.',
        type: 'fill-blank',
        status: 'in-progress',
        order: 2,
    },
    {
        id: 'exercise-3',
        courseId: 'portuguese-b2',
        unitId: 'unit-1',
        title: 'Relacionar vocabulario',
        type: 'matching',
        status: 'available',
        order: 3,
    },

    {
        id: 'business-exercise-1',
        courseId: 'business-portuguese',
        title: 'Apresentações profissionais',
        description: 'Vocabulario para presentaciones profesionales.',
        type: 'multiple-choice',
        status: 'available',
        order: 1,
    },
    {
        id: 'business-exercise-2',
        courseId: 'business-portuguese',
        title: 'Emails profissionais',
        type: 'fill-blank',
        status: 'available',
        order: 2,
    },
]