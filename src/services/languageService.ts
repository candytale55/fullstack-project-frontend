/*
 * src/services/languageService.ts
 *
 * LanguagesPage -> languageService -> backend language endpoints.
 * Backend documents are normalized before reaching the UI.
 */

import type { Language } from '../types/language'

const API_URL = import.meta.env.VITE_API_URL


// API response type for a language document returned by the backend.
type ApiLanguage = {
    _id: string
    name: string
    nativeName: string
    code: string
}


// Maps a backend language document to the frontend Language type.
const mapApiLanguage = (
    language: ApiLanguage
): Language => ({
    id: language._id,
    name: language.name,
    nativeName: language.nativeName,
    code: language.code,
})


// Fetches all languages and returns them in the frontend Language shape.
export async function getLanguages(): Promise<Language[]> {
    const response = await fetch(
        `${API_URL}/api/v1/languages`
    )

    if (!response.ok) {
        throw new Error('Failed to load languages')
    }

    const data: ApiLanguage[] =
        await response.json()

    return data.map(mapApiLanguage)
}