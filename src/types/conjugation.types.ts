/*
 * src/types/conjugation.types.ts
 *
 * Defines verb conjugation contracts.
 */

export type PortugueseVerbForms = {
    eu?: string
    tu?: string
    eleElaVoce?: string
    nos?: string
    elesElasVoces?: string
}


export type PortugueseVerbConjugation = {
    _id: string

    infinitive: string
    mood: string
    tense: string

    forms: PortugueseVerbForms
    pronunciation?: PortugueseVerbForms

    negativeForms?: PortugueseVerbForms
    negativePronunciation?: PortugueseVerbForms

    tags: string[]
    curriculumTags: string[]
}