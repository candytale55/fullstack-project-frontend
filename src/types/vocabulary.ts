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
    partOfSpeech?: string

    definition: string
    example?: string
    clozeExample?: string

    pronunciation?: string
    pronunciationSecondary?: string

    tags: string[]
    curriculumReferences: string[]

    image?: VocabularyImage
}
