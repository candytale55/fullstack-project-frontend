import { useEffect, useState } from 'react'

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


export default function ExercisePage() {

  const {
    languageId,
    courseId,
    unitId
  } = useParams()

  const navigate = useNavigate()


  const [conjugations, setConjugations] =
    useState<PortugueseVerbConjugation[]>([])

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)


  /* ---------------------------------- */
  /* Load conjugations                  */
  /* ---------------------------------- */

  useEffect(() => {

    if (!unitId) {
      return
    }


    const loadConjugations = async () => {

      try {

        const data =
          await getPortugueseVerbConjugationsByUnit(
            unitId
          )

        setConjugations(data)

      } catch (error) {

        console.error(
          'Error loading conjugations:',
          error
        )

        setError(
          'No se pudieron cargar los ejercicios'
        )

      } finally {

        setIsLoading(false)
      }
    }


    loadConjugations()

  }, [unitId])


  /* ---------------------------------- */
  /* Exit exercise                      */
  /* ---------------------------------- */

  /*
   * Returns the user to the Units page
   * of the current course.
   */
  const handleExit = () => {

    navigate(
      `/languages/${languageId}/courses/${courseId}/units`
    )
  }


  /* ---------------------------------- */
  /* Render states                      */
  /* ---------------------------------- */

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
      languageName="Português"
      courseName="Conjugación de verbos"
      unitName={conjugations[0]?.tense ?? ''}
    />
  )
}