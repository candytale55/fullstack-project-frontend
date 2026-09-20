import { useState } from 'react'

import styles from './ConjugationExercise.module.css'

import {
  createConjugationQuestions,
  shuffleQuestions,
} from './conjugationExerciseUtils'

import type {
  ConjugationQuestion,
} from './conjugationExerciseUtils'


/* ---------------------------------- */
/* Types                              */
/* ---------------------------------- */

export type PortugueseVerbForms = {
  eu?: string
  tu?: string
  eleElaVoce?: string
  nos?: string
  elesElasVoces?: string
}


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


type ConjugationExerciseProps = {
  conjugations: PortugueseVerbConjugation[]
  onExit: () => void

  courseName: string
  languageName: string
  unitName: string
}

/* ---------------------------------- */
/* Component                          */
/* ---------------------------------- */

export default function ConjugationExercise({
  conjugations,
  onExit,
  courseName,
  languageName,
  unitName,
}: ConjugationExerciseProps) {

  /*
   * Creates all possible questions from
   * the conjugation data received from the API.
   */
  const allQuestions =
    createConjugationQuestions(
      conjugations
    )


  /* ---------------------------------- */
  /* State                              */
  /* ---------------------------------- */

  /*
   * Default session size.
   */
  const [questionCount, setQuestionCount] =
    useState(10)


  /*
   * Questions selected and randomized
   * for the current exercise session.
   */
  const [
    sessionQuestions,
    setSessionQuestions
  ] = useState<ConjugationQuestion[]>([])


  const [currentIndex, setCurrentIndex] =
    useState(0)


  const [userAnswer, setUserAnswer] =
    useState('')


  const [isChecked, setIsChecked] =
    useState(false)


  const [hasStarted, setHasStarted] =
    useState(false)


  const [isFinished, setIsFinished] =
    useState(false)


  /* ---------------------------------- */
  /* Start exercise                     */
  /* ---------------------------------- */

  /*
   * Randomizes all available questions
   * and selects only the requested amount.
   */
  const handleStart = () => {

    if (allQuestions.length === 0) {
      return
    }


    /*
     * Prevent values below 1 or above
     * the available number of questions.
     */
    const amount =
      Math.min(
        Math.max(questionCount, 1),
        allQuestions.length
      )


    const shuffled =
      shuffleQuestions(
        allQuestions
      )


    setSessionQuestions(
      shuffled.slice(0, amount)
    )

    setCurrentIndex(0)
    setUserAnswer('')
    setIsChecked(false)
    setIsFinished(false)
    setHasStarted(true)
  }


  /* ---------------------------------- */
  /* Normalize answers                  */
  /* ---------------------------------- */

  /*
   * Allows:
   *
   * abandono
   * ABANDONO
   * eu abandono
   * EU ABANDONO
   * Eu abandono
   *
   * Accents are still required.
   */
  const normalizeAnswer = (
    value: string
  ): string => {

    return value
      .trim()
      .toLocaleLowerCase('pt-PT')
      .replace(/\s+/g, ' ')
  }


  /* ---------------------------------- */
  /* No available questions             */
  /* ---------------------------------- */

  if (allQuestions.length === 0) {

    return (
      <section className={styles.exercise}>

        <p>
          No hay ejercicios disponibles.
        </p>

        <button
          type="button"
          className={styles.button}
          onClick={onExit}
        >
          Salir
        </button>

      </section>
    )
  }


  /* ---------------------------------- */
  /* Exercise setup                     */
  /* ---------------------------------- */

  /*
   * This screen appears before
   * the exercise begins.
   */
  if (!hasStarted) {

    return (
      <section className={styles.exercise}>

        <h2>
          Práctica de conjugación
        </h2>

        <p>
          Preguntas disponibles:
          {' '}
          {allQuestions.length}
        </p>


        <label htmlFor="questionCount">
          Número de preguntas
        </label>


        <input
          id="questionCount"
          className={styles.input}
          type="number"
          min={1}
          max={allQuestions.length}
          value={questionCount}
          onChange={(event) =>
            setQuestionCount(
              Number(event.target.value)
            )
          }
        />


        <button
          type="button"
          className={styles.button}
          onClick={handleStart}
        >
          Comenzar
        </button>


        <button
          type="button"
          className={styles.button}
          onClick={onExit}
        >
          Salir
        </button>

      </section>
    )
  }


  /* ---------------------------------- */
  /* Exercise finished                  */
  /* ---------------------------------- */

  if (isFinished) {

    return (
      <section className={styles.exercise}>

        <h2>
          Ejercicio terminado
        </h2>


        <p>
          Has completado
          {' '}
          {sessionQuestions.length}
          {' '}
          preguntas.
        </p>


        <button
          type="button"
          className={styles.button}
          onClick={handleStart}
        >
          Repetir
        </button>


        <button
          type="button"
          className={styles.button}
          onClick={onExit}
        >
          Salir
        </button>

      </section>
    )
  }


  /* ---------------------------------- */
  /* Current question                   */
  /* ---------------------------------- */

  const currentQuestion =
    sessionQuestions[currentIndex]


  /*
   * Defensive check.
   * Normally this should not occur once
   * the exercise has started.
   */
  if (!currentQuestion) {

    return (
      <section className={styles.exercise}>

        <p>
          No hay una pregunta disponible.
        </p>

        <button
          type="button"
          className={styles.button}
          onClick={onExit}
        >
          Salir
        </button>

      </section>
    )
  }


  /* ---------------------------------- */
  /* Check answer                       */
  /* ---------------------------------- */

  const normalizedUserAnswer =
    normalizeAnswer(
      userAnswer
    )


  const normalizedCorrectAnswer =
    normalizeAnswer(
      currentQuestion.answer
    )


  const normalizedAnswerWithPerson =
    normalizeAnswer(
      `${currentQuestion.person} ${currentQuestion.answer}`
    )


  const isCorrect =
    normalizedUserAnswer ===
    normalizedCorrectAnswer ||
    normalizedUserAnswer ===
    normalizedAnswerWithPerson


  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()


    if (!userAnswer.trim()) {
      return
    }


    setIsChecked(true)
  }


  /* ---------------------------------- */
  /* Next question                      */
  /* ---------------------------------- */

  const handleNext = () => {

    const isLastQuestion =
      currentIndex ===
      sessionQuestions.length - 1


    if (isLastQuestion) {

      setIsFinished(true)

      return
    }


    setUserAnswer('')
    setIsChecked(false)

    setCurrentIndex(
      (previousIndex) =>
        previousIndex + 1
    )
  }


  /* ---------------------------------- */
  /* Render exercise                    */
  /* ---------------------------------- */

  return (
    <section className={styles.exercisePage}>

      {/* Information outside the exercise card */}
      <header className={styles.exerciseHeader}>

        <div className={styles.courseInfo}>

          <p className={styles.unitName}>
            {unitName}
          </p>
          <p className={styles.courseName}>
            {courseName}
          </p>
          <p className={styles.languageName}>
            {languageName}
          </p>


        </div>


        <button
          type="button"
          className={styles.exitButton}
          onClick={onExit}
        >
          Salir
        </button>

      </header>


      {/* Exercise card */}
      <div className={styles.exerciseCard}>

        {/* Darker section */}
        <div className={styles.cardHeader}>

          <p className={styles.progress}>
            Pregunta {currentIndex + 1}
            {' / '}
            {sessionQuestions.length}
          </p>

          <p className={styles.tense}>
            {currentQuestion.tense}
          </p>

        </div>


        {/* Lighter section */}
        <div className={styles.cardBody}>

          <h2 className={styles.question}>
            {currentQuestion.person}
            {' + '}
            {currentQuestion.infinitive}
          </h2>


          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >

            <label
              htmlFor="conjugationAnswer"
              className={styles.srOnly}
            >
              Escribe la conjugación
            </label>

            <input
              id="conjugationAnswer"
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
              autoComplete="off"
            />


            {!isChecked && (
              <button
                type="submit"
                className={styles.primaryButton}
              >
                Comprobar
              </button>
            )}

          </form>


          {isChecked && (

            <div className={styles.feedback}>

              <div
                className={
                  isCorrect
                    ? styles.successAlert
                    : styles.errorAlert
                }
                role="status"
              >
                {isCorrect
                  ? 'Correcto'
                  : 'Incorrecto'}
              </div>


              {!isCorrect && (
                <p className={styles.correctAnswer}>
                  Respuesta correcta:
                  {' '}

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
                className={styles.primaryButton}
                onClick={handleNext}
              >
                {currentIndex ===
                  sessionQuestions.length - 1
                  ? 'Finalizar'
                  : 'Siguiente'}
              </button>

            </div>
          )}

        </div>

      </div>

    </section>
  )
}