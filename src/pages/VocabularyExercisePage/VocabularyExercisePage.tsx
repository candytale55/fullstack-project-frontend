import {
    useEffect,
    useState,
} from 'react'

import {
    useNavigate,
    useParams,
} from 'react-router'

import VocabularyExercise from '../../components/exercises/VocabularyExercise/VocabularyExercise'

import {
    getVocabulary,
} from '../../components/exercises/VocabularyExercise/vocabularyService'

import type {
    VocabularyItem,
} from '../../types/vocabulary.types'

import Loader from '../../components/ui/Loader/Loader'
import Alert from '../../components/ui/Alert/Alert'


export default function VocabularyExercisePage() {

    const { languageCode } =
        useParams<{
            languageCode: string
        }>()

    const navigate = useNavigate()


    const [vocabulary, setVocabulary] =
        useState<VocabularyItem[]>([])

    const [isLoading, setIsLoading] =
        useState(true)

    const [error, setError] =
        useState<string | null>(null)


    /* --------------- Load vocabulary --------------- */

    useEffect(() => {

        if (!languageCode) {
            return
        }

        const loadVocabulary = async () => {

            try {

                const data =
                    await getVocabulary({
                        language: languageCode,
                    })

                setVocabulary(data)

            } catch (error) {

                console.error(
                    'Error loading vocabulary:',
                    error
                )

                setError(
                    'No se pudo cargar el vocabulario.'
                )

            } finally {

                setIsLoading(false)
            }
        }


        loadVocabulary()

    }, [languageCode])


    /* --------------- Navigation --------------- */

    const handleExit = () => {
        navigate('/languages')
    }


    /* --------------- Render states --------------- */

    if (!languageCode) {
        return (
            <Alert variant="error">
                Idioma no especificado.
            </Alert>
        )
    }


    if (isLoading) {
        return <Loader />
    }


    if (error) {
        return (
            <Alert variant="error">
                {error}
            </Alert>
        )
    }


    return (
        <VocabularyExercise
            vocabulary={vocabulary}
            onExit={handleExit}
        />
    )
}