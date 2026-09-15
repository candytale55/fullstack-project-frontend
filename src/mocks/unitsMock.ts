import type { Unit } from '../types/unit'

export const unitsMock: Unit[] = [
    {
        id: 'unit-1',
        courseId: 'portuguese-b2',
        title: 'Unidade 1',
        description: 'Revisão e comunicação quotidiana.',
        order: 1,
        status: 'completed',
        exerciseCount: 6,
    },
    {
        id: 'unit-2',
        courseId: 'portuguese-b2',
        title: 'Unidade 2',
        description: 'Experiências e acontecimentos.',
        order: 2,
        status: 'in-progress',
        exerciseCount: 8,
    },
    {
        id: 'unit-3',
        courseId: 'portuguese-b2',
        title: 'Unidade 3',
        description: 'Opiniões e argumentação.',
        order: 3,
        status: 'available',
        exerciseCount: 7,
    },
]   