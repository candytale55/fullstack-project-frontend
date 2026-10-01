/*
 * src/types/language.types.ts
 *
 * Defines the language data used by the frontend.
 * API language responses are normalized to this shape by language.service.
 */

export type Language = {
    id: string
    name: string
    nativeName: string
    code: string
}