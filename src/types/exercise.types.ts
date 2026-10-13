/* src/types/exercise.types.ts

 * Core domain contracts for the Reusable Exercise Architecture.
 * Includes polymorphic criteria interfaces for different collection sources.
 */

/* ------------------------- */
/* --------- Types --------- */
/* ------------------------- */

import type { VocabularyItem } from './vocabulary.types'

export type ExerciseType =
    | 'vocabulary'
    | 'conjugation'
    | 'multiple-choice'
    | 'fill-blank'
    | 'matching'
    | 'quiz'
    | 'crossword'
    | 'word-search'

export type ExerciseStatus =
    | 'available'
    | 'in-progress'
    | 'completed'



/* ------------------------------- */
/* ---- Exercises' Interfaces ---- */
/* ------------------------------- */

// Criteria for Verb Conjugations
export interface ConjugationCriteria {
    tense?: string[]  // ['presente', 'imperfeito']
    infinitives?: string[]  // ['falar', 'comer']
    mood?: string // (e.g. 'indicativo','conjuntivo')
    verbTags?: string[]  // ['irregular', 'reflexo']
    limit?: number // cap on questions
}

// Criteria for Vocabulary Exercises
export interface VocabularyCriteria {
    languageCode: string // (e.g. 'pt', 'es', 'en')
    level?: string // (A2, B1, B2.1, C1.2, C2)
    tags?: string[]  // ['fruits']
    optionalTags?: string[]  // TODO ?? ['citrus']
    partOfSpeech?: string // ['n', 'v'] (noun, verb)
    excludeTags?: string[]  // ['hard', 'crazy-difficult']
    limit?: number // cap on questions
}

// TODO: Future exercise types criteria interfaces
/* The rest of the interfaces for each exercise type can be defined similarly */



/* ------------------------------------------ */
/* -------- Exercises' Core Interface ------- */
/* ------------------------------------------ */

export type ExerciseCriteria =
    ConjugationCriteria | VocabularyCriteria | Record<string, any>;


// Unified Exercise Document (as stored in MongoDB)    
export interface Exercise {
    id: string
    code: string // i.e 'pt-conj-pres-irregulars' 
    courseId: string    // target course
    unitId?: string     // target unit in course
    title: string       // "Practice Vocabulary: Fruits"
    description?: string
    type: ExerciseType  // Determines the engine and resolver
    order: number
    status?: ExerciseStatus
    criteria?: ExerciseCriteria  // Declarative query specification
    vocabularyItems?: VocabularyItem[] // TODO: Remove once new criteria is fully implemented and tested
}

/* ------------------------------------------ */
/* -------- Study Session Result Interface -- */
/* ------------------------------------------ */

// TODO: Check vs progress.types
// TODO: Extend with more detailed study session metrics (e.g., per-question breakdown, hints used, etc.)

export interface StudySessionResult {
    questionsAnswered: number;
    correctAnswers: number;
    // timeSpentSeconds?: number; // TODO Implement or remove
}
