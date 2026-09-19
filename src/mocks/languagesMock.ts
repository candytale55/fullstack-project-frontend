/*
 * src/mocks/languagesMock.ts
 *
 * Temporary language data used by pages that have not yet been connected
 * to the backend. (Changed to include nativeName property)
 */

import type { Language } from '../types/language'


export const languagesMock: Language[] = [
    {
        id: 'english',
        name: 'Inglés',
        nativeName: 'English',
        code: 'en',
    },
    {
        id: 'portuguese',
        name: 'Portugués',
        nativeName: 'Português',
        code: 'pt',
    },
    {
        id: 'french',
        name: 'Francés',
        nativeName: 'Français',
        code: 'fr',
    },
]