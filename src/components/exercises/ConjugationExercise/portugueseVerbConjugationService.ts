/* Fetches Portuguese conjugations for ExercisePage from the mounted backend endpoint. */

import type {
    PortugueseVerbConjugation
} from './ConjugationExercise'


const API_URL = import.meta.env.VITE_API_URL


/* ---------------------------------- */
/* Get conjugations by unit           */
/* ---------------------------------- */

/*
 * Gets all Portuguese verb conjugations
 * associated with one course unit.
 *
 * The unitId corresponds to the MongoDB _id
 * of the embedded unit inside the Course.
 */
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