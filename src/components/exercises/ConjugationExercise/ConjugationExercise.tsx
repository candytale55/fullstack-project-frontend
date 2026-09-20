import { useState } from 'react'

import styles from './ConjugationExercise.module.css'


/* ---------------------------------- */

export type PortugueseVerbForms = {
  eu?: string
  tu?: string
  eleElaVoce?: string
  nos?: string
  elesElasVoces?: string
}

/* ---------------------------------- */

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


/* ---------------------------------- */

type ConjugationExerciseProps = {
  conjugations: PortugueseVerbConjugation[]
}

type PersonKey = keyof PortugueseVerbForms

type ConjugationQuestion = {
  id: string

  person: string
  infinitive: string
  tense: string

  answer: string
  pronunciation?: string
}


/*
 * Maps the database property names
 * to the labels shown to the user.
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


/* ---------------------------------- */
/* Create exercise questions          */
/* ---------------------------------- */

/*
 * Converts the conjugation documents received
 * from the database into individual questions.
 */

const createQuestions = (
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

              person: label,

              infinitive:
                conjugation.infinitive,

              tense:
                conjugation.tense,

              answer,

              pronunciation:
                conjugation.pronunciation?.[key],
            },
          ]
        }
      )
    }
  )
}


/* ---------------------------------- */
/* Component                          */
/* ---------------------------------- */

export default function ConjugationExercise({
  conjugations,
}: ConjugationExerciseProps) {

  const questions =
    createQuestions(conjugations)


  const [currentIndex, setCurrentIndex] =
    useState(0)

  const [userAnswer, setUserAnswer] =
    useState('')

  const [isChecked, setIsChecked] =
    useState(false)


  const currentQuestion =
    questions[currentIndex]


  if (!currentQuestion) {
    return (
      <div className={styles.exercise}>
        <p>
          No hay ejercicios disponibles.
        </p>
      </div>
    )
  }


  // Check answer

  const normalizedUserAnswer =
    userAnswer
      .trim()
      .toLocaleLowerCase('pt-PT')

  const normalizedCorrectAnswer =
    currentQuestion.answer
      .trim()
      .toLocaleLowerCase('pt-PT')

  const isCorrect =
    normalizedUserAnswer ===
    normalizedCorrectAnswer

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()

    if (!userAnswer.trim()) {
      return
    }

    setIsChecked(true)
  }

  // Next question
  const handleNext = () => {

    setUserAnswer('')
    setIsChecked(false)

    setCurrentIndex(
      (previousIndex) =>
        (previousIndex + 1) %
        questions.length
    )
  }


  return (
    <section className={styles.exercise}>

      <p className={styles.tense}>
        {currentQuestion.tense} (PT)
      </p>


      <h2 className={styles.question}>
        {currentQuestion.person}
        {' + '}
        {currentQuestion.infinitive}
      </h2>


      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >

        <input
          className={styles.input}
          type="text"
          value={userAnswer}
          onChange={(event) =>
            setUserAnswer(
              event.target.value
            )
          }
          disabled={isChecked}
          autoFocus
        />


        {!isChecked && (
          <button
            type="submit"
            className={styles.button}
          >
            Comprobar
          </button>
        )}

      </form>


      {isChecked && (

        <div className={styles.feedback}>

          <p>
            {isCorrect
              ? 'Correcto'
              : 'Incorrecto'}
          </p>


          {!isCorrect && (
            <p>
              Respuesta correcta:{' '}

              <strong>
                {currentQuestion.answer}
              </strong>
            </p>
          )}


          {currentQuestion.pronunciation && (
            <p className={styles.pronunciation}>
              /
              {currentQuestion.pronunciation}
              /
            </p>
          )}


          <button
            type="button"
            className={styles.button}
            onClick={handleNext}
          >
            Siguiente
          </button>

        </div>
      )}

    </section>
  )
}