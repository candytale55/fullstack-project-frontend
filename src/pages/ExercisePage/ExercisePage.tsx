/* Loads unit data through the conjugation service and passes it to the exercise component. */

import { useCallback } from 'react'

import {
  useNavigate,
  useParams
} from 'react-router'

import ConjugationExercise, {
  type PortugueseVerbConjugation
} from '../../components/exercises/ConjugationExercise/ConjugationExercise'

import {
  getPortugueseVerbConjugationsByUnit
} from '../../components/exercises/ConjugationExercise/portugueseVerbConjugationService'

import {
  saveStudySession
} from '../../services/progressService'

import useFetch from '../../hooks/useFetch'

export default function ExercisePage() {

  const {
    languageId,
    courseId,
    unitId
  } = useParams()


  const navigate = useNavigate()


  const loadConjugations = useCallback(
    async () => {
      if (!unitId) {
        throw new Error('Unidad no encontrada')
      }

      try {
        return await getPortugueseVerbConjugationsByUnit(
          unitId
        )
      } catch (error) {
        console.error(
          'Error loading conjugations:',
          error
        )

        throw new Error(
          'No se pudieron cargar los ejercicios'
        )
      }
    },
    [unitId]
  )

  const {
    data: conjugations,
    loading: isLoading,
    error,
  } = useFetch(
    loadConjugations,
    {
      initialData: [] as PortugueseVerbConjugation[],
    }
  )



  /* --------------- Save progress --------------- */

  // Connects the completed session to the authenticated course progress endpoint.
  const handleSessionComplete = async (
    result: {
      questionsAnswered: number
      correctAnswers: number
    }
  ) => {

    if (!courseId) {
      throw new Error(
        'Course ID is missing'
      )
    }


    await saveStudySession(
      courseId,
      result
    )
  }

  /* --------------- Navigation --------------- */

  // Returns to the current course's unit list.
  const handleExit = () => {

    navigate(
      `/languages/${languageId}/courses/${courseId}/units`
    )
  }


  /* --------------- Render states --------------- */

  if (!unitId) {
    return <p>Unidad no encontrada</p>
  }


  if (isLoading) {
    return <p>Cargando...</p>
  }


  if (error) {
    return <p>{error}</p>
  }


  return (
    <ConjugationExercise
      conjugations={conjugations}
      onExit={handleExit}
      onSessionComplete={handleSessionComplete}
      languageName="Português"
      courseName="Conjugación de verbos"
      unitName={conjugations[0]?.tense ?? ''}
    />
  )
}