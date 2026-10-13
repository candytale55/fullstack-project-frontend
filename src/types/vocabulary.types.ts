/* src/types/vocabulary.types.ts
 * Defines VOCABULARY data used by the frontend.
 * Backend vocabulary documents are normalized to this shape by course.service.
 */

// values needed for vocabulary images
export interface VocabularyImage {
    filename: string
    url?: string
    publicId?: string
}


export interface VocabularyItem {
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

    tags: string[] 
    curriculumReferences?: string[] 

    image?: VocabularyImage

    // Optional extended linguistic metadata
    // TODO: Should be an object - i.e cao , gender: feminine = cadela  regionalVariant: 'pt-br' = cachorro
    gender?: 'masculine' | 'feminine';
    number?: 'singular' | 'plural';
    regionalVariant?: 'pt-pt' | 'pt-br' | 'pt-ao';
}
