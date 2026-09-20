import type {
  PortugueseVerbConjugation,
  PortugueseVerbForms,
} from './ConjugationExercise'


/* --------------- Types  --------------- */

export type PersonKey =
  Extract<keyof PortugueseVerbForms, string>

export type ConjugationQuestion = {
  id: string

  person: string
  infinitive: string
  tense: string

  answer: string
  pronunciation?: string
}


/* --------------- Persons  --------------- */

/*
 * Maps the property names stored in MongoDB
 * to the labels displayed in the exercise.
 */
const persons: {
  key: PersonKey
  label: string
}[] = [
    {
      key: 'eu',
      label: 'eu',
    },
    {
      key: 'tu',
      label: 'tu',
    },
    {
      key: 'eleElaVoce',
      label: 'você',
    },
    {
      key: 'nos',
      label: 'nós',
    },
    {
      key: 'elesElasVoces',
      label: 'vocês',
    },
  ]


/* ----------- Create Questions  ---------- */

/*
 * Converts conjugation documents received from
 * the database into individual exercise questions.
 */
export const createConjugationQuestions = (
  conjugations: PortugueseVerbConjugation[]
): ConjugationQuestion[] => {

  return conjugations.flatMap(
    (conjugation) => {

      return persons.flatMap(
        ({ key, label }) => {

          const answer =
            conjugation.forms[key]

          if (!answer) {
            return []
          }


          return [
            {
              id:
                `${conjugation._id}-${key}`,

              person:
                label,

              infinitive:
                conjugation.infinitive,

              tense:
                conjugation.tense,

              answer,

              pronunciation:
                conjugation
                  .pronunciation?.[key],
            },
          ]
        }
      )
    }
  )
}


/* ----------- Shuffle Questions  ---------- */

/*
 * Creates a copy of the questions
 * and places them in random order.
 * The original questions array is not modified.
 */
export const shuffleQuestions = <T,>(
  items: T[]
): T[] => {

  const shuffled = [...items]

  for (
    let index = shuffled.length - 1;
    index > 0;
    index--
  ) {

    const randomIndex =
      Math.floor(
        Math.random() * (index + 1)
      )

    const currentItem =
      shuffled[index]

    shuffled[index] =
      shuffled[randomIndex] as T

    shuffled[randomIndex] =
      currentItem as T
  }

  return shuffled
}