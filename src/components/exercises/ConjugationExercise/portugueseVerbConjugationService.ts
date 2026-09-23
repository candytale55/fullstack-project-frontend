/* Fetches Portuguese conjugations for ExercisePage from the backend API. */

import type {
    PortugueseVerbConjugation
} from './ConjugationExercise'


const API_URL = import.meta.env.VITE_API_URL


/* --------------- API request --------------- */

// The unit id is the MongoDB id of an embedded Course unit.
export const getPortugueseVerbConjugationsByUnit =
    async (
        unitId: string
    ): Promise<PortugueseVerbConjugation[]> => {

        const response = await fetch(
            `${API_URL}/api/v1/portuguese-verb-conjugations?unitId=${unitId}`
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