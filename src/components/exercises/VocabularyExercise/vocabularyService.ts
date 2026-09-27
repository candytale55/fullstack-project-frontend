import type {
    VocabularyItem
} from '../../../types/vocabulary'


const API_URL = import.meta.env.VITE_API_URL

type ApiVocabularyItem =
    Omit<VocabularyItem, 'id'> & {
        _id: string
    }


type VocabularyFilters = {
    language?: string
    level?: string
    tag?: string
    hasImage?: boolean
}


const mapVocabularyItem = (
    item: ApiVocabularyItem
): VocabularyItem => ({
    ...item,
    id: item._id,
})


export async function getVocabulary(
    filters: VocabularyFilters = {}
): Promise<VocabularyItem[]> {

    const params = new URLSearchParams()

    if (filters.language) {
        params.set(
            'language',
            filters.language
        )
    }

    if (filters.level) {
        params.set(
            'level',
            filters.level
        )
    }

    if (filters.tag) {
        params.set(
            'tag',
            filters.tag
        )
    }

    if (filters.hasImage) {
        params.set(
            'hasImage',
            'true'
        )
    }


    const query =
        params.toString()
            ? `?${params.toString()}`
            : ''


    const response = await fetch(
        `${API_URL}/api/v1/vocabulary${query}`
    )


    if (!response.ok) {
        throw new Error(
            'Failed to load vocabulary'
        )
    }


    const data: ApiVocabularyItem[] =
        await response.json()


    return data.map(
        mapVocabularyItem
    )
}