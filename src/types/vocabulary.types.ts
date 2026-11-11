/* src/types/vocabulary.types.ts
 * Defines VOCABULARY data used by the frontend.
 * Backend vocabulary documents are normalized to this shape by course.service.
 */

// values needed for vocabulary images
export type VocabularyImage = {
    filename: string
    url?: string
    publicId?: string
}


export type VocabularyItem = {
    id: string
    code: string

    languageCode: string
    term: string

    level?: string
    partOfSpeech?: string // TODO: Use an enum for part of speech instead of a string

    definition: string
    example?: string
    clozeExample?: string

    pronunciation?: string
    pronunciationSecondary?: string

    tags: string[] // TODO: establecer etiquetas que puedan trigger un ejercicio. Por ejemplo masc. vs fem. o plurales. BR vs PT, crazy-difficult? hard-to-pronounce? easily-forgotten. Tags también deberian ser en idioma de origen además de ingles.
    curriculumReferences: string[] 

    image?: VocabularyImage
}
