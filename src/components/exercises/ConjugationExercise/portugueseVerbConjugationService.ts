/* Fetches Portuguese conjugations for ExercisePage from the backend API. */

import type {
    PortugueseVerbConjugation
} from './ConjugationExercise'


const API_URL = import.meta.env.VITE_API_URL


/* --------------- API request --------------- */

// The unit id is the MongoDB id of an embedded Course unit.
export const getPortugueseVerbConjugationsByUnit =
    async (
        unitId: string,
        courseId?: string
    ): Promise<PortugueseVerbConjugation[]> => {

        const params = new URLSearchParams({
            unitId,
        })

        if (courseId) {
            params.set('courseId', courseId)
        }

        const response = await fetch(
            `${API_URL}/api/v1/portuguese-verb-conjugations?${params.toString()}`
        )


        if (!response.ok) {
            throw new Error(
                'Failed to load Portuguese verb conjugations'
            )
        }


        const data =
            await response.json()


        return data
    }

export const getPortugueseVerbConjugationsByCourse =
    async (
        courseId: string
    ): Promise<PortugueseVerbConjugation[]> => {
        const response = await fetch(
            `${API_URL}/api/v1/portuguese-verb-conjugations?courseId=${courseId}`
        )

        if (!response.ok) {
            throw new Error(
                'Failed to load Portuguese verb conjugations'
            )
        }

        return response.json()
    }