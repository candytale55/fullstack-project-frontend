import { useParams } from "react-router"
import { useState, useEffect } from "react"

import ConjugationExercise, {
  type PortugueseVerbConjugation,
} from "../../components/exercises/ConjugationExercise/ConjugationExercise"

import { getPortugueseVerbConjugationsByUnit } from "../../components/exercises/ConjugationExercise/portugueseVerbConjugationService"


export default function ExercisePage() {
  const { unitId } = useParams()

  const [conjugations, setConjugations] =
    useState<PortugueseVerbConjugation[]>([])

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)


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


  if (isLoading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <ConjugationExercise
      conjugations={conjugations}
    />
  )
}