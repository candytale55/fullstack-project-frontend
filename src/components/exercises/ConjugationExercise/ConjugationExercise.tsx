/* Runs the conjugation session using questions generated from API records. */

import { useRef, useState } from 'react'

import styles from './ConjugationExercise.module.css'

import {
  createConjugationQuestions,
  shuffleQuestions,
} from './conjugationExerciseUtils'

import type {
  ConjugationQuestion,
} from './conjugationExerciseUtils'


/* --------------- Types --------------- */

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

  onSessionComplete: (
    result: StudySessionResult
  ) => Promise<void>

  courseName: string
  languageName: string
  unitName: string
}


type StudySessionResult = {
  questionsAnswered: number
  correctAnswers: number
}

/* --------------- Component --------------- */

export default function ConjugationExercise({
  conjugations,
  onExit,
  onSessionComplete,
  courseName,
  languageName,
  unitName,
}: ConjugationExerciseProps) {

  // Expands API records into person-level questions for the session.
  const allQuestions =
    createConjugationQuestions(
      conjugations
    )


  /* --------------- States --------------- */

  const [questionCount, setQuestionCount] =
    useState(10)

  const [
    sessionQuestions,
    setSessionQuestions
  ] = useState<ConjugationQuestion[]>([])


  const [correctAnswers, setCorrectAnswers] =
    useState(0)

  const [userAnswer, setUserAnswer] =
    useState('')

  const [isChecked, setIsChecked] =
    useState(false)

  const [hasStarted, setHasStarted] =
    useState(false)

  const [isFinished, setIsFinished] =
    useState(false)

  const [currentIndex, setCurrentIndex] =
    useState(0)

  const [isSavingProgress, setIsSavingProgress] =
    useState(false)

  const [progressError, setProgressError] =
    useState<string | null>(null)
  
  const answerInputRef =
    useRef<HTMLInputElement>(null)
    
  
  /* --------------- Start exercise --------------- */

  // Randomizes questions and limits the session to the requested amount.

  const handleStart = () => {

    if (allQuestions.length === 0) {
      return
    }

    // Keeps the requested amount within the available question range.
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

    setCorrectAnswers(0)
    setProgressError(null)

    setIsFinished(false)
    setHasStarted(true)
  }

  /* --------------- Normalize answers --------------- */

  // Ignores case and repeated spaces while preserving Portuguese accents.

  const normalizeAnswer = (
    value: string
  ): string => {

    return value
      .trim()
      .toLocaleLowerCase('pt-PT')
      .replace(/\s+/g, ' ')
  }

  /* --------------- Empty state --------------- */

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


  /* --------------- Exercise setup --------------- */

  // Collects the session size before the first question is shown.
  if (!hasStarted) {
    return (
      <section className={styles.setupPage}>

        <div className={styles.setupCard}>

          <h2 className={styles.setupTitle}>
            Práctica de conjugación
          </h2>

          <p className={styles.availableQuestions}>
            Preguntas disponibles:
            {' '}
            {allQuestions.length}
          </p>

          <form
            className={styles.setupForm}
            onSubmit={(event) => {
              event.preventDefault()
              handleStart()
            }}
          >

            <label
              htmlFor="questionCount"
              className={styles.setupLabel}
            >
              Número de preguntas
            </label>

            <input
              id="questionCount"
              className={styles.questionCountInput}
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

            <div className={styles.setupActions}>

              <button
                type="submit"
                className={styles.primaryButton}
              >
                Comenzar
              </button>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={onExit}
              >
                Salir
              </button>
            </div>
          </form>
        </div>
      </section>
    )
  }

  /* --------------- Exercise finished --------------- */

  // Shows the result state and allows the user to repeat or leave.

  if (isFinished) {
    return (
      <section className={styles.finishedPage}>

        <div className={styles.finishedCard}>

          <h2 className={styles.finishedTitle}>
            Ejercicio terminado
          </h2>

          <p className={styles.finishedMessage}>
            Has completado
            {' '}
            <strong>
              {sessionQuestions.length}
            </strong>
            {' '}
            preguntas.
          </p>

          <div className={styles.finishedActions}>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleStart}
            >
              Repetir
            </button>

            <button
              type="button"
              className={styles.secondaryButton}
              onClick={onExit}
            >
              Salir
            </button>
          </div>
        </div>
      </section>
    )
  }

  /* --------------- Current question --------------- */

  const currentQuestion =
    sessionQuestions[currentIndex]
  // Protects against an invalid session index before rendering question data.
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


  /* --------------- Check answer --------------- */

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

  /* --------------- Submit answer --------------- */
  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!userAnswer.trim()) {
      return
    }
    // Count correct answers only once, when the response is submitted.
    if (isCorrect) {
      setCorrectAnswers(
        previous =>
          previous + 1
      )
    }
    setIsChecked(true)
  }


  /* --------------- Next question --------------- */

  // Saves the final session or advances to the next question.

  const handleNext = async () => {

    const isLastQuestion =
      currentIndex ===
      sessionQuestions.length - 1

    if (isLastQuestion) {
      setIsSavingProgress(true)
      setProgressError(null)

      // Persistence happens only after the last answer has been checked.
      try {
        await onSessionComplete({
          questionsAnswered:
            sessionQuestions.length,

          correctAnswers:
            correctAnswers,
        })

        setIsFinished(true)

      } catch (error) {
        console.error(
          'Error saving progress:',
          error
        )

        setProgressError(
          'No se pudo guardar el progreso.'
        )

      } finally {
        setIsSavingProgress(false)
      }

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
 
  return (
    <section className={styles.exercisePage}>

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


      <div className={styles.exerciseCard}>
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
              key={currentQuestion.id}
              id="conjugationAnswer"
              className={styles.input}
              type="text"
              value={userAnswer}
              ref={answerInputRef}
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
            <div
              className={styles.feedback}
            >
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

              {progressError && (
                <p>
                  {progressError}
                </p>
              )}

              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleNext}
                disabled={isSavingProgress}
              >
                {isSavingProgress
                  ? 'Guardando...'
                  : currentIndex ===
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