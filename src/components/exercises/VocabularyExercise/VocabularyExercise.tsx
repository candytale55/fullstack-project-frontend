import {
    useCallback,
    useMemo,
    useState,
    type SubmitEvent,
} from 'react'

import type {
    VocabularyItem
} from '../../../types/vocabulary'

import {
    normalizeVocabularyAnswer,
    shuffleItems,
} from './vocabularyExerciseUtils'

import Card from '../../ui/Card/Card'
import Input from '../../ui/Input/Input'
import Button from '../../ui/Button/Button'
import Alert from '../../ui/Alert/Alert'

import styles from './VocabularyExercise.module.css'


type VocabularyExerciseProps = {
    vocabulary: VocabularyItem[]
    onExit: () => void
}


export default function VocabularyExercise({
    vocabulary,
    onExit,
}: VocabularyExerciseProps) {

    /* calcula availableVocabulary solo cuando cambia */
    const availableVocabulary =
        useMemo(
            () =>
                vocabulary.filter(
                    item =>
                        item.term &&
                        item.definition
                ),
            [vocabulary]
        )

    // Focuses the action button when feedback mounts after submission.
    const actionButtonRef = useCallback(
        (button: HTMLButtonElement | null) => {
            button?.focus()
        },
        []
    )

    const [questionCount, setQuestionCount] =
        useState(10)

    const [
        sessionVocabulary,
        setSessionVocabulary
    ] = useState<VocabularyItem[]>([])

    const [currentIndex, setCurrentIndex] =
        useState(0)

    const [userAnswer, setUserAnswer] =
        useState('')

    const [isChecked, setIsChecked] =
        useState(false)

    const [correctAnswers, setCorrectAnswers] =
        useState(0)

    const [hasStarted, setHasStarted] =
        useState(false)

    const [isFinished, setIsFinished] =
        useState(false)

    const currentItem =
        sessionVocabulary[currentIndex]

    const isCorrect =
        currentItem
            ? normalizeVocabularyAnswer(
                userAnswer,
                currentItem.languageCode
            ) ===
            normalizeVocabularyAnswer(
                currentItem.term,
                currentItem.languageCode
            )
            : false


    const handleStart = () => {

        const amount =
            Math.min(
                Math.max(questionCount, 1),
                availableVocabulary.length
            )

        setSessionVocabulary(
            shuffleItems(
                availableVocabulary
            ).slice(0, amount)
        )

        setCurrentIndex(0)
        setCorrectAnswers(0)
        setUserAnswer('')
        setIsChecked(false)

        setIsFinished(false)
        setHasStarted(true)
    }


    const handleSubmit = (
        event: SubmitEvent<HTMLFormElement>
    ) => {

        event.preventDefault()

        if (
            !currentItem ||
            !userAnswer.trim() ||
            isChecked
        ) {
            return
        }

        const correct =
            normalizeVocabularyAnswer(
                userAnswer,
                currentItem.languageCode
            ) ===
            normalizeVocabularyAnswer(
                currentItem.term,
                currentItem.languageCode
            )

        if (correct) {
            setCorrectAnswers(
                current => current + 1
            )
        }

        setIsChecked(true)
    }


    const handleNext = () => {

        const isLastQuestion =
            currentIndex ===
            sessionVocabulary.length - 1

        if (isLastQuestion) {
            setIsFinished(true)
            return
        }

        setCurrentIndex(
            current => current + 1
        )

        setUserAnswer('')
        setIsChecked(false)
    }


    if (availableVocabulary.length === 0) {
        return (
            <section className={styles.exercisePage}>

                <Alert>
                    No hay vocabulario disponible.
                </Alert>

                <Button
                    type="button"
                    variant="secondary"
                    onClick={onExit}
                >
                    Salir
                </Button>
            </section>
        )
    }


    if (!hasStarted) {
        return (
            <section className={styles.setupPage}>
                <Card className={styles.setupCard}>

                    <h2 className={styles.setupTitle}>
                        Práctica de vocabulario
                    </h2>

                    <p className={styles.availableQuestions}>
                        Palabras disponibles:
                        {' '}
                        {availableVocabulary.length}
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

                        <Input
                            id="questionCount"
                            className={styles.questionCountInput}
                            type="number"
                            min={1}
                            max={availableVocabulary.length}
                            value={questionCount}
                            onChange={(event) =>
                                setQuestionCount(
                                    Number(event.target.value)
                                )
                            }
                        />

                        <div className={styles.setupActions}>
                            <Button type="submit">
                                Comenzar
                            </Button>

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onExit}
                            >
                                Salir
                            </Button>
                        </div>

                    </form>
                </Card>
            </section>
        )
    }


    if (isFinished) {
        return (
            <section className={styles.setupPage}>
                <Card className={styles.setupCard}>

                    <h2 className={styles.setupTitle}>
                        Ejercicio terminado
                    </h2>

                    <p>
                        Has acertado
                        {' '}
                        <strong>{correctAnswers}</strong>
                        {' de '}
                        <strong>{sessionVocabulary.length}</strong>
                    </p>

                    <div className={styles.setupActions}>
                        <Button
                            type="button"
                            onClick={handleStart}
                        >
                            Repetir
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onExit}
                        >
                            Salir
                        </Button>
                    </div>

                </Card>
            </section>
        )
    }


    if (!currentItem) {
        return null
    }


    return (
        <section className={styles.exercisePage}>

            <Card className={styles.exerciseCard}>

                <header className={styles.cardHeader}>
                    <span className={styles.progress}>
                        {currentIndex + 1}
                        {' / '}
                        {sessionVocabulary.length}
                    </span>

                    {currentItem.partOfSpeech && (
                        <span className={styles.tense}>
                            {currentItem.partOfSpeech}
                        </span>
                    )}
                </header>


                <div className={styles.cardBody}>

                    <p>
                        Escribe la palabra correcta
                        {' '}
                        {currentItem.languageCode === 'pt'
                            ? 'en portugués'
                            : 'en inglés'}
                    </p>

                    {currentItem.image?.url && (
                        <img
                            src={currentItem.image.url}
                            alt=""
                        />
                    )}

                    <p className={styles.question}>
                        {currentItem.definition}
                    </p>

                </div>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >

                    <label
                        htmlFor="vocabularyAnswer"
                        className={styles.srOnly}
                    >
                        Escribe la respuesta
                    </label>

                    <Input
                        key={currentItem.id}
                        id="vocabularyAnswer"
                        className={styles.input}
                        type="text"
                        value={userAnswer}
                        onChange={(event) =>
                            setUserAnswer(event.target.value)
                        }
                        disabled={isChecked}
                        autoFocus
                        autoComplete="off"
                    />


                    {!isChecked && (
                        <Button type="submit">
                            Comprobar
                        </Button>
                    )}

                </form>

                {isChecked && (
                    <div className={styles.feedback}>

                        <Alert
                            variant={isCorrect ? 'success' : 'error'}
                        >
                            {isCorrect ? 'Correcto' : 'Incorrecto'}
                        </Alert>

                        {!isCorrect && (
                            <p className={styles.correctAnswer}>
                                Respuesta correcta:
                                {' '}
                                <strong>{currentItem.term}</strong>
                            </p>
                        )}

                        {currentItem.pronunciation && (
                            <p className={styles.pronunciation}>
                                /{currentItem.pronunciation}/
                            </p>
                        )}

                        {currentItem.example && (
                            <p>
                                {currentItem.example}
                            </p>
                        )}

                        <button
                            ref={actionButtonRef}
                            type="button"
                            className={styles.primaryButton}
                            onClick={handleNext}
                        >
                            {currentIndex ===
                                sessionVocabulary.length - 1
                                ? 'Finalizar'
                                : 'Siguiente'}
                        </button>

                    </div>
                )}

            </Card>

        </section>
    )
}